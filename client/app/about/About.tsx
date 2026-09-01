"use client";

import {
  HiOutlineSparkles,
  HiOutlineAcademicCap,
  HiOutlineRocketLaunch,
  HiOutlineUserGroup,
  HiOutlineTrophy,
  HiOutlineBookOpen,
  HiOutlineCheck,
} from "react-icons/hi2";
import {
  MdOutlineVerified,
  MdOutlinePeopleAlt,
  MdOutlineSchool,
  MdOutlinePlayCircle,
  MdOutlineStar,
} from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { FiTarget } from "react-icons/fi";

const STATS = [
  {
    icon: <MdOutlineSchool size={24} />,
    num: "10+",
    label: "Online Courses",
    color: "green",
  },
  {
    icon: <MdOutlinePeopleAlt size={24} />,
    num: "1k+",
    label: "Active Students",
    color: "blue",
  },
  {
    icon: <MdOutlinePlayCircle size={24} />,
    num: "40+",
    label: "Video Lessons",
    color: "purple",
  },
  {
    icon: <MdOutlineStar size={24} />,
    num: "4.9★",
    label: "Average Rating",
    color: "amber",
  },
];

const TEAM = [
  {
    name: "Dr. Ahmed Hassan",
    role: "Founder & CEO",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Former Google engineer with 15+ years in education technology. Passionate about democratizing access to world-class learning.",
  },
  {
    name: "Sarah Mitchell",
    role: "Head of Curriculum",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Award-winning educator with a PhD in Instructional Design. Ensures every course meets the highest academic standards.",
  },
  {
    name: "James Rodriguez",
    role: "CTO",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    bio: "Full-stack architect and open-source contributor. Leads our platform development with a focus on performance and accessibility.",
  },
  {
    name: "Aisha Patel",
    role: "Head of Community",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Building vibrant learning communities for 10+ years. Champions student success and instructor growth across the platform.",
  },
];

const VALUES = [
  {
    Icon: FiTarget,
    title: "Mission-Driven",
    desc: "We believe quality education should be accessible to everyone, everywhere, regardless of background or resources.",
  },
  {
    Icon: HiOutlineRocketLaunch,
    title: "Innovation First",
    desc: "We continuously push the boundaries of online learning through cutting-edge technology and pedagogy.",
  },
  {
    Icon: HiOutlineUserGroup,
    title: "Community Focus",
    desc: "Every student and instructor is valued. We build a supportive ecosystem where people grow together.",
  },
  {
    Icon: HiOutlineTrophy,
    title: "Excellence Always",
    desc: "From course content to platform experience, we obsess over quality and hold ourselves to the highest standards.",
  },
];

