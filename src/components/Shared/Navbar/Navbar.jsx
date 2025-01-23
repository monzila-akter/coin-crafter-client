import React, { useState, useContext } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle, FaUserTie } from "react-icons/fa";
import { BsBell, BsGithub } from "react-icons/bs";
import coinIcon from "/image/icons8-coin-48.png";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const axiosSecurePublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch user data from the backend using TanStack Query
  const { data: userInfo = {}, refetch: countRefetch } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      if (!user?.email) return {};
      const response = await axiosSecurePublic.get(`/user/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email, // Run query only when user is logged in
  });
  

  // Function to determine the dashboard home route
  const getDashboardHomeRoute = () => {
    const role = userInfo?.newRole || "User"; // Default to "User" if role not found
    
    if (role === "Admin") return "/dashboard/adminHome";
    if (role === "Worker") return "/dashboard/workerHome";
    if (role === "Buyer") return "/dashboard/buyerHome";
    return "/dashboard"; // Default route
  };

  // Determine if the current route is the dashboard route
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <nav className=" bg-indigo-500 text-white">
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

        {/* Center Section - Dashboard Navbar */}
        {isDashboard ? (
          <div className="hidden lg:flex items-center space-x-6 justify-center flex-grow">
            {/* Available Coins */}
            <div className="text-lg font-medium btn bg-white border-none flex items-center">
              <img className="w-8" src={coinIcon} alt="Coin Icon" />
              <span className="text-2xl font-semibold">
                {userInfo?.coins || 0}
              </span>
            </div>
            {/* User Role */}
            <div className="text-lg font-semibold text-white btn bg-yellow-500 border-none ">
              <FaUserTie />
              <span className="font-semibold">{userInfo?.newRole || "User"}</span>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-6 justify-center flex-grow">
            <NavLink
              onClick={()=>navigate(getDashboardHomeRoute())}
              className="text-lg font-medium text-white hover:text-white"
            >
              Dashboard
            </NavLink>
            {/* Available Coins */}
            {
              user ? <div className="text-lg font-medium btn bg-white border-none flex items-center">
              <img className="w-8" src={coinIcon} alt="Coin Icon" />
              <span className="text-2xl font-semibold">
                {userInfo?.coins || 0}
              </span>
            </div> : ""
            }
          </div>
        )}

        {/* Right Section - Profile and Notification */}
        <div className="hidden lg:flex items-center space-x-4">
          {isDashboard ? (
            <>
              
              {/* User Profile */}
              <div className="flex items-center">
                {user ? (
                  <div><img
                  title={user?.displayName}
                  className="w-10 object-cover h-10 border-2 border-yellow-400 rounded-full"
                  src={user?.photoURL}
                  alt="User"
                />
                <p className="text-lg font-medium text-white">{user?.displayName}</p>
                </div>
                ) : (
                  <FaUserCircle className="text-4xl text-white" />
                )}
              </div>
              {/* Notification Icon */}
              <FaBell className="text-2xl text-white cursor-pointer" />
            </>
          ) : (
            <>
            <div>
                {user ? (
                  <img
                    title={user?.displayName}
                    className="w-10 h-10 object-cover border-2 border-yellow-400 rounded-full"
                    src={user?.photoURL}
                    alt="User"
                  />
                ) : (
                  <FaUserCircle className="text-4xl text-white" />
                )}
              </div>
              {user ? (
                <button
                  onClick={logOut}
                  className="text-lg font-medium btn bg-transparent border-white text-white border-2 hover:bg-transparent hover:border-yellow-400 hover:text-yellow-400"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
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
                  </Link>
                </>
              )}
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
            </>
          )}
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
        {isDashboard ? (
          <>
            <div className="block text-lg flex space-x-2 items-center bg-white py-2 px-3 w-[120px] rounded-lg text-black font-medium">
              <img className="w-8" src={coinIcon} alt="Coin Icon" />
              <span className="text-2xl font-semibold">
                {userInfo?.coins || 0}
              </span>
            </div>
            <div className="block text-xl font-medium">
               <span className="font-semibold btn bg-yellow-500 border-none text-white text-xl"><FaUserTie></FaUserTie> {userInfo?.newRole || "User"}</span>
            </div>
            
            <NavLink className="block flex items-center space-x-2 text-lg text-white hover:text-white">
          {user ? (
            <img
              title={user?.displayName}
              className="w-10 h-10 object-cover border-2 border-yellow-400 rounded-full"
              src={user?.photoURL}
              alt="User"
            />
          ) : (
            <FaUserCircle className="text-4xl text-white" />
          )}
        </NavLink>
        {/* Notification Icon for Mobile */}
        <FaBell className="text-2xl text-white cursor-pointer" />
          </>
        ) : (
          <>
            <NavLink
              onClick={() => navigate(getDashboardHomeRoute)}
              className="block text-lg font-medium text-white hover:text-white"
            >
              Dashboard
            </NavLink>
            {
              user ? <div className="block text-lg flex space-x-2 items-center bg-white py-2 px-3 w-[120px] rounded-lg text-black font-medium">
              <img className="w-8" src={coinIcon} alt="Coin Icon" />
              <span className="text-2xl font-semibold">
                {userInfo?.coins || 0}
              </span>
            </div> : ""
            }
            <NavLink className="block flex items-center space-x-2 text-lg text-white hover:text-white">
          {user ? (
            <img
              title={user?.displayName}
              className="w-10 h-10 object-cover border-2 border-yellow-400 rounded-full"
              src={user?.photoURL}
              alt="User"
            />
          ) : (
            <FaUserCircle className="text-4xl text-white" />
          )}
        </NavLink>
            {user ? (
                <button
                  onClick={logOut}
                  className="text-lg font-medium btn bg-transparent border-white text-white border-2 hover:bg-transparent hover:border-yellow-400 hover:text-yellow-400"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-lg font-medium btn bg-transparent border-white text-white border-2 hover:bg-transparent hover:border-yellow-400 hover:text-yellow-400"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="ml-4 text-lg font-medium btn bg-transparent border-white text-white border-2 hover:bg-transparent hover:border-yellow-400 hover:text-yellow-400"
                  >
                    Register
                  </Link>
                </>
              )}
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
          </>
        )}
        
      </div>
    </nav>
  );
};

export default Navbar;
