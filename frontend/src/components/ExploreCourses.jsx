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

  const handleCategoryClick = (category) => {
    navigate(`/viewcourses?category=${category}`);
  };

  return (
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14">

        {/* LEFT CONTENT */}
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Build Your Career With <br />
            <span className="text-orange-500">Modern Tech Skills</span>
          </h2>

          <p className="mt-5 md:mt-6 text-gray-300 text-base sm:text-lg leading-relaxed">
            Learn industry-ready skills like Web Development, UI/UX, AI & Cloud
            through practical, real-world focused courses.
          </p>

          <button
            onClick={() => navigate("/viewcourses")}
            className="mt-6 md:mt-8 inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-orange-500 text-black font-semibold rounded-full hover:bg-orange-400 transition-all hover:scale-105"
          >
            Explore Courses
            <FaArrowRight />
          </button>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 max-w-md">
          <Icon icon={<FaCode />} label="Web Dev" onClick={() => handleCategoryClick("Web Development")} />
          <Icon icon={<FaPalette />} label="UI / UX" onClick={() => handleCategoryClick("UI / UX Design")} />
          <Icon icon={<FaBrain />} label="AI / ML" onClick={() => handleCategoryClick("AI / ML")} />
          <Icon icon={<FaRobot />} label="Gen AI" onClick={() => handleCategoryClick("AI / ML")} />
          <Icon icon={<FaCloud />} label="Cloud" onClick={() => handleCategoryClick("Cloud Computing")} />
          <Icon icon={<FaMobileAlt />} label="Mobile Apps" onClick={() => handleCategoryClick("Mobile App Development")} />
        </div>

      </div>
  );
};

const Icon = ({ icon, label, onClick }) => (
  <div
    onClick={onClick}
    className="flex flex-col items-center gap-2 sm:gap-3 group cursor-pointer"
  >
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-orange-500 text-3xl sm:text-4xl transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-black">
      {icon}
    </div>

    <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition">
      {label}
    </span>
  </div>
);

export default ExploreCourses;