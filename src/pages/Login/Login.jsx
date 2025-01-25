import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import Lottie from 'lottie-react';
import lottieLogin from "../../assets/lottiefiles/lottieLogin.json"
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';

const Login = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const axiosSecurePublic = useAxiosPublic();
    const { signIn, googleSignIn } = useContext(AuthContext);



    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(result => {
                if (result?.user && result.user !== '' && Object.keys(result.user).length) {
                    axiosSecurePublic.get(`/user/${result?.user?.email}`)
                        .then(res => {
                            const userInfo = res.data;
                            Swal.fire({
                                title: "Successfully Logged In!",
                                icon: "success",
                                draggable: true
                            });
                            navigate(userInfo.newRole === 'Admin' ? '/dashboard/adminHome' : userInfo.newRole === 'Buyer' ? '/dashboard/buyerHome' : '/dashboard/workerHome');
                            reset();
                        })
                }

            })
            .catch(error => {
                // Show toast for incorrect email or password
                toast.error(error.message)
            });
    }


    // google login

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                if (result?.user && result.user !== '' && Object.keys(result.user).length) {
                    const userInfo = {
                        email: result.user?.email,
                        name: result.user?.displayName,
                        photo: result.user?.photoURL,
                        role: "Worker",
                        registerType: 'google',
                    };
    
                    // No need to send coins, the backend will handle coin assignment based on the role
                    axiosSecurePublic.post("/register", userInfo)
                        .then(res => {
    
                            if (res.data.insertedId) {
                                Swal.fire({
                                    title: "Successfully Logged In!",
                                    icon: "success",
                                    draggable: true,
                                });
                            }
                            axiosSecurePublic.get(`/user/${result.user?.email}`)
                                .then(res => {
                                    const userInfo = res.data;
                                    navigate(
                                        userInfo.newRole === 'Admin'
                                            ? '/dashboard/adminHome'
                                            : userInfo.newRole === 'Buyer'
                                                ? '/dashboard/buyerHome'
                                                : '/dashboard/workerHome'
                                    );
                                });
                        })
                        .catch(err => {
                            // Handle error if the user already exists
                            if (err.response && err.response.status === 400) {
                                Swal.fire({
                                    title: "User already exists",
                                    text: "This email is already registered.",
                                    icon: "error",
                                    draggable: true,
                                });
                            } else {
                                Swal.fire({
                                    title: "Error",
                                    text: "An unexpected error occurred. Please try again.",
                                    icon: "error",
                                    draggable: true,
                                });
                            }
                        });
                }
            })
            .catch(error => {
                console.error("Google sign-in error:", error);
            });
    };

    return (
        <>
            <Helmet>
                <title>CoinCrafter | Login</title>
            </Helmet>
            <div className='container mx-auto w-full flex flex-col md:flex-row gap-y-10 md:gap-y-0 space-x-0 md:space-x-6 lg:space-x-0 items-center justify-between px-6 md:px-10 lg:px-14 py-16'>
                {/* form part */}
                <div className='w-full md:w-1/2 bg-cyan-50 px-5 py-10 order-2 md:order-1 rounded-lg'>
                    {/* Main content */}
                    <div>
                        {/* Form part */}
                        <div>
                            <h2 className='text-4xl font-bold text-center text-cyan-700 mb-6'>Log In</h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* Email field */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="Email" {...register("email", { required: true })} name="email" className="input input-bordered" />
                                    {errors.email && <span className="text-sm text-red-600">Email is required</span>}
                                </div>

                                {/* Password field */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="Enter Your Password" name="password" {...register("password", { required: true })} className="input input-bordered" />
                                    {errors.password?.type === "required" && (
                                        <p className="text-sm text-red-600">Password is required</p>
                                    )}
                                </div>

                                <button type='submit' className='btn w-full text-xl font-bold text-white bg-cyan-700 mt-5 mb-5'>Login</button>

                                <Link to="">
                                    <p className='text-base font-medium text-yellow-500 text-center mb-5'>
                                        Don't Have An Account? Go to <Link className='text-cyan-700' to="/register">Register</Link>
                                    </p>
                                </Link>
                            </form>

                            <p className='text-xl font-medium text-center text-[#444444]mb-4'>Or sign In with</p>
                            <div className='flex space-x-14 items-center justify-center mt-4'>
                                <button onClick={handleGoogleLogin} className='btn bg-transparent border-2 border-cyan-700 text-cyan-700 text-xl font-bold w-full'>
                                    <FaGoogle /> Google
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* lottie part  */}
                <div className=' w-full md:w-80 lg:w-96 order-1 md:order-2'>
                    <Lottie animationData={lottieLogin}></Lottie>
                </div>
            </div>
        </>
    );
};

export default Login;