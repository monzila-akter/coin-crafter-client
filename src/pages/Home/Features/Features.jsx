import { motion } from "framer-motion";
import { FaTasks, FaLock, FaBell, FaUsers, FaMobileAlt, FaHeadset } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      id: 1,
      title: "Easy Task Management",
      description: "Manage and track tasks effortlessly with user-friendly tools.",
      icon: <FaTasks className="text-cyan-800 text-5xl" />,
    },
    {
      id: 2,
      title: "Secure Payments",
      description: "Enjoy safe and reliable payment processing.",
      icon: <FaLock className="text-cyan-800 text-5xl" />,
    },
    {
      id: 3,
      title: "Real-Time Notifications",
      description: "Stay updated with instant notifications on your activities.",
      icon: <FaBell className="text-cyan-800 text-5xl" />,
    },
    {
      id: 4,
      title: "Role-Based Access",
      description: "Customized features for workers, buyers, and admins.",
      icon: <FaUsers className="text-cyan-800 text-5xl" />,
    },
    {
      id: 5,
      title: "Responsive Design",
      description: "Accessible on mobile, tablet, and desktop devices.",
      icon: <FaMobileAlt className="text-cyan-800 text-5xl" />,
    },
    {
      id: 6,
      title: "24/7 Support",
      description: "Get help anytime with our dedicated customer support.",
      icon: <FaHeadset className="text-cyan-800 text-5xl" />,
    },
  ];

  return (
    <section className="mb-10 md:mb-24 px-5 md:px-10 lg:px-14 container mx-auto">
      <div className="container mx-auto text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-cyan-800 mb-5"
        >
          Features & Benefits
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-600 mb-12"
        >
          Discover the powerful features that make our platform stand out.
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-8 rounded-lg shadow-md bg-cyan-50 flex flex-col items-center text-center"
            >
              <div className="mb-5 text-cyan-800">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
