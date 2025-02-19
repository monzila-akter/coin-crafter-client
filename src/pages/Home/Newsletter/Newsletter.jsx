import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle subscription
    setIsSubscribed(true);
    // You can add a backend request to save the email subscription here
  };

  return (
    <section className="bg-cyan-50 text-white mb-10 md:mb-24 py-16 shadow-lg border-2">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl text-cyan-800 font-semibold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-lg text-gray-500 mb-8">
          Stay updated with the latest news and offers. Sign up for our newsletter and never miss an update!
        </p>

        {isSubscribed ? (
          <p className="text-green-500 font-semibold">Thank you for subscribing!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex justify-center items-center space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 rounded-md w-64 text-black border border-gray-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
