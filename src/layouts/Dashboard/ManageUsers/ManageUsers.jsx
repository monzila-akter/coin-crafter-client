import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        }
    });

    // State to store selected roles
    const [selectedRoles, setSelectedRoles] = useState({});

    // Handle dropdown role selection
    const handleRoleChange = (userId, role) => {
        setSelectedRoles((prev) => ({ ...prev, [userId]: role }));
    };

    // Handle role update
    const handleRoleUpdate = (userId, name) => {
        const newRole = selectedRoles[userId];
        if (!newRole) {
            Swal.fire("No changes made", "Please select a role before updating.", "info");
            return;
        }

        axiosSecure.patch(`/users/role/${userId}`, { newRole })
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${name} is now a ${newRole}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                    // Reset the selected role for this user
                    setSelectedRoles((prev) => ({ ...prev, [userId]: null }));
                }
            });
    };

    // Handle user deletion
    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire("Deleted!", `${user.name} has been deleted.`, "success");
                        }
                    });
            }
        });
    };

    return (
        <div className='w-full px-5 md:px-10 py-16 lg:px-14'>
            <h2 className='text-4xl font-bold text-indigo-500 text-center mb-14'>Manage All Users</h2>
            <div className='bg-indigo-50 rounded-lg px-5 py-5 md:py-14 md:px-10'>
                <h2 className='text-3xl font-semibold mb-6'>Total Users: {users.length}</h2>
                <div className="overflow-x-auto rounded-t-3xl">
                    <table className="table">
                        {/* Table Head */}
                        <thead className='bg-indigo-500'>
                            <tr className='text-lg text-white'>
                                <th>Sr.</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Coin</th>
                                <th>Role</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Table Body */}
                            {users.map((user, idx) => (
                                <tr key={user._id}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        <img
                                            className='w-12 h-12 rounded-2xl object-cover border-2 border-indigo-600'
                                            src={user.photo}
                                            alt={user.name}
                                        />
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>${user.coins}</td>
                                    <td>{user.newRole}</td>
                                    {/* Update User Role */}
                                    <td className='flex items-center gap-2'>
                                        <select
                                            className="select select-bordered w-full max-w-xs"
                                            defaultValue={user.newRole}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        >
                                            <option disabled value={user.newRole}>
                                                {user.newRole}
                                            </option>
                                            <option value="Admin">Admin</option>
                                            <option value="Buyer">Buyer</option>
                                            <option value="Worker">Worker</option>
                                        </select>
                                        <button
                                            onClick={() => handleRoleUpdate(user._id, user.name)}
                                            className='btn bg-yellow-500 text-xl'
                                        >
                                            <FaEdit />
                                        </button>
                                    </td>
                                    {/* Delete User */}
                                    <td>
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className='btn text-xl text-white bg-red-600'
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

export default ManageUsers;
