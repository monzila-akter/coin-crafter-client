import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa6";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Lottie from "lottie-react";
import registerLottie from "../../assets/lottiefiles/lottieRegister.json"
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_Image_Hosting_Key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const axiosSecurePublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);

  const onSubmit = async (data) => {
    if (!data.profile_image[0]) {
      Swal.fire({
        icon: "error",
        title: "Profile Picture Required",
        text: "Please upload a profile picture.",
      });
      return;
    }

    // Upload profile image to ImageBB
    const imageFile = { image: data.profile_image[0] };
    try {
      const imgResponse = await axiosSecurePublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (imgResponse.data.success) {
        const imageUrl = imgResponse.data.data.display_url;

        // Create the user account
        createUser(data.email, data.password)
          .then((result) => {
            const newUser = result.user;

            // Update the user's profile with name and profile picture
            updateUserProfile(data.name, imageUrl).then(() => {
              const userInfo = {
                name: data.name,
                email: data.email,
                photo: imageUrl,
                role: data.role,
              };

              // Save the user to the database
              axiosSecurePublic.post("/register", userInfo).then((res) => {
                if (res.data.insertedId) {
                  Swal.fire({
                    title: "Successfully Registered!",
                    icon: "success",
                    draggable: true,
                  });
                  reset();
                  navigate("/");
                }
              });
            });
          })
          .catch((error) => {
            console.error("Error creating user:", error);
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Image Upload Failed",
          text: "Could not upload profile picture. Please try again.",
        });
      }
    } catch (error) {
      console.error("Image upload error:", error);
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: "There was an error uploading the image. Please try again.",
      });
    }
  };

  return (
    <>
    <Helmet>
      <title>CoinCrafter | Register</title>
    </Helmet>
      <div className="container mx-auto flex flex-col md:flex-row items-center space-x-0 md:space-x-6 lg:space-x-10 w-full px-6 md:px-10 lg:px-14 py-16">
        {/* form part */}
        <div className=" w-full md:w-1/2 bg-indigo-50 px-5 md:px-6 lg:px-10 py-10 rounded-lg order-2 md:order-1">
        <div>
          <h2 className="text-4xl font-bold text-center text-indigo-500 mb-6">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Type Here"
                {...register("name", { required: true })}
                className="input input-bordered"
              />
              {errors.name && <span className="text-sm text-red-600">Name is required</span>}
            </div>

            {/* Profile Picture Upload */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Profile Picture</span>
              </label>
              <input
                type="file"
                {...register("profile_image", { required: true })}
                className="file-input w-full max-w-xs"
              />
              {errors.profile_image && (
                <span className="text-sm text-red-600">Profile picture is required</span>
              )}
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                className="input input-bordered"
              />
              {errors.email && <span className="text-sm text-red-600">Valid email is required</span>}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Your Password"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  pattern: /(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,})/,
                })}
                className="input input-bordered"
              />
              {errors.password && (
                <span className="text-sm text-red-600">
                  Password must include uppercase, lowercase, number, and special character.
                </span>
              )}
            </div>

            {/* Role Dropdown */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                {...register("role", { required: true })}
                className="input input-bordered"
              >
                <option value="Worker">Worker</option>
                <option value="Buyer">Buyer</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-full text-xl font-bold text-white bg-indigo-500 mt-5 mb-5"
            >
              Sign Up
            </button>

            <p className="text-base font-medium text-yellow-500 text-center mb-5">
              Already Have An Account? Go to <Link className="text-indigo-500" to="/login">Login</Link>
            </p>
          </form>
        </div>
        </div>
        {/* lottie part */}
        <div className=" w-full md:w-1/2 order-1 md:order-2">
             <Lottie animationData={registerLottie}></Lottie>
        </div>
      </div>
    </>
  );
};

export default Register;
