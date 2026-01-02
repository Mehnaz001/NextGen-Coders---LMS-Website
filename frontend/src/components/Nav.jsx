import React, { useState } from "react";
import { IoPersonCircleSharp, IoMenu, IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../assets/logo3.png";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../App";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-[70px] bg-[#0f0f0f] border-b border-[#1f1f1f] z-50">
      <div className="max-w-7xl mx-auto h-full px-5 flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="w-[40px]" />
          <span className="text-white font-semibold text-lg">
            MEHNAZ<span className="text-orange-500">.CODES</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {userData?.role === "educator" && (
            <button
              onClick={() => navigate("/dashboard")}
              className="text-gray-300 hover:text-orange-500 transition"
            >
              Dashboard
            </button>
          )}

          {!userData ? (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-[#1a1a1a] text-gray-300 rounded-md hover:bg-[#222]"
            >
              Login
            </button>
          ) : (
            <>
              <button
                onClick={handleLogOut}
                className="px-4 py-2 bg-orange-500 text-black rounded-md font-medium hover:bg-orange-400"
              >
                Logout
              </button>

              {/* Avatar */}
              <div className="relative">
                <div
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-9 h-9 rounded-full bg-orange-500 text-black flex items-center justify-center font-semibold cursor-pointer"
                >
                  {userData?.name?.charAt(0)}
                </div>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md shadow-lg overflow-hidden">
                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full px-4 py-2 text-left text-gray-300 hover:bg-[#222]"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => navigate("/courses")}
                      className="w-full px-4 py-2 text-left text-gray-300 hover:bg-[#222]"
                    >
                      My Courses
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden text-white">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <IoClose size={26} /> : <IoMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0f0f0f] border-t border-[#1f1f1f] px-5 py-4 space-y-4">
          {userData?.role === "educator" && (
            <button
              onClick={() => navigate("/dashboard")}
              className="block w-full text-left text-gray-300"
            >
              Dashboard
            </button>
          )}

          {!userData ? (
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-[#1a1a1a] text-gray-300 py-2 rounded-md"
            >
              Login
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="block w-full text-left text-gray-300"
              >
                My Profile
              </button>
              <button
                onClick={() => navigate("/courses")}
                className="block w-full text-left text-gray-300"
              >
                My Courses
              </button>
              <button
                onClick={handleLogOut}
                className="w-full bg-orange-500 text-black py-2 rounded-md font-medium"
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
