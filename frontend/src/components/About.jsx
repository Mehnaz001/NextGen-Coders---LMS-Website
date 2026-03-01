import React from "react";
import { FaCode } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">

      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <FaCode /> About This Platform
      </h2>

      <p className="text-gray-400 leading-relaxed">
        Welcome to our learning platform. You can explore high quality courses,
        learn modern technologies, and improve your development skills step by step.
        Our mission is to provide structured practical learning experience.
      </p>

    </div>
  );
};

export default About;