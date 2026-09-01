"use client";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi2";
import { MdOutlinePlayCircle } from "react-icons/md";
import { ICourse } from "@/app/types";

type Props = {
  course: ICourse;
  isProfile?: boolean;
};

const CoursesCard = ({ course, isProfile }: Props) => {
  const isFree = course.price === 0;
  const hasDiscount =
    course.estimatedPrice != null && course.estimatedPrice > course.price;
  const discount = hasDiscount
    ? Math.round(
        ((course.estimatedPrice! - course.price) / course.estimatedPrice!) * 100,
      )
    : 0;

  return (
    <>
      <Link
        href={
          !isProfile ? `/course/${course._id}` : `/course-access/${course._id}`
        }
        className="group relative rounded-[20px] overflow-hidden border-[1.5px] border-indigo-500/10 bg-white/[.88] shadow-[0_4px_20px_rgba(99,102,241,0.06)] flex flex-col no-underline h-full dark:bg-[#0f1535]/[.72] dark:border-indigo-500/[.16] dark:shadow-[0_4px_20px_rgba(0,0,0,.25)] hover:shadow-[0_20px_50px_rgba(99,102,241,.18)] hover:border-indigo-500/30 dark:hover:shadow-[0_20px_50px_rgba(0,0,0,.45)]"
      >
        {/* ── Thumbnail ── */}
        <div className="relative overflow-hidden h-[190px] flex-shrink-0">
          <Image
            src={
              course?.thumbnail?.url ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt={course.name}
            fill
            className="w-full h-full object-cover"
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 400px"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgba(10,5,32,.55)_100%)] opacity-0 transition-opacity duration-300 flex items-center justify-center group-hover:opacity-100">
            <div className="w-[52px] h-[52px] rounded-full bg-white/[.92] flex items-center justify-center text-indigo-500 text-[26px] scale-[0.8] transition-transform duration-300 shadow-[0_4px_18px_rgba(0,0,0,.25)] group-hover:scale-100">
              <MdOutlinePlayCircle />
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            {isFree && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-[.04em] uppercase  bg-emerald-500/[.85] text-white">
                Free
              </span>
            )}
            {discount >= 30 && !isFree && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-[.04em] uppercase  bg-amber-500/[.85] text-white">
                -{discount}%
              </span>
            )}
            {(course.purchased ?? 0) > 100 && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-[.04em] uppercase  bg-red-500/[.85] text-white">
                🔥 Hot
              </span>
            )}
          </div>

          {/* Category */}
          {course.categories && (
            <span className="absolute top-3 right-3 px-[11px] py-1 rounded-full text-[11px] font-bold bg-indigo-500/[.85]  text-white tracking-[.02em] whitespace-nowrap max-w-[110px] overflow-hidden text-ellipsis">
              {course.categories}
            </span>
          )}
        </div>

        {/* ── Body ── */}
        <div className="p-5 flex flex-col gap-2.5 flex-1">
          {/* Title */}
          <h3 className="text-base font-bold leading-[1.45] text-gray-900 dark:text-gray-100 line-clamp-2 m-0 transition-colors duration-200 group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
            {course.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-extrabold text-amber-500">
              {Number(course.rating ?? 0).toFixed(1)}
            </span>
            <Rating
              value={course.rating ?? 0}
              readOnly
              precision={0.5}
              size="small"
              sx={{ fontSize: "0.9rem" }}
            />
            <span className="text-xs text-gray-400">
              ({course.reviews?.length ?? 0})
            </span>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3.5 text-[13px] text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-[5px] font-medium">
              <HiOutlineUsers size={14} />
              {(course.purchased ?? 0).toLocaleString()} students
            </span>
            <span className="flex items-center gap-[5px] font-medium">
              <AiOutlineUnorderedList size={14} />
              {course?.courseData?.length ?? 0}{" "}
              lectures
            </span>
          </div>

          <div className="h-px bg-indigo-500/10 my-1" />

          {/* Price row */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2">
              <span
                className={`text-xl font-black tracking-[-.02em] ${
                  isFree
                    ? "bg-gradient-to-br from-emerald-500 to-emerald-600 bg-clip-text text-transparent"
                    : "text-gray-900 dark:text-gray-100"
                }`}
              >
                {isFree ? "Free" : `$${course.price}`}
              </span>
              {hasDiscount && !isFree && (
                <span className="text-[13px] text-gray-400 line-through font-medium">
                  ${course.estimatedPrice}
                </span>
              )}
            </div>
            <span className="flex items-center justify-center px-4 py-2 rounded-[10px] text-[13px] font-bold bg-gradient-to-br from-indigo-500 to-violet-500 text-white tracking-[.01em] shadow-[0_4px_12px_rgba(99,102,241,.35)] whitespace-nowrap hover:shadow-[0_6px_18px_rgba(99,102,241,.5)]">
              {isProfile ? "Continue" : "Enroll Now"}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CoursesCard;
