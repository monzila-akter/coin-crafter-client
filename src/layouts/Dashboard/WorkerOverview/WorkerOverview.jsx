import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import { Helmet } from "react-helmet-async";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";

const WorkerOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  // Fetch worker stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["workerStats", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/worker/stats?email=${user.email}`);
      return response.data;
    },
  });

  // Fetch approved submissions
  const { data: approvedSubmissions, isLoading: submissionsLoading } = useQuery({
    queryKey: ["approvedSubmissions", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/worker/approved-submissions?email=${user.email}`);
      return response.data;
    },
  });

  if (statsLoading || submissionsLoading) {
    return <div className="text-center text-2xl font-bold text-cyan-700 flex justify-center items-center">Loading...</div>;
  }

  // Data for Bar Chart
  const barData = [
    { name: "Total Submissions", value: stats.totalSubmissions },
    { name: "Pending Submissions", value: stats.totalPendingSubmissions },
    { name: "Total Earnings", value: stats.totalEarnings },
  ];

  // Data for Pie Chart
  const pieData = [
    { name: "Approved", value: approvedSubmissions.length },
    { name: "Pending", value: stats.totalPendingSubmissions },
  ];

  const COLORS = ["#0088FE", "#FFBB28"];

  return (
    <div className="w-full py-14 px-5 lg:px-14">
      <Helmet>
        <title>CoinCrafter | Dashboard | Overview</title>
      </Helmet>
      <h2 className="text-4xl font-bold text-cyan-700 text-center mb-10">Dashboard Overview</h2>

      {/* Bar Chart */}
      <div className="bg-white shadow-lg p-5 rounded-lg mb-10">
        <h3 className="text-2xl font-semibold text-cyan-700 text-center mb-5">Task Statistics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white shadow-lg p-5 rounded-lg">
        <h3 className="text-2xl font-semibold text-cyan-700 text-center mb-5">Submission Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WorkerOverview;
