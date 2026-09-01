"use client";
import { useGetHeroDataQuery } from "@/redux/features/layout/page";
import React, { useEffect, useState } from "react";
import { IFaqItem } from "@/app/types";
import { HiMiniMinus, HiMiniPlus } from "react-icons/hi2";
import {
  HiOutlineSparkles,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import { MdOutlineHelpOutline } from "react-icons/md";

const FAQ = () => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [questions, setQuestions] = useState<IFaqItem[]>([]);

  useEffect(() => {
    if (data?.layout?.faq) {
      setQuestions(data.layout.faq);
    }
  }, [data]);

  const toggleQuestion = (id: string) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <>
      <section className="relative overflow-hidden pt-[100px] pb-[90px]">
        {/* Background */}
        <div className="absolute rounded-full pointer-events-none z-0 w-[400px] h-[400px] -top-[60px] -right-[80px] bg-[radial-gradient(circle,rgba(139,92,246,.1)_0%,transparent_70%)] " />
        <div className="absolute rounded-full pointer-events-none z-0 w-[300px] h-[300px] -bottom-[60px] -left-[60px] bg-[radial-gradient(circle,rgba(99,102,241,.09)_0%,transparent_70%)]" />
        <div className="relative z-[1] max-w-[860px] mx-auto px-6">
          {/* ── Header ── */}
          <div className="text-center mb-[60px] [animation:_0.7s_0.1s_both]">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-br from-[rgba(99,102,241,.1)] to-[rgba(139,92,246,.1)] border border-[rgba(99,102,241,.2)] text-[12.5px] font-bold text-[#6366f1] tracking-[.05em] uppercase mb-[18px] dark:from-[rgba(99,102,241,.18)] dark:to-[rgba(139,92,246,.18)] dark:border-[rgba(99,102,241,.3)] dark:text-[#818cf8]">
              <HiOutlineSparkles />
              Got Questions?
            </div>
            <h2 className="text-[clamp(1.8rem,4vw,2.7rem)] font-black leading-[1.2] tracking-[-.03em] text-gray-900 mb-[14px] dark:text-gray-100">
              Frequently{" "}
              <span className="bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] bg-clip-text text-transparent [-webkit-text-fill-color:transparent]">
                Asked
              </span>
              <br />
              Questions
            </h2>
            <p className="text-[16.5px] text-gray-500 max-w-[520px] mx-auto mb-5 leading-[1.65] dark:text-gray-400">
              Everything you need to know about our platform and courses.
              Can&apos;t find the answer? Our support team is always here to
              help.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/85  border border-[rgba(99,102,241,.12)] text-[13px] font-semibold text-gray-700 shadow-[0_2px_10px_rgba(99,102,241,.06)] dark:bg-[rgba(15,21,53,.75)] dark:border-[rgba(99,102,241,.2)] dark:text-gray-300 [&>svg]:text-[#6366f1] dark:[&>svg]:text-[#818cf8]">
                <HiOutlineChatBubbleLeftRight size={15} />
                {questions.length} Questions Answered
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/85  border border-[rgba(99,102,241,.12)] text-[13px] font-semibold text-gray-700 shadow-[0_2px_10px_rgba(99,102,241,.06)] dark:bg-[rgba(15,21,53,.75)] dark:border-[rgba(99,102,241,.2)] dark:text-gray-300 [&>svg]:text-[#6366f1] dark:[&>svg]:text-[#818cf8]">
                <MdOutlineHelpOutline size={16} />
                24/7 Support Available
              </span>
            </div>
          </div>

          {/* ── Content ── */}
          {isLoading ? (
            /* Skeleton */
            <div className="flex flex-col gap-3.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[74px] rounded-[18px] border-[1.5px] border-[rgba(99,102,241,.1)] overflow-hidden"
                >
                  <div className="w-full h-full bg-[linear-gradient(90deg,rgba(99,102,241,.05)_0%,rgba(99,102,241,.1)_50%,rgba(99,102,241,.05)_100%)] bg-[length:200%_100%] dark:bg-[linear-gradient(90deg,rgba(255,255,255,.02)_0%,rgba(255,255,255,.06)_50%,rgba(255,255,255,.02)_100%)]" />
                </div>
              ))}
            </div>
          ) : questions.length === 0 ? (
            /* Empty */
            <div className="text-center py-[60px] px-5">
              <div className="text-[#6366f1] flex justify-center mb-[14px] dark:text-[#818cf8]">
                <HiOutlineChatBubbleLeftRight size={48} />
              </div>
              <p className="text-lg font-extrabold text-gray-900 mb-1.5 dark:text-gray-100">
                No questions yet
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Check back soon or reach out to our support team.
              </p>
            </div>
          ) : (
            /* FAQ List */
            <dl className="flex flex-col gap-3.5">
              {questions.map((item: IFaqItem, index: number) => {
                const isOpen = activeQuestion === item._id;
                return (
                  <div
                    key={item._id || index}
                    className={`rounded-[18px] border-[1.5px] bg-white/[.88]  overflow-hidden dark:bg-[rgba(15,21,53,.72)] ${
                      isOpen
                        ? "border-[rgba(99,102,241,.35)] shadow-[0_8px_32px_rgba(99,102,241,.12)] -translate-y-0.5 dark:border-[rgba(99,102,241,.35)] dark:shadow-[0_8px_32px_rgba(0,0,0,.4)]"
                        : "border-[rgba(99,102,241,.1)] shadow-[0_4px_20px_rgba(99,102,241,.05)] dark:border-[rgba(99,102,241,.16)] dark:shadow-[0_4px_20px_rgba(0,0,0,.2)] hover:border-[rgba(99,102,241,.28)] hover:shadow-[0_8px_30px_rgba(99,102,241,.1)] dark:hover:border-[rgba(99,102,241,.3)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,.35)]"
                    }`}
                    style={{ animationDelay: `${index * 0.07}s` }}
                  >
                    <dt>
                      <button
                        className="w-full flex items-center justify-between gap-4 px-6 py-5 bg-transparent border-none cursor-pointer text-left transition-colors duration-200 hover:bg-[rgba(99,102,241,.03)] dark:hover:bg-[rgba(99,102,241,.06)]"
                        onClick={() => toggleQuestion(item?._id as string)}
                        aria-expanded={isOpen}
                      >
                        {/* Number */}
                        <span
                          className={`flex-shrink-0 w-8 h-8 rounded-[10px] flex items-center justify-center text-[13px] font-extrabold transition-all duration-300 ${
                            isOpen
                              ? "!bg-gradient-to-br !from-[#6366f1] !to-[#8b5cf6] !border-transparent !text-white shadow-[0_4px_12px_rgba(99,102,241,.4)] border"
                              : "bg-gradient-to-br from-[rgba(99,102,241,.12)] to-[rgba(139,92,246,.12)] border border-[rgba(99,102,241,.16)] text-[#6366f1] dark:from-[rgba(99,102,241,.2)] dark:to-[rgba(139,92,246,.2)] dark:border-[rgba(99,102,241,.25)] dark:text-[#818cf8]"
                          }`}
                        >
                          <MdOutlineHelpOutline size={17} />
                        </span>

                        {/* Question text */}
                        <span
                          className={`flex-1 text-base font-bold leading-[1.5] transition-colors duration-[250ms] ${
                            isOpen
                              ? "!text-[#6366f1] dark:!text-[#818cf8]"
                              : "text-gray-900 dark:text-gray-100"
                          }`}
                        >
                          {item.question}
                        </span>

                        {/* Toggle icon */}
                        <span
                          className={`flex-shrink-0 w-[34px] h-[34px] rounded-full border-[1.5px] flex items-center justify-center text-lg ${
                            isOpen
                              ? "!bg-gradient-to-br !from-[#6366f1] !to-[#8b5cf6] !border-transparent !text-white shadow-[0_4px_12px_rgba(99,102,241,.4)] rotate-180"
                              : "border-[rgba(99,102,241,.2)] bg-[rgba(99,102,241,.05)] text-[#6366f1] dark:border-[rgba(99,102,241,.3)] dark:bg-[rgba(99,102,241,.08)] dark:text-[#818cf8]"
                          }`}
                        >
                          {isOpen ? (
                            <HiMiniMinus size={16} />
                          ) : (
                            <HiMiniPlus size={16} />
                          )}
                        </span>
                      </button>
                    </dt>

                    {isOpen && (
                      <dd className="pl-4 sm:pl-20 pr-4 sm:pr-6 pb-[22px]">
                        <div className="px-5 py-4 rounded-xl bg-gradient-to-br from-[rgba(99,102,241,.04)] to-[rgba(139,92,246,.03)] border border-[rgba(99,102,241,.1)] dark:from-[rgba(99,102,241,.08)] dark:to-[rgba(139,92,246,.06)] dark:border-[rgba(99,102,241,.15)]">
                          <p className="text-[15px] text-gray-600 leading-[1.75] m-0 dark:text-gray-400">
                            {item.answer}
                          </p>
                        </div>
                      </dd>
                    )}
                  </div>
                );
              })}
            </dl>
          )}
        </div>
      </section>
    </>
  );
};

export default FAQ;
