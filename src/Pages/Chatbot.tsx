import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiMessageSquare,
  FiVolume2,
  FiVolumeX,
  FiMic,
  FiMicOff,
} from "react-icons/fi";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);

  const speak = (text) => {
    if (window.speechSynthesis && isVoiceEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1;
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-fr";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error: ", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsListening(false);
  };

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("/webhooks/rest/webhook", {
        sender: "user",
        message: input,
      });

      const botMessages = response.data.map((msg) => ({
        text: msg.text || "No response",
        sender: "bot",
      }));

      setMessages([...messages, userMessage, ...botMessages]);

      botMessages.forEach((msg) => speak(msg.text));
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput("");
  };

  useEffect(() => {
    if (!window.speechSynthesis) {
      console.warn("Speech Synthesis is not supported in this browser.");
    }
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`${
          isOpen ? "hidden" : "flex"
        } items-center justify-center bg-[#C96868] p-4 rounded-full shadow-lg cursor-pointer hover:shadow-xl transition duration-300`}
        onClick={() => setIsOpen(true)}
      >
        <FiMessageSquare className="text-brandWhite text-2xl" />
      </div>

      {isOpen && (
        <div className="relative bg-[#FFF4EA] w-96 rounded-xl shadow-xl transition duration-300 border border-gray-200">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-red-600 focus:outline-none"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>
          <div className="p-4 rounded-t-xl bg-[#C96868] text-brandWhite font-bold text-center text-lg">
            Airsense Assistant
          </div>
          <div className="p-4 space-y-2 max-h-72 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  msg.sender === "bot"
                    ? "bg-[#8EACCD] text-brandWhite"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-4 flex items-center border-t border-gray-200 space-x-2">
            <button
              onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
              className="p-2 rounded-full hover:bg-gray-200 transition duration-300"
            >
              {isVoiceEnabled ? (
                <FiVolume2 className="text-xl text-[#8EACCD]" />
              ) : (
                <FiVolumeX className="text-xl text-[#8EACCD]" />
              )}
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#8EACCD] bg-gray-100"
            />
            <button
              onClick={startListening}
              disabled={isListening}
              className={`p-2 ${
                isListening ? "bg-gray-300 cursor-not-allowed" : "bg-[#C96868]"
              } text-white rounded-full ml-2 hover:opacity-90 transition duration-300`}
            >
              {isListening ? (
                <FiMicOff className="text-xl" />
              ) : (
                <FiMic className="text-xl" />
              )}
            </button>
            <button
              onClick={sendMessage}
              className="p-2 bg-[#C96868] text-white rounded-full ml-2 hover:opacity-90 transition duration-300"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
