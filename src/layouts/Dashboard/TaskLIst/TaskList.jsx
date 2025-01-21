import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom'; // For navigation
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../provider/AuthProvider';

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



  return (
    <div className="task-list p-4">
      <h2 className="text-2xl font-semibold mb-4">Available Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div key={task._id} className="task-card bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-blue-500">{task.task_title}</h3>
            <p className="text-gray-600 mt-2">Buyer: {task.buyer_name}</p>
            <p className="text-gray-600 mt-1">Completion Date: {new Date(task.completion_date).toLocaleDateString()}</p>
            <p className="text-gray-600 mt-1">Payable Amount: ${task.payable_amount}</p>
            <p className="text-gray-600 mt-1">Required Workers: {task.required_workers}</p>
           <Link to={`/dashboard/taskDetails/${task._id}`}>
           <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
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
