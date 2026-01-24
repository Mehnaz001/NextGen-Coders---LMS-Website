import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import {ClipLoader} from "react-spinners";
import axios from "axios";
import { toast } from "react-toastify";
import { serverUrl } from "../../App.jsx"; 

const categories = [
  "Web Development",
  "AI / ML",
  "UI / UX Design",
  "Data Science",
  "Cloud Computing",
  "Mobile App Development",
  "DSA",
];

const CreateCourse = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [loading,setLoading] = useState(false)

  const handleCreate = async () => {
    setLoading(true)
    try{
      const result = await axios.post(serverUrl + '/api/course/create', {title,category}, {withCredentials:true})
      console.log(result.data)
      setLoading(false)
      toast.success("Course created successfully")
      navigate("/courses")
    } catch(error) {
      setLoading(false)
      console.log(error)
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-16 py-10">
      {/* Back */}
      <button
        onClick={() => navigate("/courses")}
        className="flex items-center gap-2 text-gray-300 hover:text-orange-500 transition mb-10"
      >
        <FaArrowLeft />
        Back to Courses
      </button>

      {/* Card */}
      <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
        <h1 className="text-2xl font-bold mb-8">Create New Course</h1>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">
            Course Title
          </label>
          <input
            type="text"
            placeholder="Enter course title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Category */}
        <div className="mb-8">
          <label className="block text-sm text-gray-400 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:border-orange-500"
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreate}
          disabled = {loading}
          className="w-full py-3 bg-orange-500 text-black font-semibold rounded-full hover:bg-orange-400 transition"
        >
          {loading? <ClipLoader size={30} color="black"/>: "Create Course" }
        </button>
      </div>
    </div>
  );
};

export default CreateCourse;
