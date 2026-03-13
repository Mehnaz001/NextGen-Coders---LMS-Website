import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  FaPlus,
  FaBookOpen,
  FaUsers,
  FaRupeeSign,
  FaArrowLeft
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { serverUrl } from "../../App";

const Dashboard = () => {

  const navigate = useNavigate();
  const { userData } = useSelector(state => state.user);

  const [courses, setCourses] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [progressGraph, setProgressGraph] = useState([]);
  const [enrollGraph, setEnrollGraph] = useState([]);

  // ✅ Fetch Creator Courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/course/getcreator`,
          { withCredentials: true }
        );

        const courseList = res.data?.data || res.data || [];

        console.log("Fetched Courses:", courseList); // 👈 DEBUG

        setCourses(courseList);
        calculateAnalytics(courseList);

      } catch (error) {
        console.log(error);
      }
    };

    fetchCourses();
  }, []);

  // ✅ Analytics Calculation
  const calculateAnalytics = (coursesData) => {

    let totalEarnings = 0;
    let totalStudents = 0;

    let courseGraph = [];
    let enrollGraphData = [];

    coursesData.forEach(course => {

      // 🔥 SAFE STUDENT COUNT (handles all backend formats)
      const students =
        course.studentsCount ||
        course.students?.length ||
        course.enrolledStudents?.length ||
        0;

      const price = Number(course.price || 0);

      totalStudents += students;
      totalEarnings += students * price;

      // 📊 Lectures Graph
      courseGraph.push({
        name: course.title?.slice(0, 12) || "Course",
        lectures: course.lectures?.length || 0
      });

      // 📊 Enrollment Graph
      enrollGraphData.push({
        name: course.title?.slice(0, 12) || "Course",
        students: students
      });

    });

    setAnalytics({
      totalCourses: coursesData.length,
      totalStudents,
      totalEarnings
    });

    setProgressGraph(courseGraph);
    setEnrollGraph(enrollGraphData);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-16 py-12">

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-400 hover:text-orange-500 mb-10"
      >
        <FaArrowLeft />
        Back to Home
      </button>

      {/* Profile Section */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-8">

        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center overflow-hidden">
            {userData?.photoUrl ? (
              <img
                src={userData.photoUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-bold">
                {userData?.name?.charAt(0)}
              </span>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              {userData?.name}
            </h2>
            <p className="text-gray-400 text-sm">
              Instructor Dashboard
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/createcourse")}
          className="px-6 py-2 bg-orange-500 text-black rounded-full flex items-center gap-2 hover:bg-orange-400 transition"
        >
          <FaPlus />
          Create Course
        </button>

      </div>

      {/* Insight Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">

        <InsightCard
          icon={<FaBookOpen />}
          title="Courses"
          value={analytics?.totalCourses || 0}
          onClick={() => navigate("/courses")}
        />

        <InsightCard
          icon={<FaUsers />}
          title="Students"
          value={analytics?.totalStudents || 0}
          onClick={() => navigate("/students")}
        />

        <InsightCard
          icon={<FaRupeeSign />}
          title="Earnings"
          value={analytics?.totalEarnings || 0}
          onClick={() => navigate("/transactions")}
        />

      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-8 mt-12">

        {/* Course Lectures Chart */}
        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">
            Course Lectures Analytics
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={progressGraph}>
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />

              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                contentStyle={{
                  backgroundColor: "#111",
                  border: "1px solid #333",
                  borderRadius: "10px"
                }}
                itemStyle={{ color: "#fff" }}
                labelStyle={{ color: "#f97316" }}
              />

              <Bar
                dataKey="lectures"
                fill="#22c55e"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Enrollment Chart */}
        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">
            Enrollment Analytics
          </h3>

          {analytics?.totalStudents > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={enrollGraph}>
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />

                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "1px solid #333",
                    borderRadius: "10px"
                  }}
                  itemStyle={{ color: "#fff" }}
                  labelStyle={{ color: "#f97316" }}
                />

                <Bar
                  dataKey="students"
                  fill="#f97316"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center">
              No enrollment data
            </p>
          )}

        </div>

      </div>

    </div>
  );
};

const InsightCard = ({ icon, title, value, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-[#111] border border-white/10 rounded-xl p-6 flex flex-col items-center gap-3 hover:border-orange-500 transition cursor-pointer"
    >
      <div className="text-3xl text-orange-500">
        {icon}
      </div>

      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <p className="text-2xl font-bold">
        {value}
      </p>
    </div>
  );
};

export default Dashboard;