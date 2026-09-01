"use client";
import Image from "next/image";
import React, { useState } from "react";
import ReviewCard from "../Review/ReviewCard";
import { HiOutlineSparkles } from "react-icons/hi2";
import { MdOutlineFormatQuote } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";

/* ─── Static data ─────────────────────────────────────────── */
export const reviews = [
  {
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    profession: "Full-Stack Developer",
    comment:
      "This platform completely transformed my career. The courses are incredibly well-structured and the instructors are top-notch. I landed my dream job within 3 months!",
    rating: 5,
    course: "React & Next.js Masterclass",
  },
  {
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    profession: "Data Scientist",
    comment:
      "The machine learning course exceeded all my expectations. Practical projects and real-world datasets made learning so much more effective than other platforms.",
    rating: 5,
    course: "Machine Learning A-Z",
  },
  {
    name: "Emily Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    profession: "UX Designer",
    comment:
      "Absolutely amazing UI/UX course! The instructor explains complex concepts in a simple, engaging way. I went from zero to landing freelance clients in just 2 months.",
    rating: 5,
    course: "UI/UX Design Bootcamp",
  },
  {
    name: "James Williams",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    profession: "Backend Engineer",
    comment:
      "Best investment I've made in my career. The Python & Django course is extremely comprehensive and up-to-date with modern best practices. Highly recommended!",
    rating: 5,
    course: "Python & Django Pro",
  },
  {
    name: "Aisha Patel",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    profession: "Cloud Architect",
    comment:
      "The cloud computing course gave me exactly what I needed to pass my AWS certification. Clear explanations, excellent labs, and outstanding support from the community.",
    rating: 5,
    course: "AWS Cloud Practitioner",
  },
  {
    name: "David Kim",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    profession: "Mobile Developer",
    comment:
      "I've tried many online learning platforms, but this one stands out. The project-based approach and mentorship made all the difference in my learning journey.",
    rating: 5,
    course: "Flutter Development",
  },
];

