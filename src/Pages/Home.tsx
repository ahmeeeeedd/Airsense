import React from "react";
import Hero from "../components/Hero/Hero";
import HowItHelps from "../components/HowItHelps/HowItHelps";
import OptionCard from "../components/OptionCard/OptionCard";
import StatsSection from "../components/StatsSection/StatsSection ";
import Chatbot from "./Chatbot";

const Home = () => {
  return (
    <div>
      <Hero />
      <HowItHelps />
      <StatsSection />
      <OptionCard />
      <Chatbot />
    </div>
  );
};

export { Home };
