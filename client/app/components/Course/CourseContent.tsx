"use client";
import { useGetCourseContentQuery } from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utills/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";
import CourseContentList from "./CourseContentList";

import { IUser } from "@/app/types";

type Props = {
  id: string;
  user?: IUser;
};

const CourseContent = ({ id, user }: Props) => {
  const {
    data: contentData,
    isLoading,
    refetch,
  } = useGetCourseContentQuery(
    { id },
    { refetchOnMountOrArgChange: true, skip: !id },
  );
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const data = contentData?.content;
  const [activeVideo, setActiveVideo] = useState<number>(0);
  return (
    <div>
      {isLoading || !data ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#0b0f19] dark:text-slate-50">
          <Header
            activeItem={1}
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
          />
          <Heading
            title={data[activeVideo]?.title}
            description="LMS Course Access"
            keywords={data[activeVideo]?.tags}
          />
          <div className="max-w-[1440px] mx-auto px-3 sm:px-6 pt-[80px] sm:pt-[90px] pb-10 grid grid-cols-1 gap-[20px] lg:grid-cols-[1fr_380px]">
            <div className="flex flex-col gap-5">
              <CourseContentMedia
                data={data}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                id={id}
                user={user}
                refetch={refetch}
              />
            </div>
            <div
              className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 h-fit lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:sticky lg:top-[90px] shadow-[0_4px_20px_rgba(0,0,0,0.02)]
                dark:bg-[#111827] dark:border-white/[0.08] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-indigo-500/20
                [&::-webkit-scrollbar-thumb]:rounded-[10px]
                hover:[&::-webkit-scrollbar-thumb]:bg-indigo-500/40"
            >
              <h3 className="text-[1.1rem] font-bold mb-4 pb-2.5 border-b border-indigo-500/[0.15] bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                Course Content
              </h3>
              <CourseContentList
                data={data}
                activevideo={activeVideo}
                setActiveVideo={setActiveVideo}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContent;
