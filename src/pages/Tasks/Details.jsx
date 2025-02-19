import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { div } from "framer-motion/client";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";

const Details = () => {
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

  if (isLoading) return <div className="text-xl font-bold text-indigo-500 text-center">Loading...</div>;
  if (error) return <div>Error loading task details!</div>;

  return (
    <div className="mt-32 container mx-auto px-5 md:px-10 lg:px-14">
        <div className="w-full mb-14 px-5 md:px-10 lg:px-14">
        <Helmet>
            <title>CoinCrafter | Dashboard | TaskDetails</title>
        </Helmet>
        <h2 className="text-4xl font-bold text-cyan-700 text-center mb-10">Task Details</h2>
        <div className="bg-cyan-50 py-10 px-5 md:px-10 lg:px-14 rounded-lg">
      <h1 className="text-2xl text-cyan-700 font-bold mb-4">{task.task_title}</h1>
      <img className="w-full h-[200px] md:h-[300px] lg:h-[400px] object-cover mb-6 rounded-lg" src={task.task_image_url} alt="" />
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
          className="mt-4 w-full bg-cyan-700 text-white text-lg font-semibold btn"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default Details;
