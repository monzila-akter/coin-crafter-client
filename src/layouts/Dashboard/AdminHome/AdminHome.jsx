import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { FaUsersGear } from "react-icons/fa6";
import { FaCoins, FaDollarSign, FaUserShield } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


const AdminHome = () => {

    const axiosSecure = useAxiosSecure();

    const { data: stats, isLoading: statsLoading } = useQuery({
        queryKey: ["adminStats"],
        queryFn: async () => {
            const response = await axiosSecure.get("/admin/stats");
            return response.data;
        }
    });

    const { data: withdrawals, isLoading: withdrawalsLoading, refetch } = useQuery({
        queryKey: ["withdrawals"],
        queryFn: async () => {
            const response = await axiosSecure.get("/admin/withdrawals");
            return response.data;
        }
    });

    const handleApprove = async (id) => {
        try {
            const response = await axiosSecure.patch(`/approval/withdrawals/${id}`);
            Swal.fire({
                title: (response.data.message),
                icon: "success",
                draggable: true
              });
            refetch(); // Refresh data
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to approve withdrawal.");
        }
    };

    if (statsLoading || withdrawalsLoading) return <div>Loading...</div>;

    return (
        <div className="w-full px-5 md:px-10 lg:px-14 py-14">
            <Helmet>
                <title>CoinCrafter | Dashboard | Home</title>
            </Helmet>
            <h2 className="text-4xl font-bold text-cyan-700 text-center mb-10">STATES</h2>
            {/* Admin Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-5 flex justify-center items-center bg-cyan-100 rounded-lg shadow-lg space-x-6">
                    <div className="text-3xl text-cyan-700">
                     <FaUsersGear></FaUsersGear>
                    </div>
                   <div className="">
                   <h3 className="text-xl font-bold text-cyan-700">Total Workers</h3>
                   <p className="text-2xl font-bold text-center text-cyan-700">{stats.totalWorkers}</p>
                   </div>
                </div>

                <div className="p-5 flex justify-center items-center bg-green-100 rounded-lg shadow-lg space-x-6">
                <div className="text-3xl text-green-500">
                     <FaUserShield></FaUserShield>
                    </div>
                    <div>
                    <h3 className="text-xl font-bold text-green-500">Total Buyers</h3>
                    <p className="text-2xl font-bold text-center text-green-500">{stats.totalBuyers}</p>
                    </div>
                </div>
                <div className="p-5 flex justify-center items-center bg-yellow-100 rounded-lg shadow-lg space-x-6">
                <div className="text-3xl text-yellow-500">
                     <FaCoins></FaCoins>
                    </div>
                    <div>
                    <h3 className="text-xl font-bold text-yellow-500">Total Coins</h3>
                    <p className="text-2xl font-bold text-center text-yellow-500">{stats.totalCoins}</p>
                    </div>
                </div>
                <div className="p-5 flex justify-center items-center bg-red-100 rounded-lg shadow-lg space-x-6">
                <div className="text-3xl text-red-500">
                     <FaDollarSign></FaDollarSign>
                    </div>
                    <div>
                    <h3 className="text-xl font-bold text-red-500">Total Payments</h3>
                    <p className="text-2xl font-bold text-center text-red-500">{stats.totalPayments.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            {/* Withdrawal Requests Table */}
            <div className="">
                <h2 className="text-4xl font-bold text-center text-cyan-700 my-10">Withdrawal Requests</h2>
                <div className="bg-indigo-50 px-5 lg:px-14 py-10 rounded-lg">
                <div className="overflow-x-auto rounded-t-3xl">
                    <table className="table">
                        <thead>
                            <tr className="text-white text-lg font-medium bg-cyan-700">
                                <th className="p-3">Sr.</th>
                                <th className="p-3">User Info</th>
                                <th className="p-3">Amount</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {withdrawals?.map((withdrawal, index) => (
                                <tr key={withdrawal._id}>
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">
                                        <p>{withdrawal.worker_name}</p>
                                        <p>{withdrawal.worker_email}</p>
                                    </td>
                                    <td className="p-3">
                                        ${withdrawal.withdrawal_amount}
                                    </td>
                                    <td className="p-3">{withdrawal.status}</td>
                                    <td className="p-3">
                                        {withdrawal.status === "pending" && (
                                            <button
                                                className="px-4 py-2 bg-green-600 text-white rounded shadow-md hover:bg-green-700"
                                                onClick={() => handleApprove(withdrawal._id)}
                                            >
                                                Approve
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
