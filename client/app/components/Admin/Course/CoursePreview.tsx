import React from "react";
import CoursePlayer from "../../../utills/CoursePlayer";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Rating } from "@mui/material";

interface ICoursePreviewData {
  name?: string;
  title?: string;
  description?: string;
  price?: number | string;
  estimatedPrice?: number | string;
  demoUrl?: string;
  benefit?: Array<{ title: string }>;
  benefits?: Array<{ title: string }>;
}

type Props = {
  courseData: ICoursePreviewData;
  active: number;
  setActive: (active: number) => void;
  handleCourseCreate: () => void;
  isEdit?: boolean;
};

const CoursePreview = ({
  courseData,
  active,
  setActive,
  handleCourseCreate,
  isEdit,
}: Props) => {
  const discountPercentage = courseData?.estimatedPrice
    ? Math.round(
        ((Number(courseData?.estimatedPrice) - Number(courseData?.price)) /
          Number(courseData?.estimatedPrice)) *
          100,
      )
    : 0;

  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCourseCreate();
  };

  const benefitsList = courseData?.benefit || courseData?.benefits || [];

  return (
    <>
      {/* No custom keyframes needed here, so no leftover <style> tag —
          every rule below is a plain Tailwind utility class. */}
      <div className="mx-auto mt-[90px] sm:my-24 mb-[60px] w-full sm:w-[90%] max-w-[900px]">
        <div className="rounded-3xl border-[1.5px] border-indigo-500/[0.12] bg-white/[0.88] p-4 sm:p-8 shadow-[0_4px_24px_rgba(99,102,241,0.06)] transition-shadow duration-[250ms] hover:shadow-[0_8px_32px_rgba(99,102,241,0.12)] dark:bg-[rgba(15,21,53,0.72)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.25)] ">
          {/* Video Player */}
          <div className="overflow-hidden rounded-2xl border border-indigo-500/[0.15] shadow-[0_10px_25px_rgba(0,0,0,0.15)]">
            <CoursePlayer
              videoUrl={courseData.demoUrl}
              title={courseData.name || courseData.title}
            />
          </div>

          {/* Pricing & buy mockup */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-[1.8rem] font-extrabold text-indigo-500">
              {courseData?.price === 0 ? "Free" : `$${courseData?.price}`}
            </span>
            {courseData?.estimatedPrice &&
              Number(courseData?.estimatedPrice) >
                Number(courseData?.price) && (
                <>
                  <span className="text-[1.2rem] line-through opacity-50">
                    ${courseData?.estimatedPrice}
                  </span>
                  <span className="ml-1 rounded-lg bg-emerald-500/[0.12] px-[10px] py-[3px] text-[0.85rem] font-bold text-emerald-500">
                    {discountPercentage}% Off
                  </span>
                </>
              )}
          </div>

          <button className="mt-4 w-full cursor-not-allowed rounded-xl border-[1.5px] border-red-500/20 bg-red-500/10 p-[13px] text-center text-[0.95rem] font-bold text-red-500">
            Buy Now {courseData?.price === 0 ? "Free" : `$${courseData?.price}`}{" "}
            (Preview Mode)
          </button>

          {/* Coupon apply */}
          <div className="my-5 flex gap-[10px]">
            <input
              type="text"
              placeholder="Discount code..."
              className="flex-1 rounded-xl border-[1.5px] border-indigo-500/[0.16] bg-indigo-500/[0.04] px-4 py-[0.65rem] text-[0.88rem] text-inherit outline-none transition-all duration-[250ms] focus:border-indigo-500 focus:bg-indigo-500/[0.07] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)]"
              disabled
            />
            <button
              className="cursor-pointer rounded-xl border-none bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] px-6 py-[10px] text-[0.88rem] font-bold text-white opacity-80 hover:shadow-[0_4px_12px_rgba(99,102,241,0.3)]"
              disabled
            >
              Apply
            </button>
          </div>

          {/* Core inclusions */}
          <div className="mb-7 flex flex-col gap-2 border-t-[1.5px] border-indigo-500/10 pt-4">
            <div className="flex items-center gap-2 text-[0.85rem] font-medium text-slate-600 dark:text-slate-300">
              <span className="text-[1.05rem] text-indigo-500">•</span> Source
              code included
            </div>
            <div className="flex items-center gap-2 text-[0.85rem] font-medium text-slate-600 dark:text-slate-300">
              <span className="text-[1.05rem] text-indigo-500">•</span> Full
              lifetime access
            </div>
            <div className="flex items-center gap-2 text-[0.85rem] font-medium text-slate-600 dark:text-slate-300">
              <span className="text-[1.05rem] text-indigo-500">•</span>{" "}
              Certificate of completion
            </div>
            <div className="flex items-center gap-2 text-[0.85rem] font-medium text-slate-600 dark:text-slate-300">
              <span className="text-[1.05rem] text-indigo-500">•</span> Premium
              support
            </div>
          </div>

          {/* Course Details Block */}
          <div>
            <h1 className="mb-3 font-poppins text-[1.45rem] font-extrabold">
              {courseData.name || courseData.title || "Untitled Course"}
            </h1>

            <div className="flex items-center justify-between mt-3 mb-6 pb-4 border-b border-indigo-500/10 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <Rating name="size-medium" defaultValue={5} readOnly />
                <span>(0 reviews)</span>
              </div>
              <div>0 Students</div>
            </div>

            {/* Benefits / What you'll learn */}
            {benefitsList.length > 0 && (
              <>
                <h2 className="mt-6 mb-3 font-poppins text-[1.1rem] font-bold uppercase tracking-[0.04em] text-indigo-500">
                  What you will learn
                </h2>
                <div className="grid gap-2 mb-6">
                  {benefitsList.map(
                    (item: { title: string }, index: number) => (
                      <div
                        className="flex items-start gap-[10px] py-2 text-[0.9rem] font-medium"
                        key={index}
                      >
                        <IoMdCheckmarkCircleOutline
                          className="mt-0.5 shrink-0 text-emerald-500"
                          size={18}
                        />
                        <span>{item.title}</span>
                      </div>
                    ),
                  )}
                </div>
              </>
            )}

            {/* Description */}
            <h2 className="mt-6 mb-3 font-poppins text-[1.1rem] font-bold uppercase tracking-[0.04em] text-indigo-500">
              Course Description
            </h2>
            <p className="text-sm leading-relaxed whitespace-pre-line opacity-95">
              {courseData?.description || "No description provided."}
            </p>
          </div>

          {/* Bottom Nav Row */}
          <div className="mt-9 flex items-center justify-between border-t-[1.5px] border-indigo-500/10 pt-6">
            <button
              className="group relative overflow-hidden rounded-xl border-none bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] px-9 py-[11px] text-[0.9rem] font-bold text-white shadow-[0_4px_16px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_22px_rgba(99,102,241,0.4)] "
              onClick={prevButton}
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              ← Prev
            </button>
            <button
              className="group relative overflow-hidden rounded-xl border-none bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] px-9 py-[11px] text-[0.9rem] font-bold text-white shadow-[0_4px_16px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_22px_rgba(99,102,241,0.4)] active:translate-y-0"
              onClick={createCourse}
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              {isEdit ? "Update Course" : "Create Course"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePreview;
