"use client";
import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
  useEditCourseMutation,
  useGetUserAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ICourse, ICourseInfo, ICourseContentItem } from "@/app/types";

type Props = {
  id: string;
};

const EditCourse = ({ id }: Props) => {
  const router = useRouter();
  const { data, refetch } = useGetUserAllCoursesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const editCourseData =
    data && (data.courses as ICourse[]).find((course) => course._id === id);

  // Setup edit course triggers
  const [editCourseMutation, { isSuccess, error }] = useEditCourseMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Updated successfully");
      refetch();
      router.push("/admin/courses");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as { data: { message: string } };
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        categories: editCourseData.categories,
        price: String(editCourseData.price || ""),
        estimatedPrice: String(editCourseData.estimatedPrice || ""),
        tags: editCourseData.tags,
        level: editCourseData.level,
        demoUrl: editCourseData.demoUrl,
        thumbnail: editCourseData.thumbnail?.url || "",
      });
      setBenefits(editCourseData.benefits || [{ title: "" }]);
      setPrerequisites(editCourseData.prerequisites || [{ title: "" }]);
      // Backend stores content as courseData — normalize links to avoid undefined[0] errors
      const rawContent = (editCourseData.courseData as unknown as ICourseContentItem[]) || [];
      setCourseContentData(
        rawContent.map((item) => ({
          ...item,
          links: item.links && item.links.length > 0 ? item.links : [{ title: "", url: "" }],
        }))
      );
    }
  }, [editCourseData]);
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
  const [courseData, setCourseData] = useState<
    Partial<Omit<ICourse, "thumbnail">> & {
      thumbnail?: string | { public_id: string; url: string };
    }
  >({});
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
    await editCourseMutation({ id: editCourseData?._id || "", data });
  };
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
            isEdit={true}
          />
        )}
      </div>

      {/* Stepper Sidebar */}
      <div className="w-full min-[900px]:w-[25%] mt-[90px] min-[900px]:mt-[120px] px-4 min-[900px]:pr-8">
        <div className="sticky top-[90px] min-[900px]:top-[120px] p-6 rounded-[20px] border-[1.5px] border-indigo-500/10 bg-white/95 dark:bg-[#0f1535]/85 shadow-[0_4px_24px_rgba(99,102,241,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-all duration-300">
          <CourseOptions active={active} setActive={setActive} />
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
