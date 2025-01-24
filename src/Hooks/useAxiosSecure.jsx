import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";


const axiosSecure = axios.create({
    baseURL: "https://coin-crafter-server.vercel.app"
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut} =useContext(AuthContext);
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        console.log('req stopped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`; 
         return config;
    }, function (error) {
        return Promise.reject(error);
    })

//    interceptors 401 and 403 error status

axiosSecure.interceptors.response.use(function(response) {
    return response;
}, async(error) => {
    const status = error.response.status;
    if(status === 400 || status === 401 || status === 403 ){
        await logOut();
        navigate("/login")
    }
    return Promise.reject(error);
})

    return axiosSecure;
};

export default useAxiosSecure;