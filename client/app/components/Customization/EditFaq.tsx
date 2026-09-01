"use client";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/page";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../Loader/Loader";
import { IFaqItem } from "@/app/types";

interface IFaqItemWithActive extends IFaqItem {
  active?: boolean;
}

const EditFaq = () => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();

  const [questions, setQuestions] = useState<IFaqItemWithActive[]>([]);

  useEffect(() => {
    if (data?.layout?.faq) {
      setQuestions(data.layout.faq);
    }
    if (isSuccess) {
      refetch();
      toast.success("FAQ updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data.message);
      }
    }
  }, [data, isSuccess, error]);

  const toggleQuestion = (id: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions?.map((i) =>
        i._id === id ? { ...i, active: !i.active } : i,
      ),
    );
  };

  const handleQuestionChange = (id: string, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions?.map((i) => (i._id === id ? { ...i, question: value } : i)),
    );
  };

  const handleAnswerChange = (id: string, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions?.map((i) => (i._id === id ? { ...i, answer: value } : i)),
    );
  };

  const newFaqHandler = () => {
    // Generate a temporary unique ID for new FAQ items if they don't have one from db yet
    const tempId = Math.random().toString(36).substring(2, 9);
    setQuestions([
      ...questions,
      { _id: tempId, question: "", answer: "", active: true },
    ]);
  };

  const areQuestionsUnchanged = (
    originalQuestions: IFaqItem[],
    currentQuestions: IFaqItemWithActive[],
  ) => {
    // Strip active key before comparing
    const strippedCurrent = currentQuestions.map(({ active, ...rest }) => rest);
    const strippedOriginal = originalQuestions.map(
      ({ _id, question, answer }) => ({ _id, question, answer }),
    );
    return JSON.stringify(strippedOriginal) === JSON.stringify(strippedCurrent);
  };

  const isAnyQuestionEmpty = (questions: IFaqItemWithActive[]) => {
    return questions.some((q) => !q.question || !q.answer);
  };

  const handleEdit = async () => {
    const originalFaq = data?.layout?.faq ?? [];
    if (
      !areQuestionsUnchanged(originalFaq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      // Strip active flag before sending to backend
      const cleanQuestions = questions.map(({ active, ...rest }) => rest);
      await editLayout({
        type: "FAQ",
        faq: cleanQuestions,
      });
    }
  };

  const isUnchanged = areQuestionsUnchanged(data?.layout?.faq ?? [], questions);
  const isEmpty = isAnyQuestionEmpty(questions);
  const canSave = !isUnchanged && !isEmpty;

  return (
    <>
      <div className="w-[90%] max-w-[820px] mx-auto mt-24 mb-[60px]">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="rounded-[22px] border-[1.5px] border-indigo-500/[0.12] px-9 py-8 transition-shadow duration-250 bg-white/[0.88] dark:bg-[#0f1535]/[0.72] shadow-[0_4px_24px_rgba(99,102,241,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_32px_rgba(99,102,241,0.13)]">
            <h1 className="text-[1.45rem] font-extrabold font-poppins bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent mb-1">
              Edit FAQ
            </h1>
            <p className="text-[0.82rem] font-medium mb-7 text-slate-500 dark:text-slate-400">
              Manage questions and answers displayed in the support section.
            </p>

            <div className="flex flex-col gap-4 mb-6">
              {questions?.map((item) => (
                <div
                  key={item._id}
                  className="rounded-2xl border border-indigo-500/[0.12] px-5 py-4 transition-all duration-250 ease-in-out bg-indigo-500/[0.02] dark:bg-indigo-500/[0.03] hover:border-indigo-500/30 hover:shadow-[0_4px_12px_rgba(99,102,241,0.04)]"
                >
                  {/* Question row */}
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={item.question}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleQuestionChange(
                          item?._id as string,
                          e.target.value,
                        )
                      }
                      placeholder="Enter FAQ Question..."
                      className="flex-1 px-4 py-[0.65rem] rounded-xl border-[1.5px] border-indigo-500/[0.16] bg-indigo-500/[0.04] text-[0.88rem] outline-none text-inherit transition-all duration-250 ease-in-out font-inherit placeholder:text-slate-500/50 focus:border-indigo-500 focus:bg-indigo-500/[0.07] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)]"
                    />
                    <button
                      type="button"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-[10px] cursor-pointer border-[1.5px] border-indigo-500/15 bg-indigo-500/[0.04] text-indigo-500 transition-all duration-200 hover:bg-indigo-500/15"
                      onClick={() => toggleQuestion(item?._id as string)}
                    >
                      {item.active ? (
                        <HiMinus size={18} />
                      ) : (
                        <HiPlus size={18} />
                      )}
                    </button>
                  </div>

                  {/* Expanded Answer row */}
                  {item.active && (
                    <div className="mt-[14px] pt-[14px] border-t border-dashed border-indigo-500/15 flex gap-3 items-start">
                      <textarea
                        value={item.answer}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          handleAnswerChange(
                            item?._id as string,
                            e.target.value,
                          )
                        }
                        placeholder="Enter FAQ Answer..."
                        className="flex-1 px-4 py-[0.65rem] rounded-xl border-[1.5px] border-indigo-500/[0.16] bg-indigo-500/[0.04] text-[0.88rem] outline-none text-inherit transition-all duration-250 ease-in-out font-inherit placeholder:text-slate-500/50 focus:border-indigo-500 focus:bg-indigo-500/[0.07] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] resize-y min-h-[80px] leading-[1.5]"
                        rows={3}
                      />
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-[38px] h-[38px] rounded-[10px] cursor-pointer border-[1.5px] border-red-500/20 bg-red-500/[0.04] text-red-500 transition-all duration-200 mt-0.5 hover:bg-red-500 hover:text-white hover:scale-[1.06]"
                        onClick={() => {
                          setQuestions((prevQuestions) =>
                            prevQuestions?.filter((i) => i._id !== item._id),
                          );
                        }}
                      >
                        <AiOutlineDelete size={17} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-[18px] py-2 rounded-xl cursor-pointer text-[0.85rem] font-bold border-[1.5px] border-indigo-500/20 bg-indigo-500/5 text-indigo-500 transition-all duration-200 hover:bg-indigo-500/10 hover:border-indigo-500/[0.35] hover:-translate-y-px [&>svg]:text-[1.15rem]"
              onClick={newFaqHandler}
            >
              <IoMdAddCircleOutline /> Add FAQ Item
            </button>

            <div className="flex justify-end mt-8 pt-5 border-t-[1.5px] border-indigo-500/10">
              <button
                type="button"
                className={
                  canSave
                    ? "relative overflow-hidden px-8 py-[10px] rounded-xl text-[0.88rem] font-bold transition-all duration-250 ease-in-out border-none bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white shadow-[0_4px_16px_rgba(99,102,241,0.3)] cursor-pointer before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-[left] before:duration-500 hover:before:left-full hover:shadow-[0_6px_22px_rgba(99,102,241,0.4)] "
                    : "relative overflow-hidden px-8 py-[10px] rounded-xl text-[0.88rem] font-bold transition-all duration-250 ease-in-out border-none bg-slate-400/[0.15] text-slate-400/50 cursor-not-allowed"
                }
                onClick={canSave ? handleEdit : undefined}
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditFaq;
