"use client";
import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import ProfileInfo from "./ProfileInfo";
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ChangePassword from "./ChangePassword";
import { useGetUserAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import CoursesCard from "../Course/CoursesCard";
import { IUser, ICourse } from "@/app/types";

type Props = {
  user: IUser;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState("");
  const [logout, setLogout] = useState(false);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const { data, isLoading } = useGetUserAllCoursesQuery(undefined, {});
  const { isSuccess, error } = useLogoutQuery(undefined, { skip: !logout });

  const logoutHandler = async () => {
    setLogout(true);
  };

  useEffect(() => {
    if (isSuccess) {
      signOut();
    }
    if (error) {
      console.error("Logout failed:", error);
      signOut();
    }
  }, [isSuccess, error]);

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 85);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (data) {
      const filterdData = (user?.courses || [])
        .map((userCourse) =>
          (data?.courses as ICourse[])?.find((j) => j?._id === userCourse.courseId),
        )
        .filter((i): i is ICourse => i !== undefined);
      setCourses(filterdData);
    }
  }, [data, user?.courses]);
  return (
    <div className="w-[95%] max-w-[1200px] mx-auto flex gap-3 sm:gap-6 py-6 sm:py-10 pt-[90px] sm:pt-[100px]">
      {/* Sidebar */}
      <div
        className={`
          hidden 800px:flex flex-col
          w-[240px] shrink-0
          bg-white/85 dark:bg-[#090919]/85
          border border-[rgba(99,102,241,0.12)] dark:border-[rgba(99,102,241,0.18)]
          rounded-xl shadow-[0_4px_30px_rgba(99,102,241,0.08)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.35)]
          h-fit overflow-hidden
          sticky transition-all duration-300
          ${scroll ? "top-[100px]" : "top-[24px]"}
        `}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>

      {/* Mobile sidebar (icons only) */}
      <div
        className={`
          flex 800px:hidden flex-col
          w-[60px] shrink-0
          bg-white/85 dark:bg-[#090919]/85
          border border-[rgba(99,102,241,0.12)] dark:border-[rgba(99,102,241,0.18)]
          rounded-xl shadow-[0_4px_30px_rgba(99,102,241,0.08)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.35)]
          h-fit overflow-hidden
          sticky transition-all duration-300
          ${scroll ? "top-[100px]" : "top-[24px]"}
        `}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 bg-white/85 dark:bg-[#090919]/85 border border-[rgba(99,102,241,0.12)] dark:border-[rgba(99,102,241,0.18)] rounded-xl shadow-[0_4px_30px_rgba(99,102,241,0.08)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.35)] p-4 800px:p-8">
        {active === 1 && <ProfileInfo avatar={avatar} user={user} />}
        {active === 2 && <ChangePassword />}
        {active === 3 && <EnrolledCourses courses={courses} />}
      </div>
    </div>
  );
};

function EnrolledCourses({ courses }: { courses: ICourse[] }) {
  return (
    <div>
      {courses && courses.length > 0 ? (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] mb-12">
          {courses.map((item: ICourse, index: number) => (
            <CoursesCard course={item} key={index} isProfile={true} />
          ))}
        </div>
      ) : (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-10">
          No courses enrolled yet.
        </p>
      )}
    </div>
  );
}

export default Profile;
