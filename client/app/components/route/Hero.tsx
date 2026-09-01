"use client";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import {
  HiOutlinePlayCircle,
  HiOutlineAcademicCap,
  HiOutlineCheckCircle,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { MdOutlineVerified, MdStars } from "react-icons/md";

import { useState, useEffect, useRef } from "react";
import { useGetHeroDataQuery } from "@/redux/features/layout/page";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
import { HiOutlineTrendingUp } from "react-icons/hi";

const STUDENT_IMGS = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/75.jpg",
];

const SEARCH_PLACEHOLDERS = [
  "React & Next.js...",
  "Machine Learning...",
  "UI / UX Design...",
  "Python & Django...",
  "Data Science...",
];

/* ─── Component ───────────────────────────────────────────── */
const Hero = () => {
  const [query, setQuery] = useState("");
  const [typed, setTyped] = useState("");
  const [phIdx, setPhIdx] = useState(0);
  const [cardVisible, setCardVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, refetch, isLoading } = useGetHeroDataQuery("Banner", {});
  const router = useRouter();
  /* typewriter */
  useEffect(() => {
    let i = 0;
    let growing = true;
    const word = SEARCH_PLACEHOLDERS[phIdx];
    const tick = setInterval(() => {
      if (growing) {
        setTyped(word.slice(0, i + 1));
        i++;
        if (i === word.length) {
          growing = false;
        }
      } else {
        setTyped(word.slice(0, i - 1));
        i--;
        if (i === 0) {
          growing = true;
          setPhIdx((p) => (p + 1) % SEARCH_PLACEHOLDERS.length);
          clearInterval(tick);
        }
      }
    }, 75);
    return () => clearInterval(tick);
  }, [phIdx]);

  useEffect(() => {
    const t = setTimeout(() => setCardVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  const handleSearch = async () => {
    if (query === "") {
      return;
    } else {
      router.push(`/courses?title=${query}`);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-[90px] pb-14 sm:pt-[110px] sm:pb-20 [&_*]:box-border">
            {/* Background mesh */}
            <div />
            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-[1260px] mx-auto px-6 relative z-[1]">
              {/* ══ LEFT COLUMN ══ */}
              <div className="flex flex-col gap-[30px]">
                {/* Badge */}
                <div className="inline-flex items-center gap-[9px] pl-2.5 pr-[18px] py-[7px] rounded-full border border-[rgba(99,102,241,.12)] bg-[rgba(99,102,241,.05)]  text-[13px] font-bold text-[#6366f1] tracking-[.03em] self-start dark:text-[#818cf8] dark:border-[rgba(99,102,241,.2)] dark:bg-[rgba(99,102,241,.1)]">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center flex-shrink-0 shadow-[0_0_0_4px_rgba(99,102,241,.2)]">
                    <span className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  #1 Platform for Online Learning
                </div>

                {/* Heading */}
                <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-black leading-[1.08] tracking-[-.04em] text-[#0f0a1e]  m-0 dark:text-[#f0eeff]">
                  Improve Your{" "}
                  <span className="bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] bg-clip-text text-transparent [-webkit-text-fill-color:transparent] bg-[length:200%_200%]">
                    {data?.layout?.banner?.title}
                  </span>{" "}
                  Experience
                  <br />
                  <span style={{ fontSize: "88%", opacity: 0.85 }}>
                    Better Instantly
                  </span>
                </h1>

                {/* Quick stats row */}
                <div className="flex gap-7 flex-wrap">
                  <div className="flex flex-col">
                    <span className="text-[1.6rem] font-black text-gray-900 tracking-[-.03em] leading-none dark:text-gray-100">
                      10k+
                    </span>
                    <span className="text-xs text-gray-500 font-medium mt-0.5 dark:text-gray-400">
                      Online Courses
                    </span>
                  </div>
                  <div className="hidden sm:block w-px bg-[rgba(99,102,241,.15)] self-stretch" />
                  <div className="flex flex-col">
                    <span className="text-[1.6rem] font-black text-gray-900 tracking-[-.03em] leading-none dark:text-gray-100">
                      1k+
                    </span>
                    <span className="text-xs text-gray-500 font-medium mt-0.5 dark:text-gray-400">
                      Active Students
                    </span>
                  </div>
                  <div className="hidden sm:block w-px bg-[rgba(99,102,241,.15)] self-stretch" />
                  <div className="flex flex-col">
                    <span className="text-[1.6rem] font-black text-gray-900 tracking-[-.03em] leading-none dark:text-gray-100">
                      4.9★
                    </span>
                    <span className="text-xs text-gray-500 font-medium mt-0.5 dark:text-gray-400">
                      Avg. Rating
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[17px] leading-[1.78] text-gray-600 max-w-[520px] m-0 dark:text-gray-400 [&>strong]:text-[#6366f1] [&>strong]:font-bold dark:[&>strong]:text-[#a78bfa]">
                  {data?.layout?.banner?.subTitle}
                </p>

                {/* Search bar */}
                <div className="relative w-full max-w-[580px]">
                  <div className="group flex flex-col sm:flex-row items-stretch sm:items-center bg-white/85 border border-[rgba(99,102,241,.12)] rounded-[18px] shadow-[0_4px_30px_rgba(99,102,241,.08)] overflow-hidden transition-all duration-300 dark:bg-[rgba(9,9,25,.85)] dark:border-[rgba(99,102,241,.18)] dark:shadow-[0_4px_30px_rgba(0,0,0,.35)] focus-within:border-[rgba(99,102,241,.5)] focus-within:shadow-[0_8px_30px_rgba(99,102,241,.16),0_0_0_4px_rgba(99,102,241,.09)]">
                    <div className="flex items-center flex-1">
                      <span className="pl-[18px] pr-3 text-gray-400 flex-shrink-0 transition-colors duration-300 flex items-center group-focus-within:text-[#6366f1]">
                        <BiSearch size={22} />
                      </span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={`Search for ${typed}|`}
                        className="flex-1 py-[17px] px-2 text-[15px] bg-transparent border-none outline-none text-gray-900 [caret-color:#6366f1] font-[inherit] dark:text-gray-100 placeholder:text-gray-400"
                      />
                    </div>
                    <button
                      className="flex items-center justify-center gap-2 px-[26px] py-[13px] sm:m-1.5 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white text-sm font-bold border-none sm:rounded-[13px] cursor-pointer transition-all duration-300 whitespace-nowrap shadow-[0_4px_15px_rgba(99,102,241,.35)] tracking-[.02em] relative overflow-hidden hover:shadow-[0_8px_25px_rgba(99,102,241,.5)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent)] before:transition-[left] before:duration-500 before:ease-out hover:before:left-full"
                      onClick={handleSearch}
                    >
                      <BiSearch size={15} />
                      Search
                    </button>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex items-center gap-3.5 flex-wrap">
                  <Link
                    href="#courses"
                    className="inline-flex items-center gap-[9px] px-[30px] py-3.5 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white text-[15px] font-bold rounded-[14px] border-none cursor-pointer no-underline transition-all duration-300 shadow-[0_4px_15px_rgba(99,102,241,.35)] tracking-[.01em] relative overflow-hidden hover:shadow-[0_8px_25px_rgba(99,102,241,.5)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent)] before:transition-[left] before:duration-[550ms] before:ease-out hover:before:left-full"
                  >
                    <HiOutlineAcademicCap size={18} />
                    Explore Courses
                  </Link>
                </div>

                {/* Social proof */}
                <div className="flex items-center gap-[18px] flex-wrap">
                  <div className="flex">
                    {STUDENT_IMGS.map((src, i) => (
                      <div
                        key={i}
                        className="w-[42px] h-[42px] rounded-full border-[3px] border-white overflow-hidden -ml-3 first:ml-0 transition-transform duration-[250ms] shadow-[0_2px_10px_rgba(0,0,0,.13)] flex-shrink-0 hover:scale-[1.12] hover:z-[5] dark:border-[#0d0d23]"
                        style={{ zIndex: STUDENT_IMGS.length - i }}
                      >
                        <Image
                          src={src}
                          alt="Student"
                          width={42}
                          height={42}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ))}
                    <div className="w-[42px] h-[42px] rounded-full border-[3px] border-white -ml-3 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white text-[10px] font-extrabold flex items-center justify-center shadow-[0_2px_10px_rgba(99,102,241,.32)] flex-shrink-0 dark:border-[#0d0d23]">
                      +2k
                    </div>
                  </div>
                  <div className="leading-[1.5]">
                    <div className="flex gap-0.5 mb-0.5 items-center">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <span key={i} className="text-[#f59e0b] text-sm">
                            ★
                          </span>
                        ))}
                      <span className="text-xs text-gray-500 ml-[5px] font-bold dark:text-gray-400">
                        4.9 / 5
                      </span>
                    </div>
                    <div className="text-sm font-extrabold text-gray-900 tracking-[-.01em] dark:text-gray-100">
                      1k+ trusted students
                    </div>
                    <div className="text-[12.5px] text-gray-500 dark:text-gray-400">
                      Join our growing community today
                    </div>
                  </div>
                </div>
              </div>

              {/* ══ RIGHT COLUMN ══ */}
              <div className="hidden lg:block relative h-[600px]">
                {/* Deco rings */}
                <div className="absolute rounded-full border border-dashed pointer-events-none w-[430px] h-[430px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[rgba(139,92,246,.13)]" />
                <div className="absolute rounded-full border border-dashed pointer-events-none w-[580px] h-[580px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[rgba(99,102,241,.07)]" />

                {/* Glow */}
                <div className="absolute w-[360px] h-[360px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#7c3aed] via-[#6366f1] to-[#3b82f6] opacity-[.22] z-0  dark:opacity-[.38]" />

                {/* Main image */}
                <div className="group absolute w-[360px] h-[360px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden shadow-[0_32px_90px_rgba(99,102,241,.22),0_10px_30px_rgba(0,0,0,.12)] border border-white/[.55] bg-gradient-to-br from-[#ede9fe] to-[#dbeafe] z-[1] dark:border-[rgba(99,102,241,.22)] dark:shadow-[0_32px_90px_rgba(99,102,241,.32),0_10px_30px_rgba(0,0,0,.45)] after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(to_bottom,transparent_50%,rgba(10,5,32,.35)_100%)] after:z-[1] after:pointer-events-none">
                  <Image
                    src={
                      data?.layout?.banner?.image?.url ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="Students Learning Online"
                    width={400}
                    height={400}
                    priority
                    className="w-full h-full object-cover transition-transform duration-[9000ms] ease group-hover:scale-105"
                  />
                </div>

                {/* Verified badge */}
                <div className="absolute bottom-[100px] left-1/2 -translate-x-1/2 z-[12] flex items-center gap-2 px-[18px] py-[9px] bg-white/85  border border-[rgba(99,102,241,.12)] rounded-full shadow-[0_4px_30px_rgba(99,102,241,.08)] whitespace-nowrap  dark:bg-[rgba(9,9,25,.85)] dark:border-[rgba(99,102,241,.18)] dark:shadow-[0_4px_30px_rgba(0,0,0,.35)]">
                  <span className="text-[#10b981] flex items-center">
                    <MdOutlineVerified size={20} />
                  </span>
                  <div>
                    <div className="text-[13px] font-bold text-gray-900 tracking-[-.01em] dark:text-gray-100">
                      Certified Instructors
                    </div>
                    <div className="text-[11px] text-gray-500 font-medium dark:text-gray-400">
                      All courses are verified
                    </div>
                  </div>
                </div>

                {/* Float card 1 — Courses */}
                <div className="absolute bg-white/85  border border-[rgba(99,102,241,.12)] rounded-[18px] px-[18px] py-3.5 shadow-[0_4px_30px_rgba(99,102,241,.08)] flex items-center gap-[13px] z-10 transition-[transform,box-shadow] hover:scale-[1.02] hover:shadow-[0_10px_35px_rgba(99,102,241,.18)] dark:bg-[rgba(9,9,25,.85)] dark:border-[rgba(99,102,241,.18)] dark:shadow-[0_4px_30px_rgba(0,0,0,.35)] dark:hover:shadow-[0_10px_35px_rgba(0,0,0,.5)] top-[10px] -right-[14px]">
                  <div className="w-[46px] h-[46px] rounded-[13px] flex items-center justify-center text-[21px] flex-shrink-0 bg-gradient-to-br from-[#d1fae5] to-[#a7f3d0] dark:!bg-[rgba(16,185,129,.18)]">
                    <HiOutlineCheckCircle size={22} color="#10b981" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-gray-900 leading-[1.2] tracking-[-.02em] dark:text-gray-100">
                      10k+
                    </div>
                    <div className="text-xs text-gray-500 font-medium mt-px dark:text-gray-400">
                      Online Courses
                    </div>
                    <div className="text-[11px] font-bold text-[#10b981] bg-[rgba(16,185,129,.1)] px-1.5 py-0.5 rounded-full mt-0.5 flex gap-0.5">
                      <HiOutlineTrendingUp size={15} /> 12% this month
                    </div>
                  </div>
                </div>

                {/* Float card 2 — Students */}
                <div className="absolute bg-white/85  border border-[rgba(99,102,241,.12)] rounded-[18px] px-[18px] py-3.5 shadow-[0_4px_30px_rgba(99,102,241,.08)] flex items-center gap-[13px] z-10 transition-[transform,box-shadow] hover:scale-[1.02] hover:shadow-[0_10px_35px_rgba(99,102,241,.18)] dark:bg-[rgba(9,9,25,.85)] dark:border-[rgba(99,102,241,.18)] dark:shadow-[0_4px_30px_rgba(0,0,0,.35)] dark:hover:shadow-[0_10px_35px_rgba(0,0,0,.5)] bottom-[55px] -left-[10px]">
                  <div className="w-[46px] h-[46px] rounded-[13px] flex items-center justify-center text-[21px] flex-shrink-0 bg-gradient-to-br from-[#dbeafe] to-[#bfdbfe] dark:!bg-[rgba(59,130,246,.18)]">
                    <HiOutlineUserGroup size={22} color="#3b82f6" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-gray-900 leading-[1.2] tracking-[-.02em] dark:text-gray-100">
                      1k+
                    </div>
                    <div className="text-xs text-gray-500 font-medium mt-px dark:text-gray-400">
                      Active Students
                    </div>
                    <div className="text-[11px] font-bold text-[#10b981] bg-[rgba(16,185,129,.1)] px-1.5 py-0.5 rounded-full mt-0.5 flex gap-0.5">
                      <HiOutlineTrendingUp size={15} /> 8% this week
                    </div>
                  </div>
                </div>

                {/* Float card 3 — Videos */}
                <div className="absolute bg-white/85  border border-[rgba(99,102,241,.12)] rounded-[18px] px-[18px] py-3.5 shadow-[0_4px_30px_rgba(99,102,241,.08)] flex items-center gap-[13px] z-10 transition-[transform,box-shadow] hover:scale-[1.02] hover:shadow-[0_10px_35px_rgba(99,102,241,.18)] dark:bg-[rgba(9,9,25,.85)] dark:border-[rgba(99,102,241,.18)] dark:shadow-[0_4px_30px_rgba(0,0,0,.35)] dark:hover:shadow-[0_10px_35px_rgba(0,0,0,.5)] top-[44%] -right-[24px] ">
                  <div className="w-[46px] h-[46px] rounded-[13px] flex items-center justify-center text-[21px] flex-shrink-0 bg-gradient-to-br from-[#ede9fe] to-[#ddd6fe] dark:!bg-[rgba(139,92,246,.18)]">
                    <HiOutlinePlayCircle size={22} color="#7c3aed" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-gray-900 leading-[1.2] tracking-[-.02em] dark:text-gray-100">
                      40+
                    </div>
                    <div className="text-xs text-gray-500 font-medium mt-px dark:text-gray-400">
                      Video Courses
                    </div>
                  </div>
                </div>

                {/* Float card 4 — Rating */}
                <div className="absolute bg-white/85  border border-[rgba(99,102,241,.12)] rounded-[18px] px-[18px] py-3.5 shadow-[0_4px_30px_rgba(99,102,241,.08)] flex items-center gap-[13px] z-10 transition-[transform,box-shadow] hover:scale-[1.02] hover:shadow-[0_10px_35px_rgba(99,102,241,.18)] dark:bg-[rgba(9,9,25,.85)] dark:border-[rgba(99,102,241,.18)] dark:shadow-[0_4px_30px_rgba(0,0,0,.35)] dark:hover:shadow-[0_10px_35px_rgba(0,0,0,.5)] bottom-[140px] right-5 ">
                  <div className="w-[46px] h-[46px] rounded-[13px] flex items-center justify-center text-[21px] flex-shrink-0 bg-gradient-to-br from-[#fef3c7] to-[#fde68a] dark:!bg-[rgba(245,158,11,.18)]">
                    <MdStars size={22} color="#f59e0b" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-gray-900 leading-[1.2] tracking-[-.02em] dark:text-gray-100">
                      4.9/5
                    </div>
                    <div className="text-xs text-gray-500 font-medium mt-px dark:text-gray-400">
                      Student Rating
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Hero;
