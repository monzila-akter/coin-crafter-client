import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const PaymentHistory = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const {data: payments} = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })


    return (
        <div className='w-full py-16 px-5 md:px-10 lg:px-14'>
            <Helmet>
                <title>CoinCrafter | Dashboard | PaymentHistory</title>
            </Helmet>
           <h2 className='text-4xl font-bold text-indigo-500 text-center mb-12'>Payment History</h2>
           <div className='bg-indigo-50 rounded-lg px-5 py-5 md:py-14 md:px-10'>
           <h2 className='text-3xl font-semibold mb-6'>Total Payments: {payments?.length}</h2>
           <div className="overflow-x-auto rounded-t-3xl">
               <table className="table">
                   {/* Table Head */}
                   <thead className='bg-indigo-500'>
                       <tr className='text-lg text-white'>
                           <th>Sr.</th>
                           <th>Email</th>
                           <th>Transaction Id</th>
                           <th>Coins</th>
                           <th>Amount</th>
                           <th>Date</th>
                       </tr>
                   </thead>
                   <tbody>
                       {/* Table Body */}
                       {payments?.map((payment, idx) => (
                           <tr key={payment._id}>
                               <td>{idx + 1}</td>
                               <td>
                                {payment.email}
                               </td>
                               <td>{payment.transactionId}</td>
                               <td>{payment.coins}</td>
                               <td>${payment.amount}</td>
                               <td>{payment.date}</td>
                           </tr>
                       ))}
                   </tbody>
               </table>
           </div>
       </div>
        </div>
    );
};

export default PaymentHistory;