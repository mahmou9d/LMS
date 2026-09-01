"use client";
import { useGetUserAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState, useMemo } from "react";
import CoursesCard from "../Course/CoursesCard";
import { ICourse } from "@/app/types";
import { BiSearch } from "react-icons/bi";
import { HiOutlineAcademicCap, HiOutlineSparkles } from "react-icons/hi2";
import { AiOutlineAppstore, AiOutlineOrderedList } from "react-icons/ai";

/* ─── Static particles ────────────────────────────────────── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 6,
  dur: Math.random() * 8 + 6,
}));

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Most Popular", value: "popular" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Top Rated", value: "rated" },
];

/* ─── Component ──────────────────────────────────────────── */
const Courses = () => {
  const { data, isLoading } = useGetUserAllCoursesQuery({});
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    if (data?.courses) setCourses(data.courses);
  }, [data]);

  /* ── Dynamic categories from data ── */
  const categories = useMemo(() => {
    const cats = new Set<string>(["All"]);
    courses.forEach((c) => {
      if (c.categories) cats.add(c.categories);
    });
    return Array.from(cats);
  }, [courses]);

  /* ── Filter + Sort ── */
  const filtered = useMemo(() => {
    let list = [...courses];

    if (activeCategory !== "All")
      list = list.filter((c) => c.categories === activeCategory);

    if (search.trim())
      list = list.filter((c) =>
        c.name?.toLowerCase().includes(search.toLowerCase()),
      );

    return list;
  }, [courses, search, activeCategory]);

  return (
    <>
      <section
        className="relative overflow-hidden pb-20 pt-[100px] min-h-screen"
        id="courses"
      >
        {/* Background */}
        <div className="pointer-events-none absolute -left-[100px] -top-[120px] z-0 h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,.12)_0%,transparent_70%)] " />
        <div className="pointer-events-none absolute -bottom-[80px] -right-[80px] z-0 h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,.1)_0%,transparent_70%)] " />

        <div className="relative z-[1] mx-auto max-w-[1280px] px-6">
          {/* ── Section Header ── */}
          <div className="mb-[52px] text-center">
            <div className="mb-[18px] inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-[linear-gradient(135deg,rgba(99,102,241,.1),rgba(139,92,246,.1))] px-4 py-1.5 text-[13px] font-bold uppercase tracking-[.04em] text-indigo-500 dark:border-indigo-500/30 dark:bg-[linear-gradient(135deg,rgba(99,102,241,.18),rgba(139,92,246,.18))] dark:text-indigo-400">
              <HiOutlineSparkles />
              Explore Courses
            </div>
            <h2 className="mb-4 text-[clamp(2rem,4vw,3rem)] font-black leading-[1.18] tracking-[-.03em] text-gray-900 dark:text-gray-100">
              Expand Your Career{" "}
              <span className="bg-[linear-gradient(135deg,#6366f1_0%,#8b5cf6_50%,#a855f7_100%)] bg-clip-text text-transparent [-webkit-text-fill-color:transparent]">
                Opportunity
              </span>
              <br />
              With Our Courses
            </h2>
            <p className="mx-auto max-w-[560px] text-[17px] leading-[1.65] text-gray-500 dark:text-gray-400">
              Discover world-class courses taught by top instructors. Learn at
              your own pace and advance your career today.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                <HiOutlineAcademicCap size={18} />
                <span className="text-base font-extrabold text-gray-900 dark:text-gray-100">
                  {courses.length}+
                </span>
                <span>Courses Available</span>
              </div>
              <div className="h-1 w-1 rounded-full bg-indigo-500/[0.35]" />
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                <span className="text-base font-extrabold text-gray-900 dark:text-gray-100">
                  1k+
                </span>
                <span>Active Learners</span>
              </div>
              <div className="h-1 w-1 rounded-full bg-indigo-500/[0.35]" />
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                <span className="text-base font-extrabold text-gray-900 dark:text-gray-100">
                  4.9★
                </span>
                <span>Avg. Rating</span>
              </div>
            </div>
          </div>

          {/* ── Controls ── */}
          <div className="mb-9 flex flex-wrap items-center justify-between gap-4">
            {/* Search */}
            <div className="min-w-[240px] max-w-[380px] flex-1">
              <div className="group flex items-center gap-2.5 rounded-[14px] border-[1.5px] border-indigo-500/[0.14] bg-white/[0.85] px-4 py-2.5 shadow-[0_4px_20px_rgba(99,102,241,0.06)] transition-all duration-300 focus-within:border-indigo-500/50 focus-within:shadow-[0_8px_30px_rgba(99,102,241,0.14),0_0_0_4px_rgba(99,102,241,0.08)] dark:border-indigo-500/20 dark:bg-[#090919]/[0.85] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                <span className="flex-shrink-0 text-gray-400 transition-colors group-focus-within:text-indigo-500">
                  <BiSearch size={20} />
                </span>
                <input
                  type="text"
                  className="flex-1 bg-transparent border-none outline-none font-[inherit] text-sm text-gray-900 caret-[#6366f1] placeholder:text-gray-400 dark:text-gray-100"
                  placeholder="Search courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Sort + View */}
            <div className="flex items-center gap-2.5">
              <button
                className={`flex h-10 w-10 items-center justify-center rounded-[11px] border-[1.5px] text-lg  transition-all duration-[250ms] ${
                  view === "grid"
                    ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/[0.18] dark:text-indigo-400"
                    : "border-indigo-500/[0.15] bg-white/[0.85] text-gray-500 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-500 dark:border-indigo-500/20 dark:bg-[#090919]/[0.85] dark:text-gray-400 dark:hover:bg-indigo-500/[0.18] dark:hover:text-indigo-400"
                }`}
                onClick={() => setView("grid")}
                title="Grid view"
              >
                <AiOutlineAppstore />
              </button>
              <button
                className={`flex h-10 w-10 items-center justify-center rounded-[11px] border-[1.5px] text-lg  transition-all duration-[250ms] ${
                  view === "list"
                    ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/[0.18] dark:text-indigo-400"
                    : "border-indigo-500/[0.15] bg-white/[0.85] text-gray-500 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-500 dark:border-indigo-500/20 dark:bg-[#090919]/[0.85] dark:text-gray-400 dark:hover:bg-indigo-500/[0.18] dark:hover:text-indigo-400"
                }`}
                onClick={() => setView("list")}
                title="List view"
              >
                <AiOutlineOrderedList />
              </button>
            </div>
          </div>

          {/* ── Category Pills ── */}
          {categories.length > 1 && (
            <div className="mb-9 flex flex-wrap items-center gap-2.5">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    className={`whitespace-nowrap rounded-full border-[1.5px] px-[18px] py-[7px] text-[13.5px] font-semibold transition-all duration-[250ms] ${
                      isActive
                        ? "border-transparent bg-[linear-gradient(135deg,#6366f1_0%,#8b5cf6_100%)] text-white shadow-[0_4px_14px_rgba(99,102,241,0.35)] hover:-translate-y-0.5 dark:shadow-[0_4px_14px_rgba(99,102,241,0.45)]"
                        : "border-indigo-500/[0.15] bg-white/[0.85] text-gray-600 hover:border-indigo-500/40 hover:bg-indigo-500/[0.06] hover:text-indigo-500 dark:border-indigo-500/20 dark:bg-[#090919]/[0.85] dark:text-gray-400 dark:hover:bg-indigo-500/[0.12] dark:hover:text-indigo-400"
                    }`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Result info ── */}
          {!isLoading && (
            <p className="mb-5 text-[13.5px] font-medium text-gray-500 dark:text-gray-400">
              Showing{" "}
              <strong className="font-extrabold text-indigo-500 dark:text-indigo-400">
                {filtered.length}
              </strong>{" "}
              course
              {filtered.length !== 1 ? "s" : ""}
              {search && ` for "${search}"`}
              {activeCategory !== "All" && ` in ${activeCategory}`}
            </p>
          )}

          {/* ── Content ── */}
          {isLoading ? (
            /* Skeleton */
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-[20px] border-[1.5px] border-indigo-500/10 bg-white/[0.85] dark:border-indigo-500/15 dark:bg-[#0f1535]/60"
                >
                  <div className="h-[180px] bg-[linear-gradient(90deg,rgba(99,102,241,.06)_0%,rgba(99,102,241,.12)_50%,rgba(99,102,241,.06)_100%)] bg-[length:200%_100%] dark:bg-[linear-gradient(90deg,rgba(255,255,255,.03)_0%,rgba(255,255,255,.07)_50%,rgba(255,255,255,.03)_100%)]" />
                  <div className="flex flex-col gap-2.5 p-[18px]">
                    <div className="h-3 w-[80%] rounded-md bg-[linear-gradient(90deg,rgba(99,102,241,.06)_0%,rgba(99,102,241,.12)_50%,rgba(99,102,241,.06)_100%)] bg-[length:200%_100%] dark:bg-[linear-gradient(90deg,rgba(255,255,255,.03)_0%,rgba(255,255,255,.07)_50%,rgba(255,255,255,.03)_100%)]" />
                    <div className="h-3 w-[55%] rounded-md bg-[linear-gradient(90deg,rgba(99,102,241,.06)_0%,rgba(99,102,241,.12)_50%,rgba(99,102,241,.06)_100%)] bg-[length:200%_100%] dark:bg-[linear-gradient(90deg,rgba(255,255,255,.03)_0%,rgba(255,255,255,.07)_50%,rgba(255,255,255,.03)_100%)]" />
                    <div className="h-3 w-[35%] rounded-md bg-[linear-gradient(90deg,rgba(99,102,241,.06)_0%,rgba(99,102,241,.12)_50%,rgba(99,102,241,.06)_100%)] bg-[length:200%_100%] dark:bg-[linear-gradient(90deg,rgba(255,255,255,.03)_0%,rgba(255,255,255,.07)_50%,rgba(255,255,255,.03)_100%)]" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            /* Empty */
            <div className="py-20 px-5 text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[24px] border-[1.5px] border-indigo-500/[0.15] bg-[linear-gradient(135deg,rgba(99,102,241,.1),rgba(139,92,246,.1))] text-indigo-500 dark:border-indigo-500/25 dark:bg-[linear-gradient(135deg,rgba(99,102,241,.2),rgba(139,92,246,.2))] dark:text-indigo-400">
                <HiOutlineAcademicCap size={36} />
              </div>
              <p className="mb-2 text-xl font-extrabold text-gray-900 dark:text-gray-100">
                No courses found
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter to find what you&apos;re
                looking for.
              </p>
            </div>
          ) : (
            /* Grid / List */
            <div
              className={`grid gap-6 ${
                view === "grid"
                  ? "grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
                  : "grid-cols-1 !gap-4"
              }`}
            >
              {filtered.map((course: ICourse, index: number) => (
                <div key={course._id || index}>
                  <CoursesCard course={course} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Courses;
