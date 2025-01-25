import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);
     // Fetch user data from the backend using TanStack Query
  const { data: userInfo = {}, refetch } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      if (!user?.email) return {};
      const response = await axiosSecure.get(`/user/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email, // Run query only when user is logged in
  });

  return {userInfo, refetch};

};

export default useUsers;