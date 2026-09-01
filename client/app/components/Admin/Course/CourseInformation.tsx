"use client";

import { useGetHeroDataQuery } from "@/redux/features/layout/page";
import React, { FC, useEffect, useState } from "react";
import { ICourseInfo, ICategory } from "@/app/types";

type Props = {
  courseInfo: ICourseInfo;
  setCourseInfo: (courseInfo: ICourseInfo) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetHeroDataQuery("Categories", {});
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories || []);
    }
  }, [data]);

  const handlerSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handlerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2 && typeof fileReader.result === "string") {
          setCourseInfo({ ...courseInfo, thumbnail: fileReader.result });
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handlerDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handlerDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handlerDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e?.dataTransfer?.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (typeof fileReader.result === "string") {
          setCourseInfo({ ...courseInfo, thumbnail: fileReader.result });
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  const levels = ["Beginner", "Intermediate", "Advanced"];

  // Shared field classes, reused across text/number/select/textarea inputs.
  const inputBase =
    "w-full box-border rounded-[13px] border-[1.5px] border-indigo-500/[0.17] bg-indigo-500/[0.04] px-4 py-[0.72rem] text-[0.875rem] text-inherit font-[inherit] outline-none transition-all duration-[250ms] placeholder:text-slate-500/50 focus:border-indigo-500 focus:bg-indigo-500/[0.06] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.10)]";
  // Same as inputBase but with left padding for the "$" prefix instead of px-4,
  // so pl-8 doesn't fight with a px-4 utility for specificity.
  const priceInputBase =
    "w-full box-border rounded-[13px] border-[1.5px] border-indigo-500/[0.17] bg-indigo-500/[0.04] pl-8 pr-4 py-[0.72rem] text-[0.875rem] text-inherit font-[inherit] outline-none transition-all duration-[250ms] focus:border-indigo-500 focus:bg-indigo-500/[0.06] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.10)]";
  const labelBase =
    "mb-[7px] block text-[0.75rem] font-bold uppercase tracking-[0.045em] text-indigo-500";
  const sectionBase =
    "mt-8 mb-[22px] flex items-center gap-2 border-b-[1.5px] border-indigo-500/[0.12] pb-[10px] text-[0.7rem] font-extrabold uppercase tracking-[0.08em] text-indigo-500 first:mt-0";

  return (
    <>
      {/* No custom keyframes needed here, so no leftover <style> tag —
          every rule below is a plain Tailwind utility class. */}
      <div className="mx-auto mt-[90px] sm:my-24 mb-[60px] w-full sm:w-[90%] max-w-[820px]">
        {/* Header */}
        <h2 className="mb-1.5 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] bg-clip-text font-poppins text-[1.4rem] font-extrabold text-transparent">
          Create New Course
        </h2>
        <p className="mb-7 text-[0.83rem] font-medium text-slate-500 dark:text-slate-400">
          Fill in the details below to publish your course on the platform.
        </p>

        {/* Card */}
        <div className="rounded-[22px] border-[1.5px] border-indigo-500/[0.13] bg-white/90 px-4 sm:px-10 py-6 sm:py-9 shadow-[0_6px_30px_rgba(99,102,241,0.07)] dark:bg-[rgba(15,21,53,0.75)] dark:shadow-[0_6px_30px_rgba(0,0,0,0.28)]">
          <form onSubmit={handlerSumbit}>
            {/* ── Basic Information ── */}
            <div className={sectionBase}>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6]" />
              Basic Information
            </div>

            <div className="mb-5">
              <label className={labelBase}>
                Course Name <span className="ml-0.5 text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={courseInfo.name || ""}
                onChange={(e) =>
                  setCourseInfo({ ...courseInfo, name: e.target.value })
                }
                placeholder="e.g. Full-Stack Web Development Bootcamp"
                className={inputBase}
              />
            </div>

            <div className="mb-5">
              <label className={labelBase}>Course Description</label>
              <textarea
                rows={5}
                value={courseInfo.description || ""}
                onChange={(e) =>
                  setCourseInfo({ ...courseInfo, description: e.target.value })
                }
                placeholder="Describe what students will learn in this course..."
                className={`${inputBase} min-h-[110px] resize-y leading-[1.6]`}
              />
            </div>

            <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
              <div className="mb-5">
                <label className={labelBase}>Tags</label>
                <input
                  type="text"
                  value={courseInfo.tags || ""}
                  onChange={(e) =>
                    setCourseInfo({ ...courseInfo, tags: e.target.value })
                  }
                  placeholder="React, Node.js, TypeScript"
                  className={inputBase}
                />
                <p className="mt-[5px] text-[0.72rem] italic text-slate-400">
                  Separate tags with commas
                </p>
              </div>

              <div className="mb-5">
                <label className={labelBase}>Category</label>
                <select
                  required
                  value={courseInfo.categories || ""}
                  onChange={(e) =>
                    setCourseInfo({ ...courseInfo, categories: e.target.value })
                  }
                  className={`${inputBase} cursor-pointer text-slate-800 dark:text-slate-200 [&>option]:dark:bg-slate-800`}
                >
                  <option value="">Select Category</option>
                  {categories && categories.length > 0 ? (
                    categories.map((item: ICategory) => (
                      <option value={item.title} key={item._id}>
                        {item.title}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      ⚠️ No categories yet — add them in Admin &gt;
                      Customization &gt; Categories
                    </option>
                  )}
                </select>
                {(!categories || categories.length === 0) && (
                  <p className="mt-[5px] text-[0.75rem] text-amber-500">
                    ⚠️ Go to <strong>Admin → Customization → Categories</strong>{" "}
                    to add categories first.
                  </p>
                )}
              </div>
            </div>

            {/* ── Pricing ── */}
            <div className={sectionBase}>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6]" />
              Pricing
            </div>

            <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
              <div className="mb-5">
                <label className={labelBase}>
                  Price <span className="ml-0.5 text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-[13px] top-1/2 -translate-y-1/2 text-[0.85rem] font-bold text-indigo-500">
                    $
                  </span>
                  <input
                    type="number"
                    required
                    min={0}
                    value={courseInfo.price || ""}
                    onChange={(e) =>
                      setCourseInfo({ ...courseInfo, price: e.target.value })
                    }
                    placeholder="29"
                    className={priceInputBase}
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className={labelBase}>Estimated (Original) Price</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-[13px] top-1/2 -translate-y-1/2 text-[0.85rem] font-bold text-indigo-500">
                    $
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={courseInfo.estimatedPrice || ""}
                    onChange={(e) =>
                      setCourseInfo({
                        ...courseInfo,
                        estimatedPrice: e.target.value,
                      })
                    }
                    placeholder="79"
                    className={priceInputBase}
                  />
                </div>
              </div>
            </div>

            {/* ── Course Details ── */}
            <div className={sectionBase}>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6]" />
              Course Details
            </div>

            <div className="mb-5">
              <label className={labelBase}>Level</label>
              <div className="mt-1 flex flex-wrap gap-[10px]">
                {levels.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setCourseInfo({ ...courseInfo, level: lvl })}
                    className={
                      courseInfo.level === lvl
                        ? "rounded-full border-[1.5px] border-transparent bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] px-5 py-1.5 text-[0.8rem] font-bold text-white shadow-[0_3px_12px_rgba(99,102,241,0.35)] transition-all duration-[180ms]"
                        : "rounded-full border-[1.5px] border-indigo-500/20 bg-indigo-500/[0.04] px-5 py-1.5 text-[0.8rem] font-bold text-indigo-500 transition-all duration-[180ms] hover:border-indigo-500 hover:bg-indigo-500/[0.08]"
                    }
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className={labelBase}>Demo Video URL</label>
              <input
                type="url"
                value={courseInfo.demoUrl || ""}
                onChange={(e) =>
                  setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
                }
                placeholder="https://youtube.com/watch?v=..."
                className={inputBase}
              />
            </div>

            {/* ── Thumbnail ── */}
            <div className={sectionBase}>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6]" />
              Thumbnail
            </div>

            <input
              type="file"
              accept="image/*"
              id="file"
              className="hidden"
              onChange={handlerFileChange}
            />
            <label
              htmlFor="file"
              onDragOver={handlerDragOver}
              onDragLeave={handlerDragLeave}
              onDrop={handlerDrop}
              className={
                "group relative flex min-h-[180px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-indigo-500/25 bg-indigo-500/[0.03] transition-all duration-200 hover:border-indigo-500 hover:bg-indigo-500/[0.06] hover:shadow-[0_0_0_4px_rgba(99,102,241,0.08)] " +
                (dragging
                  ? "border-indigo-500 bg-indigo-500/[0.06] shadow-[0_0_0_4px_rgba(99,102,241,0.08)]"
                  : "")
              }
            >
              {courseInfo.thumbnail ? (
                <>
                  <img
                    src={courseInfo.thumbnail}
                    alt="Course thumbnail"
                    className="w-full h-full min-h-[180px] object-cover rounded-2xl block"
                  />
                  <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[rgba(15,21,53,0.45)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <span className="rounded-[10px] bg-indigo-500/85 px-[22px] py-2 text-[0.8rem] font-bold text-white">
                      Change Image
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-[14px] bg-indigo-500/[0.08] text-indigo-500">
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                  </div>
                  <p className="text-[0.88rem] font-semibold text-indigo-500">
                    Drag &amp; drop or click to upload
                  </p>
                  <p className="mt-1 text-[0.75rem] text-slate-400">
                    PNG, JPG, WEBP — Recommended 1280×720
                  </p>
                </>
              )}
            </label>

            {/* Footer */}
            <div className="mt-8 flex items-center justify-between border-t-[1.5px] border-indigo-500/10 pt-6">
              <span className="text-[0.8rem] font-semibold text-slate-400">
                Step{" "}
                <strong className="font-extrabold text-indigo-500">1</strong> of
                4
              </span>
              <button
                type="submit"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-[13px] border-none bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] px-8 py-[11px] text-[0.9rem] font-bold text-white shadow-[0_4px_18px_rgba(99,102,241,0.32)]  hover:shadow-[0_6px_22px_rgba(99,102,241,0.42)] "
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                Next Step
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CourseInformation;
