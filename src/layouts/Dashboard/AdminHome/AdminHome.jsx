import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


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
            alert(response.data.message);
            refetch(); // Refresh data
        } catch (error) {
            alert(error.response?.data?.message || "Failed to approve withdrawal.");
        }
    };

    if (statsLoading || withdrawalsLoading) return <div>Loading...</div>;

    return (
        <div className="p-6 space-y-6">
            {/* Admin Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 bg-blue-100 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-blue-600">Total Workers</h3>
                    <p className="text-2xl">{stats.totalWorkers}</p>
                </div>
                <div className="p-4 bg-green-100 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-green-600">Total Buyers</h3>
                    <p className="text-2xl">{stats.totalBuyers}</p>
                </div>
                <div className="p-4 bg-yellow-100 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-yellow-600">Total Coins</h3>
                    <p className="text-2xl">{stats.totalCoins}</p>
                </div>
                <div className="p-4 bg-red-100 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-red-600">Total Payments</h3>
                    <p className="text-2xl">{stats.totalPayments.toFixed(2)}</p>
                </div>
            </div>

            {/* Withdrawal Requests Table */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Withdrawal Requests</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full table-zebra">
                        <thead>
                            <tr className="text-white bg-blue-500">
                                <th className="p-3">#</th>
                                <th className="p-3">User Email</th>
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
                                                className="px-4 py-2 bg-green-500 text-white rounded shadow-md hover:bg-green-600"
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
    );
};

export default AdminHome;
