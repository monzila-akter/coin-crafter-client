import React from 'react';
import { useLocation } from 'react-router-dom';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk);

const Payment = () => {
  const location = useLocation();
  const { coins, price } = location.state; // Accessing the passed data from the previous component

  return (
    <div className="w-full py-16 px-5 md:px-14 lg:px-28">
      <h2 className="text-4xl font-bold text-indigo-500 text-center mb-12">Payment</h2>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm coins={coins} price={price} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
