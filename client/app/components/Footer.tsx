import Link from "next/link";
import React from "react";
import {
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FiPhone, FiMail, FiMapPin, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="relative  border-t border-[rgba(99,102,241,0.08)] pt-20 pb-[30px] overflow-hidden z-10 dark:bg-gradient-to-b dark:from-[rgba(13,13,35,0.6)] dark:to-[rgba(9,9,25,0.95)] dark:border-t-[rgba(99,102,241,0.14)]">
      {/* Glow ambient background effect */}
      <div className="absolute w-[300px] h-[300px] bottom-[-150px] left-[-150px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none z-0 dark:bg-[radial-gradient(circle,rgba(99,102,241,0.12)_0%,transparent_70%)]" />

      <div className="relative z-[1] max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 gap-[35px] sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr] lg:gap-10 mb-[50px]">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-[18px]">
            <Link
              href="/"
              className="flex items-center gap-2.5 no-underline w-fit"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] rounded-[9px] flex items-center justify-center shadow-[0_4px_15px_rgba(99,102,241,0.3)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3L4 8v8l8 5 8-5V8l-8-5z"
                    fill="rgba(255,255,255,0.9)"
                  />
                  <path
                    d="M4 8l8 5 8-5"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d="M12 13v8"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1"
                  />
                </svg>
              </div>
              <span className="text-[1.2rem] font-extrabold bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] bg-clip-text text-transparent tracking-[-0.02em]">
                ELearning
              </span>
            </Link>
            <p className="text-[14.5px] text-[#4b5563] leading-[1.65] m-0 dark:text-[#9ca3af]">
              Empowering students worldwide with premium, project-based online
              courses. Learn at your own pace from industry leaders and unlock
              your potential.
            </p>
            <div className="flex items-center gap-2.5 mt-1.5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[38px] h-[38px] rounded-[10px] border border-[rgba(99,102,241,0.15)] bg-white/60 flex items-center justify-center text-[#4b5563] transition-all duration-[250ms] ease-in-out text-lg no-underline  hover:bg-gradient-to-br hover:from-[#6366f1] hover:to-[#8b5cf6] hover:text-white hover:border-transparent hover:shadow-[0_4px_14px_rgba(99,102,241,0.35)] dark:bg-[rgba(15,21,53,0.4)] dark:border-[rgba(99,102,241,0.2)] dark:text-[#9ca3af]"
                aria-label="GitHub"
              >
                <AiOutlineGithub />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[38px] h-[38px] rounded-[10px] border border-[rgba(99,102,241,0.15)] bg-white/60 flex items-center justify-center text-[#4b5563] transition-all duration-[250ms] ease-in-out text-lg no-underline hover:bg-gradient-to-br hover:from-[#6366f1] hover:to-[#8b5cf6] hover:text-white hover:border-transparent hover:shadow-[0_4px_14px_rgba(99,102,241,0.35)] dark:bg-[rgba(15,21,53,0.4)] dark:border-[rgba(99,102,241,0.2)] dark:text-[#9ca3af]"
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[38px] h-[38px] rounded-[10px] border border-[rgba(99,102,241,0.15)] bg-white/60 flex items-center justify-center text-[#4b5563] transition-all duration-[250ms] ease-in-out text-lg no-underline hover:bg-gradient-to-br hover:from-[#6366f1] hover:to-[#8b5cf6] hover:text-white hover:border-transparent hover:shadow-[0_4px_14px_rgba(99,102,241,0.35)] dark:bg-[rgba(15,21,53,0.4)] dark:border-[rgba(99,102,241,0.2)] dark:text-[#9ca3af]"
                aria-label="Twitter"
              >
                <AiOutlineTwitter />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[38px] h-[38px] rounded-[10px] border border-[rgba(99,102,241,0.15)] bg-white/60 flex items-center justify-center text-[#4b5563] transition-all duration-[250ms] ease-in-out text-lg no-underline hover:bg-gradient-to-br hover:from-[#6366f1] hover:to-[#8b5cf6] hover:text-white hover:border-transparent hover:shadow-[0_4px_14px_rgba(99,102,241,0.35)] dark:bg-[rgba(15,21,53,0.4)] dark:border-[rgba(99,102,241,0.2)] dark:text-[#9ca3af]"
                aria-label="YouTube"
              >
                <AiOutlineYoutube />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-[18px]">
            <h4 className="text-[15px] font-extrabold uppercase tracking-[0.08em] text-[#111827] relative pb-2 m-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-6 after:h-0.5 after:rounded-full after:bg-gradient-to-r after:from-[#6366f1] after:to-[#8b5cf6] dark:text-[#f3f4f6]">
              Explore
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li>
                <Link
                  href="/courses"
                  className="text-[14.5px] text-[#4b5563] no-underline transition-all duration-200 ease-in-out inline-flex items-center w-fit hover:text-[#6366f1] dark:text-[#9ca3af] dark:hover:text-[#818cf8]"
                >
                  Our Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[14.5px] text-[#4b5563] no-underline transition-all duration-200 ease-in-out inline-flex items-center w-fit hover:text-[#6366f1] dark:text-[#9ca3af] dark:hover:text-[#818cf8]"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-[14.5px] text-[#4b5563] no-underline transition-all duration-200 ease-in-out inline-flex items-center w-fit hover:text-[#6366f1] dark:text-[#9ca3af] dark:hover:text-[#818cf8]"
                >
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/about#faq"
                  className="text-[14.5px] text-[#4b5563] no-underline transition-all duration-200 ease-in-out inline-flex items-center w-fit hover:text-[#6366f1] dark:text-[#9ca3af] dark:hover:text-[#818cf8]"
                >
                  Help & FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Resources */}
          <div className="flex flex-col gap-[18px]">
            <h4 className="text-[15px] font-extrabold uppercase tracking-[0.08em] text-[#111827] relative pb-2 m-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-6 after:h-0.5 after:rounded-full after:bg-gradient-to-r after:from-[#6366f1] after:to-[#8b5cf6] dark:text-[#f3f4f6]">
              Legal
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li>
                <Link
                  href="/about"
                  className="text-[14.5px] text-[#4b5563] no-underline transition-all duration-200 ease-in-out inline-flex items-center w-fit hover:text-[#6366f1] dark:text-[#9ca3af] dark:hover:text-[#818cf8]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[14.5px] text-[#4b5563] no-underline transition-all duration-200 ease-in-out inline-flex items-center w-fit hover:text-[#6366f1] dark:text-[#9ca3af] dark:hover:text-[#818cf8]"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[14.5px] text-[#4b5563] no-underline transition-all duration-200 ease-in-out inline-flex items-center w-fit hover:text-[#6366f1] dark:text-[#9ca3af] dark:hover:text-[#818cf8]"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col gap-[18px]">
            <h4 className="text-[15px] font-extrabold uppercase tracking-[0.08em] text-[#111827] relative pb-2 m-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-6 after:h-0.5 after:rounded-full after:bg-gradient-to-r after:from-[#6366f1] after:to-[#8b5cf6] dark:text-[#f3f4f6]">
              Contact Info
            </h4>
            <div className="flex flex-col gap-3.5">
              <div className="flex items-start gap-2.5 text-sm text-[#4b5563] leading-[1.5] dark:text-[#9ca3af]">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg border border-[rgba(99,102,241,0.12)] bg-white/60 flex items-center justify-center text-[#6366f1] text-sm dark:bg-[rgba(15,21,53,0.4)] dark:border-[rgba(99,102,241,0.18)] dark:text-[#818cf8]">
                  <FiPhone />
                </div>
                <div className="[&_p]:m-0 [&_a]:text-inherit [&_a]:no-underline [&_a]:transition-colors [&_a]:duration-200 [&_a:hover]:text-[#6366f1] dark:[&_a:hover]:text-[#818cf8]">
                  <p>Call us:</p>
                  <a href="tel:01009014597">01009014597</a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-sm text-[#4b5563] leading-[1.5] dark:text-[#9ca3af]">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg border border-[rgba(99,102,241,0.12)] bg-white/60 flex items-center justify-center text-[#6366f1] text-sm dark:bg-[rgba(15,21,53,0.4)] dark:border-[rgba(99,102,241,0.18)] dark:text-[#818cf8]">
                  <FiMail />
                </div>
                <div className="[&_p]:m-0 [&_a]:text-inherit [&_a]:no-underline [&_a]:transition-colors [&_a]:duration-200 [&_a:hover]:text-[#6366f1] dark:[&_a:hover]:text-[#818cf8]">
                  <p>Mail us:</p>
                  <a href="mailto:mohnud0987@gmail.com">mohnud0987@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-sm text-[#4b5563] leading-[1.5] dark:text-[#9ca3af]">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg border border-[rgba(99,102,241,0.12)] bg-white/60 flex items-center justify-center text-[#6366f1] text-sm dark:bg-[rgba(15,21,53,0.4)] dark:border-[rgba(99,102,241,0.18)] dark:text-[#818cf8]">
                  <FiMapPin />
                </div>
                <div className="[&_p]:m-0">
                  <p>Address:</p>
                  <span>Cairo, Egypt</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-[rgba(99,102,241,0.08)] pt-[25px] flex items-center justify-between flex-wrap gap-3.5 dark:border-t-[rgba(99,102,241,0.14)]">
          <p className="text-[13.5px] text-[#6b7280] m-0 dark:text-[#9ca3af]">
            Copyright &copy; 2026 ELearning Platforms Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5 flex-wrap">
            <Link
              href="/about"
              className="text-[13px] text-[#6b7280] no-underline transition-colors duration-200 hover:text-[#6366f1] dark:text-[#9ca3af] dark:hover:text-[#818cf8]"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-[13px] text-[#6b7280] no-underline transition-colors duration-200 hover:text-[#6366f1] dark:text-[#9ca3af] dark:hover:text-[#818cf8]"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-[13px] text-[#6b7280] no-underline transition-colors duration-200 hover:text-[#6366f1] dark:text-[#9ca3af] dark:hover:text-[#818cf8]"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
