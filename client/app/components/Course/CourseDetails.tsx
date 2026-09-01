"use client";
import CoursePlayer from "@/app/utills/CoursePlayer";
import { Rating } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  IoIosCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import {
  HiOutlineUsers,
  HiOutlineStar,
  HiOutlineAcademicCap,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import CourseContentList from "./CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Payment/CheckoutForm";
import { useLazyLoadUserQuery } from "@/redux/features/api/apiSlice";
import Image from "next/image";
import { ICourse, IReview } from "@/app/types";
import { RootState } from "@/redux/store";

type Props = {
  data: ICourse;
  stripePromise: any;
  clientSecret: string;
  setOpen: (open: boolean) => void;
  setRoute: (route: string) => void;
};

const CourseDetails = ({
  data,
  stripePromise,
  clientSecret,
  setOpen: openAuthModal,
  setRoute,
}: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [loadUser] = useLazyLoadUserQuery();
  const [open, setOpen] = useState(false);
  useEffect(() => {}, [user]);

  const discountPercentage =
    data?.estimatedPrice && data?.price
      ? ((data.estimatedPrice - data.price) / data.estimatedPrice) * 100
      : 0;
  const discountPercentagePrice = discountPercentage.toFixed(0);
  const isPurchased =
    user &&
    user?.courses?.some(
      (item: { courseId: string }) => item.courseId === data?._id,
    );

  const handleOrder = () => {
    if (user) {
      setOpen(true);
    } else {
      setRoute("Login");
      openAuthModal(true);
    }
  };

  return (
    <>
      <div className="min-h-screen pt-[70px] sm:pt-20 pb-20 bg-[#f8f7ff] text-slate-800 dark:bg-[#0a0d1a] dark:text-slate-200">
        {/* Hero */}
        <div className="relative overflow-hidden py-10 pb-16 sm:py-14 sm:pb-20 bg-gradient-to-br from-[#4f46e5] via-[#7c3aed] to-[#6366f1] ">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-[1]">
            <div className="flex items-center gap-2 text-[0.75rem] sm:text-[0.8rem] text-white/65 mb-5">
              <a
                href="/"
                className="text-white/65 no-underline hover:text-white"
              >
                Home
              </a>
              <span className="opacity-40">›</span>
              <a
                href="/courses"
                className="text-white/65 no-underline hover:text-white"
              >
                Courses
              </a>
              <span className="opacity-40">›</span>
              <span>{data?.name}</span>
            </div>
            <h1 className=" text-[clamp(1.6rem,4vw,2.4rem)] font-extrabold text-white leading-tight max-w-[720px] mb-4">
              {data?.name}
            </h1>
            <p className="text-base text-white/80 max-w-[660px] leading-[1.65] mb-[22px]">
              {data?.description}
            </p>
            <div className="flex flex-wrap items-center gap-5 text-sm text-white/85">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1">
                  <span className="text-amber-400 font-bold">
                    {data?.rating ? Number(data.rating).toFixed(1) : "0.0"}
                  </span>
                  <Rating value={data?.rating ?? 0} readOnly size="small" />
                </div>
                <span>({data?.reviews?.length ?? 0} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlineUsers size={16} />
                <span>{data?.purchased ?? 0} students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlineAcademicCap size={16} />
                <span>{data?.level}</span>
              </div>
              {data?.tags && (
                <span className="inline-flex items-center px-2.5 py-[3px] rounded-full text-xs font-bold bg-white/15 text-white border border-white/25">
                  {data.tags.split(",")[0].trim()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Main layout */}
        <div className="max-w-[1200px] mx-auto mt-[-48px] px-4 sm:px-6 grid grid-cols-1 min-[900px]:grid-cols-[1fr_360px] gap-8 items-start relative z-10">
          {/* Left column */}
          <div>
            {/* What you'll learn */}
            {data?.benefits?.length > 0 && (
              <div className="rounded-[20px] border-[1.5px] border-indigo-500/10 p-7 mb-6 bg-white shadow-[0_4px_24px_rgba(99,102,241,0.07)] dark:bg-[rgba(15,21,53,0.8)] dark:border-indigo-500/15 dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                <h2 className=" text-[1.1rem] font-bold mb-[18px] pb-3 border-b-[1.5px] border-indigo-500/10 bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                  What You&apos;ll Learn
                </h2>
                <ul className="list-none p-0 m-0 grid grid-cols-2 max-[600px]:grid-cols-1 gap-2.5">
                  {data.benefits.map((item: { title: string }, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm leading-[1.5]"
                    >
                      <IoIosCheckmarkCircleOutline
                        size={18}
                        className="shrink-0 mt-0.5 text-emerald-500"
                      />
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prerequisites */}
            {data?.prerequisites?.length > 0 && (
              <div className="rounded-[20px] border-[1.5px] border-indigo-500/10 p-7 mb-6 bg-white shadow-[0_4px_24px_rgba(99,102,241,0.07)] dark:bg-[rgba(15,21,53,0.8)] dark:border-indigo-500/15 dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                <h2 className=" text-[1.1rem] font-bold mb-[18px] pb-3 border-b-[1.5px] border-indigo-500/10 bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                  Prerequisites
                </h2>
                <ul className="list-none p-0 m-0 grid grid-cols-2 max-[600px]:grid-cols-1 gap-2.5">
                  {data.prerequisites.map(
                    (item: { title: string }, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm leading-[1.5]"
                      >
                        <IoIosCheckmarkCircleOutline
                          size={18}
                          className="shrink-0 mt-0.5 text-indigo-500"
                        />
                        <span>{item.title}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}

            {/* Curriculum */}
            <div className="rounded-[20px] border-[1.5px] border-indigo-500/10 p-7 mb-6 bg-white shadow-[0_4px_24px_rgba(99,102,241,0.07)] dark:bg-[rgba(15,21,53,0.8)] dark:border-indigo-500/15 dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
              <h2 className=" text-[1.1rem] font-bold mb-[18px] pb-3 border-b-[1.5px] border-indigo-500/10 bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                Course Curriculum
              </h2>
              <CourseContentList data={data?.courseData ?? []} isDemo={true} />
            </div>

            {/* Description */}
            <div className="rounded-[20px] border-[1.5px] border-indigo-500/10 p-7 mb-6 bg-white shadow-[0_4px_24px_rgba(99,102,241,0.07)] dark:bg-[rgba(15,21,53,0.8)] dark:border-indigo-500/15 dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
              <h2 className=" text-[1.1rem] font-bold mb-[18px] pb-3 border-b-[1.5px] border-indigo-500/10 bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                Course Details
              </h2>
              <p className="text-[0.925rem] leading-[1.75] opacity-85">
                {data?.description}
              </p>
            </div>

            {/* Reviews */}
            <div className="rounded-[20px] border-[1.5px] border-indigo-500/10 p-7 mb-6 bg-white shadow-[0_4px_24px_rgba(99,102,241,0.07)] dark:bg-[rgba(15,21,53,0.8)] dark:border-indigo-500/15 dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
              <h2 className=" text-[1.1rem] font-bold mb-[18px] pb-3 border-b-[1.5px] border-indigo-500/10 bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                Student Reviews
              </h2>
              <div className="flex items-center gap-4 mb-5 p-4 rounded-2xl bg-indigo-500/[0.04] border border-indigo-500/10">
                <div>
                  <div className="text-5xl font-extrabold leading-none bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                    {data?.rating ? Number(data.rating).toFixed(1) : "0.0"}
                  </div>
                  <Rating value={data?.rating ?? 0} readOnly size="small" />
                  <div className="text-xs text-slate-400 mt-1">
                    Course Rating
                  </div>
                </div>
                <div className="flex-1 text-[0.85rem] opacity-70">
                  Based on {data?.reviews?.length ?? 0} reviews
                </div>
              </div>

              {[...(data?.reviews ?? [])]
                .reverse()
                .map((item: IReview, index: number) => (
                  <div
                    key={index}
                    className="flex gap-3.5 py-4 border-b border-indigo-500/[0.08] last:border-b-0"
                  >
                    <Image
                      src={
                        item?.user?.avatar?.url ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt={item?.user?.name}
                      width={42}
                      height={42}
                      className="w-[42px] h-[42px] rounded-full object-cover shrink-0 border-2 border-indigo-500/20"
                    />
                    <div className="flex-1">
                      <div className="font-bold text-sm">
                        {item?.user?.name}
                      </div>
                      <Rating value={item?.rating ?? 0} readOnly size="small" />
                      <p className="text-sm leading-[1.55] mt-1 text-slate-600 dark:text-slate-400">
                        {item?.comment}
                      </p>
                      <div className="text-xs text-slate-400 mt-1">
                        {format(item?.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}

              {(!data?.reviews || data.reviews.length === 0) && (
                <p className="text-center text-slate-400 text-[0.9rem] py-5">
                  No reviews yet. Be the first to review!
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="top-[100px] max-[900px]:order-[-1]">
            <div className="rounded-[20px] overflow-hidden border-[1.5px] border-indigo-500/[0.12] bg-white shadow-[0_8px_40px_rgba(99,102,241,0.12)] dark:bg-[rgba(15,21,53,0.85)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
              {/* Demo video */}
              <div className="relative overflow-hidden">
                <CoursePlayer videoUrl={data?.demoUrl} title={data?.name} />
              </div>

              {/* Pricing */}
              <div className="px-[22px] pt-5">
                <div className="flex items-baseline gap-2.5 mb-1">
                  <span className="text-[2rem] font-extrabold bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                    {data?.price === 0 ? "Free" : `$${data?.price}`}
                  </span>
                  {data?.estimatedPrice &&
                    data.estimatedPrice !== data?.price && (
                      <span className="text-base line-through text-slate-400">
                        ${data.estimatedPrice}
                      </span>
                    )}
                </div>
                {Number(discountPercentagePrice) > 0 && (
                  <span className="inline-block bg-gradient-to-br from-emerald-500 to-emerald-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {discountPercentagePrice}% OFF
                  </span>
                )}
              </div>

              {/* CTA Button */}
              {isPurchased ? (
                <Link
                  href={`/course-access/${data?._id}`}
                  className="block w-[calc(100%-44px)] mx-[22px] my-4 p-3.5 rounded-2xl text-base font-bold text-center no-underline text-white border-none transition-all duration-200 bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-[0_6px_24px_rgba(16,185,129,0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(16,185,129,0.45)]"
                >
                  Go to Course →
                </Link>
              ) : (
                <button
                  className="relative overflow-hidden block w-[calc(100%-44px)] mx-[22px] my-4 p-3.5 rounded-2xl cursor-pointer text-base font-bold text-center text-white border-none transition-all duration-200 bg-gradient-to-br from-indigo-500 to-violet-500 shadow-[0_6px_24px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(99,102,241,0.5)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-[left] before:duration-500 hover:before:left-full"
                  onClick={handleOrder}
                >
                  {data?.price === 0
                    ? "Enroll for Free"
                    : `Buy Now — $${data?.price}`}
                </button>
              )}

              <div className="h-px bg-indigo-500/[0.08] mx-[22px] mb-4" />

              {/* Perks */}
              <div className="px-[22px] pb-5 flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5 text-[0.825rem] font-medium">
                  <HiOutlineShieldCheck
                    size={16}
                    className="text-indigo-500 shrink-0"
                  />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2.5 text-[0.825rem] font-medium">
                  <HiOutlineClock
                    size={16}
                    className="text-indigo-500 shrink-0"
                  />
                  <span>Full Lifetime Access</span>
                </div>
                <div className="flex items-center gap-2.5 text-[0.825rem] font-medium">
                  <HiOutlineLockClosed
                    size={16}
                    className="text-indigo-500 shrink-0"
                  />
                  <span>Certificate of Completion</span>
                </div>
                <div className="flex items-center gap-2.5 text-[0.825rem] font-medium">
                  <HiOutlineAcademicCap
                    size={16}
                    className="text-indigo-500 shrink-0"
                  />
                  <span>Level: {data?.level}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Modal */}
        {open && (
          <div
            className="fixed inset-0 z-[9999] bg-black/65 flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <div
              className="w-full max-w-[480px] rounded-[22px] overflow-hidden relative bg-white shadow-[0_20px_60px_rgba(0,0,0,0.2)] dark:bg-[#0f1535] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <IoMdCloseCircleOutline
                className="absolute top-3.5 right-3.5 cursor-pointer text-slate-400 text-[1.6rem] z-10 transition-colors duration-200 hover:text-red-500"
                onClick={() => setOpen(false)}
              />
              <div className="p-7">
                <div className=" text-[1.2rem] font-bold mb-5 bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                  Complete Your Purchase
                </div>
                {(() => {
                  console.log("Stripe Debug in Modal:", {
                    stripePromise,
                    clientSecret,
                  });
                  return null;
                })()}
                {stripePromise && clientSecret ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm user={user!} setOpen={setOpen} data={data} />
                  </Elements>
                ) : (
                  <p className="text-center text-slate-400">
                    Loading payment form...
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CourseDetails;