/* ─── Component ──────────────────────────────────────── */
const About = () => {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="relative z-[1] max-w-[1280px] mx-auto px-6">
          {/* ══ § 1 — HERO ══ */}
          <section className="pt-[100px] pb-12 sm:pt-[120px] sm:pb-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-br from-[rgba(99,102,241,0.1)] to-[rgba(139,92,246,0.1)] border border-[rgba(99,102,241,0.2)] text-[12.5px] font-bold text-[#6366f1] tracking-[0.05em] uppercase mb-[18px] dark:from-[rgba(99,102,241,0.18)] dark:to-[rgba(139,92,246,0.18)] dark:border-[rgba(99,102,241,0.3)] dark:text-[#818cf8]">
              <HiOutlineSparkles />
              About Us
            </div>
            <h1 className="text-[clamp(1.9rem,4vw,2.8rem)] font-black leading-[1.2] tracking-[-0.03em] text-[#111827] m-0 mb-4 dark:text-[#f3f4f6]">
              Empowering Learners,{" "}
              <span className="bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] bg-clip-text text-transparent">
                Transforming Lives
              </span>
            </h1>
            <p className="text-[17px] text-[#6b7280] max-w-[620px] mx-auto mb-10 leading-[1.65] dark:text-[#9ca3af]">
              We&apos;re on a mission to make world-class education accessible
              to everyone, everywhere. Since 2020, we&apos;ve helped over
              500,000 learners unlock their potential and build careers they
              love.
            </p>
            <div className="flex items-center justify-center gap-3.5 flex-wrap">
              <span className="inline-flex items-center gap-[7px] px-[18px] py-2 rounded-full bg-[rgba(255,255,255,0.85)]  border-[rgba(99,102,241,0.12)] text-[13.5px] font-bold text-[#374151] shadow-[0_2px_12px_rgba(99,102,241,0.06)] dark:bg-[rgba(15,21,53,0.75)] dark:border-[rgba(99,102,241,0.2)] dark:text-[#d1d5db]">
                <MdOutlineVerified
                  size={18}
                  className="text-[#6366f1] dark:text-[#818cf8]"
                />
                Certified Instructors
              </span>
              <span className="inline-flex items-center gap-[7px] px-[18px] py-2 rounded-full bg-[rgba(255,255,255,0.85)]  border-[rgba(99,102,241,0.12)] text-[13.5px] font-bold text-[#374151] shadow-[0_2px_12px_rgba(99,102,241,0.06)] dark:bg-[rgba(15,21,53,0.75)] dark:border-[rgba(99,102,241,0.2)] dark:text-[#d1d5db]">
                <HiOutlineAcademicCap
                  size={18}
                  className="text-[#6366f1] dark:text-[#818cf8]"
                />
                Industry-Led Content
              </span>
              <span className="inline-flex items-center gap-[7px] px-[18px] py-2 rounded-full bg-[rgba(255,255,255,0.85)]  border-[rgba(99,102,241,0.12)] text-[13.5px] font-bold text-[#374151] shadow-[0_2px_12px_rgba(99,102,241,0.06)] dark:bg-[rgba(15,21,53,0.75)] dark:border-[rgba(99,102,241,0.2)] dark:text-[#d1d5db]">
                <MdOutlinePeopleAlt
                  size={18}
                  className="text-[#6366f1] dark:text-[#818cf8]"
                />
                Global Community
              </span>
            </div>
          </section>

          {/* ══ § 2 — STATS ══ */}
          <section className="pb-20">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
              {STATS.map((s, i) => {
                const colorMap: Record<string, string> = {
                  green:
                    "bg-gradient-to-br from-[#d1fae5] to-[#a7f3d0] text-[#065f46] dark:bg-none dark:bg-[rgba(16,185,129,0.18)] dark:text-[#6ee7b7]",
                  blue: "bg-gradient-to-br from-[#dbeafe] to-[#bfdbfe] text-[#1e40af] dark:bg-none dark:bg-[rgba(59,130,246,0.18)] dark:text-[#93c5fd]",
                  purple:
                    "bg-gradient-to-br from-[#ede9fe] to-[#ddd6fe] text-[#5b21b6] dark:bg-none dark:bg-[rgba(139,92,246,0.18)] dark:text-[#c4b5fd]",
                  amber:
                    "bg-gradient-to-br from-[#fef3c7] to-[#fde68a] text-[#92400e] dark:bg-none dark:bg-[rgba(245,158,11,0.18)] dark:text-[#fcd34d]",
                };
                return (
                  <div
                    key={i}
                    className="rounded-[20px] px-6 py-7 border-[1.5px] border-[rgba(99,102,241,0.1)] bg-[rgba(255,255,255,0.88)]  shadow-[0_4px_20px_rgba(99,102,241,0.06)] text-center flex flex-col items-center gap-3 hover:shadow-[0_16px_40px_rgba(99,102,241,0.14)] hover:border-[rgba(99,102,241,0.28)] dark:bg-[rgba(15,21,53,0.72)] dark:border-[rgba(99,102,241,0.16)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${colorMap[s.color]}`}
                    >
                      {s.icon}
                    </div>
                    <div className="text-[2.2rem] font-black text-[#111827] tracking-[-0.03em] leading-none bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">
                      {s.num}
                    </div>
                    <div className="text-sm font-semibold text-[#6b7280] dark:text-[#9ca3af]">
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ══ § 3 — STORY ══ */}
          <section className="pb-20 ">
            <div className="grid grid-cols-2 gap-[60px] items-center max-md:grid-cols-1 max-md:gap-9">
              {/* Visual side */}
              <div className="relative">
                <div className="relative rounded-[24px] overflow-hidden border-[1.5px] border-[rgba(99,102,241,0.12)] bg-gradient-to-br from-[rgba(99,102,241,0.08)] to-[rgba(139,92,246,0.06)] aspect-[4/3] flex items-center justify-center shadow-[0_20px_60px_rgba(99,102,241,0.12)] dark:border-[rgba(99,102,241,0.2)] dark:from-[rgba(99,102,241,0.12)] dark:to-[rgba(139,92,246,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                  <HiOutlineBookOpen
                    size={72}
                    className="text-[#6366f1] drop-shadow-[0_8px_20px_rgba(99,102,241,0.3)] "
                  />
                </div>
                <div className="absolute top-[18px] right-2 sm:-right-[14px]  px-4 py-2.5 rounded-[14px] bg-[rgba(255,255,255,0.92)]  border border-[rgba(99,102,241,0.12)] shadow-[0_4px_20px_rgba(99,102,241,0.12)] flex items-center gap-2 text-[13px] font-bold text-[#111827] dark:bg-[rgba(15,21,53,0.9)] dark:border-[rgba(99,102,241,0.2)] dark:text-[#f3f4f6]">
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669]" />
                  <span>1k+ Students</span>
                </div>
                <div className="absolute bottom-6 left-2 sm:-left-[14px]  px-4 py-2.5 rounded-[14px] bg-[rgba(255,255,255,0.92)]  border border-[rgba(99,102,241,0.12)] shadow-[0_4px_20px_rgba(99,102,241,0.12)] flex items-center gap-2 text-[13px] font-bold text-[#111827] dark:bg-[rgba(15,21,53,0.9)] dark:border-[rgba(99,102,241,0.2)] dark:text-[#f3f4f6]">
                  <span className="flex items-center gap-1">
                    <AiFillStar size={16} color="#f59e0b" />
                    4.9 / 5 Rating
                  </span>
                </div>
              </div>

              {/* Text side */}
              <div className="flex flex-col gap-5">
                <div className="self-start inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-br from-[rgba(99,102,241,0.1)] to-[rgba(139,92,246,0.1)] border border-[rgba(99,102,241,0.2)] text-[12.5px] font-bold text-[#6366f1] tracking-[0.05em] uppercase mb-[18px] dark:from-[rgba(99,102,241,0.18)] dark:to-[rgba(139,92,246,0.18)] dark:border-[rgba(99,102,241,0.3)] dark:text-[#818cf8]">
                  <HiOutlineSparkles />
                  Our Story
                </div>
                <h2 className="text-[clamp(1.9rem,4vw,2.8rem)] font-black leading-[1.2] tracking-[-0.03em] text-[#111827] m-0 mb-4 dark:text-[#f3f4f6]">
                  Built By Learners,{" "}
                  <span className="bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] bg-clip-text text-transparent">
                    For Learners
                  </span>
                </h2>
                <p className="text-base text-[#4b5563] leading-[1.8] m-0 dark:text-[#9ca3af]">
                  ELearning was born from a simple frustration — great education
                  was too expensive and inaccessible. Founded in 2020 by a team
                  of engineers, educators, and designers, we set out to change
                  that.
                </p>
                <p className="text-base text-[#4b5563] leading-[1.8] m-0 dark:text-[#9ca3af]">
                  Today we partner with leading industry experts to bring you
                  up-to-date, practical courses that get you job-ready fast.
                  Every course is reviewed, every instructor is vetted, and
                  every student is supported.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    "Courses crafted by top industry professionals",
                    "Project-based learning for real-world skills",
                    "Lifetime access to all purchased content",
                    "Certificate upon course completion",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 text-[14.5px] text-[#374151] font-medium dark:text-[#d1d5db]"
                    >
                      <div className="flex-shrink-0 w-[22px] h-[22px] rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-xs mt-px">
                        <HiOutlineCheck size={12} strokeWidth={3} />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══ § 4 — VALUES ══ */}
          <section className="pb-20 ">
            <div className="text-center mb-[50px]">
              <div className="mx-auto mb-[18px] w-fit inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-br from-[rgba(99,102,241,0.1)] to-[rgba(139,92,246,0.1)] border border-[rgba(99,102,241,0.2)] text-[12.5px] font-bold text-[#6366f1] tracking-[0.05em] uppercase dark:from-[rgba(99,102,241,0.18)] dark:to-[rgba(139,92,246,0.18)] dark:border-[rgba(99,102,241,0.3)] dark:text-[#818cf8]">
                <HiOutlineSparkles />
                Our Values
              </div>
              <h2 className="text-[clamp(1.9rem,4vw,2.8rem)] font-black leading-[1.2] tracking-[-0.03em] text-[#111827] m-0 mb-4 dark:text-[#f3f4f6]">
                What We{" "}
                <span className="bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] bg-clip-text text-transparent">
                  Stand For
                </span>
              </h2>
              <p className="text-base text-[#6b7280] max-w-[500px] mx-auto leading-[1.6] dark:text-[#9ca3af]">
                Our values guide every decision we make — from how we build our
                platform to how we support our community.
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[22px]">
              {VALUES.map((v, i) => {
                const Icon = v.Icon;
                return (
                  <div
                    key={i}
                    className="rounded-[20px] px-6 py-7 border-[1.5px] border-[rgba(99,102,241,0.1)] bg-[rgba(255,255,255,0.88)] shadow-[0_4px_20px_rgba(99,102,241,0.05)] flex flex-col gap-3.5 hover:shadow-[0_16px_40px_rgba(99,102,241,0.14)] hover:border-[rgba(99,102,241,0.28)] dark:bg-[rgba(15,21,53,0.72)] dark:border-[rgba(99,102,241,0.16)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                  >
                    <div className="w-[50px] h-[50px] rounded-2xl flex items-center justify-center bg-gradient-to-br from-[rgba(99,102,241,0.1)] to-[rgba(139,92,246,0.1)] text-[#6366f1] mb-2 dark:from-[rgba(99,102,241,0.2)] dark:to-[rgba(139,92,246,0.2)] dark:text-[#818cf8]">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-[17px] font-extrabold text-[#111827] m-0 dark:text-[#f3f4f6]">
                      {v.title}
                    </h3>
                    <p className="text-sm text-[#6b7280] leading-[1.65] m-0 dark:text-[#9ca3af]">
                      {v.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ══ § 5 — TEAM ══ */}
          <section className="pb-[100px] ">
            <div className="text-center mb-[50px]">
              <div className="mx-auto mb-[18px] w-fit inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-br from-[rgba(99,102,241,0.1)] to-[rgba(139,92,246,0.1)] border border-[rgba(99,102,241,0.2)] text-[12.5px] font-bold text-[#6366f1] tracking-[0.05em] uppercase dark:from-[rgba(99,102,241,0.18)] dark:to-[rgba(139,92,246,0.18)] dark:border-[rgba(99,102,241,0.3)] dark:text-[#818cf8]">
                <HiOutlineSparkles />
                Our Team
              </div>
              <h2 className="text-[clamp(1.9rem,4vw,2.8rem)] font-black leading-[1.2] tracking-[-0.03em] text-[#111827] m-0 mb-4 dark:text-[#f3f4f6]">
                Meet The{" "}
                <span className="bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] bg-clip-text text-transparent">
                  People
                </span>
                <br />
                Behind ELearning
              </h2>
              <p className="text-base text-[#6b7280] max-w-[500px] mx-auto leading-[1.6] dark:text-[#9ca3af]">
                A passionate team of educators, engineers and designers
                committed to building the best learning experience on the
                planet.
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[22px]">
              {TEAM.map((member, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-[22px] pt-[30px] px-6 pb-6 border-[1.5px] border-[rgba(99,102,241,0.1)] bg-[rgba(255,255,255,0.88)] shadow-[0_4px_20px_rgba(99,102,241,0.05)] text-center flex flex-col items-center gap-3.5 hover:shadow-[0_20px_50px_rgba(99,102,241,0.16)] hover:border-[rgba(99,102,241,0.28)] dark:bg-[rgba(15,21,53,0.72)] dark:border-[rgba(99,102,241,0.16)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                >
                  <div className="w-[88px] h-[88px] rounded-full p-[3px] bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] shadow-[0_4px_18px_rgba(99,102,241,0.35)] flex-shrink-0">
                    <div className="w-full h-full rounded-full overflow-hidden border-[3px] border-white dark:border-[#0d0d23]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover block"
                      />
                    </div>
                  </div>
                  <h3 className="text-[17px] font-extrabold text-[#111827] m-0 dark:text-[#f3f4f6]">
                    {member.name}
                  </h3>
                  <p className="text-[12.5px] font-bold text-[#6366f1] uppercase tracking-[0.05em] -mt-1.5 dark:text-[#818cf8]">
                    {member.role}
                  </p>
                  <div className="flex gap-0.5 text-[#f59e0b]">
                    {Array(5)
                      .fill(0)
                      .map((_, j) => (
                        <AiFillStar key={j} size={14} />
                      ))}
                  </div>
                  <p className="text-[13.5px] text-[#6b7280] leading-[1.65] m-0 dark:text-[#9ca3af]">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ══ § 6 — CTA ══ */}
          <section className="pb-[100px] ">
            <div className="relative overflow-hidden rounded-[28px] px-5 py-10 sm:px-12 sm:py-[60px] bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] text-center shadow-[0_20px_60px_rgba(99,102,241,0.35)]">
              <h2 className="relative text-[clamp(1.6rem,4vw,2.4rem)] font-black text-white m-0 mb-3.5 leading-[1.25] tracking-[-0.02em]">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="relative text-base text-[rgba(255,255,255,0.8)] max-w-[520px] mx-auto mb-8 leading-[1.65]">
                Join over 1,000 students worldwide who are already unlocking
                their potential with ELearning.
              </p>
              <a
                href="/courses"
                className="relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-white text-[#6366f1] text-[15px] font-extrabold shadow-[0_4px_20px_rgba(0,0,0,0.18)] tracking-[0.01em] hover:shadow-[0_10px_30px_rgba(0,0,0,0.28)]"
              >
                <HiOutlineAcademicCap size={20} />
                Explore All Courses
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
