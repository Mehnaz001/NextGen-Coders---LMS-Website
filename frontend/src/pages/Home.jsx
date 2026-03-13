import React from "react";
import Nav from "../components/Nav";
import ExploreCourses from "../components/ExploreCourses";
import home from "../assets/home.png";
import aiIcon from "../assets/ai-search.png";
import { FaUserGraduate, FaBookOpen, FaUsers, FaHeadset } from "react-icons/fa";
import CardPage from "../components/CardPage";
import { useNavigate } from "react-router-dom";
import About from "../components/About";
import Footer from "../components/Footer";
import ReviewPage from "../components/ReviewPage";
import CountUp from "react-countup"; // ✅ Count-up animation

const Home = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: <FaUserGraduate />, number: 120, label: "Learners", suffix: "K+" },
    { icon: <FaBookOpen />, number: 500, label: "Courses", suffix: "+" },
    { icon: <FaUsers />, number: 50, label: "Communities", suffix: "+" },
    { icon: <FaHeadset />, number: "24/7", label: "Support" }
  ];

  return (
    <div className="w-full bg-black overflow-x-hidden">
      <Nav />

      {/* HERO SECTION */}
      <section className="relative min-h-screen pt-[72px] flex items-center justify-center px-4 sm:px-6 md:px-12">
        <img
          src={home}
          alt="home-bg"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />

        <div className="relative mt-12 md:mt-3 z-10 text-center max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-[700px] mx-auto">
            Grow Your Learning Path
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-xl text-gray-300 max-w-[600px] mx-auto leading-relaxed">
            Learn smarter, not harder. Build skills that matter with guided
            courses and AI-powered search.
          </p>
          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">

            <button
              onClick={() => navigate("/viewcourses")}
              className="w-[220px] px-6 py-3 rounded-full bg-white text-black font-semibold transition hover:bg-orange-500 hover:text-white flex items-center justify-center"
            >
              View All Courses
            </button>

            <button
              onClick={() => navigate("/search")}
              className="w-[220px] px-6 py-3 rounded-full border bg-white border-white text-black flex items-center justify-center gap-2 font-semibold transition hover:bg-orange-500 hover:border-orange-500 hover:text-white"
            >
              Search with AI
              <img src={aiIcon} alt="ai" className="w-5 h-5" />
            </button>

          </div>
          {/* Stats */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-8 px-5 sm:px-6 md:px-0">
            {stats.map((stat, idx) => (
              <Stat key={idx} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE COURSES */}
      <section className="bg-black py-20 px-6 md:px-16">
        <ExploreCourses />
      </section>

      {/* POPULAR COURSES */}
      <section className="bg-black py-20 px-6 md:px-16">
        <CardPage />
      </section>

      {/* ABOUT */}
      <section className="bg-black py-20 px-6 md:px-16">
        <About />
      </section>
      
      {/* REVIEW */}
      <section className="bg-black py-20 px-6 md:px-16">
        <ReviewPage />
      </section>
      <Footer />
    </div>
  );
};

// Stat component with CountUp animation
const Stat = ({ icon, number, label, suffix }) => (
  <div className="flex flex-col items-center text-center bg-black/40 border border-gray-800 md:border-0 rounded-xl p-5 hover:border-orange-500 transition">

    <div className="text-orange-500 text-4xl mb-2">
      {icon}
    </div>

    <h3 className="text-xl font-bold text-white">
      {typeof number === "number" ? (
        <CountUp end={number} duration={2} suffix={suffix || ""} />
      ) : (
        number
      )}
    </h3>

    <p className="text-gray-400 text-sm sm:text-base">
      {label}
    </p>

  </div>
);

export default Home;