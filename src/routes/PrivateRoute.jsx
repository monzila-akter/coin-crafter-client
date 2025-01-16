import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(user){
        return children
    }

    if(loading) {
        return <div className='min-h-screen flex justify-center items-center'><span className="loading loading-spinner text-info"></span></div>
    }

    return (
        <Navigate to="/login" state={{ from: location }} replace></Navigate>
    );
};

export default PrivateRoute;