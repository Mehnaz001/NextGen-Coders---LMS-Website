import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaBookOpen,
  FaUsers,
  FaRupeeSign,
  FaChartLine,
} from "react-icons/fa";

const Dashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-14 py-20">
      {/* PROFILE + EARNINGS */}
      <div className="max-w-5xl mx-auto bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Profile */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 border border-white/30 flex items-center justify-center overflow-hidden text-xl font-bold">
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
            <h2 className="text-xl font-bold">{userData?.name}</h2>
            <p className="text-gray-300 text-sm max-w-sm">
              {userData?.description || "Educator on the platform."}
            </p>
          </div>
        </div>

        {/* Earnings */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="text-gray-300 text-sm">Total Earnings</p>
          <div className="flex items-center gap-1 text-2xl font-bold text-orange-500">
            <FaRupeeSign />
            25,400
          </div>

          <button
            onClick={() => navigate("/courses")}
            className="mt-2 flex items-center gap-2 px-5 py-2 bg-orange-500 text-black rounded-full text-sm font-semibold hover:bg-orange-400 transition"
          >
            <FaPlus />
            Create Course
          </button>
        </div>
      </div>

      {/* INSIGHTS */}
      <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <InsightCard icon={<FaBookOpen />} title="Courses" value="8" />
        <InsightCard icon={<FaUsers />} title="Students" value="1,240" />
        <InsightCard icon={<FaChartLine />} title="Growth" value="+18%" />
      </div>

      {/* GRAPH */}
      <div className="max-w-5xl mx-auto mt-10 bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Course Performance</h3>
        <div className="h-52 border border-dashed border-white/30 rounded-xl flex items-center justify-center text-gray-400 text-sm">
          Graph will appear here
        </div>
      </div>
    </div>
  );
};

const InsightCard = ({ icon, title, value }) => (
  <div className="group bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-5 flex flex-col items-center gap-2 transition hover:bg-orange-500 hover:text-black">
    <div className="text-2xl text-orange-500 group-hover:text-black transition">
      {icon}
    </div>
    <p className="text-sm">{title}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
