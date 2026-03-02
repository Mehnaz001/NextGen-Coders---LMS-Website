import React from "react";
import { FaCode, FaRocket, FaUsers, FaLaptopCode } from "react-icons/fa";

const About = () => {
  return (
    <div className="relative bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-white/10 rounded-2xl p-10 mb-16 overflow-hidden">

      {/* Glow Effect */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-500/10 blur-3xl rounded-full"></div>

      <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white">
        <span className="p-3 bg-orange-500/20 rounded-xl text-orange-500">
          <FaCode />
        </span>
        About This Platform
      </h2>

      <p className="text-gray-400 leading-relaxed mb-8 max-w-3xl">
        Welcome to our modern learning platform designed to help developers
        grow faster with structured and practical courses. We focus on real-world
        projects, clean coding practices, and step-by-step guidance to build
        strong fundamentals.
      </p>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-orange-500 transition">
          <FaRocket className="text-orange-500 text-2xl mb-3" />
          <h4 className="font-semibold text-white mb-2">
            Practical Learning
          </h4>
          <p className="text-gray-400 text-sm">
            Learn by building real projects instead of just watching tutorials.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-orange-500 transition">
          <FaLaptopCode className="text-orange-500 text-2xl mb-3" />
          <h4 className="font-semibold text-white mb-2">
            Modern Tech Stack
          </h4>
          <p className="text-gray-400 text-sm">
            Explore MERN stack, AI/ML, and other trending technologies.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-orange-500 transition">
          <FaUsers className="text-orange-500 text-2xl mb-3" />
          <h4 className="font-semibold text-white mb-2">
            Community Support
          </h4>
          <p className="text-gray-400 text-sm">
            Learn together, grow together with peer support and guidance.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;