import { motion } from "framer-motion";
import { FaUserPlus, FaSearch, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Sign Up",
      description: "Create an account and join our community effortlessly.",
      icon: <FaUserPlus className="text-indigo-500 text-5xl" />,
    },
    {
      id: 2,
      title: "Explore Services",
      description: "Browse and find the perfect services tailored to your needs.",
      icon: <FaSearch className="text-indigo-500 text-5xl" />,
    },
    {
      id: 3,
      title: "Get Results",
      description: "Receive top-quality results from verified professionals.",
      icon: <FaCheckCircle className="text-indigo-500 text-5xl" />,
    },
  ];

  return (
    <section className="mb-10 md:mb-24">
      <div className="container mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-indigo-500"
        >
          How It Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-gray-600 mt-4"
        >
          Follow these simple steps to get started with our services.
        </motion.p>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-5 md:px-10 lg:px-14 ">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className=" p-8 rounded-lg shadow-md flex flex-col items-center text-center bg-indigo-50"
          >
            <div className="mb-5">{step.icon}</div>
            <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
            <p className="text-gray-600 mt-2">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
