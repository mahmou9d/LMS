"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsLink45Deg } from "react-icons/bs";
import { ICourseContentItem, ILink } from "@/app/types";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: ICourseContentItem[];
  setCourseContentData: (courseContentData: ICourseContentItem[]) => void;
  handlerSumbit: () => void;
};

const CourseContent: React.FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handlerSumbit: handlerCourseSumbit,
}) => {
  const [isCollapse, setIsCollapse] = useState(
    Array(courseContentData.length).fill(false),
  );
  const [activeSection, setActiveSection] = useState(1);
  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handlerCollapseToggle = (index: number) => {
    const updatedData = [...isCollapse];
    updatedData[index] = !updatedData[index];
    setIsCollapse(updatedData);
  };
  const handlerRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = courseContentData.map(
      (item: ICourseContentItem, i: number) =>
        i === index
          ? {
              ...item,
              links: item.links.filter(
                (_: ILink, li: number) => li !== linkIndex,
              ),
            }
          : item,
    );
    setCourseContentData(updatedData);
  };
  const handlerAddLink = (index: number) => {
    const updatedData = courseContentData.map(
      (item: ICourseContentItem, i: number) =>
        i === index
          ? { ...item, links: [...item.links, { title: "", url: "" }] }
          : item,
    );
    setCourseContentData(updatedData);
  };
  const handlerFieldChange = (
    index: number,
    field: keyof ICourseContentItem,
    value: any,
  ) => {
    const updatedData = courseContentData.map(
      (item: ICourseContentItem, i: number) =>
        i === index ? { ...item, [field]: value } : item,
    );
    setCourseContentData(updatedData);
  };
  const handlerSectionNameChange = (index: number, value: string) => {
    const oldSectionName = courseContentData[index].videoSection;
    const updatedData = courseContentData.map((item: ICourseContentItem) =>
      item.videoSection === oldSectionName
        ? { ...item, videoSection: value }
        : item,
    );
    setCourseContentData(updatedData);
  };
  const handlerLinkChange = (
    index: number,
    linkIndex: number,
    field: keyof ILink,
    value: string,
  ) => {
    const updatedData = courseContentData.map(
      (item: ICourseContentItem, i: number) =>
        i === index
          ? {
              ...item,
              links: item.links.map((link: ILink, li: number) =>
                li === linkIndex ? { ...link, [field]: value } : link,
              ),
            }
          : item,
    );
    setCourseContentData(updatedData);
  };
  const newContentHandler = (item: ICourseContentItem) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoSection === ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      let newVideoSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection:
          newVideoSection === "" ? "Untitled Section" : newVideoSection,
        videoLength: "",
        links: [{ title: "", url: "" }],
        suggestion: "",
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };
  const addNewSection = () => {
    const lastSection = courseContentData[courseContentData.length - 1];
    if (
      !lastSection ||
      lastSection.title === "" ||
      lastSection.description === "" ||
      lastSection.videoSection === ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: "Untitled Section",
        videoLength: "",
        links: [{ title: "", url: "" }],
        suggestion: "",
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };
  const prevButton = () => {
    setActive(active - 1);
  };
  const handleOptions = () => {
    const lastItem: ICourseContentItem =
      courseContentData[courseContentData.length - 1];
    if (
      !lastItem ||
      lastItem.title === "" ||
      lastItem.description === "" ||
      lastItem.videoSection === ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      setActive(active + 1);
      handlerCourseSumbit();
    }
  };

  const sectionCardClass =
    "rounded-[18px] border-[1.5px] border-indigo-500/10 p-4 sm:p-6 mb-5 transition-shadow duration-300 bg-white/[0.88]  shadow-[0_4px_24px_rgba(99,102,241,0.06)] hover:shadow-[0_8px_32px_rgba(99,102,241,0.13)] dark:bg-[#0f1535]/70 dark:shadow-[0_4px_24px_rgba(0,0,0,0.25)]";
  const iconBtnDeleteClass =
    "inline-flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer border border-red-500/[0.18] bg-red-500/[0.04] text-red-500 transition-all duration-200 hover:bg-red-500 hover:text-white hover:scale-[1.08]";
  const inputClass =
    "w-full px-4 py-[0.7rem] rounded-xl border-[1.5px] border-indigo-500/[0.16] bg-indigo-500/[0.04] text-[0.9rem] outline-none text-inherit font-inherit transition-[border-color,box-shadow,background] duration-300 box-border focus:border-indigo-500 focus:bg-indigo-500/[0.07] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.10)]";
  const labelClass =
    "block text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-1.5";
  const addBtnClass =
    "inline-flex items-center gap-2 px-[18px] py-2 rounded-[10px] cursor-pointer text-[0.85rem] font-semibold border-[1.5px] border-indigo-500/20 bg-indigo-500/5 text-indigo-500 transition-all duration-200 hover:bg-indigo-500/10 hover:border-indigo-500/[0.35] hover:-translate-y-px";
  const navBtnClass =
    "relative overflow-hidden px-9 py-[11px] rounded-xl cursor-pointer text-[0.9rem] font-bold bg-gradient-to-br from-indigo-500 to-violet-500 text-white border-none shadow-[0_4px_16px_rgba(99,102,241,0.3)] transition-transform duration-200 hover:shadow-[0_6px_22px_rgba(99,102,241,0.4)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-[left] before:duration-500 hover:before:left-full";

  return (
    <div className="w-full sm:w-[90%] max-w-[860px] mx-auto mt-[90px] sm:mt-24 mb-[60px]">
      <h2 className="text-[22px] font-bold font-poppins bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent mb-8">
        Course Curriculum
      </h2>

      <form onSubmit={handlerSubmit}>
        {courseContentData?.map((item: ICourseContentItem, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <div
              key={index}
              className={`${sectionCardClass} ${showSectionInput ? "mt-6" : ""}`}
            >
              {/* Section Header */}
              {showSectionInput && (
                <div className="flex items-center gap-2 pb-3 border-b-[1.5px] border-indigo-500/10 mb-[18px]">
                  <input
                    type="text"
                    value={item.videoSection || ""}
                    className="text-base font-bold bg-transparent border-none outline-none text-indigo-500 min-w-[60px] max-w-[340px]"
                    onChange={(e) =>
                      handlerSectionNameChange(index, e.target.value)
                    }
                  />
                  <BiSolidPencil className="text-indigo-500 text-[0.88rem] flex-shrink-0" />
                </div>
              )}

              {/* Lesson Header Row */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[0.88rem] font-semibold text-indigo-500">
                  {isCollapse[index] && item.title
                    ? `${index + 1}. ${item.title}`
                    : `Lesson ${index + 1}`}
                </span>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    className={`${iconBtnDeleteClass} ${index === 0 ? "opacity-40 !cursor-not-allowed" : ""}`}
                    onClick={() => {
                      if (index > 0) {
                        setCourseContentData(
                          courseContentData.filter(
                            (_: ICourseContentItem, i: number) => i !== index,
                          ),
                        );
                      }
                    }}
                  >
                    <AiOutlineDelete size={15} />
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer border border-indigo-500/10 bg-indigo-500/[0.04] text-indigo-500 transition-[background,transform] duration-300 hover:bg-indigo-500/[0.08]"
                    style={{
                      transform: isCollapse[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    onClick={() => handlerCollapseToggle(index)}
                  >
                    <MdOutlineKeyboardArrowDown size={18} />
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              {!isCollapse[index] && (
                <>
                  <div className="mb-[18px]">
                    <label className={labelClass}>Video Title</label>
                    <input
                      type="text"
                      value={item.title || ""}
                      placeholder="Enter video title..."
                      className={inputClass}
                      onChange={(e) =>
                        handlerFieldChange(index, "title", e.target.value)
                      }
                    />
                  </div>

                  <div className="mb-[18px]">
                    <label className={labelClass}>Video URL</label>
                    <input
                      type="text"
                      value={item.videoUrl || ""}
                      placeholder="Paste video URL..."
                      className={inputClass}
                      onChange={(e) =>
                        handlerFieldChange(index, "videoUrl", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-[18px]">
                    <label className={labelClass}>Video Section</label>
                    <input
                      type="text"
                      placeholder="e.g. 20"
                      value={item.videoSection ?? ""}
                      className={inputClass}
                      onChange={(e) =>
                        handlerFieldChange(
                          index,
                          "videoSection",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div className="mb-[18px]">
                    <label className={labelClass}>Video Length (minutes)</label>
                    <input
                      type="number"
                      placeholder="e.g. 20"
                      value={item.videoLength ?? ""}
                      className={inputClass}
                      onChange={(e) =>
                        handlerFieldChange(index, "videoLength", e.target.value)
                      }
                    />
                  </div>

                  <div className="mb-[18px]">
                    <label className={labelClass}>Video Description</label>
                    <textarea
                      rows={5}
                      value={item.description || ""}
                      placeholder="Describe what students will learn in this video..."
                      className={`${inputClass} resize-y min-h-[120px]`}
                      onChange={(e) =>
                        handlerFieldChange(index, "description", e.target.value)
                      }
                    />
                  </div>

                  {/* Links */}
                  <div className="mb-4">
                    <label className={`${labelClass} mb-3 block`}>
                      Resource Links
                    </label>
                    {item?.links?.map((link: ILink, linksIndex: number) => (
                      <div
                        key={linksIndex}
                        className="rounded-xl border border-indigo-500/10 p-3.5 mb-3 bg-indigo-500/[0.02]"
                      >
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-xs font-bold text-indigo-500 uppercase tracking-wide">
                            Link {linksIndex + 1}
                          </span>
                          <button
                            type="button"
                            className={`${iconBtnDeleteClass} ${linksIndex === 0 ? "opacity-40 !cursor-not-allowed" : ""}`}
                            onClick={() =>
                              linksIndex > 0 &&
                              handlerRemoveLink(index, linksIndex)
                            }
                          >
                            <AiOutlineDelete size={13} />
                          </button>
                        </div>
                        <div className="grid gap-2">
                          <input
                            type="text"
                            placeholder="Link title (e.g. Source Code)"
                            value={link.title}
                            className={inputClass}
                            onChange={(e) =>
                              handlerLinkChange(
                                index,
                                linksIndex,
                                "title",
                                e.target.value,
                              )
                            }
                          />
                          <input
                            type="url"
                            placeholder="Link URL (https://...)"
                            value={link.url}
                            className={inputClass}
                            onChange={(e) =>
                              handlerLinkChange(
                                index,
                                linksIndex,
                                "url",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className={addBtnClass}
                      onClick={() => handlerAddLink(index)}
                    >
                      <BsLink45Deg size={16} /> Add Link
                    </button>
                  </div>
                </>
              )}

              {/* Add Content */}
              {index === courseContentData.length - 1 && (
                <div className="mt-4 pt-4 border-t border-indigo-500/10">
                  <button
                    type="button"
                    className={addBtnClass}
                    onClick={() => newContentHandler(item)}
                  >
                    <AiOutlinePlusCircle size={16} /> Add Lesson
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Add New Section */}
        <div className="mt-4 mb-8">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-[22px] py-2.5 rounded-xl cursor-pointer text-[0.88rem] font-bold bg-violet-500/[0.06] border-[1.5px] border-violet-500/20 text-violet-500 hover:bg-violet-500/[0.12]"
            onClick={() => addNewSection()}
          >
            <AiOutlinePlusCircle size={17} /> Add New Section
          </button>
        </div>
      </form>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button className={navBtnClass} onClick={() => prevButton()}>
          ← Prev
        </button>
        <button className={navBtnClass} onClick={() => handleOptions()}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default CourseContent;
