import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";  // Importing motion from Framer Motion
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const BestWorkers = () => {
  const axiosSecurePublic = useAxiosPublic();

  const { data: workers = [], isLoading, error } = useQuery({
    queryKey: ["top-workers"],
    queryFn: async () => {
      const res = await axiosSecurePublic.get("/workers/top");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="w-full justify-center items-center"><p className="text-center text-cyan-800 font-bold text-lg">Loading...</p></div>;
  }

  if (error) {
    return (
      <p className="text-center text-lg text-red-500">
        Failed to load top workers.
      </p>
    );
  }

  return (
    <div className="w-full container mx-auto px-5 md:px-10 lg:px-14 mb-10 md:mb-24">
      <h2 className="text-4xl font-bold text-center text-cyan-800 mb-8">
        Best Workers
      </h2>

      {/* Grid Container with Framer Motion Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workers?.map((worker) => (
          <motion.div
            key={worker?.email}
            className="bg-cyan-50 shadow-md rounded-lg p-6 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}  // Start with opacity 0 and slightly below
            animate={{ opacity: 1, y: 0 }}   // Animate to full opacity and original position
            transition={{ duration: 0.5, ease: "easeInOut" }} // Set animation duration
          >
            <img
              src={worker?.photo}
              alt={worker.name}
              className="w-24 h-24 object-cover rounded-full mb-6"
            />
            <h3 className="text-xl font-semibold mb-2">{worker.name}</h3>
            <p className="text-gray-600 mb-2">Email: {worker.email}</p>
            <p className="text-cyan-800 font-bold">
              Coins: {worker.coins.toLocaleString()}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BestWorkers;
