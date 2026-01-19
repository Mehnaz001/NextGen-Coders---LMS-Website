import React from "react";
import Nav from "../components/Nav";
import home from "../assets/home.png";
import { AiOutlineSearch } from "react-icons/ai";
import { FaUserGraduate, FaBookOpen, FaUsers, FaHeadset } from "react-icons/fa";


const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      <Nav />
      {/* Background Image */}
        <img
          src={home}
          className="absolute inset-0 w-full h-full object-cover"
          alt="home"
        />
      {/* Hero Section */}
      <div className="relative w-full min-h-[calc(100vh-60px)] mt-[60px]">

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          
          {/* Content */}
          <div className="text-center px-6 max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              Grow Your Learning Path 
            </h1>

            <p className="mt-4 text-lg md:text-xl text-gray-200">
              Learn smarter, not harder. Build skills that matter with guided
              courses and AI-powered search.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <button className="px-8 py-3 rounded-full bg-white text-black font-semibold transition hover:bg-orange-500 hover:text-white">
                View All Courses
              </button>

              <button className="px-8 py-3 rounded-full border border-white text-white flex items-center gap-2 font-semibold transition hover:bg-orange-500 hover:border-orange-500">
                Search with AI
                <AiOutlineSearch size={20} />
              </button>
            </div>

            {/* Stats Section */}
<div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
  
  <div className="flex flex-col items-center">
    <FaUserGraduate size={28} className="text-orange-500" />
    <h3 className="mt-2 text-xl font-bold">120K+</h3>
    <p className="text-sm text-gray-300">Learners</p>
  </div>

  <div className="flex flex-col items-center">
    <FaBookOpen size={28} className="text-orange-500" />
    <h3 className="mt-2 text-xl font-bold">500+</h3>
    <p className="text-sm text-gray-300">Online Courses</p>
  </div>

  <div className="flex flex-col items-center">
    <FaUsers size={28} className="text-orange-500" />
    <h3 className="mt-2 text-xl font-bold">50+</h3>
    <p className="text-sm text-gray-300">Community Groups</p>
  </div>

  <div className="flex flex-col items-center">
    <FaHeadset size={28} className="text-orange-500" />
    <h3 className="mt-2 text-xl font-bold">24/7</h3>
    <p className="text-sm text-gray-300">Support</p>
  </div>

</div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
