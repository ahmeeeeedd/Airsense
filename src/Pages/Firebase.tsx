import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  get,
  off,
} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHynWegcNjHIIuunFbP0KaVGsry2u493I",
  authDomain: "https://airsense-ce82c-default-rtdb.firebaseio.com/",
  projectId: "airsense-ce82c",
  storageBucket: "airsense-ce82c.appspot.com",
  messagingSenderId: "593701147518",
  appId: "1:593701147518:web:e332f3d18b8a7a807a192f",
  measurementId: "G-X8YMT5GP52",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const db = getFirestore(app);

export { database, ref, onValue, remove, get, set, off, db };
