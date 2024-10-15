import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  User,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { toast } from "react-toastify";
import { OverlayLoader } from "../components/OverlayLoader";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../Pages/Firebase"; // Make sure you import Firestore config

// Define the initial state for the authentication context
type AuthState = {
  user: User | null;
  isLoading: boolean;
};

const initialAuthState: AuthState = {
  user: null,
  isLoading: true,
};

// Define the context type
type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
  logout: () => Promise<void>;
};

// Create the AuthContext
export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  const navigate = useNavigate();
  const auth = getAuth();

  // Listen to Firebase auth state changes and apply persistence
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setAuthState({ user, isLoading: false });
          } else {
            setAuthState({ user: null, isLoading: false });
          }
        });

        return () => unsubscribe();
      })
      .catch((error) => {
        console.error("Failed to set persistence", error);
        setAuthState({ user: null, isLoading: false });
      });
  }, [auth]);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setAuthState({ ...authState, isLoading: true });
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setAuthState({ user, isLoading: false });
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      setAuthState({ ...authState, isLoading: false });
      toast.error(error.message);
    }
  };

  // Register function
  const register = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      setAuthState({ ...authState, isLoading: true });
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update profile with additional information
      await updateProfile(user, {
        displayName, // Add displayName
        // You can add other attributes like photoURL if needed
      });

      // Save extra user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName, // Store displayName or other attributes in Firestore
        // Add any other custom attributes you want to store
      });

      setAuthState({ user, isLoading: false });
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      setAuthState({ ...authState, isLoading: false });
      toast.error(error.message);
    }
  };

  // Logout function
  const logout = async () => {
    await signOut(auth);
    setAuthState({ user: null, isLoading: false });
    toast.success("Logged out successfully!");
    navigate("/Sign-In");
  };

  // Show loading state before Firebase resolves the session
  if (authState.isLoading) {
    return <OverlayLoader />;
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
