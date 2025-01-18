import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
        const { register, handleSubmit, reset, formState: { errors } } = useForm();
        const navigate = useNavigate();
    const axiosSecurePublic = useAxiosPublic();
    const { signIn, googleSignIn } = useContext(AuthContext);

    const onSubmit = (data) => {
       signIn(data.email, data.password)
       .then(result => {
        result.user,
        console.log(result.user)
         Swal.fire({
             title: "Successfully Sign In!",
             icon: "success",
             draggable: true
         });
         navigate("/")
         reset();
        
       })
       .catch(error => {
        console.log(error.message)
       })
    }


    // google login

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
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
                        console.log(res.data);
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Successfully Sign Up!",
                                icon: "success",
                                draggable: true,
                            });
                        }
                        navigate("/");
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
            })
            .catch(error => {
                console.error("Google sign-in error:", error);
            });
    };

    return (
        <>
        <div className='container mx-auto px-6 md:px-10 lg:px-14 py-16'>
            {/* Main content */}
            <div>
                {/* Form part */}
                <div>
                    <h2 className='text-4xl font-bold text-center'>Sign In</h2>
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

                        <button type='submit' className='btn w-full text-xl font-bold text-white bg-[#D1A054B3] mt-5 mb-5'>Sign Up</button>

                        <Link to="">
                            <p className='text-xl font-bold text-[#D1A054] text-center mb-5'>
                                Already registered? Go to <Link to="/login">log in</Link>
                            </p>
                        </Link>
                    </form>

                    <p className='text-xl font-medium text-center text-[#444444]mb-4'>Or sign Up with</p>
                    <div className='flex space-x-14 items-center justify-center mt-4'>
                        <button onClick={handleGoogleLogin} className='btn bg-indigo-400 text-white text-lg font-semibold w-full'>
                            <FaGoogle /> Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

export default Login;