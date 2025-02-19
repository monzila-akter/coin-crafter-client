import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom'; // For navigation
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../provider/AuthProvider';


const AvailableTasks = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);


  // Fetch available tasks using TanStack Query
  const { data: tasks = [] } = useQuery({
    queryKey: ['task-data', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get('/tasks/worker');
      return res.data;
    },
  });


  



  return (
    <div className=" container mx-auto px-5 md:px-10 lg:px-14 mb-10 md:mb-24 ">
      <h2 className="text-4xl font-bold mb-4 text-center text-cyan-800">Available Tasks</h2>
      <p className='text-base text-gray-400 font-medium text-center mb-10'>Show all of our Available tasks in details here</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tasks.map((task) => (
          <div key={task._id} className="task-card bg-cyan-50 p-4 rounded-lg shadow-lg transition hover:scale-105">
            <img className='w-full h-[150px] object-cover mb-6 rounded-lg' src={task.task_image_url} alt="" />
            <h3 className="text-xl font-bold text-cyan-700">{task.task_title}</h3>
            <p className="text-gray-600 mt-2"><strong>Buyer:</strong> {task.buyer_name}</p>
            <p className="text-gray-600 mt-1"><strong>Completion Date:</strong> {new Date(task.completion_date).toLocaleDateString()}</p>
            <p className="text-gray-600 mt-1"><strong>Payable Amount(Coin):</strong> {task.payable_amount}</p>
            <p className="text-gray-600 mt-1"><strong>Required Workers:</strong> {task.required_workers}</p>
           <Link to={`/Details/${task._id}`}>
           <button
              className="mt-4 bg-cyan-700 text-lg font-semibold text-white py-2 px-4 rounded-md hover:bg-cyan-800 transition duration-200"
            >
              View Details
            </button>
           </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableTasks;
