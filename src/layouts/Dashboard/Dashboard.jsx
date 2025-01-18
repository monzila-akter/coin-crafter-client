import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../../components/Shared/Navbar/Navbar';
import Footer from '../../components/Shared/Footer/Footer';
import { FaAddressBook, FaClipboardCheck, FaFileInvoiceDollar, FaHandHoldingUsd, FaHome, FaList, FaPiggyBank, FaShoppingCart, FaTasks, FaUsers } from 'react-icons/fa';
import { FaFolderPlus, FaListCheck } from 'react-icons/fa6';
import useUserRole from '../../Hooks/useUserRole';
import { div } from 'framer-motion/client';


const Dashboard = () => {

    const {role, isLoading} = useUserRole();

    if(isLoading) {
        <div className="min-h-screen flex justify-center items-center">
            <span className="loading loading-spinner text-info"></span>
            </div>
    }


    return (
        <div>
            <Navbar></Navbar>
            <div className='w-full flex'>
                {/* side bar here */}
            <div className='w-96 px-5 py-14 bg-yellow-500 min-h-screen flex justify-center'>
                
               <ul>
                {/* Worker routes */}
                {
                  role === "Worker" && <>
                  <NavLink className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3" to="/dashboard/workerHome"><FaHome className='text-2xl'></FaHome> Worker Home</NavLink>
                <NavLink className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3" to="/dashboard/taskList"><FaList className='text-2xl'></FaList> Task List</NavLink>
                <NavLink className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3" to="/dashboard/mySubmissions"><FaFolderPlus className='text-2xl'></FaFolderPlus> My Submissions</NavLink>
                <NavLink className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3" to="/dashboard/withdrawals"><FaHandHoldingUsd className='text-2xl'></FaHandHoldingUsd> Withdrawals</NavLink>
                  </>
                }


                 {/* Buyer routes */}
               
              {
                role === "Buyer" && <>
                 <NavLink className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3" to="/dashboard/buyerHome"><FaHome className='text-2xl'></FaHome> Buyer Home</NavLink>
               <NavLink className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3" to="/dashboard/addNewTask"><FaClipboardCheck className='text-2xl'></FaClipboardCheck> Add New Task</NavLink>
               <NavLink className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3" to="/dashboard/myTasks"><FaListCheck className='text-2xl'></FaListCheck> My Task's</NavLink>
               <NavLink className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3" to="/dashboard/purchaseCoin"><FaShoppingCart className='text-2xl'></FaShoppingCart> Purchase Coin</NavLink>
               <NavLink className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3" to="/dashboard/paymentHistory"><FaFileInvoiceDollar className='text-2xl'></FaFileInvoiceDollar> Payment History</NavLink>
                </>
              }

               {/* Admin route start */}
              {
                role === "Admin" && <>
                 <NavLink className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3" to="/dashboard/adminHome"><FaHome className='text-2xl'></FaHome> Admin Home</NavLink>
               <NavLink className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3" to="/dashboard/manageUsers"><FaUsers className='text-2xl'></FaUsers>Manage Users</NavLink>
               <NavLink className="text-xl font-semibold text-indigo-600 mb-6 flex items-center gap-3" to="/dashboard/manageTask"><FaTasks className='text-2xl'></FaTasks>Manage Task</NavLink>
                </>
              }
               </ul>
              

            </div>
            {/* content here */}
            <div className='w-full flex justify-center'>
                <Outlet></Outlet>
            </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;