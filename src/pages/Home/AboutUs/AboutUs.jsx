import { motion } from "framer-motion";
import Lottie from "lottie-react";
import lottieFiles from "../../../assets/lottiefiles/lottieAboutUs.json"

const AboutUs = () => {
  return (
    <section className="mb-10 md:mb-24 bg-cyan-50">
      <div className="container mx-auto py-10 px-5 md:px-10 lg:px-14 flex flex-col md:flex-row items-center gap-10 rounded-lg">
        {/* Left Side: Title and Description */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <h2 className="text-4xl font-bold text-cyan-800 mb-5">About Us</h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to our platform, where task providers meet skilled
            professionals. Our mission is to create a seamless and secure
            ecosystem for completing and managing tasks. Whether you're here to
            earn or hire, we are committed to delivering quality and
            reliability. Join us and experience the future of micro-tasking and
            earning!
          </p>
        </motion.div>

        {/* Right Side: Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <Lottie animationData={lottieFiles}></Lottie>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
