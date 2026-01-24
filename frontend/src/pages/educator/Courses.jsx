import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus, FaEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {serverUrl} from '../../App.jsx'
import axios from 'axios'
import { setCreatorCourseData } from '../../redux/courseSlice.js'

const StatusBadge = ({ status }) => {
  const isPublished = status === true;

  return (
    <span
      className={`text-xs px-3 py-1 rounded-full font-semibold border
      ${
        isPublished
          ? "bg-green-500/20 text-green-400 border-green-500/30"
          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      }`}
    >
      {isPublished ? "Published" : "Draft"}
    </span>
  );
};

const Courses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { creatorCourseData } = useSelector((state) => state.course);

  useEffect(()=>{
    const creatorCourses = async () => {
      try {
        const result = await axios.get(serverUrl + '/api/course/getcreator', {withCredentials:true})
        console.log(result.data)
        dispatch(setCreatorCourseData(result.data))
      } catch (error) {
              console.log(error)
      }
    }
      creatorCourses()
    },[])
    
  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-16 py-10">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-300 hover:text-orange-500 transition"
        >
          <FaArrowLeft />
          Back to Dashboard
        </button>

        <button
          onClick={() => navigate("/createcourse")}
          className="flex items-center gap-2 px-5 py-2 bg-orange-500 text-black rounded-full font-semibold hover:bg-orange-400 transition"
        >
          <FaPlus />
          Create Course
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-8">Your Courses</h1>

      
      <div className="space-y-5">
        {creatorCourseData?.map((course) => (
          <div
            key={course._id}
            className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-orange-500/40 transition"
          >
            {/* Left */}
            <div className="flex items-center gap-5">
              <img
                src={
                  course.thumbnail ||
                  "https://www.shutterstock.com/image-vector/add-picture-icon-vector-symbol-600nw-2529626937.jpg"
                }
                alt="thumbnail"
                className="w-20 h-20 rounded-xl object-cover border border-white/20"
              />

              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <StatusBadge status={course.isPublished} />
                </div>

                <div className="flex gap-6 text-sm text-gray-400 mt-2">
                  <p>{course.students?.length || 0} Students</p>
                  <p>₹{course.price || 0}</p>
                </div>
              </div>
            </div>

            {/* Edit */}
            <button
              onClick={() => navigate(`/editcourse/${course._id}`)}
              className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full hover:bg-orange-500 hover:text-black transition"
            >
              <FaEdit />
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
