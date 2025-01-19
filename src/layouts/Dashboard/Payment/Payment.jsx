
import React, { useContext } from 'react';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { buyerCoinOptions } from '../../../utils/coins';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../provider/AuthProvider';
// add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk);

const Payment = () => {
    const params = useParams();
    console.log('params', params);
    const {user} = useContext(AuthContext);
    
    const currentCoinOption = buyerCoinOptions.find((item) => item.coins === Number(params.coins));
    console.log('currentCoinOption', currentCoinOption);

    const {coins, price} = currentCoinOption;
    
    return (
        <div className='w-full py-16 px-5 md:px-14 lg:px-28'>
            <h2 className='text-4xl font-bold text-indigo-500 text-center mb-12'>Payment</h2>
            <div className='flex mb-14 justify-center gap-14'>
                <h3 className='text-2xl font-bold'>Coins: {coins}</h3>
                <p className='text-2xl font-bold'>Price: ${price}</p>
            </div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                    price={price}
                    email={user?.email}
                    coins={coins}

                    ></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;