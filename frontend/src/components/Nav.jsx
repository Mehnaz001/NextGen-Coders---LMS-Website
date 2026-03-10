import React, { useState, useEffect } from "react";
import { IoPersonCircleSharp, IoMenu, IoClose } from "react-icons/io5";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import darkLogo from '../assets/NextLogo(Dark).png'
import lightLogo from '../assets/NextLogo(Light).png'
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../App";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      dispatch(setUserData(null));
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between px-6 z-50">

      {/* BIG Logo LEFT */}
      <div className="z-50 cursor-pointer" onClick={() => navigate("/")}>
        <img
          src={darkMode ? darkLogo : lightLogo}
          alt="NextGen Coders"
          className="w-36 md:w-44"
        />
      </div>

      {/* NAV LINKS CENTER */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8
                      px-10 py-3 bg-white/10 dark:bg-black/30 backdrop-blur-xl
                      border border-white/20 rounded-2xl shadow-lg">
        <button
          onClick={() => navigate("/")}
          className={`text-gray-300 hover:text-orange-500 transition font-medium ${
            isActive("/") ? "border-b-2 border-orange-500" : ""
          }`}
        >
          Home
        </button>
        <button
          onClick={() => navigate("/about")}
          className={`text-gray-300 hover:text-orange-500 transition font-medium ${
            isActive("/about") ? "border-b-2 border-orange-500" : ""
          }`}
        >
          About
        </button>
        {userData?.role === "educator" && (
          <button
            onClick={() => navigate("/dashboard")}
            className={`text-gray-300 hover:text-orange-500 transition font-medium ${
            isActive("/dashboard") ? "border-b-2 border-orange-500" : ""
          }`}
          >
            Dashboard
          </button>
        )}
      </div>

      {/* ACTIONS RIGHT */}
      <div className="flex items-center gap-4 z-50">

        {/* THEME TOGGLE - ROUND */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 bg-white/10 dark:bg-black/20 border border-white/20 rounded-full hover:bg-orange-500 hover:text-black transition"
        >
          {darkMode ? (
            <MdLightMode size={22} className="text-yellow-300" />
          ) : (
            <MdDarkMode size={22} className="text-gray-800" />
          )}
        </button>

        {/* AVATAR / LOGIN */}
        {!userData ? (
          <IoPersonCircleSharp
            size={38}
            className="text-gray-400 cursor-pointer hover:text-orange-500 transition"
            onClick={() => navigate("/login")}
          />
        ) : (
          <div
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-10 h-10 rounded-full border border-white/30 bg-white/20 backdrop-blur cursor-pointer overflow-hidden flex items-center justify-center"
          >
            {userData?.photoUrl ? (
              <img
                src={userData.photoUrl}
                alt={userData.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white font-semibold">
                {userData?.name?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        )}

        {/* PROFILE DROPDOWN */}
        {profileOpen && userData && (
          <div className="absolute right-0 mt-12 w-44 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl overflow-hidden">
            <button
              onClick={() => navigate("/profile")}
              className="w-full px-4 py-2 text-left text-gray-300 hover:bg-white/10"
            >
              My Profile
            </button>
            <button
              onClick={() => navigate("/mycourses")}
              className="w-full px-4 py-2 text-left text-gray-300 hover:bg-white/10"
            >
              My Courses
            </button>
            <button
              onClick={handleLogOut}
              className="w-full px-4 py-2 text-left text-red-400 hover:bg-white/10"
            >
              Logout
            </button>
          </div>
        )}

        {/* MOBILE MENU */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <IoClose size={26} className="text-white" />
            ) : (
              <IoMenu size={26} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full px-6 py-4 bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 rounded-xl md:hidden space-y-3">
          <button onClick={() => navigate("/")} className="block w-full text-left text-gray-300">
            Home
          </button>
          <button onClick={() => navigate("/courses")} className="block w-full text-left text-gray-300">
            Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default Nav;