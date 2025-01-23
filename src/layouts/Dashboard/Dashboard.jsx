import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../../components/Shared/Navbar/Navbar';
import Footer from '../../components/Shared/Footer/Footer';
import {
  FaBars,
  FaTimes,
  FaClipboardCheck,
  FaFileInvoiceDollar,
  FaHandHoldingUsd,
  FaHome,
  FaList,
  FaShoppingCart,
  FaTasks,
  FaUsers,
} from 'react-icons/fa';
import { FaFolderPlus, FaListCheck } from 'react-icons/fa6';
import useUserRole from '../../Hooks/useUserRole';

const Dashboard = () => {
  const { role, isLoading } = useUserRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {/* Hamburger menu for small and medium screens */}
     
      <div className="w-full flex min-h-screen">
      <button
        className="left-4 z-50 text-2xl lg:hidden"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 z-40 min-h-screen w-72 bg-yellow-500 p-5 transition-transform duration-300 ease-in-out transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:relative lg:translate-x-0 lg:w-96 lg:flex lg:justify-center`}
        >
            
          <ul>
            {/* Worker routes */}
            {role === 'Worker' && (
              <>
                <NavLink
                  className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3"
                  to="/dashboard/workerHome"
                >
                  <FaHome className="text-2xl" /> Worker Home
                </NavLink>
                <NavLink
                  className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3"
                  to="/dashboard/taskList"
                >
                  <FaList className="text-2xl" /> Task List
                </NavLink>
                <NavLink
                  className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3"
                  to="/dashboard/mySubmissions"
                >
                  <FaFolderPlus className="text-2xl" /> My Submissions
                </NavLink>
                <NavLink
                  className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3"
                  to="/dashboard/withdrawals"
                >
                  <FaHandHoldingUsd className="text-2xl" /> Withdrawals
                </NavLink>
              </>
            )}

            {/* Buyer routes */}
            {role === 'Buyer' && (
              <>
                <NavLink
                  className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3"
                  to="/dashboard/buyerHome"
                >
                  <FaHome className="text-2xl" /> Buyer Home
                </NavLink>
                <NavLink
                  className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3"
                  to="/dashboard/addNewTask"
                >
                  <FaClipboardCheck className="text-2xl" /> Add New Task
                </NavLink>
                <NavLink
                  className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3"
                  to="/dashboard/myTasks"
                >
                  <FaListCheck className="text-2xl" /> My Tasks
                </NavLink>
                <NavLink
                  className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3"
                  to="/dashboard/purchaseCoin"
                >
                  <FaShoppingCart className="text-2xl" /> Purchase Coin
                </NavLink>
                <NavLink
                  className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3"
                  to="/dashboard/paymentHistory"
                >
                  <FaFileInvoiceDollar className="text-2xl" /> Payment History
                </NavLink>
              </>
            )}

            {/* Admin routes */}
            {role === 'Admin' && (
              <>
                <NavLink
                  className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3"
                  to="/dashboard/adminHome"
                >
                  <FaHome className="text-2xl" /> Admin Home
                </NavLink>
                <NavLink
                  className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3"
                  to="/dashboard/manageUsers"
                >
                  <FaUsers className="text-2xl" /> Manage Users
                </NavLink>
                <NavLink
                  className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3"
                  to="/dashboard/manageTask"
                >
                  <FaTasks className="text-2xl" /> Manage Tasks
                </NavLink>
              </>
            )}
          </ul>
        </div>

        {/* Main content */}
        <div
          className="w-full flex justify-center transition-all duration-300 "
          onClick={() => isSidebarOpen && setIsSidebarOpen(false)} // Close sidebar when clicking outside
        >
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
