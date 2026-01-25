import React, { useMemo, useState } from "react";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong, FaMagnifyingGlass } from "react-icons/fa6";
import CourseCard from "../components/CourseCard";

const categoriesList = [
  "Web Development",
  "AI / ML",
  "UI / UX Design",
  "Data Science",
  "Cloud Computing",
  "Mobile App Development",
  "DSA",
];

const AllCourses = () => {
  const navigate = useNavigate();
  const { courseData } = useSelector((state) => state.course);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState("");

  const toggleCategory = (value) => {
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((c) => c !== value)
        : [...prev, value]
    );
  };

  const filteredCourses = useMemo(() => {
    return courseData?.filter((course) => {
      const matchSearch = course.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(course.category);

      return matchSearch && matchCategory;
    });
  }, [courseData, search, selectedCategories]);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* ✅ Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* ✅ Page starts below navbar */}
      <div className="pt-24 flex px-6 md:px-16 gap-10">
        {/* ✅ Sidebar */}
        <aside className="w-72 sticky top-24 h-fit bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 text-lg font-semibold">
            <FaArrowLeftLong
              className="cursor-pointer hover:text-orange-500"
              onClick={() => navigate("/home")}
            />
            Filters
          </div>

          {/* Search with icon */}
          <div className="relative mb-6">
            <FaMagnifyingGlass className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-orange-500 outline-none"
            />
          </div>

          {/* Categories */}
          <div className="space-y-3">
            {categoriesList.map((cat, i) => (
              <label
                key={i}
                className="flex items-center gap-3 text-gray-300 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </aside>

        {/* ✅ Courses */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-8">All Courses</h1>

          {filteredCourses?.length === 0 ? (
            <p className="text-gray-400">No courses found.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
