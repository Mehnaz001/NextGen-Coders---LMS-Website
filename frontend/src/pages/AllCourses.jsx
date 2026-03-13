import React, { useMemo, useState, useEffect } from "react";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
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

  const [searchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("category");

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (categoryFromURL) {
      setSelectedCategories([categoryFromURL]);
      setSearch("");
    }
  }, [categoryFromURL]);

  const toggleCategory = (value) => {
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((c) => c !== value)
        : [...prev, value]
    );
  };

  const filteredCourses = useMemo(() => {
    return courseData.filter((course) => {
      const query = search.toLowerCase();

      const matchSearch =
        course.title?.toLowerCase().includes(query) ||
        course.description?.toLowerCase().includes(query) ||
        course.category?.toLowerCase().includes(query);

      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(course.category);

      return matchSearch && matchCategory;
    });
  }, [courseData, search, selectedCategories]);

  return (
    <div className="bg-black text-white min-h-screen">
      <Nav />

      <div className="pt-32 px-6 md:px-10">

        {/* MOBILE HEADER */}
        <div className="md:hidden flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Discover Courses</h1>

          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 border border-white/20 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-black transition"
          >
            <FaFilter />
            Filters
          </button>
        </div>

        {/* PAGE LAYOUT */}
        <div className="flex">

          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden md:block fixed top-32 left-10 w-64 h-[calc(100vh-140px)] overflow-y-auto">

            <div className="flex items-center gap-3 mb-6 text-lg font-semibold">
              <FaArrowLeftLong
                className="cursor-pointer hover:text-orange-500"
                onClick={() => navigate("/")}
              />
              Filters
            </div>

            {/* SEARCH */}
            <div className="relative mb-8">
              <img
                src={aiSearch}
                alt="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10 pointer-events-none"
              />

              <input
                type="text"
                placeholder="Search courses"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 bg-white text-black pr-4 py-2 rounded-lg border border-white/10 focus:border-orange-500 outline-none"
              />
            </div>

            {/* CATEGORIES */}
            <div className="space-y-3">
              {categoriesList.map((cat, i) => (
                <label
                  key={i}
                  className="flex items-center gap-3 text-gray-300 cursor-pointer hover:text-orange-500"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="accent-orange-500"
                  />
                  {cat}
                </label>
              ))}
            </div>

          </aside>

          {/* COURSES SECTION */}
          <main className="flex-1 md:ml-80">

            <h1 className="hidden md:block text-4xl font-bold mb-10">
              Discover Courses That Matter
            </h1>

            {filteredCourses.length === 0 ? (
              <p className="text-gray-400">No courses found</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    reviews={course.reviews}
                  />
                ))}
              </div>
            )}

          </main>
        </div>
      </div>

      {/* MOBILE FILTER PANEL */}
      {showFilters && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setShowFilters(false)}
          />

          <aside className="fixed top-0 right-0 h-full w-72 bg-black border-l border-white/10 p-6 z-50 md:hidden">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>

              <button
                className="text-2xl"
                onClick={() => setShowFilters(false)}
              >
                ✕
              </button>
            </div>

            {/* MOBILE SEARCH */}
            <div className="relative mb-6">

              <img
                src={aiSearch}
                alt="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10 pointer-events-none"
              />

              <input
                type="text"
                placeholder="Search Course"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white text-black border border-gray-300 focus:border-orange-500 outline-none"
              />

            </div>

            {/* CATEGORIES */}
            <div className="space-y-3">
              {categoriesList.map((cat, i) => (
                <label
                  key={i}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="accent-orange-500"
                  />
                  {cat}
                </label>
              ))}
            </div>

          </aside>
        </>
      )}
    </div>
  );
};

export default AllCourses;