"use client";
import React, { FC } from "react";
import { IoMdCheckmark } from "react-icons/io";
import {
  HiOutlineInformationCircle,
  HiOutlineCog,
  HiOutlineBookOpen,
  HiOutlineEye,
} from "react-icons/hi";

type Props = {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
};

const CourseOptions: FC<Props> = ({ active, setActive }) => {
  const options = [
    { label: "Course Information", Icon: HiOutlineInformationCircle },
    { label: "Course Options", Icon: HiOutlineCog },
    { label: "Course Content", Icon: HiOutlineBookOpen },
    { label: "Course Preview", Icon: HiOutlineEye },
  ];

  return (
    <>
      {/* No custom keyframes needed here, so no leftover <style> tag —
          every rule below is a plain Tailwind utility class. */}
      <div className="flex flex-col gap-1">
        {options.map(({ label, Icon }, index) => {
          const isActive = active === index;
          const isCompleted = active > index;
          const isUpcoming = active < index;

          // icon circle
          const iconWrapperClass = [
            "relative z-[2] flex h-[38px] w-[38px] items-center justify-center rounded-full border-2 border-transparent text-[0.85rem] font-bold",
            isActive &&
              "scale-105 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white shadow-[0_0_14px_rgba(99,102,241,0.4)]",
            isCompleted &&
              "border-indigo-500/30 bg-indigo-500/10 text-indigo-500",
            isUpcoming &&
              "bg-slate-500/[0.08] border-slate-500/[0.15] text-slate-500 dark:bg-white/5 dark:border-white/10 dark:text-slate-400",
          ]
            .filter(Boolean)
            .join(" ");

          // step title
          const titleClass = [
            "font-poppins text-[0.95rem] font-semibold",
            isActive && "font-bold text-indigo-500",
            (isCompleted || isUpcoming) && "text-slate-600 dark:text-slate-300",
            isUpcoming && "opacity-65",
          ]
            .filter(Boolean)
            .join(" ");

          // connecting line
          const lineClass = isCompleted
            ? "absolute left-[35px] top-12 z-[1] h-[calc(100%-24px)] w-0.5 bg-gradient-to-b from-[#6366f1] to-[#8b5cf6]/40"
            : "absolute left-[35px] top-12 z-[1] h-[calc(100%-24px)] w-0.5 bg-slate-500/[0.15] dark:bg-white/10";

          return (
            <div
              key={index}
              className="relative flex cursor-pointer items-center gap-4 rounded-xl px-4 py-3 hover:bg-indigo-500/5"
              onClick={() => setActive(index)}
            >
              <div className={iconWrapperClass}>
                {isCompleted ? <IoMdCheckmark size={18} /> : <Icon size={18} />}
              </div>
              <h5 className={titleClass}>{label}</h5>
              {index !== options.length - 1 && <div className={lineClass} />}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CourseOptions;
