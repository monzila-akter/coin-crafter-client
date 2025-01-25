import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";
import { FaCoins, FaTasks } from "react-icons/fa";
import { FaClockRotateLeft, FaMoneyCheckDollar } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const BuyerHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [selectedSubmission, setSelectedSubmission] = useState(null); // State for modal

    // Fetch buyer states
    const { data: states = {}, isLoading: statesLoading } = useQuery({
        queryKey: ["buyerStates"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/buyer-home?email=${user.email}`);
            return res.data;
        },
    });

    // Fetch submissions
    const { data: submissions = [], isLoading: submissionsLoading, refetch } = useQuery({
        queryKey: ["pendingSubmissions"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pending-submissions?email=${user.email}`);
            return res.data;
        },
    });

    // Approve submission
    const handleApprove = async (submission) => {
        try {
            const response = await axiosSecure.post("/approve-submission", {
                submissionId: submission._id,
                workerEmail: submission.worker_email,
                payableAmount: submission.payable_amount,
            });
            Swal.fire({
                title: "Submission approved successfully!",
                icon: "success",
                draggable: true
              });
            refetch(); // Refresh the pending submissions
        } catch (error) {
            console.error(error); // Log the error
            toast.error("Failed to approve submission.");
        }
    };


    // Reject submission
    const handleReject = async (submission) => {
        try {
            console.log("Rejecting submission:", submission); // Debugging: Check submission data
            const response = await axiosSecure.post("/reject-submission", {
                submissionId: submission._id,
                taskId: submission.task_id,
            });
            Swal.fire({
                title: "Submission rejected successfully!",
                icon: "success",
                draggable: true
              });
            refetch(); // Refresh the pending submissions
        } catch (error) {
            toast.error("Failed to reject submission.");
        }
    };


    // Open the modal to view submission details
    const handleViewSubmission = (submission) => {
        setSelectedSubmission(submission); // Open modal with submission details
    };

    if (statesLoading || submissionsLoading) return <div className="w-full flex justify-center items-center text-xl text-indigo-500">Loading...</div>;

    return (
        <div className="w-full px-6 md:px-10 lg:px-14 py-14">
            <Helmet>
                <title>CoinCrafter | Dashboard | Home</title>
            </Helmet>
            {/* Buyer states */}
            <h2 className="text-4xl font-bold text-center text-cyan-700 mb-10">STATES</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center justify-center space-x-6 bg-cyan-100 rounded-xl text-white p-6">
                    <div>
                        <FaTasks className="text-4xl text-cyan-700"></FaTasks>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-cyan-700 mb-4">Total Tasks</h2>
                        <p className="text-2xl font-bold text-center text-cyan-700">{states.totalTaskCount}</p>
                    </div>
                </div>
                <div className=" flex items-center justify-center space-x-6 bg-rose-200 rounded-xl text-white p-6">
                    <div>
                        <FaClockRotateLeft className="text-4xl text-rose-500"></FaClockRotateLeft>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-rose-500 mb-4">Pending Tasks</h2>
                        <p className="text-2xl font-bold text-center text-rose-500">{states.pendingTask}</p>
                    </div>
                </div>
                <div className="flex items-center justify-center space-x-6 bg-teal-200 rounded-xl text-white p-6">
                    <div>
                        <FaCoins className="text-4xl text-teal-600"></FaCoins>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-teal-600 mb-4">Total Paid</h2>
                        <p className="text-2xl font-bold text-center text-teal-600">{states.totalPaymentPaid}</p>
                    </div>
                </div>
            </div>

            {/* Submissions table */}
            <div>
                <h2 className="text-4xl font-bold text-cyan-700 text-center my-10">Pending Submissions</h2>
                <div className="bg-cyan-50 rounded-lg px-5 py-10 lg:px-14">
                    <div className="overflow-x-auto rounded-t-3xl">
                        <table className="table w-full">
                            <thead className="bg-cyan-700">
                                <tr className='text-lg text-white'>
                                    <th>Worker Name</th>
                                    <th>Task Title</th>
                                    <th>Payable Amount</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.map((submission) => (
                                    <tr key={submission._id}>
                                        <td>{submission.worker_name}</td>
                                        <td>{submission.task_title}</td>
                                        <td className="text-center">{submission.payable_amount}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button
                                                    className="btn bg-yellow-500 font-medium text-white btn-sm"
                                                    onClick={() => handleViewSubmission(submission)}
                                                >
                                                    View Submission
                                                </button>
                                                <button
                                                    className="btn bg-emerald-600 text-white font-medium btn-sm"
                                                    onClick={() => handleApprove(submission)}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="btn bg-red-500 text-white font-medium btn-sm"
                                                    onClick={() => handleReject(submission)}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selectedSubmission && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-cyan-700 text-xl mb-4">Submission Details</h3>
                        <p className="mb-2">
                            <strong>Worker Name:</strong> {selectedSubmission.worker_name}
                        </p>
                        <p className="mb-2">
                            <strong>Task Title:</strong> {selectedSubmission.task_title}
                        </p>
                        <p className="mb-2">
                            <strong>Payable Amount:</strong> {selectedSubmission.payable_amount}
                        </p>
                        <p className="mb-2">
                            <strong>Submission Notes:</strong>{" "}
                            {selectedSubmission.notes || "No notes provided"}
                        </p>
                        <div className="modal-action">
                            <button
                                className="btn bg-cyan-700 text-white"
                                onClick={() => setSelectedSubmission(null)} // Close modal
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuyerHome;
