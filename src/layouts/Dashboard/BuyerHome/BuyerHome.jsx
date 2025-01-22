import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";

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
          console.log(response); // Log the response to check
          toast.success("Submission approved successfully!");
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
    
            console.log("Reject response:", response); // Debugging: Check the response
            toast.success("Submission rejected successfully!");
            refetch(); // Refresh the pending submissions
        } catch (error) {
            console.error("Error rejecting submission:", error); // Log full error details
            toast.error("Failed to reject submission.");
        }
    };
    

    // Open the modal to view submission details
    const handleViewSubmission = (submission) => {
        setSelectedSubmission(submission); // Open modal with submission details
    };

    if (statesLoading || submissionsLoading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            {/* Buyer states */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="card bg-primary text-white p-4">
                    <h2 className="text-lg font-bold">Total Tasks</h2>
                    <p className="text-2xl">{states.totalTaskCount}</p>
                </div>
                <div className="card bg-secondary text-white p-4">
                    <h2 className="text-lg font-bold">Pending Tasks</h2>
                    <p className="text-2xl">{states.pendingTask}</p>
                </div>
                <div className="card bg-accent text-white p-4">
                    <h2 className="text-lg font-bold">Total Payment Paid</h2>
                    <p className="text-2xl">${states.totalPaymentPaid}</p>
                </div>
            </div>

            {/* Submissions table */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
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
                                <td>${submission.payable_amount}</td>
                                <td>
                                    <div className="flex gap-2">
                                        <button
                                            className="btn btn-info btn-sm"
                                            onClick={() => handleViewSubmission(submission)}
                                        >
                                            View Submission
                                        </button>
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => handleApprove(submission)}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="btn btn-error btn-sm"
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

            {/* Modal */}
            {selectedSubmission && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Submission Details</h3>
                        <p>
                            <strong>Worker Name:</strong> {selectedSubmission.worker_name}
                        </p>
                        <p>
                            <strong>Task Title:</strong> {selectedSubmission.task_title}
                        </p>
                        <p>
                            <strong>Payable Amount:</strong> ${selectedSubmission.payable_amount}
                        </p>
                        <p>
                            <strong>Submission Notes:</strong>{" "}
                            {selectedSubmission.notes || "No notes provided"}
                        </p>
                        <div className="modal-action">
                            <button
                                className="btn"
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
