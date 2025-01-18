import { Link, useNavigate } from 'react-router-dom';
import {  FaGoogle } from 'react-icons/fa6';
import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const axiosSecurePublic = useAxiosPublic();
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                result.user;
                console.log(result.user);
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photo: data.photo,
                            role: data.role,
                            // Do not send coins from the frontend, let the backend handle it
                        };

                        axiosSecurePublic.post("/register", userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        title: "Successfully Sign Up!",
                                        icon: "success",
                                        draggable: true
                                    });
                                    reset();
                                    navigate("/");
                                }
                            }).catch((error) => {
                              console.log('error register', error)
                            });
                    });
            });
    };

   

    return (
        <>
            <div className='container mx-auto px-6 md:px-10 lg:px-14 py-16'>
                {/* Main content */}
                <div>
                    {/* Form part */}
                    <div>
                        <h2 className='text-4xl font-bold text-center'>Sign Up</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Name field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Type Here" {...register("name", { required: true })} name="name" className="input input-bordered" />
                                {errors.name && <span className="text-sm text-red-600">Name is required</span>}
                            </div>

                            {/* Profile Picture URL field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Profile Picture URL</span>
                                </label>
                                <input type="text" placeholder="Photo Url" {...register("photo", { required: true })} name="photo" className="input input-bordered" />
                                {errors.photo && <span className="text-sm text-red-600">Photo URL is required</span>}
                            </div>

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
                                <input type="password" placeholder="Enter Your Password" name="password" {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,})/ })} className="input input-bordered" />
                                {errors.password?.type === "required" && (
                                    <p className="text-sm text-red-600">Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className="text-sm text-red-600">Password must have at least 6 characters</p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className="text-sm text-red-600">Password must have one lowercase, one uppercase, one number, and one special character.</p>
                                )}
                            </div>

                            {/* Role dropdown */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Role</span>
                                </label>
                                <select {...register("role", { required: true })} className="input input-bordered">
                                    <option value="Worker">Worker</option>
                                    <option value="Buyer">Buyer</option>
                                </select>
                            </div>

                            <button type='submit' className='btn w-full text-xl font-bold text-white bg-[#D1A054B3] mt-5 mb-5'>Sign Up</button>

                            <Link to="">
                                <p className='text-xl font-bold text-[#D1A054] text-center mb-5'>
                                    Already registered? Go to <Link to="/login">log in</Link>
                                </p>
                            </Link>
                        </form>

                        <p className='text-xl font-medium text-center text-[#444444]mb-4'>Or sign Up with</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
