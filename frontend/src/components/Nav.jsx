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
    <nav
      className="
        fixed top-10 left-1/2 -translate-x-1/2
        w-[95%] max-w-7xl h-[60px]
        bg-white/10 backdrop-blur-2xl
        border border-white/20
        rounded-4xl
        shadow-xl shadow-black/40
        z-50
        transition-all duration-300
      "
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="w-[42px]" />
          <span className="text-white font-semibold text-lg">
            MEHNAZ<span className="text-orange-500">.CODES</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {userData?.role === "educator" && (
            <button
              onClick={() => navigate("/dashboard")}
              className="text-gray-300 hover:text-orange-500 transition"
            >
              Dashboard
            </button>
          )}

          {/* Login Button */}
          {!userData && (
            <button
              onClick={() => navigate("/login")}
              className="
                px-5 py-2
                bg-white/10 border border-white/20
                text-gray-300
                rounded-2xl
                transition-all duration-300
                hover:bg-orange-500 hover:text-black hover:border-orange-500
              "
            >
              Login
            </button>
          )}

          {/* Avatar */}
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
                className="
    w-10 h-10 rounded-full
    border border-white/30
    bg-white/20 backdrop-blur
    cursor-pointer
    overflow-hidden
    flex items-center justify-center
  "
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

            {/* Profile Dropdown */}
            {profileOpen && userData && (
              <div
                className="
                  absolute right-0 mt-3 w-44
                  bg-white/10 backdrop-blur-2xl
                  border border-white/20
                  rounded-2xl
                  shadow-xl
                  overflow-hidden
                "
              >
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full px-4 py-2 text-left text-gray-300 hover:bg-white/10"
                >
                  My Profile
                </button>
                <button
                  onClick={() => navigate("/courses")}
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
          </div>
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
        <div
          className="
            md:hidden mt-4 mx-4
            bg-white/10 backdrop-blur-2xl
            border border-white/20
            rounded-2xl
            px-5 py-4 space-y-4
          "
        >
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
              className="
                w-full py-2
                bg-white/10 border border-white/20
                text-gray-300
                rounded-2xl
                transition-all duration-300
                hover:bg-orange-500 hover:text-black
              "
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
                className="w-full bg-orange-500 text-black py-2 rounded-2xl font-medium"
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
