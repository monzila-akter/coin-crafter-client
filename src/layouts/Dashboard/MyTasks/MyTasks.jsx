import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const MyTasks = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['tasks-detail', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks/${user.email}`);
            console.log(res.data);
            return res.data;
        },
    });

    // State to manage task update modal visibility and form data
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState({
        _id: '',
        task_title: '',
        task_detail: '',
        submission_info: '',
    });

    const handleUpdateClick = (task) => {
        setSelectedTask({
            _id: task._id,
            task_title: task.task_title,
            task_detail: task.task_detail,
            submission_info: task.submission_info,
        });
        setIsModalOpen(true);
    };

    const handleUpdateSubmit = async () => {
        try {
            const { task_title, task_detail, submission_info, _id } = selectedTask;

            // Send the updated data to the backend
            const response = await axiosSecure.patch(`/tasks/${_id}`, {
                task_title,
                task_detail,
                submission_info,
            });

            // If the update is successful, show a SweetAlert success message
            if (response.status === 200) {
                Swal.fire('Updated!', 'Task has been successfully updated.', 'success');
                setIsModalOpen(false);
                refetch(); // Refetch tasks to update the list
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to update task', 'error');
            console.error(error);
        }
    };

    // handle delete function
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
                const response = await axiosSecure.delete(`/tasks/${taskId}`);

                if (response.status === 200) {
                    const refillAmount = requiredWorkers * payableAmount;
                    Swal.fire({
                        title: 'Deleted!',
                        text: `Task has been successfully deleted. ${refillAmount} coins have been refunded.`,
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
                <title>CoinCrafter | Dashboard | MyTasks</title>
            </Helmet>
            <h2 className="text-4xl font-bold text-indigo-500 text-center mb-12">My Tasks</h2>
            <div className="bg-indigo-50 rounded-lg px-5 py-5 md:py-14 md:px-10">
                <h2 className="text-3xl font-semibold mb-6">Total Tasks: {tasks?.length}</h2>
                <div className="overflow-x-auto rounded-t-3xl">
                    <table className="table">
                        {/* Table Head */}
                        <thead className="bg-indigo-500">
                            <tr className="text-lg text-white">
                                <th>Sr.</th>
                                <th>Email</th>
                                <th>Task Title</th>
                                <th>Required Worker</th>
                                <th>Total Payable</th>
                                <th>Update</th>
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
                                            className="text-xl btn bg-yellow-500"
                                            onClick={() => handleUpdateClick(task)}
                                        >
                                            <FaEdit />
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(task._id, task.required_workers, task.total_payable)} // Pass required values
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

            {/* Modal for task update */}
            {isModalOpen && (
                <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg w-1/2">
                        <h2 className="text-2xl font-semibold mb-6">Update Task</h2>
                        <div>
                            <label className="block mb-2">Task Title</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={selectedTask.task_title}
                                onChange={(e) => setSelectedTask({ ...selectedTask, task_title: e.target.value })}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-2">Task Detail</label>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={selectedTask.task_detail}
                                onChange={(e) => setSelectedTask({ ...selectedTask, task_detail: e.target.value })}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-2">Submission Info</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={selectedTask.submission_info}
                                onChange={(e) => setSelectedTask({ ...selectedTask, submission_info: e.target.value })}
                            />
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                className="btn bg-indigo-500 text-white px-4 py-2 rounded-md"
                                onClick={handleUpdateSubmit}
                            >
                                Update
                            </button>
                            <button
                                className="ml-4 btn bg-gray-500 text-white px-4 py-2 rounded-md"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTasks;
