import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactUs from "./Pages/ContactUs";
import Dashboard from "./Pages/Dashboard";
import Interactive from "./Pages/Interactive";
import Navbar from "./components/Navbar/Navbar";
import { Home } from "./Pages/Home";
import Footer from "./components/Footer/Footer";
import Notification from "./Pages/Notification";
import Paramétre from "./Pages/Paramétre";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ContactUs" element={<ContactUs />} />{" "}
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Interactive" element={<Interactive />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/Paramétre" element={<Paramétre />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
