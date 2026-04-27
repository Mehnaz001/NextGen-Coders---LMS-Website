import React, { useState } from "react";
import { IoMenu, IoClose, IoPersonCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import darkLogo from "../assets/NextLogo(Dark).png";
import lightLogo from "../assets/NextLogo(Light).png";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../App";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
    <nav className="fixed top-0 h-30 left-0 w-full flex items-center justify-between px-4 md:px-6 py-3 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
      {/* LOGO */}
      <div className="cursor-pointer z-50" onClick={() => navigate("/")}>
        <img
          src={darkLogo}
          alt="NextGen Coders"
          className="w-28 md:w-36"
        />
      </div>

      {/* DESKTOP LINKS */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 px-10 py-3 bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
        <button
          onClick={() => navigate("/")}
          className={`text-gray-300 hover:text-orange-500 transition font-medium ${isActive("/") ? "border-b-2 border-orange-500" : ""}`}
        >
          Home
        </button>
        <button
          onClick={() => navigate("/about")}
          className={`text-gray-300 hover:text-orange-500 transition font-medium ${isActive("/about") ? "border-b-2 border-orange-500" : ""}`}
        >
          About
        </button>
        {userData?.role === "educator" && (
          <button
            onClick={() => navigate("/dashboard")}
            className={`text-gray-300 hover:text-orange-500 transition font-medium ${isActive("/dashboard") ? "border-b-2 border-orange-500" : ""}`}
          >
            Dashboard
          </button>
        )}
      </div>

      {/* DESKTOP AVATAR */}
      <div className="hidden md:flex items-center gap-4 z-50">
        <div className="relative">
          {!userData ? (
            <IoPersonCircleSharp
              size={38}
              className="text-gray-400 hover:text-orange-500 cursor-pointer transition"
              onClick={() => navigate("/login")}
            />
          ) : (
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-10 h-10 rounded-full border border-white/30 bg-white/20 backdrop-blur cursor-pointer overflow-hidden flex items-center justify-center"
            >
              {userData.photoUrl ? (
                <img src={userData.photoUrl} alt={userData.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-semibold">{userData.name?.charAt(0).toUpperCase()}</span>
              )}
            </div>
          )}

          {/* PROFILE DROPDOWN */}
          {profileOpen && userData && (
            <div className="absolute right-0 mt-12 w-44 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl overflow-hidden">
              <button onClick={() => navigate("/profile")} className="w-full px-4 py-2 text-left text-gray-300 hover:bg-white/10">My Profile</button>
              <button onClick={() => navigate("/mycourses")} className="w-full px-4 py-2 text-left text-gray-300 hover:bg-white/10">My Courses</button>
              <button onClick={handleLogOut} className="w-full px-4 py-2 text-left text-red-400 hover:bg-white/10">Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE ACTIONS */}
      <div className="md:hidden flex items-center gap-3 z-50">
        {/* HAMBURGER */}
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <IoClose size={26} color="orange" /> : <IoMenu size={26} color="orange" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full px-4 py-4 bg-black backdrop-blur-xl border border-white/20 rounded-xl md:hidden space-y-3 z-50">
          {!userData ? (
            <button
              onClick={() => { navigate("/login"); setMenuOpen(false); }}
              className="w-full py-2 bg-white/10 border border-white/20 text-gray-300 rounded-2xl transition-all duration-300 hover:bg-orange-500 hover:text-black"
            >
              Login
            </button>
          ) : (
            <>
              {userData?.role === "educator" && (
                <button
                  onClick={() =>  navigate("/dashboard")}
                  className="block w-full text-left text-gray-300 hover:text-orange-500 transition"
                >
                  Dashboard
                </button>
              )}
              <button
                onClick={() => { navigate("/profile"); setMenuOpen(false); }}
                className="block w-full text-left text-gray-300 hover:text-orange-500 transition"
              >
                My Profile
              </button>
              <button
                onClick={() => { navigate("/mycourses"); setMenuOpen(false); }}
                className="block w-full text-left text-gray-300 hover:text-orange-500 transition"
              >
                My Courses
              </button>
              <button
                onClick={() => { handleLogOut(); setMenuOpen(false); }}
                className="block w-full text-left text-red-400 hover:bg-white/10 transition py-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;