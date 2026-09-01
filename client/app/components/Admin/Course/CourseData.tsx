import { AddCircle } from "@mui/icons-material";
import React, { FC } from "react";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handlerBenefitsChange = (index: number, value: string) => {
    const updatadBenefits = benefits.map((b, i) =>
      i === index ? { ...b, title: value } : b,
    );
    setBenefits(updatadBenefits);
  };
  const handlerAddBenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };
  const handlerRemoveBenefit = (index: number) => {
    if (benefits.length === 1) return;
    setBenefits(benefits.filter((_, i) => i !== index));
  };
  const handlerPrerequisitesChange = (index: number, value: string) => {
    const updatadPrerequisites = prerequisites.map((p, i) =>
      i === index ? { ...p, title: value } : p,
    );
    setPrerequisites(updatadPrerequisites);
  };
  const handlerAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };
  const handlerRemovePrerequisite = (index: number) => {
    if (prerequisites.length === 1) return;
    setPrerequisites(prerequisites.filter((_, i) => i !== index));
  };
  const prevOptions = () => {
    setActive(active - 1);
  };
  const nextOptions = () => {
    if (
      benefits[benefits.length - 1].title !== "" &&
      prerequisites[prerequisites.length - 1].title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill all the fields");
    }
  };

  return (
    <div className="w-full sm:w-[90%] max-w-[780px] mx-auto mt-[90px] sm:mt-24 mb-[60px]">
      <h2 className="text-[1.35rem] font-extrabold bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent mb-8 ">
        Course Requirements
      </h2>

      {/* Benefits */}
      <div className="rounded-[20px] border-[1.5px] border-indigo-500/10 p-4 sm:p-7 mb-6 transition-shadow duration-300 bg-white/[0.88] shadow-[0_4px_24px_rgba(99,102,241,0.06)] hover:shadow-[0_8px_32px_rgba(99,102,241,0.13)] dark:bg-[#0f1535]/70 dark:shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
        <div className="flex items-center gap-2.5 text-[0.8rem] font-bold text-indigo-500 uppercase tracking-wide mb-3.5 pb-3 border-b-[1.5px] border-indigo-500/10">
          <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-md bg-indigo-500/10 text-indigo-500 text-[0.7rem] font-extrabold">
            ✓
          </span>
          What students will learn
        </div>
        <p className="text-[0.95rem] font-semibold mb-4 text-slate-800 dark:text-slate-200">
          What are the benefits for students of this course?
        </p>
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-2.5 mb-2.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0 bg-gradient-to-br from-indigo-500 to-violet-500" />
            <input
              type="text"
              name="benefit"
              required
              value={benefit.title}
              onChange={(e) => handlerBenefitsChange(index, e.target.value)}
              placeholder="e.g. Build a full stack LMS platform from scratch..."
              className="flex-1 px-4 py-[0.65rem] rounded-xl border-[1.5px] border-indigo-500/[0.16] bg-indigo-500/[0.04] text-[0.88rem] outline-none text-inherit font-inherit transition-[border-color,box-shadow,background] duration-300 placeholder:text-slate-500/55 focus:border-indigo-500 focus:bg-indigo-500/[0.07] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.10)]"
            />
            {benefits.length > 1 && (
              <button
                type="button"
                onClick={() => handlerRemoveBenefit(index)}
                className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-red-400 hover:text-white hover:bg-red-500 border border-red-400/30 hover:border-red-500 transition-all duration-200 flex-shrink-0 text-[0.85rem] font-bold"
                title="Remove"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-[7px] mt-2 rounded-[10px] cursor-pointer text-[0.82rem] font-bold border-[1.5px] border-indigo-500/20 bg-indigo-500/5 text-indigo-500 hover:bg-indigo-500/10 "
          onClick={handlerAddBenefits}
        >
          <AddCircle style={{ fontSize: "1.1rem" }} /> Add Benefit
        </button>
      </div>

      {/* Prerequisites */}
      <div className="rounded-[20px] border-[1.5px] border-indigo-500/10 p-4 sm:p-7 mb-6 transition-shadow duration-300 bg-white/[0.88] shadow-[0_4px_24px_rgba(99,102,241,0.06)] hover:shadow-[0_8px_32px_rgba(99,102,241,0.13)] dark:bg-[#0f1535]/70 dark:shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
        <div className="flex items-center gap-2.5 text-[0.8rem] font-bold text-indigo-500 uppercase tracking-wide mb-3.5 pb-3 border-b-[1.5px] border-indigo-500/10">
          <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-md bg-indigo-500/10 text-indigo-500 text-[0.7rem] font-extrabold">
            !
          </span>
          Prerequisites
        </div>
        <p className="text-[0.95rem] font-semibold mb-4 text-slate-800 dark:text-slate-200">
          What are the prerequisites for starting this course?
        </p>
        {prerequisites.map((prerequisite, index) => (
          <div key={index} className="flex items-center gap-2.5 mb-2.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0 bg-gradient-to-br from-indigo-500 to-violet-500" />
            <input
              type="text"
              name="prerequisites"
              required
              value={prerequisite.title}
              onChange={(e) =>
                handlerPrerequisitesChange(index, e.target.value)
              }
              placeholder="e.g. Basic knowledge of JavaScript and HTML..."
              className="flex-1 px-4 py-[0.65rem] rounded-xl border-[1.5px] border-indigo-500/[0.16] bg-indigo-500/[0.04] text-[0.88rem] outline-none text-inherit font-inherit transition-[border-color,box-shadow,background] duration-300 placeholder:text-slate-500/55 focus:border-indigo-500 focus:bg-indigo-500/[0.07] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.10)]"
            />
            {prerequisites.length > 1 && (
              <button
                type="button"
                onClick={() => handlerRemovePrerequisite(index)}
                className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-red-400 hover:text-white hover:bg-red-500 border border-red-400/30 hover:border-red-500 transition-all duration-200 flex-shrink-0 text-[0.85rem] font-bold"
                title="Remove"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-[7px] mt-2 rounded-[10px] cursor-pointer text-[0.82rem] font-bold border-[1.5px] border-indigo-500/20 bg-indigo-500/5 text-indigo-500 hover:bg-indigo-500/10 "
          onClick={handlerAddPrerequisites}
        >
          <AddCircle style={{ fontSize: "1.1rem" }} /> Add Prerequisite
        </button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-2">
        <button
          className="relative overflow-hidden px-9 py-[11px] rounded-xl cursor-pointer text-[0.9rem] font-bold bg-gradient-to-br from-indigo-500 to-violet-500 text-white border-none shadow-[0_4px_16px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_22px_rgba(99,102,241,0.4)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-[left] before:duration-500 hover:before:left-full"
          onClick={() => prevOptions()}
        >
          ← Prev
        </button>
        <button
          className="relative overflow-hidden px-9 py-[11px] rounded-xl cursor-pointer text-[0.9rem] font-bold bg-gradient-to-br from-indigo-500 to-violet-500 text-white border-none shadow-[0_4px_16px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_22px_rgba(99,102,241,0.4)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-[left] before:duration-500 hover:before:left-full"
          onClick={() => nextOptions()}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default CourseData;
