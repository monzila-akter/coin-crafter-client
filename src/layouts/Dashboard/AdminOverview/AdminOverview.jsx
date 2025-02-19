import { useQuery } from "@tanstack/react-query";

import { Helmet } from "react-helmet-async";
import { FaUsersGear, FaCoins, FaDollarSign, FaUserShield } from "react-icons/fa6";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch Admin Stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const response = await axiosSecure.get("/admin/stats");
      return response.data;
    },
  });

  // Fetch Withdrawal Requests
  const { data: withdrawals, isLoading: withdrawalsLoading } = useQuery({
    queryKey: ["withdrawals"],
    queryFn: async () => {
      const response = await axiosSecure.get("/admin/withdrawals");
      return response.data;
    },
  });

  if (statsLoading || withdrawalsLoading) {
    return <div className="text-center text-2xl font-bold text-cyan-700 flex justify-center items-center">Loading...</div>;
  }

  // Data for Bar Chart (Admin Stats)
  const barData = [
    { name: "Total Workers", value: stats.totalWorkers },
    { name: "Total Buyers", value: stats.totalBuyers },
    { name: "Total Coins", value: stats.totalCoins },
    { name: "Total Payments", value: stats.totalPayments },
  ];

  // Data for Pie Chart (Withdrawals)
  const approvedWithdrawals = withdrawals?.filter((w) => w.status === "approved").length;
  const pendingWithdrawals = withdrawals?.filter((w) => w.status === "pending").length;
  const pieData = [
    { name: "Approved", value: approvedWithdrawals },
    { name: "Pending", value: pendingWithdrawals },
  ];
  const COLORS = ["#0088FE", "#FFBB28"];

  return (
    <div className="w-full py-14 px-5 lg:px-14">
      <Helmet>
        <title>CoinCrafter | Dashboard | Admin Overview</title>
      </Helmet>
      <h2 className="text-4xl font-bold text-cyan-700 text-center mb-10">Admin Dashboard Overview</h2>

      {/* Bar Chart for Admin Stats */}
      <div className="bg-white shadow-lg p-5 rounded-lg mb-10">
        <h3 className="text-2xl font-semibold text-cyan-700 text-center mb-5">Admin Statistics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart for Withdrawal Requests */}
      <div className="bg-white shadow-lg p-5 rounded-lg">
        <h3 className="text-2xl font-semibold text-cyan-700 text-center mb-5">Withdrawal Requests Status</h3>
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

export default AdminOverview;
