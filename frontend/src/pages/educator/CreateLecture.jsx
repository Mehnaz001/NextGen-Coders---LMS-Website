import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../App.jsx";
import { setLectureData } from "../../redux/lectureSlice.js";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { FaEdit } from "react-icons/fa";


const CreateLecture = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const [lectureTitle, setLectureTitle] = useState("");
  const { lectureData = [] } = useSelector((state) => state.lecture);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch lectures correctly
  const fetchLectures = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/course/courselecture/${courseId}`,
        { withCredentials: true }
      );
      dispatch(setLectureData(result.data.course.lectures));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  // ✅ Create lecture
  const handleCreateLecture = async () => {
    if (!lectureTitle.trim()) return toast.error("Enter lecture title");

    setLoading(true);
    try {
      await axios.post(
        `${serverUrl}/api/course/createlecture/${courseId}`,
        { lectureTitle },
        { withCredentials: true }
      );

      toast.success("Lecture Added");
      setLectureTitle("");

      // ✅ refresh instead of pushing manually
      fetchLectures();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-16 py-10">
      {/* Back */}
      <button
        onClick={() => navigate(`/editcourse/${courseId}`)}
        className="flex items-center gap-2 text-gray-300 hover:text-orange-500 mb-8"
      >
        <FaArrowLeft /> Back to Course
      </button>

      <h1 className="text-3xl font-bold mb-6">Create Lecture</h1>

      {/* Add Lecture */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="Lecture Title"
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-orange-500 outline-none"
        />

        <button
          disabled={loading}
          onClick={handleCreateLecture}
          className="px-6 py-3 bg-orange-500 text-black font-semibold rounded-full flex items-center justify-center gap-2 min-w-[180px]"
        >
          {loading ? (
            <ClipLoader color="black" size={20} />
          ) : (
            <>
              <FaPlus /> Create Lecture
            </>
          )}
        </button>
      </div>

      {/* Lecture List */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">All Lectures</h2>

        {lectureData.length === 0 ? (
          <p className="text-gray-400">No lectures added yet.</p>
        ) : (
          <ul className="space-y-4">
            {lectureData.map((lec, index) => (
              <li
                key={lec._id}
                className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex items-center justify-between hover:border-orange-500/40 transition"
              >
                {/* Left */}
                <div className="flex flex-col">
                  <span className="text-sm text-orange-500 font-semibold">
                    Lecture - {index + 1}
                  </span>
                  <span className="text-white text-lg font-medium">
                    {lec.lectureTitle}
                  </span>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => navigate(`/editlecture/${courseId}/${lec._id}`)}
                  className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-sm hover:bg-orange-500 hover:text-black transition"
                >
                  <FaEdit />
                  Edit
                </button>

              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default CreateLecture;
