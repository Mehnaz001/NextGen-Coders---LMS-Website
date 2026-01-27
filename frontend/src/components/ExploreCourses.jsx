import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCode,
  FaBrain,
  FaCloud,
  FaMobileAlt,
  FaPalette,
  FaRobot,
  FaArrowRight,
} from "react-icons/fa";

const ExploreCourses = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full px-8 md:px-20 py-16">
      <div className="w-[90%] mx-auto flex flex-col md:flex-row items-center justify-between gap-14">

        {/* LEFT CONTENT */}
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Build Your Career With <br />
            <span className="text-orange-500">Modern Tech Skills</span>
          </h2>

          <p className="mt-6 text-gray-300 text-lg leading-relaxed">
            Learn industry-ready skills like Web Development, UI/UX, AI & Cloud
            through practical, real-world focused courses.
          </p>

          <button
            onClick={() => navigate("/viewcourses")}
            className="mt-8 inline-flex items-center gap-3 px-8 py-4 bg-orange-500 text-black font-semibold rounded-full hover:bg-orange-400 transition-all hover:scale-105"
          >
            Explore Courses
            <FaArrowRight />
          </button>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex flex-wrap justify-center gap-8 max-w-md">
          <Icon icon={<FaCode />} label="Web Dev" />
          <Icon icon={<FaPalette />} label="UI / UX" />
          <Icon icon={<FaBrain />} label="AI / ML" />
          <Icon icon={<FaRobot />} label="Gen AI" />
          <Icon icon={<FaCloud />} label="Cloud" />
          <Icon icon={<FaMobileAlt />} label="Mobile Apps" />
        </div>

      </div>
    </section>
  );
};

const Icon = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-3 group cursor-pointer">
    <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-orange-500 text-4xl transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-black">
      {icon}
    </div>
    <span className="text-sm text-gray-300 group-hover:text-white transition">
      {label}
    </span>
  </div>
);

export default ExploreCourses;
