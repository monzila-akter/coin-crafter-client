import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTasks,  FaCoins } from "react-icons/fa";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Bar,
    CartesianGrid,
    Legend,
} from "recharts";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaClockRotateLeft } from "react-icons/fa6";


const COLORS = ["#0088FE", "#FF8042", "#00C49F"]; // Colors for Pie Chart

const BuyerOverview = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    // Fetch buyer stats
    const { data: stats = {}, isLoading: statsLoading } = useQuery({
        queryKey: ["buyerStats"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/buyer-home?email=${user.email}`);
            return res.data;
        },
    });

    if (statsLoading) return <div className="text-center text-lg text-indigo-500">Loading...</div>;

    // Data for Pie Chart
    const pieData = [
        { name: "Total Tasks", value: stats.totalTaskCount },
        { name: "Pending Tasks", value: stats.pendingTask },
        { name: "Total Paid", value: stats.totalPaymentPaid },
    ];

    // Data for Bar Chart
    const barData = [
        { name: "Tasks", Total: stats.totalTaskCount, Pending: stats.pendingTask },
    ];

    return (
        <div className="w-full px-6 md:px-10 lg:px-14 py-14">
            <Helmet>
                <title>CoinCrafter | Dashboard | Buyer Overview</title>
            </Helmet>
            <h2 className="text-4xl font-bold text-cyan-700 text-center mb-10">Buyer Overview</h2>

           

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Pie Chart */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-center text-cyan-700 mb-4">Task Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-center text-cyan-700 mb-4">Task Summary</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Total" fill="#0088FE" />
                            <Bar dataKey="Pending" fill="#FF8042" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default BuyerOverview;
