import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaTasks } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useUsers from "../../../Hooks/useUsers";

const image_hosting_key = import.meta.env.VITE_Image_Hosting_Key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddNewTask = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecurePublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {userInfo, refetch} = useUsers();

  const onSubmit = async (data) => {
    if (!user || !user.email) {
      Swal.fire({
        icon: "error",
        title: "User Not Logged In",
        text: "Please log in to create a task.",
      });
      return;
    }

    // Convert required_workers and payable_amount to numbers
    const requiredWorkers = Number(data.required_workers);
    const payableAmount = Number(data.payable_amount);

    // Recalculate total payable using converted values
    const totalPayable = requiredWorkers * payableAmount;

    if (!userInfo || !userInfo.coins || totalPayable > userInfo.coins) {
      Swal.fire({
        icon: "error",
        title: "Insufficient Coins",
        text: "You don't have enough coins. Please purchase more.",
      });
      navigate("/dashboard/purchaseCoin");
      return;
    }

    // Upload image to ImageBB
    const imageFile = { image: data.task_image[0] };
    const imgResponse = await axiosSecurePublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (imgResponse.data.success) {
      const taskData = {
        task_title: data.task_title,
        task_detail: data.task_detail,
        required_workers: requiredWorkers,
        payable_amount: payableAmount,
        completion_date: data.completion_date,
        submission_info: data.submission_info,
        task_image_url: imgResponse.data.data.display_url,
        total_payable: totalPayable,
        created_by: user.email, // Use email from AuthContext
      };

      // Save task to the backend
      const taskResponse = await axiosSecure.post("/tasks", taskData);
      if (taskResponse.data.insertedId) {
        refetch();
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.task_title} has been added`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="w-full pt-12">
        <Helmet>
            <title>CoinCrafter | Dashboard | AddNewTask</title>
        </Helmet>
      <h2 className="text-4xl font-bold text-cyan-700 text-center mb-10">
        Add New Task
      </h2>
      <div className="bg-cyan-50 px-5 lg:px-10 py-10 md:py-14 mx-6 md:mx-14 lg:mx-24 mb-24 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Task Title */}
          <label className="form-control mb-6">
            <span className="label-text text-xl font-semibold">Task Title*</span>
            <input
              {...register("task_title")}
              type="text"
              placeholder="Task Title"
              className="input input-bordered w-full"
              required
            />
          </label>

          {/* Task Detail */}
          <label className="form-control mb-6">
            <span className="label-text text-xl font-semibold">Task Detail*</span>
            <textarea
              {...register("task_detail")}
              className="textarea textarea-bordered h-24"
              placeholder="Describe the task"
              required
            ></textarea>
          </label>

          {/* Workers and Payable Amount */}
          <div className="flex flex-col md:flex-row gap-x-0 md:gap-x-6 ">
            <label className="form-control w-full mb-6">
              <span className="label-text text-xl font-semibold">
                Required Workers*
              </span>
              <input
                {...register("required_workers")}
                type="number"
                placeholder="Number of workers"
                className="input input-bordered w-full"
                required
              />
            </label>
            <label className="form-control w-full mb-6">
              <span className="label-text text-xl font-semibold">
                Payable Amount (per worker)*
              </span>
              <input
                {...register("payable_amount")}
                type="number"
                placeholder="Amount per worker"
                className="input input-bordered w-full"
                required
              />
            </label>
          </div>

          {/* Completion Date */}
          <label className="form-control mb-6">
            <span className="label-text text-xl font-semibold">
              Completion Date*
            </span>
            <input
              {...register("completion_date")}
              type="date"
              className="input input-bordered w-full"
              required
            />
          </label>

          {/* Submission Info */}
          <label className="form-control mb-6">
            <span className="label-text text-xl font-semibold">
              Submission Info*
            </span>
            <input
              {...register("submission_info")}
              type="text"
              placeholder="Instructions for submission"
              className="input input-bordered w-full"
              required
            />
          </label>

          {/* Task Image */}
          <div className="mb-6">
            <input
              {...register("task_image")}
              type="file"
              className="file-input w-full "
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full text-xl font-bold text-white bg-cyan-700 "
          >
            Add Task <FaTasks className="ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewTask;