/* ─── Component ──────────────────────────────────────────── */
const Reviews = () => {
  const [active, setActive] = useState(0);

  return (
    <>
      <section className="relative overflow-hidden pt-[100px] pb-[90px]">
        {/* Background */}
        <div className="absolute rounded-full pointer-events-none z-0 w-[500px] h-[500px] top-[-80px] left-[-120px] bg-[radial-gradient(circle,rgba(99,102,241,.1)_0%,transparent_70%)]" />
        <div className="absolute rounded-full pointer-events-none z-0 w-[380px] h-[380px] bottom-[-60px] right-[-80px] bg-[radial-gradient(circle,rgba(139,92,246,.09)_0%,transparent_70%)]" />

        <div className="relative z-[1] max-w-[1280px] mx-auto px-6">
          {/* ── Header ── */}
          <div className="text-center mb-16 [animation:_.7s_.1s_both]">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-br from-[rgba(99,102,241,.1)] to-[rgba(139,92,246,.1)] border border-[rgba(99,102,241,.2)] text-[12.5px] font-bold text-[#6366f1] tracking-[.05em] uppercase mb-[18px] dark:from-[rgba(99,102,241,.18)] dark:to-[rgba(139,92,246,.18)] dark:border-[rgba(99,102,241,.3)] dark:text-[#818cf8]">
              <HiOutlineSparkles />
              Student Reviews
            </div>
            <h2 className="text-[clamp(1.9rem,4vw,2.8rem)] font-black leading-[1.2] tracking-[-.03em] text-[#111827] mb-[14px] dark:text-[#f3f4f6]">
              Our Students Are{" "}
              <span className="bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] bg-clip-text text-transparent">
                Our Strength
              </span>
            </h2>
            <p className="text-[16.5px] text-[#6b7280] max-w-[540px] mx-auto mb-6 leading-[1.65] dark:text-[#9ca3af]">
              See what thousands of learners across the globe are saying about
              their experience on our platform.
            </p>
            <div className="flex items-center justify-center gap-7 flex-wrap">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#374151] dark:text-[#d1d5db]">
                <span className="text-[22px] font-black bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">
                  1k+
                </span>
                <span>Happy Students</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-[rgba(99,102,241,.3)]" />
              <div className="flex items-center gap-2 text-sm font-semibold text-[#374151] dark:text-[#d1d5db]">
                <span className="text-[22px] font-black bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">
                  4.9
                </span>
                <div className="flex gap-0.5">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <AiFillStar key={i} size={16} color="#f59e0b" />
                    ))}
                </div>
                <span>Avg Rating</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-[rgba(99,102,241,.3)]" />
              <div className="flex items-center gap-2 text-sm font-semibold text-[#374151] dark:text-[#d1d5db]">
                <span className="text-[22px] font-black bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">
                  98%
                </span>
                <span>Satisfaction Rate</span>
              </div>
            </div>
          </div>

          {/* ── Featured Review (rotating) ── */}
          <div className="mb-[60px] ">
            <div className="relative rounded-[28px] px-5 py-8 sm:px-[52px] sm:py-12 bg-gradient-to-br from-[rgba(99,102,241,.06)] to-[rgba(139,92,246,.06)] border-[1.5px] border-[rgba(99,102,241,.14)] shadow-[0_8px_40px_rgba(99,102,241,.08)] overflow-hidden flex flex-col sm:flex-row gap-7 sm:gap-12 items-center max-md:px-5 max-md:py-8 max-md:gap-7 dark:from-[rgba(99,102,241,.1)] dark:to-[rgba(139,92,246,.08)] dark:border-[rgba(99,102,241,.2)] dark:shadow-[0_8px_40px_rgba(0,0,0,.3)]">
              <span className="absolute top-5 left-6 text-[120px] leading-none text-[rgba(99,102,241,.08)] font-serif pointer-events-none select-none dark:text-[rgba(99,102,241,.12)]">
                "
              </span>

              {/* Image */}
              <div className="relative flex-shrink-0">
                <div className="w-[140px] h-[140px] rounded-full p-1 bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] shadow-[0_0_30px_rgba(99,102,241,.35)] flex-shrink-0">
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-[#0d0d23]">
                    <Image
                      src={reviews[active].avatar}
                      alt={reviews[active].name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="140px"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex gap-[3px] mb-[14px] text-[#f59e0b]">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <AiFillStar key={i} size={20} />
                    ))}
                </div>
                <p className="text-lg leading-[1.7] text-[#374151] font-medium mb-5 italic dark:text-[#d1d5db]">
                  &ldquo;{reviews[active].comment}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[3px] rounded-sm bg-gradient-to-br from-[#6366f1] to-[#8b5cf6]" />
                  <div>
                    <p className="text-base font-extrabold text-[#111827] dark:text-[#f3f4f6]">
                      {reviews[active].name}
                    </p>
                    <p className="text-[13px] text-[#6b7280] font-medium dark:text-[#9ca3af]">
                      {reviews[active].profession}
                    </p>
                    {reviews[active].course && (
                      <span className="inline-flex items-center gap-[5px] mt-2 px-3 py-1 rounded-full bg-[rgba(99,102,241,.08)] border border-[rgba(99,102,241,.15)] text-xs font-bold text-[#6366f1] dark:bg-[rgba(99,102,241,.15)] dark:border-[rgba(99,102,241,.25)] dark:text-[#818cf8]">
                        <MdOutlineFormatQuote size={13} />
                        {reviews[active].course}
                      </span>
                    )}
                  </div>
                </div>

                {/* Dot nav */}
                <div className="flex items-center gap-2 mt-6">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      className={`h-2 rounded-full border-0 cursor-pointer transition-all duration-300 p-0 ${
                        active === i
                          ? "w-6 rounded-[4px] bg-gradient-to-br from-[#6366f1] to-[#8b5cf6]"
                          : "w-2 bg-[rgba(99,102,241,.25)]"
                      }`}
                      onClick={() => setActive(i)}
                      aria-label={`Review ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Avatar stack ── */}
          <div className="flex items-center mb-7">
            {reviews.slice(0, 5).map((r, i) => (
              <div
                key={i}
                className="relative w-11 h-11 rounded-full border-[3px] border-white -ml-2.5 first:ml-0 overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,.12)] transition-transform hover:scale-110 hover:z-[5] dark:border-[#0d0d23]"
                style={{ zIndex: reviews.length - i }}
              >
                <Image
                  src={r.avatar}
                  alt={r.name}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="44px"
                />
              </div>
            ))}
            <div className="w-11 h-11 rounded-full border-[3px] border-white -ml-2.5 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white text-[11px] font-extrabold flex items-center justify-center shadow-[0_2px_10px_rgba(99,102,241,.35)] dark:border-[#0d0d23]">
              +2k
            </div>
            <p className="ml-[14px] text-sm font-semibold text-[#374151] leading-[1.5] dark:text-[#d1d5db]">
              Join{" "}
              <strong className="text-[#6366f1] font-extrabold dark:text-[#818cf8]">
                500,000+
              </strong>{" "}
              learners already on the platform
            </p>
          </div>

          {/* ── Card Grid ── */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[22px]">
            {reviews.map((review, index) => (
              <div key={index}>
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Reviews;
