import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import coinIcon from "/image/icons8-coin-48.png";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext); // Access logged-in user info
  const axiosSecurePublic = useAxiosPublic();

  // Fetch user data from the backend using TanStack Query
  const { data: userInfo = {}, refetch } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      if (!user?.email) return {};
      const response = await axiosSecurePublic.get(`/user/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email, // Run query only when user is logged in
  });

  return (
    <nav className="bg-indigo-500 text-white">
      <div className="container mx-auto px-5 py-5 flex justify-between items-center">
        {/* Left Section - Logo */}
        <div className="flex items-center">
          <NavLink
            to="/"
            className="text-2xl font-bold tracking-wide text-white hover:text-white transition"
          >
            <span className="text-yellow-400">COIN</span>CRAFTER
          </NavLink>
        </div>

        {/* Center Section - Navigation Routes */}
        <div className="hidden lg:flex items-center space-x-6 justify-center flex-grow">
          <NavLink
            to="/dashboard"
            className="text-lg font-medium text-white hover:text-white"
          >
            Dashboard
          </NavLink>
          <div className="text-lg font-medium btn bg-white border-none flex items-center">
            <img className="w-8" src={coinIcon} alt="Coin Icon" />
            <span className="text-2xl font-semibold">
              {userInfo?.coins || 0} {/* Display coins from the fetched user data */}
            </span>
          </div>
        </div>

        {/* Right Section - Profile, Login, Register, Join as Developer */}
        <div className="hidden lg:flex items-center space-x-4">
          <div>
            {user ? (
              <FaUserCircle className="text-4xl text-white" />
            ) : (
              <FaUserCircle className="text-4xl text-gray-400" />
            )}
          </div>

            {
              user ? <button onClick={logOut} className="text-lg font-medium btn bg-transparent border-white text-white border-2 hover:bg-transparent hover:border-yellow-400 hover:text-yellow-400">Logout</button> : <>  <Link
              to="/login"
              className="text-lg font-medium btn bg-transparent border-white text-white border-2 hover:bg-transparent hover:border-yellow-400 hover:text-yellow-400"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-lg font-medium btn bg-transparent border-white text-white border-2 hover:bg-transparent hover:border-yellow-400 hover:text-yellow-400"
            >
              Register
            </Link></>
            }

          {/* Join as Developer Button */}
          <a
            href="https://github.com/monzila-akter"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-yellow-500 hover:bg-gray-800 text-white btn border-none text-lg rounded transition"
          >
            <BsGithub className="mr-2" />
            Join as Developer
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } lg:hidden bg-indigo-500 text-white space-y-2 p-4`}
      >
        <NavLink
          to="/dashboard"
          className="block text-lg font-medium text-white hover:text-white"
        >
          Dashboard
        </NavLink>
        <div className="block text-lg flex space-x-2 items-center bg-white py-2 px-3 w-24 rounded-lg text-black font-medium">
          <img className="w-8" src={coinIcon} alt="Coin Icon" />
          <span className="text-2xl font-semibold">
            {userInfo?.coins || 0} {/* Coins for mobile view */}
          </span>
        </div>
        <NavLink
          className="block flex items-center space-x-2 text-lg text-white hover:text-white"
        >
          <FaUserCircle className="text-4xl" />
        </NavLink>

            <Link
              to="/login"
              className="text-lg mr-3 font-medium btn bg-transparent border-white text-white border-2 hover:bg-transparent hover:border-yellow-400 hover:text-yellow-400"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-lg font-medium btn bg-transparent border-white text-white border-2 hover:bg-transparent hover:border-yellow-400 hover:text-yellow-400"
            >
              Register
            </Link>
        <a
          href="https://github.com/your-repository"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-yellow-500 hover:bg-gray-800 text-white btn text-lg rounded border-none"
        >
          <BsGithub className="mr-2" />
          Join as Developer
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
