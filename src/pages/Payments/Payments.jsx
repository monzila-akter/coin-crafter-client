import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';


const Payments = () => {
  const axiosSecure = useAxiosSecure();
 const {user} = useContext(AuthContext);

  const { data: payments = [], isLoading, error } = useQuery({
    queryKey: ['paymentHistory', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/paymentHistory/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading payment history...</p>;
  if (error) return <p>Error fetching payment history</p>;

  return (
    <div className="px-5 md:px-10 lg:px-14 container mx-auto mt-32 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Amount ($)</th>
              <th className="border p-2">Coins</th>
              <th className="border p-2">Transaction ID</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.transactionId} className="text-center border">
                  <td className="border p-2">{payment.amount}</td>
                  <td className="border p-2">{payment.coins}</td>
                  <td className="border p-2">{payment.transactionId}</td>
                  <td className="border p-2">{new Date(payment.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center">No payment history available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
