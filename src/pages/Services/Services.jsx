import React from "react";

const services = [
  {
    title: "Micro Tasks & Earn",
    description: "Complete small tasks and earn coins instantly.",
    icon: "🛠️",
  },
  {
    title: "Task Posting",
    description: "Post tasks and get them completed by workers efficiently.",
    icon: "📌",
  },
  {
    title: "Secure Payments",
    description: "Seamless coin transactions with Stripe integration.",
    icon: "💳",
  },
  {
    title: "Fast Withdrawals",
    description: "Withdraw earnings securely via multiple payment options.",
    icon: "⚡",
  },
  {
    title: "Premium Membership",
    description: "Unlock exclusive features and higher payouts.",
    icon: "🌟",
  },
  {
    title: "Referral Rewards",
    description: "Earn bonus coins by inviting your friends.",
    icon: "🎁",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-transparent mt-32 container mx-auto px-5 md:px-10 lg:px-14 text-white p-6">
      <h1 className="text-center text-4xl font-bold text-cyan-700 mb-10">
        Our Services
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-cyan-50  shadow-lg  t text-center border border-cyan-500"
          >
            <div className="text-5xl">{service.icon}</div>
            <h2 className="mt-4 text-xl font-semibold text-cyan-700">
              {service.title}
            </h2>
            <p className="mt-2 text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
