import React from "react";
import { motion } from "framer-motion";
import {
  FaFire,
  FaGasPump,
  FaThermometerHalf,
  FaWater,
  FaCloud,
  FaLeaf,
} from "react-icons/fa";

const optionList = [
  {
    id: 1,
    name: "Fire",
    icon: <FaFire />,
    color: "#C96868",
  },
  {
    id: 2,
    name: "Butane Gas",
    icon: <FaGasPump />,
    color: "#C96868",
  },
  {
    id: 3,
    name: "Temperature",
    icon: <FaThermometerHalf />,
    color: "#8EACCD",
  },
  {
    id: 4,
    name: "Humidity",
    icon: <FaWater />,
    color: "#8EACCD",
  },
  {
    id: 5,
    name: "CO₂",
    icon: <FaCloud />,
    color: "#C96868",
  },
  {
    id: 6,
    name: "TVOCs",
    icon: <FaLeaf />,
    color: "#C96868",
  },
];

const OptionCard = () => {
  return (
    <div className="container py-14 md:py-24">
      <div className="space-y-4 p-6 text-center max-w-[600px] mx-auto mb-5">
        <h1 className="uppercase font-semibold text-orange-500">
          Detected Options
        </h1>
        <p className="font-semibold text-3xl">
          Monitoring Environmental Conditions
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {optionList.map((option) => {
          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: option.id * 0.1,
              }}
              className="border rounded-lg border-secondary/20 p-4 flex justify-start items-center gap-4 hover:shadow-xl duration-200 cursor-default"
            >
              <div
                style={{
                  color: option.color,
                  backgroundColor: option.color + "20",
                }}
                className="w-10 h-10 rounded-md flex justify-center items-center"
              >
                {option.icon}
              </div>
              <p>{option.name}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default OptionCard;
