import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {

    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const {data: role, isLoading, error} = useQuery({
        queryKey: ['userRole', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/user/role/${user?.email}`);
            return res.data.role;
        },
        enabled: !!user?.email,
    })

    return {role, isLoading, error};
};

export default useUserRole;