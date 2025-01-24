import axios from "axios";


const axiosSecurePublic = axios.create({
    baseURL: "https://coin-crafter-server.vercel.app"
})

const useAxiosPublic = () => {
    return axiosSecurePublic;
};

export default useAxiosPublic;