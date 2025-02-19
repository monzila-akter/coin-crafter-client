import React, { useState, useContext, useRef } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle, FaUserTie } from "react-icons/fa";
import { BsBell, BsGithub } from "react-icons/bs";
import coinIcon from "/image/icons8-coin-48.png";
import { AuthContext } from "../../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUsers from "../../../Hooks/useUsers";
import ThemeToggle from "../../ThemeToggle";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const popupRef = useRef(null);
  const { userInfo, refetch } = useUsers();

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

  // Fetch notifications from backend
  const getNotifications = async () => {
    if (!user?.email) setNotifications([]);
    const response = await axiosSecure.get(`/notification/${user?.email}`);

    setNotifications(response.data);
  };

  // Handle notification click (toggle popup visibility)
  const toggleNotificationPopup = () => {
    setIsNotificationOpen(!isNotificationOpen);

    if (!isNotificationOpen) {
      getNotifications();
    } else {
      setNotifications([]);
    }
  };

  // Close popup when clicking outside
  const handleClickOutside = (event) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target) &&
      !event.target.closest(".notification-icon")
    ) {
      setIsNotificationOpen(false);
    }
  };

  // Add event listener to close popup on outside click
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-cyan-800 text-white z-50">
      <div className="container mx-auto px-5 py-5 flex justify-between items-center">
        {/* Left Section - Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-2xl ml-10 lg:ml-0 font-bold tracking-wide text-white hover:text-white transition"
          >
            <span className="text-cyan-300">COIN</span>CRAFTER
          </Link>
        </div>
        <ThemeToggle></ThemeToggle>
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
            <div className="text-lg font-semibold btn bg-cyan-300 border-none ">
              <FaUserTie />
              <span className="font-semibold">{userInfo?.newRole || "User"}</span>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-6 justify-center flex-grow">
            <NavLink to="/"     className={({ isActive }) => 
              isActive
                ? "font-medium underline text-white" // Active state styles
                : "text-white" // Default state styles
            }>
              Home
            </NavLink>
            <Link
              onClick={() => navigate(getDashboardHomeRoute())}
              className={({ isActive }) => 
                isActive
                  ? "font-medium underline text-white" // Active state styles
                  : "text-white" // Default state styles
              }
            >
              Dashboard
            </Link>
            <NavLink to="/services"
                className={({ isActive }) => 
                  isActive
                    ? "font-medium underline text-white" // Active state styles
                    : "text-white" // Default state styles
                }
            >
              Services
            </NavLink>
            {/* Available Coins */}
            {user ? (
              <>
              
              <NavLink to="/tasks"
                  className={({ isActive }) => 
                    isActive
                      ? "font-medium underline text-white" // Active state styles
                      : "text-white" // Default state styles
                  }
              >
                Tasks
              </NavLink>
              <NavLink to="/payments"
                  className={({ isActive }) => 
                    isActive
                      ? "font-medium underline text-white" // Active state styles
                      : "text-white" // Default state styles
                  }
              >
                Payments
              </NavLink>
              <div className="text-lg font-medium btn bg-white border-none flex items-center">
                <img className="w-8" src={coinIcon} alt="Coin Icon" />
                <span className="text-2xl font-semibold">
                  {userInfo?.coins || 0}
                </span>
              </div>
              </>
            ) : (
              ""
            )}
          </div>
        )}

        {/* Right Section - Profile and Notification */}
        <div className="hidden lg:flex items-center space-x-4">
          {isDashboard ? (
            <>
              {/* User Profile */}
              <div className="flex items-center">
                {user ? (
                  <div className="flex flex-col justify-center items-center">
                    <img
                      title={user?.displayName}
                      className="w-10 object-cover h-10 border-2 border-cyan-300 rounded-full"
                      src={user?.photoURL}
                      alt="User"
                    />
                    <p className="text-lg font-medium text-white">
                      {user?.displayName}
                    </p>
                  </div>
                ) : (
                  <FaUserCircle className="text-4xl text-white" />
                )}
              </div>
              {/* Notification Icon */}
              <div className="relative notification-icon">
                <FaBell
                  className="text-2xl text-white cursor-pointer hover:text-cyan-300"
                  onClick={toggleNotificationPopup}
                />

                {/* Floating Notification Popup */}
                {isNotificationOpen && (
                  <div
                    ref={popupRef}
                    className="absolute right-0 top-10 bg-white text-black w-80 max-h-80 overflow-y-auto shadow-lg rounded-lg p-4"
                  >
                    <h3 className="font-bold text-lg mb-4">Notifications</h3>
                    {notifications.length > 0 ? (
                      notifications.map((notification, index) => (
                        <div key={index} className="border-b py-2">
                          <Link to={notification.actionRoute}>
                            <p className="font-medium">{notification.message}</p>
                          </Link>
                          <p className="text-sm text-gray-500">
                            {new Date(notification.time).toLocaleString()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>No notifications</p>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div>
                {user ? (
                  <img
                    title={user?.displayName}
                    className="w-10 h-10 object-cover border-2 border-cyan-300 rounded-full"
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
                  className="text-lg font-medium btn bg-transparent border-white text-white border-2 hover:bg-transparent hover:border-cyan-300 hover:text-cyan-300"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-lg font-medium btn bg-transparent border-white text-white border-2 hover:bg-transparent hover:border-cyan-300 hover:text-cyan-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-lg font-medium btn bg-transparent border-white text-white border-2 hover:bg-transparent hover:border-cyan-300 hover:text-cyan-300"
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
                className="flex items-center bg-cyan-300 hover:bg-gray-800 hover:text-white btn border-none text-lg rounded transition"
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
        className={`${menuOpen ? "block" : "hidden"
          } lg:hidden bg-cyan-800 text-white space-y-2 p-4`}
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
              <span className="font-semibold btn bg-cyan-300 border-none text-white text-xl">
                <FaUserTie /> {userInfo?.newRole || "User"}
              </span>
            </div>

            <NavLink className="block flex items-center space-x-2 text-lg text-white hover:text-white">
              {user ? (
                <div className="flex flex-col justify-center items-center">
                  <img
                    title={user?.displayName}
                    className="w-10 h-10 object-cover border-2 border-yellow-400 rounded-full"
                    src={user?.photoURL}
                    alt="User"
                  />
                  <p className="text-lg font-medium text-white">
                    {user?.displayName}
                  </p>
                </div>
              ) : (
                <FaUserCircle className="text-4xl text-white" />
              )}
            </NavLink>
            {/* Notification Icon for Mobile */}
            <div className="relative notification-icon">
              <FaBell
                className="text-2xl text-white cursor-pointer"
                onClick={toggleNotificationPopup}
              />

              {/* Floating Notification Popup */}
              {isNotificationOpen && (
                <div
                  ref={popupRef}
                  className="absolute right-0 top-10 bg-white text-black w-80 max-h-80 overflow-y-auto shadow-lg rounded-lg p-4"
                >
                  <h3 className="font-bold text-lg mb-4">Notifications</h3>
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <div key={index} className="border-b py-2">
                        <p className="font-medium">{notification.message}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(notification.time).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No notifications</p>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to="/"     className={({ isActive }) => 
              isActive
                ? "font-medium underline text-white block" // Active state styles
                : "text-white block" // Default state styles
            }>
              Home
            </NavLink>
            <Link
              onClick={() => navigate(getDashboardHomeRoute())}
              className={({ isActive }) => 
                isActive
                  ? "font-medium underline text-white block" // Active state styles
                  : "text-white block" // Default state styles
              }
            >
              Dashboard
            </Link>
            <NavLink to="/services"     className={({ isActive }) => 
              isActive
                ? "font-medium underline text-white block" // Active state styles
                : "text-white block" // Default state styles
            }>
              Services
            </NavLink>
            {user ? (
              <>
              <NavLink to="/tasks" 
                  className={({ isActive }) => 
                    isActive
                      ? "font-medium underline text-white block" // Active state styles
                      : "text-white block" // Default state styles
                  }
              >
              Tasks
            </NavLink>
            <NavLink to="/payments"
                className={({ isActive }) => 
                  isActive
                    ? "font-medium underline text-white block" // Active state styles
                    : "text-white block" // Default state styles
                }
            >
             Payments
            </NavLink>
              <div className="block text-lg flex space-x-2 items-center bg-white py-2 px-3 w-[120px] rounded-lg text-black font-medium">
                <img className="w-8" src={coinIcon} alt="Coin Icon" />
                <span className="text-2xl font-semibold">
                  {userInfo?.coins || 0}
                </span>
              </div>
              </>
            ) : (
              ""
            )}
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
                className="text-lg font-medium btn bg-transparent border-white text-white border-2 hover:bg-transparent hover:border-cyan-300 hover:text-cyan-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-lg font-medium btn bg-transparent border-white text-white border-2 hover:bg-transparent hover:border-cyan-300 hover:text-cyan-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-4 text-lg font-medium btn bg-transparent border-white text-white border-2 hover:bg-transparent hover:border-cyan-300 hover:text-cyan-300"
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
              className="flex items-center bg-cyan-300 hover:bg-gray-800 hover:text-white btn border-none text-lg rounded transition"
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