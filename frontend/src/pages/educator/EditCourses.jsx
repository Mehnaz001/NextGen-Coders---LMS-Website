import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaTrash, FaBook } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { serverUrl } from "../../App";
import { ClipLoader } from "react-spinners";

const categories = [
  "Web Development",
  "AI / ML",
  "UI / UX Design",
  "Data Science",
  "Cloud Computing",
  "Mobile App Development",
  "DSA",
];

const levels = ["Beginner", "Intermediate", "Advanced"];

const EditCourses = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({});
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/api/course/getcourse/${courseId}`,
        { withCredentials: true }
      );
      setCourse(res.data);
      setPreview(res.data.thumbnail);
    } catch {
      toast.error("Failed to load course");
    }
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(course).forEach((key) => {
        formData.append(key, course[key]);
      });

      if (thumbnail) formData.append("thumbnail", thumbnail);

      await axios.post(
        `${serverUrl}/api/course/editcourse/${courseId}`,
        formData,
        { withCredentials: true }
      );

      toast.success("Course updated");
      navigate("/courses");
    } catch {
      toast.error("Update failed");
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    setDeleting(true);

    try {
      await axios.get(
        `${serverUrl}/api/course/remove/${courseId}`,
        { withCredentials: true }
      );

      toast.success("Course removed");
      navigate("/courses");
    } catch {
      toast.error("Delete failed");
    }

    setDeleting(false);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-20 py-8">

      {/* BACK */}
      <button
        onClick={() => navigate("/courses")}
        className="flex items-center gap-2 text-gray-300 hover:text-orange-500 mb-6"
      >
        <FaArrowLeft />
        Back to Courses
      </button>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">

        {/* LEFT FORM */}
        <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8 space-y-6">

          <h1 className="text-xl sm:text-2xl font-bold">Edit Course</h1>

          <Input
            label="Title"
            value={course.title || ""}
            onChange={(e) =>
              setCourse({ ...course, title: e.target.value })
            }
          />

          <Input
            label="Subtitle"
            value={course.subTitle || ""}
            onChange={(e) =>
              setCourse({ ...course, subTitle: e.target.value })
            }
          />

          <Textarea
            label="Description"
            value={course.description || ""}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />

          <Select
            label="Category"
            value={course.category}
            options={categories}
            onChange={(e) =>
              setCourse({ ...course, category: e.target.value })
            }
          />

          <Select
            label="Level"
            value={course.level}
            options={levels}
            onChange={(e) =>
              setCourse({ ...course, level: e.target.value })
            }
          />

          <Input
            label="Price (₹)"
            type="number"
            value={course.price || ""}
            onChange={(e) =>
              setCourse({ ...course, price: e.target.value })
            }
          />

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={course.isPublished || false}
              onChange={(e) =>
                setCourse({ ...course, isPublished: e.target.checked })
              }
            />
            <span>Publish this course</span>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">

            <button
              disabled={loading}
              onClick={handleSave}
              className="px-6 py-3 bg-orange-500 text-black rounded-full font-semibold flex items-center justify-center"
            >
              {loading ? (
                <ClipLoader color="black" size={22} />
              ) : (
                "Save Changes"
              )}
            </button>

            <button
              onClick={() => navigate(`/createlecture/${courseId}`)}
              className="px-6 py-3 border border-white/20 rounded-full flex items-center justify-center gap-2"
            >
              <FaBook />
              Go to Lectures
            </button>

          </div>
        </div>

        {/* RIGHT THUMBNAIL */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 h-fit">

          <h2 className="text-lg font-semibold mb-4">
            Thumbnail
          </h2>

          <img
            src={preview}
            alt="preview"
            className="w-full h-40 sm:h-48 object-cover rounded-xl mb-4 border border-white/20"
          />

          <input
            type="file"
            onChange={(e) => {
              setThumbnail(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
            className="text-sm"
          />

          <button
            disabled={deleting}
            onClick={handleDelete}
            className="mt-6 w-full py-2 bg-red-600 rounded-full flex items-center justify-center gap-2"
          >
            {deleting ? (
              <ClipLoader color="white" size={22} />
            ) : (
              <>
                <FaTrash /> Remove Course
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm text-gray-400 mb-2">{label}</label>
    <input
      {...props}
      className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-orange-500 outline-none"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="block text-sm text-gray-400 mb-2">{label}</label>
    <textarea
      rows={4}
      {...props}
      className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-orange-500 outline-none"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm text-gray-400 mb-2">{label}</label>
    <select
      {...props}
      className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-orange-500 outline-none"
    >
      {options.map((op, i) => (
        <option key={i} value={op}>
          {op}
        </option>
      ))}
    </select>
  </div>
);

export default EditCourses;
