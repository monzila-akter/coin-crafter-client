import React from 'react';
import { FaCoins } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { buyerCoinOptions } from '../../../utils/coins';

const PurchaseCoin = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center px-5 md:px-10 lg:px-14 py-16">
        <h2 className='text-4xl font-bold text-indigo-500 text-center mb-12'>Purchase Coin</h2>
      <div className='coin-cards grid grid-cols-1 lg:grid-cols-2 gap-10 '>
      {buyerCoinOptions.map((option, index) => (
        <div key={index} className="card bg-indigo-50 px-5 md:px-14 py-5 md:py-10">
          <h3 className='flex items-center gap-3 text-4xl font-semibold text-yellow-600 justify-center'><FaCoins></FaCoins> {option.coins} Coins</h3>
          <p className='text-3xl font-bold text-center my-5'>${option.price}</p>
          <Link to={`/dashboard/payment/${option.coins}`}><button className='text-xl font-semibold btn mx-auto block bg-indigo-500 text-white'>Buy Now</button></Link>
        </div>
      ))}
      </div>
    </div>
  );
};

export default PurchaseCoin;
