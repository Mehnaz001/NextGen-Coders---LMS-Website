import React from "react";
import Nav from "../components/Nav";
import { FaCode, FaLaptopCode, FaUsers } from "react-icons/fa";
import dev from "../assets/about.png";
import me from "../assets/mehnaz.jpg";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />

      <div className="max-w-7xl mx-auto px-6 pt-28 md:pt-32 pb-20 space-y-20">

        {/* HERO */}
        <section className="grid md:grid-cols-2 gap-10 items-center">

          {/* TEXT */}
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Building the{" "}
              <span className="text-orange-500">Next Generation</span> of
              Developers
            </h1>

            <p className="text-gray-400 mt-6 leading-relaxed">
              NextGen Coders is a modern learning platform designed to help
              developers learn faster through real projects, practical
              concepts, and structured learning paths.
            </p>

            <p className="text-gray-400 mt-4">
              Instead of endless tutorials, we focus on building real skills
              that help learners grow as developers.
            </p>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src={dev}
              alt="developer"
              className="w-72 md:w-[420px] opacity-90"
            />
          </div>
        </section>

        {/* ABOUT PLATFORM */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            What is <span className="text-orange-500">NextGen Coders?</span>
          </h2>

          <p className="text-gray-400 leading-relaxed max-w-4xl">
            NextGen Coders is built for students and developers who want
            structured and practical learning. The platform focuses on
            real-world development, modern technologies, and hands-on
            projects so learners can build skills that matter in the
            industry.
          </p>
        </section>

        {/* FEATURES */}
        <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:border-orange-500 transition">
            <FaCode className="text-orange-500 text-2xl mb-3" />
            <h3 className="font-semibold mb-2">Project Based Learning</h3>
            <p className="text-gray-400 text-sm">
              Learn by building real projects instead of just watching tutorials.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:border-orange-500 transition">
            <FaLaptopCode className="text-orange-500 text-2xl mb-3" />
            <h3 className="font-semibold mb-2">Modern Tech</h3>
            <p className="text-gray-400 text-sm">
              Learn trending technologies like MERN stack, AI/ML and cloud.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:border-orange-500 transition">
            <FaUsers className="text-orange-500 text-2xl mb-3" />
            <h3 className="font-semibold mb-2">Community Growth</h3>
            <p className="text-gray-400 text-sm">
              Learn together with a community focused on growth and support.
            </p>
          </div>

        </section>

        {/* CREATOR */}
        <section className="grid md:grid-cols-2 md:gap-0 gap-10 items-center">

          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src={me}
              alt="Mehnaz Sheikh"
              className="w-50 h-50 md:w-60 md:h-60 object-cover rounded-full hover:border-2 border-orange-500 shadow-lg"
            />
          </div>

          {/* TEXT */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Built by <span className="text-orange-500">Mehnaz Sheikh</span>
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Hi, I'm Mehnaz Sheikh, a developer passionate about building
              platforms that help students learn technology in a practical
              and structured way.
            </p>

            <p className="text-gray-400 mt-4">
              This platform is built with the goal of making coding easier
              to understand and more accessible for learners who want to
              grow in the tech industry.
            </p>
          </div>

        </section>

      </div>
      <Footer/>
    </div>
  );
};

export default AboutPage;