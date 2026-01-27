import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaBookOpen,
  FaUsers,
  FaRupeeSign,
  FaChartLine,
  FaArrowLeft,
} from "react-icons/fa";

const Dashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-16 py-12">

      {/* 🔙 Back */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition mb-10"
      >
        <FaArrowLeft />
        Back to Home
      </button>

      {/* 👤 Profile Section */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Left - User Info */}
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-orange-500 text-black flex items-center justify-center text-3xl font-bold overflow-hidden">
            {userData?.photoUrl ? (
              <img
                src={userData.photoUrl}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              userData?.name?.charAt(0).toUpperCase()
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold">{userData?.name}</h2>
            <p className="text-gray-400 text-sm mt-1 max-w-md">
              {userData?.description || "Educator on the platform."}
            </p>
          </div>
        </div>

        {/* Right - Earnings */}
        <div className="text-center md:text-right">
          <p className="text-gray-400 text-sm">Total Earnings</p>
          <div className="flex items-center justify-center md:justify-end gap-1 text-3xl font-bold text-orange-500 mt-1">
            <FaRupeeSign />
            25,400
          </div>

          <button
            onClick={() => navigate("/courses")}
            className="mt-4 flex items-center gap-2 px-6 py-2 bg-orange-500 text-black rounded-full font-semibold hover:bg-orange-400 transition"
          >
            <FaPlus />
            Create Course
          </button>
        </div>
      </div>

      {/* 📊 Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
        <InsightCard icon={<FaBookOpen />} title="Courses" value="8" />
        <InsightCard icon={<FaUsers />} title="Students" value="1,240" />
        <InsightCard icon={<FaChartLine />} title="Growth" value="+18%" />
      </div>

      {/* 📈 Graph Section */}
      <div className="mt-12 bg-[#111] border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-6">Course Performance</h3>

        <div className="h-56 border border-dashed border-white/20 rounded-lg flex items-center justify-center text-gray-500">
          Graph will appear here
        </div>
      </div>
    </div>
  );
};

const InsightCard = ({ icon, title, value }) => (
  <div className="bg-[#111] border border-white/10 rounded-xl p-6 flex flex-col items-center gap-3 hover:border-orange-500 transition">
    <div className="text-3xl text-orange-500">{icon}</div>
    <p className="text-gray-400 text-sm">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
