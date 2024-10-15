import { useState } from "react"; // Import useState for managing the mobile menu state
import { motion } from "framer-motion";
import { FaPhone, FaCog, FaBars, FaTimes } from "react-icons/fa"; // Import icons for the menu
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useAuth } from "../../hooks";
import { IoMdLogOut } from "react-icons/io";

const Navbar = () => {
  const { user, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false); // State for toggling the mobile menu

  return (
    <motion.header
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="relative" // Added relative class for absolute positioning
    >
      <div className="container py-5 flex items-center justify-between">
        <div>
          <img src={Logo} alt="Logo" className="w-48" />
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <FaTimes className="text-gray-600" size={24} />
            ) : (
              <FaBars className="text-gray-600" size={24} />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`hidden md:flex items-center gap-10 md:text-base text-sm`}
        >
          <li>
            <Link
              to="/"
              className="hover:text-primary transition-colors duration-300"
            >
              Main
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link
                  to="/Dashboard"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/Interactive"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Interactive Monitoring
                </Link>
              </li>
              <li>
                <Link
                  to="/Notification"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Alert Notifications
                </Link>
              </li>
            </>
          ) : (
            <Link
              to="/Sign-In"
              className="text-[#284C78] px-3 py-2 rounded-md text-sm font-medium hover:bg-[#C9ADA7] hover:text-white"
            >
              Connexion
            </Link>
          )}
        </ul>
        {user && (
          <>
            <button
              className="text-[#284C78] hover:text-[#C9ADA7]"
              onClick={logout}
            >
              <IoMdLogOut className="text-2xl" />
              <span className="sr-only">Log out</span>
            </button>
          </>
        )}

        {/* Mobile Menu */}
        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } md:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-300 flex-col items-center z-50`}
        >
          <li className="p-2">
            <Link
              to="/"
              className="hover:text-primary transition-colors duration-300"
              onClick={() => setIsOpen(false)} // Close menu on link click
            >
              Main
            </Link>
          </li>
          <li className="p-2">
            <Link
              to="/Dashboard"
              className="hover:text-primary transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li className="p-2">
            <Link
              to="/Interactive"
              className="hover:text-primary transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Interactive Monitoring
            </Link>
          </li>
          <li className="p-2">
            <Link
              to="/Notification"
              className="hover:text-primary transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Alert Notifications
            </Link>
          </li>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <Link to="/ContactUs">
            <button className="border border-gray-400 px-4 py-2 rounded-lg hover:bg-primary hover:text-white transform duration-300">
              Contact Us
            </button>
          </Link>
          <a href="tel:+1234567890" aria-label="Call Us">
            <FaPhone
              className="text-gray-600 hover:text-primary cursor-pointer"
              size={20}
            />
          </a>
          <Link to="/Paramétre" aria-label="Go to Settings">
            <FaCog
              className="text-gray-600 hover:text-primary cursor-pointer"
              size={24}
            />
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
