import React, { useEffect, useState } from "react";
import {
  updateEmail,
  updatePassword,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
  getAuth,
} from "firebase/auth";
import { database, ref, set, get } from "./Firebase"; // Assuming you have Firebase Database configured
import { toast } from "react-toastify";

const Settings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(""); // Re-added phone state
  const [notifications, setNotifications] = useState(true); // Re-added notifications state
  const [emails, setEmails] = useState([]); // Emergency emails
  const [emailInput, setEmailInput] = useState(""); // Input field for emails

  const auth = getAuth();
  const user = auth.currentUser;

  // Load the user's current info into state
  useEffect(() => {
    if (user) {
      setUsername(user.displayName || "");
      setEmail(user.email || "");
      // Load any additional attributes like phone number from Firestore or Realtime Database if stored there
      loadUserDetails(); // Custom function to load other user details like phone number

      fetchEmails(); // Fetch emergency emails from Firebase
    }
  }, [user]);

  const loadUserDetails = async () => {
    const userRef = ref(database, `users/${user.uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      setPhone(userData.phone || ""); // Load phone number from Firebase
      setNotifications(userData.notifications || true); // Load notifications preference
    }
  };

  const fetchEmails = async () => {
    const emailsRef = ref(database, "emergencyEmails");
    const snapshot = await get(emailsRef);
    if (snapshot.exists()) {
      setEmails(snapshot.val() || []);
    }
  };

  const saveUserDetails = async () => {
    const userRef = ref(database, `users/${user.uid}`);
    await set(userRef, {
      phone, // Save phone number
      notifications, // Save notification preference
    });
  };

  const handleUpdateProfile = async () => {
    try {
      if (user) {
        // Update display name (username)
        if (username !== user.displayName) {
          await updateProfile(user, { displayName: username });
        }

        // Update email
        if (email !== user.email) {
          await updateEmail(user, email);
        }

        // Update password (only if it has been changed)
        if (password) {
          await updatePassword(user, password);
        }

        // Save other user details like phone and notifications to Firebase Database
        await saveUserDetails();

        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        toast.error(
          "Please re-authenticate before updating sensitive information."
        );
      } else {
        toast.error(error.message);
      }
    }
  };

  // Handling emergency emails
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

  const saveEmailsToFirebase = async (emailsToSave) => {
    const emailsRef = ref(database, "emergencyEmails");
    await set(emailsRef, emailsToSave);
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
        <label className="block text-darkBlue mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter new email"
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="mb-5">
        <label className="block text-darkBlue mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
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

      <button
        onClick={handleUpdateProfile}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-80 transition duration-300"
      >
        Update Profile
      </button>
    </div>
  );
};

export default Settings;
