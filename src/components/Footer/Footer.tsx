import React from "react";
import Logo from "../../assets/logo.png";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#FFF4EA]"
    >
      <div className="container py-20 flex flex-col md:flex-row md:items-center justify-between gap-10">
        <div className="space-y-4">
          <img src={Logo} alt="Company Logo" className="w-40" />
          <p className="text-gray-400 xl:max-w-[400px]">
            Our mission is to provide a comprehensive and innovative fire
            protection solution for industrial environments. With our smart box
            equipped with high-performance sensors, we ensure constant
            monitoring of temperature, toxic gases, and harmful particles.
          </p>
        </div>
        <div className="flex space-x-6 text-3xl">
          <FaFacebook className="hover:text-[#C96868] duration-200 cursor-pointer" />
          <FaInstagram className="hover:text-[#C96868] duration-200 cursor-pointer" />
          <FaLinkedin className="hover:text-[#C96868] duration-200 cursor-pointer" />
        </div>
      </div>
      <div className="py-4 text-center border-t border-[#C96868]">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Airsense. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
