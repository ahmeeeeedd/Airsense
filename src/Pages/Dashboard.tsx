import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import { motion } from "framer-motion";
import { FaFire, FaThermometerHalf, FaTint, FaGasPump } from "react-icons/fa";
import { GiGasMask, GiMicrochip } from "react-icons/gi";

const CubeWithText = ({ fire, gas, temp, humidity, co2, tvocs }) => {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={"#C96868"} />

      <Text
        position={[0, 0, 1.1]}
        color="white"
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
      >
        Fire: {fire}%
      </Text>
      <Text
        position={[0, 0, -1.1]}
        color="white"
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI, 0]}
      >
        Butane Gas: {gas} ppm
      </Text>
      <Text
        position={[1.1, 0, 0]}
        color="white"
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
        rotation={[0, -Math.PI / 2, 0]}
      >
        Temp: {temp}°C
      </Text>
      <Text
        position={[-1.1, 0, 0]}
        color="white"
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI / 2, 0]}
      >
        Humidity: {humidity}%
      </Text>
      <Text
        position={[0, 1.1, 0]}
        color="white"
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
        rotation={[-Math.PI / 2, 0, 0]}
      >
        CO₂: {co2} ppm
      </Text>
      <Text
        position={[0, -1.1, 0]}
        color="white"
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
        rotation={[Math.PI / 2, 0, 0]}
      >
        TVOCs: {tvocs} mg/m³
      </Text>
    </mesh>
  );
};

const Dashboard = () => {
  const [fire, setFire] = useState(0);
  const [gas, setGas] = useState(0);
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [co2, setCo2] = useState(0);
  const [tvocs, setTvocs] = useState(0);

  useEffect(() => {
    const generateRandomValues = () => {
      setFire(Math.floor(Math.random() * 100) + 1);
      setGas(Math.floor(Math.random() * 900) + 100);
      setTemp((Math.random() * (30 - 15) + 20).toFixed(1));
      setHumidity(Math.floor(Math.random() * 100) + 1);
      setCo2(Math.floor(Math.random() * 500) + 300);
      setTvocs((Math.random() * (1 - 0) + 0).toFixed(2));
    };

    generateRandomValues();

    const interval = setInterval(generateRandomValues, 5000);
    return () => clearInterval(interval);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="dashboard-container"
      style={{ height: "100vh", backgroundColor: "#FFF4EA" }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center justify-around h-full w-1/3">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="card bg-primary text-brandWhite p-6 rounded-lg shadow-lg"
          >
            <FaFire className="text-6xl mb-4" />
            <h2 className="text-2xl font-semibold">Fire</h2>
            <p className="text-lg">Status: {fire}%</p>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="card bg-primary text-brandWhite p-6 rounded-lg shadow-lg"
          >
            <FaGasPump className="text-6xl mb-4" />
            <h2 className="text-2xl font-semibold">Butane Gas</h2>
            <p className="text-lg">Level: {gas} ppm</p>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="card bg-primary text-brandWhite p-6 rounded-lg shadow-lg"
          >
            <FaThermometerHalf className="text-6xl mb-4" />
            <h2 className="text-2xl font-semibold">Temperature</h2>
            <p className="text-lg">Value: {temp}°C</p>
          </motion.div>
        </div>

        <div className="flex flex-col items-center justify-center h-full w-1/3 relative">
          <p className="absolute top-2 text-lg text-center text-gray-700">
            click and move the “Airsense” virtual box to explore!
          </p>

          <Canvas className="w-full h-full">
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Stars />
            <OrbitControls />
            <CubeWithText
              fire={fire}
              gas={gas}
              temp={temp}
              humidity={humidity}
              co2={co2}
              tvocs={tvocs}
            />
          </Canvas>
        </div>

        <div className="flex flex-col items-center justify-around h-full w-1/3">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="card bg-primary text-brandWhite p-6 rounded-lg shadow-lg"
          >
            <FaTint className="text-6xl mb-4" />
            <h2 className="text-2xl font-semibold">Humidity</h2>
            <p className="text-lg">Value: {humidity}%</p>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="card bg-primary text-brandWhite p-6 rounded-lg shadow-lg"
          >
            <GiGasMask className="text-6xl mb-4" />
            <h2 className="text-2xl font-semibold">CO₂</h2>
            <p className="text-lg">Level: {co2} ppm</p>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="card bg-primary text-brandWhite p-6 rounded-lg shadow-lg"
          >
            <GiMicrochip className="text-6xl mb-4" />
            <h2 className="text-2xl font-semibold">TVOCs</h2>
            <p className="text-lg">Level: {tvocs} mg/m³</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
