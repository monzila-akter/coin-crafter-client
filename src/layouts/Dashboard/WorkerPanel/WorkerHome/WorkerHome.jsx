import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../provider/AuthProvider";


const WorkerHome = () => {
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
      const response = await axiosSecure.get(
        `/worker/approved-submissions?email=${user.email}`
      );
      return response.data;
    },
  });

  if (statsLoading || submissionsLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Worker Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-blue-100 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-blue-600">Total Submissions</h3>
          <p className="text-2xl">{stats.totalSubmissions}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-yellow-600">
            Total Pending Submissions
          </h3>
          <p className="text-2xl">{stats.totalPendingSubmissions}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-green-600">Total Earnings</h3>
          <p className="text-2xl">${stats.totalEarnings.toFixed(2)}</p>
        </div>
      </div>

      {/* Approved Submissions Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Approved Submissions</h2>
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr className="text-white bg-blue-500">
                <th className="p-3">#</th>
                <th className="p-3">Task Title</th>
                <th className="p-3">Payable Amount</th>
                <th className="p-3">Buyer Name</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {approvedSubmissions?.map((submission, index) => (
                <tr key={submission._id}>
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{submission.task_title}</td>
                  <td className="p-3">${submission.payable_amount}</td>
                  <td className="p-3">{submission.buyer_name}</td>
                  <td className="p-3">{submission.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkerHome;
