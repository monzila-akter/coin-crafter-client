import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Withdrawal = () => {
  const { user } = useContext(AuthContext); // Authenticated user from the AuthProvider
  const axiosSecure = useAxiosSecure();

  const [withdrawCoins, setWithdrawCoins] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  // Fetch user's coin balance using TanStack Query
  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ['userDetails', user?.email], // Query key includes user email
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`); // Fetch user data by email
      return res.data;
    },
    enabled: !!user?.email, // Only fetch when user email is available
  });

  const handleWithdraw = async () => {
    if (!userData) return;

    if (withdrawCoins > userData.coins) {
      alert('Insufficient coin balance');
      return;
    }

    try {
      const response = await axiosSecure.post('/withdrawals', {
        worker_email: userData.email,
        worker_name: userData.name,
        withdrawal_coin: withdrawCoins,
        withdrawal_amount: (withdrawCoins / 20).toFixed(2),
        payment_system: paymentSystem,
        account_number: accountNumber,
      });

      alert(response.data.message);
    } catch (error) {
      console.error('Withdrawal failed', error);
      alert('Failed to process withdrawal');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load user data</p>;

  return (
    <div className="px-5 md:px-10 lg:px-14 py-16 w-full ">
      <h2 className="text-4xl font-bold mb-12 text-center text-indigo-500">Withdrawal Form</h2>

  <div className='bg-indigo-50 px-5 md:px-10 lg:px-14 py-14 rounded-xl'>
  <div className="mb-4">
        <p className="text-gray-700 mb-2 text-xl font-semibold">Total Coins: <strong>{userData.coins}</strong></p>
        <p className="text-gray-700 mb-2 text-xl font-semibold">
          Withdrawal Amount: <strong>${(withdrawCoins / 20).toFixed(2)}</strong>
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleWithdraw();
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Coin to Withdraw</label>
          <input
            type="number"
            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={withdrawCoins}
            onChange={(e) => setWithdrawCoins(Number(e.target.value))}
            max={userData.coins}
            min={0}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Payment System</label>
          <select
            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={paymentSystem}
            onChange={(e) => setPaymentSystem(e.target.value)}
            required
          >
            <option value="">Select Payment System</option>
            <option value="Bkash">Bkash</option>
            <option value="Rocket">Rocket</option>
            <option value="Nagad">Nagad</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
          <input
            type="text"
            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>

        {userData.coins >= 200 ? (
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Withdraw
          </button>
        ) : (
          <p className="text-red-500 text-center">Insufficient coin balance (Minimum 200 coins required)</p>
        )}
      </form>
  </div>
    </div>
  );
};

export default Withdrawal;
