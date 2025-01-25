import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ManageTasks = () => {
    const { user } = useContext(AuthContext); // Access user information
    const axiosSecure = useAxiosSecure(); // Hook for secure API requests

    // Fetch all tasks
    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['all-tasks'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tasks'); // Fetch all tasks for admin
            return res.data;
        },
    });

    // Handle delete task functionality
   const handleDelete = async (taskId, requiredWorkers, payableAmount) => {
           const confirmDelete = await Swal.fire({
               title: 'Are you sure?',
               text: 'This action will permanently delete the task!',
               icon: 'warning',
               showCancelButton: true,
               confirmButtonText: 'Yes, delete it!',
               cancelButtonText: 'Cancel',
           });
   
           if (confirmDelete.isConfirmed) {
               try {
                   const response = await axiosSecure.delete(`/admin/tasks/${taskId}`);
   
                   if (response.status === 200) {
                       const refillAmount = requiredWorkers * payableAmount;
                       Swal.fire({
                           title: 'Deleted!',
                           text: "Task has been successfully deleted and coins have been refunded.",
                           icon: 'success',
                       });
   
                       refetch(); // Refetch tasks to update the list
                   }
               } catch (error) {
                   Swal.fire('Error', 'Failed to delete task', 'error');
                   console.error(error);
               }
           }
       };

    return (
        <div className="w-full py-16 px-5 lg:px-14">
            <Helmet>
                <title>CoinCrafter | Dashboard | Manage Tasks</title>
            </Helmet>
            <h2 className="text-4xl font-bold text-cyan-700 text-center mb-12">Manage All Tasks</h2>
            <div className="bg-cyan-50 rounded-lg px-5 py-5 md:py-14 md:px-10">
                <h2 className="text-3xl font-semibold mb-6">Total Tasks: {tasks?.length}</h2>
                <div className="overflow-x-auto rounded-t-3xl">
                    <table className="table">
                        {/* Table Head */}
                        <thead className="bg-cyan-700">
                            <tr className="text-lg text-white">
                                <th>Sr.</th>
                                <th>Email</th>
                                <th>Task Title</th>
                                <th>Required Workers</th>
                                <th>Total Payable</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Table Body */}
                            {tasks?.map((task, idx) => (
                                <tr key={task._id}>
                                    <td>{idx + 1}</td>
                                    <td>{task.created_by}</td>
                                    <td>{task.task_title}</td>
                                    <td>{task.required_workers}</td>
                                    <td>{task.total_payable}</td>
                                    <td>
                                        <button
                                             onClick={() => handleDelete(task._id, task.required_workers, task.total_payable)} 
                                            className="text-xl text-white bg-red-600 btn"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageTasks;
