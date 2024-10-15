import React from "react";
import Card from "./CardComp.js";
import Icon1 from "../../assets/icon/1.png";
import Icon2 from "../../assets/icon/2.png";
import Icon3 from "../../assets/icon/3.png";
import { motion } from "framer-motion";
import { SlideLeft, SlideRight } from "../../utility/animation.js";
import { Link } from "react-router-dom";

const HowItHelps = () => {
  return (
    <section>
      <div className="container py-16 my-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5">
              <motion.div
                variants={SlideRight(0.2)}
                whileInView={"animate"}
                initial="initial"
              >
                <Card
                  icon={Icon1}
                  heading="Dashboard"
                  text="The dashboard is intuitive and customizable, offering clear visualizations and insights to enhance industrial safety."
                />
              </motion.div>
              <motion.div
                variants={SlideRight(0.4)}
                whileInView={"animate"}
                initial="initial"
              >
                <Card
                  icon={Icon2}
                  heading="Interactive monitoring"
                  text="Users can create a virtual floor plan of their industrial environment by adding and removing walls. This feature enables precise mapping for effective fire protection monitoring."
                />
              </motion.div>
              <motion.div
                variants={SlideRight(0.6)}
                whileInView={"animate"}
                initial="initial"
              >
                <Card
                  icon={Icon3}
                  heading="Danger Alert"
                  text="The Danger Alert feature notifies users in real-time when sensor readings exceed safety thresholds, indicating potential fire risks."
                />
              </motion.div>
            </div>
          </div>
          <motion.div
            variants={SlideLeft(0.8)}
            whileInView={"animate"}
            initial="initial"
            className="flex flex-col xl:justify-center xl:pr-14"
          >
            <h1 className="text-3xl font-bold text-darkBlue">
              How it Helps people
            </h1>
            <p className=" text-gray-400 mt-4">
              Our smart fire protection system monitors temperature, humidity,
              CO₂, VOCs, and harmful gases is the best to protect your industry
            </p>
            <p className="text-sm text-gray-400 mt-4">
              We offer an intuitive platform and interactive dashboard to
              visualize critical data in real-time, enabling quick and effective
              responses to fire risks.
            </p>
            <Link to="/ContactUs">
              <button className="w-fit mt-4 border border-gray-200 px-4 py-2 rounded-lg hover:bg-primary hover:text-white transform duration-300">
                Get in Touch
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItHelps;
