import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 text-gray-400">

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">

        {/* Top Grid */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">

          {/* Brand */}
          <div>
            <h2 className="text-white text-xl font-bold mb-3">
              NextGen Coders - <br />Learning Platform
            </h2>

            <p className="text-sm leading-relaxed">
              A modern platform designed to help developers learn faster
              with structured courses and real-world projects.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-orange-500 transition">
                  Home
                </a>
              </li>

              <li>
                <a href="/viewcourses" className="hover:text-orange-500 transition">
                  Courses
                </a>
              </li>

              <li>
                <a href="/about" className="hover:text-orange-500 transition">
                  About
                </a>
              </li>

              <li>
                <a href="/search" className="hover:text-orange-500 transition">
                  AI Search
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Connect
            </h3>

            <div className="flex items-center gap-4 text-lg">

              <a
                href="mailto:mehnaz62844@gmail.com"
                className="hover:text-orange-500 transition"
              >
                <FaEnvelope />
              </a>

              <a
                href="https://github.com/Mehnaz001"
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange-500 transition"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com/mehnaz-sheikh"
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange-500 transition"
              >
                <FaLinkedin />
              </a>

            </div>

            <p className="text-sm mt-3">
              mehnaz62844@gmail.com
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">

          <p>
            © {new Date().getFullYear()} All rights reserved.
          </p>

          <p className="mt-1">
            Built with ❤️ by{" "}
            <span className="text-orange-500 font-medium">
              Mehnaz
            </span>
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;