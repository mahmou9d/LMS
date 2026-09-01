"use client";
import React, { useState } from "react";
import { BsChevronBarDown, BsChevronBarUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";

import { ICourseData } from "@/app/types";

type props = {
  data: ICourseData[];
  activevideo?: number;
  setActiveVideo?: (index: number) => void;
  isDemo?: boolean;
};

const CourseContentList = ({
  data,
  activevideo,
  setActiveVideo,
  isDemo,
}: props) => {
  console.log(data);
  const videoSections: string[] = [
    ...new Set<string>(data?.map((item: ICourseData) => item.videoSection)),
  ];
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>(videoSections.length > 0 ? [videoSections[0]] : []),
  );

  let totalCount: number = 0;
  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  return (
    <div className="flex flex-col gap-4">
      {videoSections.map((section: string, sectionIndex: number) => {
        const isSectionVisible = visibleSections.has(section);
        const sectionVideos: ICourseData[] = data.filter(
          (item: ICourseData) => item.videoSection === section,
        );
        const sectionVideoCount: number = sectionVideos.length;
        const sectionVideoLength: number = sectionVideos.reduce(
          (totalLength: number, item: ICourseData) =>
            totalLength + Number(item.videoLength || 0),
          0,
        );
        const sectionStartIndex: number = totalCount;
        totalCount += sectionVideoCount;
        const sectionContentHours: number = sectionVideoLength / 60;
        return (
          <div
            className="border-b border-slate-200/60 pb-4 dark:border-white/5"
            key={sectionIndex}
          >
            <div
              className="flex items-center justify-between gap-3 cursor-pointer"
              onClick={() => toggleSection(section)}
            >
              <h4 className="text-[0.95rem] font-bold text-slate-800 dark:text-slate-100">
                {section}
              </h4>
              <button
                className="bg-transparent border-none text-indigo-500 cursor-pointer text-[1.1rem] flex items-center justify-center transition-transform duration-200"
                aria-label="Toggle section"
              >
                {isSectionVisible ? <BsChevronBarUp /> : <BsChevronBarDown />}
              </button>
            </div>
            <div className="text-[0.8rem] text-slate-500 font-medium mt-1">
              {sectionVideoCount} lessons •{" "}
              {sectionContentHours < 1
                ? `${sectionVideoLength} mins`
                : `${sectionContentHours.toFixed(1)} hours`}
            </div>

            {isSectionVisible && (
              <div className="flex flex-col gap-2 mt-3">
                {sectionVideos.map((item: ICourseData, index: number) => {
                  const videoIndex: number = sectionStartIndex + index;
                  const contentMins: string = item.videoLength;
                  const isCurrentActive = activevideo === videoIndex;
                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-between py-2.5 px-3.5 rounded-[10px] cursor-pointer border
                        ${
                          isCurrentActive
                            ? "bg-indigo-500/10 border-indigo-500/30"
                            : "bg-slate-50 border-transparent dark:bg-[#1f2937] hover:bg-indigo-500/5 hover:border-indigo-500/20"
                        }`}
                      onClick={() =>
                        isDemo ? null : setActiveVideo?.(videoIndex)
                      }
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <MdOutlineOndemandVideo
                          className="text-indigo-500 shrink-0"
                          size={16}
                        />
                        <span className="text-[0.85rem] font-semibold text-slate-700 whitespace-nowrap overflow-hidden text-ellipsis dark:text-slate-300">
                          {item.title}
                        </span>
                      </div>
                      <span className="text-[0.78rem] text-slate-500 font-medium shrink-0">
                        {contentMins} mins
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
