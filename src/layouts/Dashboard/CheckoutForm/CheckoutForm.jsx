import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const CheckoutForm = ({ price, email, coins }) => {
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure(); // Secure Axios instance

    // Fetch user info and refetch function directly in CheckoutForm
    const { data: userInfo = {}, refetch } = useQuery({
        queryKey: ['userInfo', email],  // Query user info based on email
        queryFn: async () => {
            if (!email) return {};
            const response = await axiosSecure.get(`/user/${email}`);
            return response.data;
        },
        enabled: !!email, // Only run query if email is available
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        setProcessing(true);

        try {
            // Fetch client secret from the backend using axiosSecure
            const { data } = await axiosSecure.post('/create-payment-intent', {
                price,
                email,
                coins,
            });

            const clientSecret = data.clientSecret;

            // Confirm the payment
            const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email,
                    },
                },
            });

            if (stripeError) {
                console.error('Payment error:', stripeError);
                setError(stripeError.message);
                setProcessing(false);
                return;
            }

            if (paymentIntent.status === 'succeeded') {

        //    prepare payment data for backend
        const paymentData = {
            email,
            amount: price,
            coins,
            transactionId: paymentIntent.id,
            paymentStatus: paymentIntent.status,
            date: new Date(),
        }

        await axiosSecure.post("/payments", paymentData)

                // Display a SweetAlert success message
                Swal.fire({
                    title: 'Payment Successful!',
                    text: `You have successfully purchased ${coins} coins.`,
                    icon: 'success',
                    confirmButtonText: 'OK',
                });

                // Call refetch to refresh the user's coins after the successful payment
                refetch();

                navigate('/dashboard/paymentHistory'); // Navigate to dashboard after successful payment
            } else {
                Swal.fire({
                    title: 'Payment Failed',
                    text: 'Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            setError('Failed to process payment. Please try again.');
        }

        setProcessing(false);
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
                className='btn bg-indigo-500 block mx-auto text-xl font-semibold text-white my-10'
                type="submit"
                disabled={!stripe || processing}
            >
                {processing ? 'Processing...' : 'Pay'}
            </button>
            {error && <p className='text-sm font-medium text-red-500'>{error}</p>}
        </form>
    );
};

export default CheckoutForm;
