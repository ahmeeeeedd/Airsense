import React from "react";
import { motion } from "framer-motion";

const statsData = [
  {
    id: 1,
    title: "Protection Coverage",
    value: "99%",
    description: "Coverage of industrial areas against fire incidents.",
  },
  {
    id: 2,
    title: "Estimated Losses Prevented",
    value: "$1.2M",
    description:
      "Estimated losses avoided annually through effective monitoring.",
  },
  {
    id: 3,
    title: "Response Time",
    value: "5 mins",
    description: "Average response time to fire alerts.",
  },
  {
    id: 4,
    title: "Fire Incidents Detected",
    value: "50+",
    description: "Number of fire incidents detected and mitigated.",
  },
];

const StatsSection = () => {
  return (
    <div className="container py-14 md:py-24 bg-[#FFF4EA] rounded-lg">
      <div className="space-y-4 p-6 text-center max-w-[600px] mx-auto mb-5">
        <h1 className="uppercase font-semibold text-[#C96868]">
          Fire Protection Statistics
        </h1>
        <p className="font-semibold text-3xl text-[#8EACCD]">
          How We Safeguard Industries
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              delay: stat.id * 0.1,
            }}
            className="border rounded-3xl border-[#C96868] p-6 flex flex-col items-center text-center bg-white hover:shadow-xl duration-200"
          >
            <h2 className="text-4xl font-bold text-gray-800">{stat.value}</h2>
            <p className="font-semibold text-lg text-[#C96868]">{stat.title}</p>
            <p className="text-sm text-gray-600">{stat.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
