import React from "react";
import Nav from "../components/Nav";
import ExploreCourses from "../components/ExploreCourses";
import home from "../assets/home.png";
import { AiOutlineSearch } from "react-icons/ai";
import { FaUserGraduate, FaBookOpen, FaUsers, FaHeadset } from "react-icons/fa";
import CardPage from "../components/CardPage";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full bg-black overflow-x-hidden">
      <Nav />

      {/* HERO SECTION */}
      <section className="relative min-h-screen pt-[72px] flex items-center justify-center">
        
        {/* Background Image */}
        <img
          src={home}
          alt="home-bg"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Grow Your Learning Path
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-300">
            Learn smarter, not harder. Build skills that matter with guided
            courses and AI-powered search.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex justify-center gap-5 flex-wrap">
            <button 
            onClick={()=>navigate('/viewcourses')}
            className="px-8 py-3 rounded-full bg-white text-black font-semibold transition hover:bg-orange-500 hover:text-white">
              View All Courses
            </button>

            <button className="px-8 py-3 rounded-full border border-white text-white flex items-center gap-2 font-semibold transition hover:bg-orange-500 hover:border-orange-500">
              Search with AI
              <AiOutlineSearch size={20} />
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10">
            <Stat icon={<FaUserGraduate />} number="120K+" label="Learners" />
            <Stat icon={<FaBookOpen />} number="500+" label="Courses" />
            <Stat icon={<FaUsers />} number="50+" label="Communities" />
            <Stat icon={<FaHeadset />} number="24/7" label="Support" />
          </div>
        </div>
      </section>

      {/* EXPLORE COURSES */}
      <section className="relative z-20 bg-black">
        <ExploreCourses />
      </section>
      <CardPage/>
    </div>
  );
};

const Stat = ({ icon, number, label }) => (
  <div className="flex flex-col items-center gap-2 text-white">
    <div className="text-orange-500 text-2xl">{icon}</div>
    <h3 className="text-xl font-bold">{number}</h3>
    <p className="text-gray-400 text-sm">{label}</p>
  </div>
);

export default Home;
