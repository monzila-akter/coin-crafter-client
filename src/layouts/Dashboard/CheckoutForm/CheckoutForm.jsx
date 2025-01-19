import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ coins, price }) => {
  const [error, setError] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('payment error', error);
      setError(error.message);
    } else {
      console.log('payment method', paymentMethod);
      setError('');

      // Now call the backend to create a payment intent and update user's coins
      try {
        const response = await axios.post(
          'http://localhost:5000/create-payment-intent',
          { price }
        );
        const clientSecret = response.data.clientSecret;

        // Confirm the payment
        const { error: stripeError, paymentIntent } =
          await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
          });

        if (stripeError) {
          console.log('Payment failed:', stripeError);
          setError(stripeError.message);
        } else {
          // Update the user’s coin balance after successful payment
          await axios.patch('http://localhost:5000/user/coins', {
            email: localStorage.getItem('email'), // Assume email is stored in localStorage
            coins: coins,
          });

          // Navigate to dashboard or coins section after successful payment
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Payment processing failed:', error);
        setError('Payment processing failed. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button
        className="btn bg-indigo-500 block mx-auto text-xl font-semibold text-white my-10"
        type="submit"
        disabled={!stripe}
      >
        Pay ${price}
      </button>
      <p className="text-sm font-medium text-red-500">{error}</p>
    </form>
  );
};

export default CheckoutForm;
