
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import useUserRole from '../Hooks/useUserRole';
import { AuthContext } from '../provider/AuthProvider';

const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    const {role, AdminLoading} = useUserRole();

    if(user && role === "Admin"){
        return children
    }

    if(loading || AdminLoading) {
        return <div className='min-h-screen flex justify-center items-center'><span className="loading loading-spinner text-info"></span></div>
    }

    return (
        <Navigate to="/login" state={{ from: location }} replace></Navigate>
    );
};

export default AdminRoute;