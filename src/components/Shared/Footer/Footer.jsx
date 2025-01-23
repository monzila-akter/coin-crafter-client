import React from "react";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-indigo-500 text-white py-14">
      <div className="container mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-between">
        {/* Left Section - Logo and Short Description */}
        <div className="flex flex-col items-start space-y-2">
          <NavLink
            to="/"
            className="text-2xl font-bold tracking-wide text-white hover:text-yellow-400 transition"
          >
            <span className="text-yellow-400">COIN</span>CRAFTER
          </NavLink>
          <p className="text-sm text-gray-200">
            CoinCrafter – Empowering developers with efficient collaboration tools and opportunities.
          </p>
        </div>

        {/* Center Section - Social Media Icons */}
        <div className="flex md:order-3 space-x-4 mt-4 md:mt-0 md:justify-end">
          <a
            href="https://www.facebook.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-yellow-400 transition"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-yellow-400 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-yellow-400 transition"
          >
            <FaGithub />
          </a>
        </div>
        
      </div>
      <div className="border-b-2 border-white w-full container mx-auto mt-10 md:px-10 px-5"></div>

      <div className="mt-4 md:mt-0 text-sm text-center md:text-right md:order-2">
          <p className="text-center mt-5">© {new Date().getFullYear()} CoinCrafter. All rights reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;
