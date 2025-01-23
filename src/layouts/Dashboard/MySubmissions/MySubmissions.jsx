import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const MySubmissions = () => {
    const { user } = useContext(AuthContext); // Get logged-in user info
    const axiosSecure = useAxiosSecure();

    const [page, setPage] = useState(1); // Current page
    const limit = 5; // Submissions per page

    // Fetch submissions using TanStack Query
    const { data, isLoading, isError } = useQuery({
        queryKey: ["submissions", user.email, page],
        queryFn: async () => {
            const response = await axiosSecure.get(
                `/submissions/worker/${user.email}?page=${page}&limit=${limit}`
            );
            return response.data;
        },
        enabled: !!user.email, // Only run query if user email exists
    });

    const submissions = data?.submissions || [];
    const totalPages = data?.totalPages || 1;

    if (isLoading) {
        return <p className="text-center text-gray-500">Loading submissions...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-500">Failed to load submissions.</p>;
    }

    return (
        <div className="py-16 w-full px-5 md:px-10 lg:px-14">
            <Helmet>
                <title>CoinCrafter | Dashboard | MySubmissions</title>
            </Helmet>
            <h1 className="text-4xl font-bold mb-12 text-indigo-500 text-center">My Submissions</h1>
            <div className=" rounded-xl bg-indigo-50 px-5 md:px-10 py-5 md:py-14">
                <div className="rounded-t-3xl overflow-x-auto">
                    <table className="table">
                        {/* Table Head */}
                        <thead className="bg-indigo-500">
                            <tr className="text-lg text-white">
                                <th>Sr</th>
                                <th>Title</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Table Body */}
                            {submissions.map((submission, idx) => (
                                <tr key={submission._id}>
                                    <td>{(page - 1) * limit + idx + 1}</td>
                                    <td>
                                        {submission.task_title}
                                        <p>{submission.buyer_name}</p>
                                    </td>
                                    <td>$ {submission.payable_amount}</td>
                                    <td>{new Date(submission.current_date).toLocaleDateString()}</td>
                                    <td
                                        className={` ${
                                            submission.status === "pending"
                                                ? "text-yellow-500 font-semibold"
                                                : submission.status === "approved"
                                                ? "text-green-500 font-semibold"
                                                : "text-red-500 font-semibold"
                                        }`}
                                    >
                                        {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="mt-6 flex justify-center items-center space-x-4">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span>
                        Page {page} of {totalPages}
                    </span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MySubmissions;
