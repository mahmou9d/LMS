"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "@/redux/features/courses/coursesApi";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { ICourseInfo, ICourseContentItem } from "@/app/types";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};

const CreateCourse = (props: Props) => {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || theme === "dark";

  const [createCourse, { isLoading, error, isSuccess }] =
    useCreateCourseMutation();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course created successfully");
      redirect("/admin/courses");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as { data: { message: string } };
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess]);

  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState<ICourseInfo>({
    name: "",
    description: "",
    categories: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState<Array<{ title: string }>>([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState<Array<{ title: string }>>([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState<ICourseContentItem[]>([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      videoLength: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState<Record<string, any>>({});
  const handlerSumbit = () => {
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));
    const formattedCourseContentData = courseContentData.map((item) => ({
      videoUrl: item.videoUrl,
      title: item.title,
      description: item.description,
      videoSection: item.videoSection,
      videoLength: item.videoLength,
      links: item.links,
      suggestion: item.suggestion,
    }));
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      categories: courseInfo.categories,
      price: Number(courseInfo.price),
      estimatedPrice: Number(courseInfo.estimatedPrice),
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };
    setCourseData(data);
  };
  const handleCourseCreate = async () => {
    const data = courseData;
    if (!isLoading) {
      await createCourse(data);
    }
  };

  // ── Style tokens ────────────────────────────────────────────────────────
  const sidebarCardBg = mounted
    ? isDark
      ? "rgba(15,23,60,0.82)"
      : "rgba(255,255,255,0.92)"
    : "rgba(255,255,255,0.92)";
  const sidebarCardBorder = isDark
    ? "1.5px solid rgba(99,102,241,0.2)"
    : "1.5px solid rgba(99,102,241,0.1)";
  const sidebarCardShadow = isDark
    ? "0 4px 28px rgba(0,0,0,0.35)"
    : "0 4px 24px rgba(99,102,241,0.08)";

  return (
    <div className="w-full flex flex-col-reverse min-[900px]:flex-row min-h-screen">
      {/* Form Content Area */}
      <div className="w-full min-[900px]:w-[75%] px-4 min-[900px]:pr-6">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            active={active}
            setActive={setActive}
            handlerSumbit={handlerSumbit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            courseData={courseData}
            active={active}
            setActive={setActive}
            handleCourseCreate={handleCourseCreate}
          />
        )}
      </div>

      {/* Stepper Sidebar */}
      <div className="w-full min-[900px]:w-[25%] mt-[90px] min-[900px]:mt-[120px] px-4 min-[900px]:pr-8">
        <div
          className="sticky top-[90px] min-[900px]:top-[120px] p-6 rounded-[20px] transition-all duration-300"
          style={{
            border: sidebarCardBorder,
            boxShadow: sidebarCardShadow,
            background: sidebarCardBg,
          }}
        >
          <CourseOptions active={active} setActive={setActive} />
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
