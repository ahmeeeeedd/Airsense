import React from "react";
import Contact_US from "../assets/Contact.png";
import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";

const ContactUs = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Form submitted!");
  };

  return (
    <div className="min-h-screen bg-brandWhite flex items-center justify-center p-20 mt-16">
      <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-4xl space-y-8">
        <h1 className="text-4xl font-extrabold text-[#284C78] text-center mb-6 animate__animated animate__fadeInDown">
          Contact Us
        </h1>

        <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
          <div className="w-full md:w-1/2 animate__animated animate__fadeInLeft">
            <img
              src={Contact_US}
              alt="Contact Us"
              className="rounded-lg shadow-lg w-full"
            />
          </div>

          <div className="w-full md:w-1/2 space-y-6 animate__animated animate__fadeInRight">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-[#284C78] text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Nom
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-[#284C78] bg-white hover:text-black"
                  id="name"
                  type="text"
                  placeholder="Votre nom"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-[#284C78] text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Adresse e-mail
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-[#284C78] bg-white hover:text-black"
                  id="email"
                  type="email"
                  placeholder="Votre adresse e-mail"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-[#284C78] text-sm font-bold mb-2"
                  htmlFor="subject"
                >
                  Sujet
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-[#284C78] bg-white hover:text-black"
                  id="subject"
                  type="text"
                  placeholder="Sujet"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-[#284C78] text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-[#284C78] bg-white hover:text-black"
                  id="message"
                  rows={5}
                  placeholder="Votre message"
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-[#284C78] hover:bg-[#9B8C99] text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition transform hover:scale-105"
                  type="submit"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-6 animate__animated animate__fadeInUp">
          <h2 className="text-2xl font-semibold text-[#284C78]">
            Nos Coordonnées
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-brandWhite shadow-lg rounded-lg p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <a
                href="https://www.google.com/maps/place/STTP+:+soci%C3%A9t%C3%A9+de+transformation+toile+et+plastique/@34.822994,10.795449,15z/data=!4m6!3m5!1s0x1301d1ff3f9ddc81:0xc3a1efc285900013!8m2!3d34.8229942!4d10.7954486!16s%2Fg%2F11cn5l2fcq?hl=fr&entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="text-[#C9ADA7] mb-4">
                  <FaLocationArrow className="text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Adresse</h3>
                <p className="text-gray-600">
                  Insat , centre urbain <br /> Tunis, Tunisia
                </p>
              </a>
            </div>
            <div className="bg-brandWhite shadow-lg rounded-lg p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-[#C9ADA7] mb-4">
                <FaMobileAlt className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Téléphone</h3>
              <p className="text-gray-600">99 696 145</p>
            </div>
            <div className="bg-brandWhite shadow-lg rounded-lg p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-[#C9ADA7] mb-4">
                <FaEnvelope className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Email</h3>
              <p className="text-gray-600">Airsense@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
