import React from "react";
import { useNavigate } from "react-router-dom";
import dev from "../assets/about.png";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 md:px-16">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 transition duration-300">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* TEXT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              About <span className="text-orange-500">NextGen Coders</span>
            </h2>

            <p className="text-gray-400 mt-6 leading-relaxed text-sm md:text-base">
              NextGen Coders is a modern learning platform built to help
              developers grow through structured courses and real-world
              projects. Our goal is to make coding easier to understand
              and help learners build practical skills for the tech
              industry.
            </p>

            <button
              onClick={() => navigate("/about")}
              className="mt-6 px-6 py-3 bg-orange-500 text-black rounded-full font-semibold hover:bg-orange-400 transition"
            >
              Know More
            </button>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src={dev}
              alt="about"
              className="w-72 md:w-[420px] opacity-90"
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default About;