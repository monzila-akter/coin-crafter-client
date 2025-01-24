import { Link, useRouteError } from "react-router-dom";
import lottieError from "../../assets/lottiefiles/lottieError.json"
import Lottie from "lottie-react";

const ErrorPage = () => {

    const error = useRouteError();
    // console.log('routerError', error)
    return (
        <div className="container mx-auto  justify-center items-center min-h-screen py-10 flex flex-col">
           {
            error.status === 404 && <div className="flex flex-col justify-center">
               <Lottie animationData={lottieError}></Lottie>
                <p className="text-center text-lg font-bold mb-5 text-yellow-500">Go back where you from</p>
                <Link to='/' className="text-center"><button className="btn px-6 bg-yellow-500 text-white text-lg rounded-full">Go Back</button></Link>
            </div>
           } 
        </div>
    );
};

export default ErrorPage;