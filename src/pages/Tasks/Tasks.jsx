import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom'; // For navigation
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';

const Tasks = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [sortOrder, setSortOrder] = useState('asc'); // State to manage sorting order

  // Fetch available tasks using TanStack Query
  const { data: tasks = [] } = useQuery({
    queryKey: ['task-data', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get('/tasks/worker');
      return res.data;
    },
  });

  // Function to handle sorting
  const handleSort = (order) => {
    setSortOrder(order);
  };

  // Sort tasks based on the selected order
  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.payable_amount - b.payable_amount;
    } else {
      return b.payable_amount - a.payable_amount;
    }
  });

  return (
    <div className="container mx-auto px-5 md:px-10 lg:px-14 mt-36">
      <Helmet>
        <title>CoinCrafter | Dashboard | TaskList</title>
      </Helmet>
      <h2 className="text-4xl font-bold mb-10 text-center text-cyan-700">All Tasks</h2>

      {/* Sorting buttons */}
      <div className="flex justify-center mb-10">
        <button
          onClick={() => handleSort('asc')}
          className={`mr-4 px-4 py-2 rounded-md ${
            sortOrder === 'asc' ? 'bg-cyan-700 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Sort by Ascending Price
        </button>
        <button
          onClick={() => handleSort('desc')}
          className={`px-4 py-2 rounded-md ${
            sortOrder === 'desc' ? 'bg-cyan-700 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Sort by Descending Price
        </button>
      </div>

      {/* Display tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedTasks.map((task) => (
          <div key={task._id} className="task-card bg-cyan-50 p-4 rounded-lg shadow-lg transition hover:scale-105">
            <img className="w-full h-[150px] object-cover mb-6 rounded-lg" src={task.task_image_url} alt="" />
            <h3 className="text-xl font-bold text-cyan-700">{task.task_title}</h3>
            <p className="text-gray-600 mt-2"><strong>Buyer:</strong> {task.buyer_name}</p>
            <p className="text-gray-600 mt-1"><strong>Completion Date:</strong> {new Date(task.completion_date).toLocaleDateString()}</p>
            <p className="text-gray-600 mt-1"><strong>Payable Amount(Coin):</strong> {task.payable_amount}</p>
            <p className="text-gray-600 mt-1"><strong>Required Workers:</strong> {task.required_workers}</p>
            <Link to={`/Details/${task._id}`}>
              <button className="mt-4 bg-cyan-700 text-lg font-semibold text-white py-2 px-4 rounded-md hover:bg-cyan-800 transition duration-200">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;