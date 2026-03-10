import React from "react";
import Nav from "../components/Nav"; 
import { FaCode, FaRocket, FaUsers, FaLaptopCode } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <Nav />

      <div className="px-6 py-32 max-w-7xl mx-auto space-y-16">

        {/* Hero / About Intro */}
        <div className="relative bg-gray-900/80 border border-white/10 rounded-2xl p-10 overflow-hidden shadow-lg">
          {/* Glow effect */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-500/20 blur-3xl rounded-full"></div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center gap-3 text-white">
            <span className="p-3 bg-orange-500/20 rounded-xl text-orange-500">
              <FaCode />
            </span>
            About NextGen Coders
          </h1>

          <p className="text-gray-300 leading-relaxed mb-8 max-w-3xl">
            Welcome to NextGen Coders, a modern learning platform designed to help
            developers grow faster with structured and practical courses. We focus
            on real-world projects, clean coding practices, and step-by-step guidance
            to build strong fundamentals.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800/60 border border-white/10 rounded-xl p-6 hover:border-orange-500 transition shadow-md">
            <FaRocket className="text-orange-500 text-2xl mb-3" />
            <h4 className="font-semibold text-white mb-2">Practical Learning</h4>
            <p className="text-gray-300 text-sm">
              Learn by building real projects instead of just watching tutorials.
            </p>
          </div>

          <div className="bg-gray-800/60 border border-white/10 rounded-xl p-6 hover:border-orange-500 transition shadow-md">
            <FaLaptopCode className="text-orange-500 text-2xl mb-3" />
            <h4 className="font-semibold text-white mb-2">Modern Tech Stack</h4>
            <p className="text-gray-300 text-sm">
              Explore MERN stack, AI/ML, and other trending technologies.
            </p>
          </div>

          <div className="bg-gray-800/60 border border-white/10 rounded-xl p-6 hover:border-orange-500 transition shadow-md">
            <FaUsers className="text-orange-500 text-2xl mb-3" />
            <h4 className="font-semibold text-white mb-2">Community Support</h4>
            <p className="text-gray-300 text-sm">
              Learn together, grow together with peer support and guidance.
            </p>
          </div>
        </div>

        {/* Mission / Vision Section */}
        <div className="relative bg-gray-900/80 border border-white/10 rounded-2xl p-10 overflow-hidden shadow-lg">
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-500/20 blur-3xl rounded-full"></div>

          <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
          <p className="text-gray-300 max-w-3xl leading-relaxed">
            Our mission is to make coding accessible, engaging, and practical for everyone.
            We provide learners with structured guidance, real-world projects, and
            a supportive community to help them grow as developers and future tech leaders.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;