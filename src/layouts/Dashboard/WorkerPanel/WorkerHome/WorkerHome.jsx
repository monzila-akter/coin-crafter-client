import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../provider/AuthProvider";
import { FaCoins, FaFileImport } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";


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
    <div className=" w-full py-14 px-5 lg:px-14 ">
        <h2 className="text-4xl font-bold text-indigo-500 text-center mb-10">STATES</h2>
      {/* Worker Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-5 bg-indigo-200 rounded-lg flex items-center justify-center space-x-6">
            <div className="text-indigo-500 text-3xl">
                <FaFileImport></FaFileImport>
            </div>
          <div>
          <h3 className="text-2xl font-bold text-indigo-500 mb-4">Total Submissions</h3>
          <p className="text-2xl text-indigo-500 font-bold text-center">{stats.totalSubmissions}</p>
          </div>
        </div>
        <div className="p-5 bg-yellow-100 rounded-lg flex items-center justify-center space-x-6">
        <div className="text-yellow-500 text-3xl">
                <FaClockRotateLeft></FaClockRotateLeft>
            </div>
          <div>
          <h3 className="text-2xl font-bold text-yellow-500 mb-4">
            Total Pending Submissions
          </h3>
          <p className="text-2xl text-yellow-500 font-bold text-center">{stats.totalPendingSubmissions}</p>
          </div>
        </div>
        <div className="p-5 bg-green-100 rounded-lg flex items-center justify-center space-x-6">
        <div className="text-green-500 text-3xl">
                <FaCoins></FaCoins>
            </div>
          <div>
          <h3  className="text-2xl font-bold text-green-500 mb-4">Total Earnings</h3>
          <p className="text-2xl text-green-500 font-bold text-center">{stats.totalEarnings.toFixed(2)}</p>
          </div>
        </div>
      </div>


      {/* Approved Submissions Table */}
      <div className="">
        <h2 className="text-4xl font-bold text-indigo-500 my-10 text-center">Approved Submissions</h2>
        <div className="bg-indigo-50 rounded-lg px-5 lg:px-14 py-10">
        <div className="overflow-x-auto rounded-t-3xl">
          <table className="table">
            <thead className="bg-indigo-500">
              <tr className="text-white text-lg font-bold">
                <th className="p-3">Sr.</th>
                <th className="p-3">Task Title</th>
                <th className="p-3">Payable Amount(Coin)</th>
                <th className="p-3">Buyer Name</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {approvedSubmissions?.map((submission, index) => (
                <tr key={submission._id}>
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{submission.task_title}</td>
                  <td className="p-3">{submission.payable_amount}</td>
                  <td className="p-3">{submission.buyer_name}</td>
                  <td className="p-3 text-green-600 font-medium">{submission.status}</td>
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

export default WorkerHome;
