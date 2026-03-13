import React from "react";
import Nav from "../components/Nav";
import home from "../assets/home.png";
import { FaEnvelope, FaEdit, FaBookOpen, FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Get initials from name
  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="w-full overflow-hidden">

      {/* Background */}
      <img
        src={home}
        className="absolute inset-0 w-full h-full object-cover"
        alt="profile-bg"
      />

      {/* Main Section */}
      <div className="relative w-full min-h-[calc(100vh-60px)] mt-[60px]">
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-4">

          <div className="w-full max-w-4xl bg-black/60 backdrop-blur-md rounded-2xl p-8 text-white shadow-xl relative">

            {/* Back Arrow */}
            <button
              onClick={() => navigate("/")}
              className="absolute top-6 left-6 text-white hover:text-orange-500 transition"
            >
              <FaArrowLeft size={22} />
            </button>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mt-6">

              {/* User Info */}
              <div className="flex items-center gap-4">
                
                {/* Avatar */}
                {userData.photoUrl ? (
                  <img
                    src={userData.photoUrl}
                    alt="profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full flex items-center justify-center bg-orange-500 text-black text-2xl font-bold border-2 border-orange-500">
                    {getInitials(userData.name)}
                  </div>
                )}

                <div>
                  <h1 className="text-3xl font-bold">{userData.name}</h1>
                  <p className="text-orange-500 mt-1">{userData.role}</p>
                </div>
              </div>

              {/* Edit Button */}
              <button className="flex items-center gap-2 px-6 w-40 md:w-50 md:px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition" onClick={()=>navigate('/profile/edit')}>
                <FaEdit />
                Edit Profile
              </button>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">About</h2>
              <p className="text-gray-300 leading-relaxed">
                {userData.description || "No bio added yet."}
              </p>
            </div>

            {/* Email */}
            <div className="mt-6 flex items-center gap-3">
              <FaEnvelope className="text-orange-500" />
              <p className="text-gray-300">{userData.email}</p>
            </div>

            {/* Enrolled Courses Count */}
            <div className="mt-8 flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-5 py-4 w-fit">
              <FaBookOpen className="text-orange-500 text-xl" />
              <div>
                <p className="text-sm text-gray-400">Enrolled Courses</p>
                <p className="text-xl font-bold">
                  {userData.enrolledCourses?.length || 0}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
