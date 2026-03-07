import React, { useMemo, useState } from "react";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong, FaFilter } from "react-icons/fa6";
import CourseCard from "../components/CourseCard";
import aiSearch from "../assets/ai-search.png";

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
  const { courseData = [] } = useSelector((state) => state.course);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const toggleCategory = (value) => {
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((c) => c !== value)
        : [...prev, value]
    );
  };

  const filteredCourses = useMemo(() => {
    return courseData.filter((course) => {
      const matchSearch = course.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(course.category);

      return matchSearch && matchCategory;
    });
  }, [courseData, search, selectedCategories]);

  return (
    <div className="bg-black text-white min-h-screen">
      <Nav />

      {/* MOBILE FILTER BUTTON */}
      <div className="md:hidden flex justify-between items-center px-6 pt-24">
        <h1 className="text-2xl font-bold">Discover Courses That Matter</h1>
        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-2 border border-white/20 px-4 py-2 rounded-lg"
        >
          <FaFilter />
          Filters
        </button>
      </div>

      <div className="flex pt-[72px]">
        {/* SIDEBAR */}
        <aside
          className={`fixed md:static top-[72px] left-0 h-[calc(100vh-72px)] w-72 bg-black border-r border-white/10 p-6 overflow-y-auto transition-transform z-50
          ${showFilters ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          {/* Close for mobile */}
          <div className="flex items-center justify-between mb-8 md:hidden">
            <h2 className="font-semibold text-lg">Filters</h2>
            <button onClick={() => setShowFilters(false)}>✕</button>
          </div>

          <div className="flex items-center gap-3 mb-8 text-lg font-semibold">
            <FaArrowLeftLong
              className="cursor-pointer hover:text-orange-500"
              onClick={() => navigate("/")}
            />
            Filters
          </div>

          {/* AI Search */}
          <div className="relative mb-6" onClick={()=> navigate('/search')}>
            <img
              src={aiSearch}
              alt="AI Search"
              className="w-5 h-5 absolute top-1/2 -translate-y-1/2 left-3 opacity-90"
            />
            <input
              type="text"
              placeholder="Search courses with AI..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-orange-500 outline-none text-white placeholder-gray-500"
            />
          </div>

          {/* Categories */}
          <div className="space-y-4">
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

        {/* COURSES */}
        <main className="flex-1 md:ml-0 ml-0 p-6 md:p-10 w-full">
          <h1 className="hidden md:block text-4xl font-bold mb-10">
            Discover Courses That Matter
          </h1>

          {filteredCourses.length === 0 ? (
            <p className="text-gray-400">No courses found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredCourses.map((course) => (
                <CourseCard key={course._id} course={course} reviews={course.reviews} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllCourses;
