"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useGetUserAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/page";
import Header from "../components/Header";
import Loader from "../components/Loader/Loader";
import Heading from "../utills/Heading";
import CoursesCard from "../components/Course/CoursesCard";
import Footer from "../components/Footer";
import { HiOutlineAcademicCap, HiOutlineSparkles } from "react-icons/hi2";

import { ICourse, ICategory } from "@/app/types";

const Page = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("title") || "";
  const { data, isLoading } = useGetUserAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [category, setCategory] = useState("All");

  const categories = categoriesData?.layout?.categories;

  // Filter courses based on both selected category and search query
  const filteredCourses = useMemo(() => {
    let list: ICourse[] = data?.courses ? [...data.courses] : [];

    // Filter by category
    if (category !== "All") {
      list = list.filter((item: ICourse) => item.categories === category);
    }

    // Filter by search query
    if (query.trim()) {
      list = list.filter((item: ICourse) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return list;
  }, [data, category, query]);

  useEffect(() => {
    setCourses(filteredCourses);
  }, [filteredCourses]);

  // Tailwind classes for category pills (mirrors the old .cp-cat-pill / .active rules)
  const pillBase =
    "px-[18px] py-[7px] rounded-full text-[13.5px] font-semibold border-[1.5px] whitespace-nowrap cursor-pointer transition-all duration-[250ms] ease-in-out";
  const pillInactive =
    "border-[rgba(99,102,241,0.15)] bg-[rgba(255,255,255,0.85)] text-[#4b5563] hover:border-[rgba(99,102,241,0.4)] hover:text-[#6366f1] hover:bg-[rgba(99,102,241,0.06)] hover:-translate-y-px dark:bg-[rgba(9,9,25,0.85)] dark:border-[rgba(99,102,241,0.2)] dark:text-[#9ca3af] dark:hover:bg-[rgba(99,102,241,0.12)] dark:hover:text-[#818cf8]";
  const pillActive =
    "border-transparent text-white bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] shadow-[0_4px_14px_rgba(99,102,241,0.35)] hover:-translate-y-[2px] dark:shadow-[0_4px_14px_rgba(99,102,241,0.45)]";

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
            activeItem={1}
          />
          <Heading
            title="All Courses - ELearning"
            description="ELearning is a premium platform for learning and teaching online."
            keywords="LMS, online learning, teaching, education, programming, technology"
          />

          <section className="relative overflow-hidden pt-[120px] pb-20 min-h-screen">
            <div className="relative z-[1] max-w-[1280px] mx-auto px-6">
              {/* Header */}
              <div className="text-center mb-[50px] [animation:_.7s_.1s_both]">
                <div className="inline-flex items-center gap-2 px-4 py-[6px] rounded-full bg-gradient-to-br from-[rgba(99,102,241,0.1)] to-[rgba(139,92,246,0.1)] border border-[rgba(99,102,241,0.2)] text-[12.5px] font-bold text-[#6366f1] tracking-[0.05em] uppercase mb-[18px] dark:from-[rgba(99,102,241,0.18)] dark:to-[rgba(139,92,246,0.18)] dark:border-[rgba(99,102,241,0.3)] dark:text-[#818cf8]">
                  <HiOutlineSparkles />
                  Online Courses
                </div>
                <h1 className="text-[clamp(2rem,5vw,2.8rem)] font-black leading-[1.2] tracking-[-0.03em] text-[#111827] mb-3 dark:text-[#f3f4f6]">
                  Expand Your Career{" "}
                  <span className="bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] bg-clip-text text-transparent">
                    Opportunity
                  </span>
                  <br />
                  With Our Courses
                </h1>
                <p className="text-base text-[#6b7280] max-w-[540px] mx-auto leading-[1.6] dark:text-[#9ca3af]">
                  Browse through our collection of premium courses and take your
                  professional skills to the next level.
                </p>
              </div>

              {/* Categories Navigation */}
              <div className="flex items-center gap-2.5 flex-wrap justify-center mb-[45px] [animation:_.7s_.2s_both]">
                <button
                  className={`${pillBase} ${category === "All" ? pillActive : pillInactive}`}
                  onClick={() => setCategory("All")}
                >
                  All
                </button>
                {categories &&
                  categories.map((i: ICategory, index: number) => (
                    <button
                      key={index}
                      className={`${pillBase} ${category === i.title ? pillActive : pillInactive}`}
                      onClick={() => setCategory(i.title || "")}
                    >
                      {i.title}
                    </button>
                  ))}
              </div>

              {/* Results metadata */}
              <p className="text-[13.5px] text-[#6b7280] font-medium mb-6 dark:text-[#9ca3af] [animation:_.7s_.25s_both]">
                Showing{" "}
                <strong className="text-[#6366f1] font-extrabold dark:text-[#818cf8]">
                  {courses?.length || 0}
                </strong>{" "}
                course
                {courses?.length !== 1 ? "s" : ""}
                {query && ` matching "${query}"`}
                {category !== "All" && ` in category "${category}"`}
              </p>

              {/* Courses Grid */}
              {courses && courses.length === 0 ? (
                <div className="text-center py-20 px-5 [animation:_.6s_both]">
                  <div className="w-20 h-20 mx-auto mb-5 rounded-[24px] bg-gradient-to-br from-[rgba(99,102,241,0.1)] to-[rgba(139,92,246,0.1)] border-[1.5px] border-[rgba(99,102,241,0.15)] flex items-center justify-center text-[#6366f1] dark:text-[#818cf8] dark:from-[rgba(99,102,241,0.2)] dark:to-[rgba(139,92,246,0.2)] dark:border-[rgba(99,102,241,0.25)]">
                    <HiOutlineAcademicCap size={36} />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#111827] mb-2 dark:text-[#f3f4f6]">
                    No Courses Found
                  </h3>
                  <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">
                    We couldn&apos;t find any courses matching your filters. Try
                    selecting another category or adjusting your search.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))] [animation:_.7s_.3s_both]">
                  {courses &&
                    courses.map((item: ICourse, index: number) => (
                      <div
                        key={item._id || index}
                        className="[animation:_.5s_both]"
                        style={{
                          animationDelay: `${Math.min(index * 0.05, 0.4)}s`,
                        }}
                      >
                        <CoursesCard course={item} />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </section>

          <Footer />
        </>
      )}
    </div>
  );
};

export default Page;
