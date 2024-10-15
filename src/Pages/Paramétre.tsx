import { useEffect, useState } from "react";
import { database, ref, set, get, remove } from "./Firebase";

const Settings = () => {
  const [emails, setEmails] = useState([]);
  const [notificationEmails, setNotificationEmails] = useState([]);
  const [emailInput, setEmailInput] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const fetchEmails = async () => {
      const emailsRef = ref(database, "emergencyEmails");
      const snapshot = await get(emailsRef);
      if (snapshot.exists()) {
        setEmails(snapshot.val() || []);
      }
    };

    fetchEmails();
  }, []);

  const saveEmailsToFirebase = async (emailsToSave) => {
    const emailsRef = ref(database, "emergencyEmails");
    await set(emailsRef, emailsToSave);
  };

  const handleAddEmail = () => {
    if (emailInput && !emails.includes(emailInput)) {
      const updatedEmails = [...emails, emailInput];
      setEmails(updatedEmails);
      saveEmailsToFirebase(updatedEmails);
      setEmailInput("");
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    const updatedEmails = emails.filter((email) => email !== emailToRemove);
    setEmails(updatedEmails);
    saveEmailsToFirebase(updatedEmails);
  };

  const handleEmailChange = (index, newEmail) => {
    const updatedEmails = [...notificationEmails];
    updatedEmails[index] = newEmail;
    setNotificationEmails(updatedEmails);
    saveEmailsToFirebase(updatedEmails);
  };

  const removeEmail = (index) => {
    const updatedEmails = notificationEmails.filter((_, i) => i !== index);
    setNotificationEmails(updatedEmails);
    saveEmailsToFirebase(updatedEmails);
  };

  const handleAddNotificationEmail = () => {
    if (emailInput && !notificationEmails.includes(emailInput)) {
      const updatedNotificationEmails = [...notificationEmails, emailInput];
      setNotificationEmails(updatedNotificationEmails);
      saveEmailsToFirebase(updatedNotificationEmails);
      setEmailInput("");
    }
  };

  return (
    <div className="container mx-auto p-5 bg-brandWhite rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-darkBlue">
        Account Settings
      </h1>

      <div className="mb-5">
        <label className="block text-darkBlue mb-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="mb-5">
        <label className="block text-darkBlue mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="mb-5">
        <label className="block text-darkBlue mb-2">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="mb-5 flex items-center">
        <input
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
          className="mr-2"
        />
        <label className="text-darkBlue">Enable notifications</label>
      </div>

      <div className="mb-5">
        <label className="block text-darkBlue mb-2">
          Add an emergency email
        </label>
        <div className="flex items-center">
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Add an emergency email"
            className="border border-gray-300 rounded px-3 py-2 w-full mr-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleAddEmail}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-80 transition duration-300"
          >
            Add
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl mb-2 text-darkBlue">Emergency Emails:</h2>
        <ul>
          {emails.map((email, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-2 bg-white p-2 rounded shadow"
            >
              <span className="text-gray-700">{email}</span>
              <button
                onClick={() => handleRemoveEmail(email)}
                className="text-red-500 hover:text-red-700 transition duration-300"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {notificationEmails.length > 0 && (
        <div className="mt-8 p-6 bg-[#3A3D47] rounded-lg shadow-inner">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Emails de Notification Confirmés
          </h2>
          <ul className="space-y-4">
            {notificationEmails.map((email, index) => (
              <li key={index} className="flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  className="flex-1 p-3 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A4E69]"
                />
                <button
                  onClick={() => removeEmail(index)}
                  className="ml-2 p-2 bg-red-600 text-white rounded-md"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Settings;
