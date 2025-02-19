import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';



const BuyerProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className="bg-cyan-50 px-5 md:px-24 my-12 shadow-lg rounded-xl border-2 lg:px-36 py-12 flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <div className="">
          <div className="flex justify-center mb-6">
            <img
              src={user?.photoURL} // Profile image from the context
              alt="Profile"
              className="w-32 h-32 border-4 border-cyan-700 rounded-full object-cover"
            />
          </div>

          <p className="text-gray-600 font-medium mb-3 text-lg">{user?.email}</p>
          <p className="text-cyan-800 text-xl font-semibold">{user?.displayName}</p>
          <div className="mt-5 text-left">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Additional Information</h3>
            {/* Add any other user info here */}
            <ul className="list-disc pl-5">
              <li>Member since: {new Date().toLocaleDateString()}</li>
              {/* You can also display other fields like roles, preferences, etc. */}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyerProfile;
