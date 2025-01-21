import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const TaskDetails = () => {
  const { id } = useParams(); // Task ID from route params
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext); // Authenticated user details
  const navigate = useNavigate();
  

  // Fetch task details
  const { data: task, isLoading, error } = useQuery({
    queryKey: ["taskDetails", id], 
    queryFn: async () => {
        const res = await axiosSecure.get(`/workersTask/${id}`);
        return res.data;
      }
  });

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submission_details = e.target.submission_details.value;

    const submissionData = {
      task_id: task._id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      worker_email: user.email,
      worker_name: user.displayName,
      buyer_name: task.buyer_name,
      buyer_email: task.created_by,
      submission_details,
    };

    try {
      const res = await axiosSecure.post("/submissions", submissionData);
      if (res.status === 201) {
        Swal.fire({
            title: "Form submitted successfully!",
            icon: "success",
            draggable: true
          });
          navigate("/dashboard/mySubmissions")

        e.target.reset();
      }
    } catch (error) {
      console.error("Error submitting task:", error);
      toast.error("Failed to save submission. Try again.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading task details!</div>;

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{task.task_title}</h1>
      <img src={task.task_image_url} alt="" />
      <p className="mb-2">
        <strong>Details:</strong> {task.task_detail}
      </p>
      <p className="mb-2">
        <strong>Payable Amount:</strong> ${task.payable_amount}
      </p>
      <p className="mb-2">
        <strong>Buyer:</strong> {task.buyer_name} ({task.created_by})
      </p>

      <form onSubmit={handleSubmit} className="mt-6">
        <label className="block text-lg font-medium mb-2">
          Submission Details
        </label>
        <textarea
          name="submission_details"
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your submission details..."
          required
        ></textarea>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TaskDetails;
