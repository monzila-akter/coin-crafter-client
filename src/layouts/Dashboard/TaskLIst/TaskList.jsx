import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom'; // For navigation
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../provider/AuthProvider';
import { Helmet } from 'react-helmet-async';

const TaskList = () => {
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

  console.log('tasks', tasks);
  



  return (
    <div className=" w-full py-14 px-5 lg:px-14 ">
        <Helmet>
            <title>CoinCrafter | Dashboard | TaskList</title>
        </Helmet>
      <h2 className="text-4xl font-bold mb-10 text-center text-indigo-500">Available Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div key={task._id} className="task-card bg-indigo-50 p-4 rounded-lg shadow-lg transition hover:scale-105">
            <img className='w-full h-[150px] object-cover mb-6 rounded-lg' src={task.task_image_url} alt="" />
            <h3 className="text-xl font-bold text-indigo-500">{task.task_title}</h3>
            <p className="text-gray-600 mt-2"><strong>Buyer:</strong> {task.buyer_name}</p>
            <p className="text-gray-600 mt-1"><strong>Completion Date:</strong> {new Date(task.completion_date).toLocaleDateString()}</p>
            <p className="text-gray-600 mt-1"><strong>Payable Amount(Coin):</strong> {task.payable_amount}</p>
            <p className="text-gray-600 mt-1"><strong>Required Workers:</strong> {task.required_workers}</p>
           <Link to={`/dashboard/taskDetails/${task._id}`}>
           <button
              className="mt-4 bg-indigo-500 text-lg font-semibold text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-200"
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

export default TaskList;
