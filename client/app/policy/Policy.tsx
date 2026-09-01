import React from "react";
import { HiOutlineSparkles, HiOutlineShieldCheck } from "react-icons/hi2";
import {
  MdOutlineSecurity,
  MdOutlinePrivacyTip,
  MdOutlineManageAccounts,
  MdOutlineCookie,
  MdOutlineContactSupport,
  MdOutlineUpdate,
} from "react-icons/md";

/* ─── Static data ─────────────────────────────── */
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 1,
  delay: Math.random() * 7,
  dur: Math.random() * 8 + 6,
}));

const SECTIONS = [
  {
    icon: <MdOutlinePrivacyTip size={22} />,
    title: "Information We Collect",
    id: "collect",
    content: [
      {
        subtitle: "Personal Information",
        text: "When you register for an account, we collect information such as your name, email address, and password. If you purchase a course, we also collect billing information through our secure payment processors.",
      },
      {
        subtitle: "Usage Data",
        text: "We automatically collect information about how you interact with our platform, including pages visited, courses accessed, time spent on lessons, and your progress through course materials.",
      },
      {
        subtitle: "Device Information",
        text: "We collect device-specific information such as your IP address, browser type, operating system, and unique device identifiers to ensure a consistent and secure experience.",
      },
    ],
  },
  {
    icon: <MdOutlineSecurity size={22} />,
    title: "How We Use Your Information",
    id: "use",
    content: [
      {
        subtitle: "Providing Our Services",
        text: "We use your information to operate the platform, process transactions, deliver course content, issue certificates, and provide customer support.",
      },
      {
        subtitle: "Improving Our Platform",
        text: "Usage data helps us understand how students learn best, which allows us to continually improve course quality, platform performance, and the overall learning experience.",
      },
      {
        subtitle: "Communications",
        text: "With your consent, we may send you newsletters, course recommendations, and promotional offers. You can opt out of marketing emails at any time from your account settings.",
      },
    ],
  },
  {
    icon: <HiOutlineShieldCheck size={22} />,
    title: "How We Protect Your Data",
    id: "protect",
    content: [
      {
        subtitle: "Encryption",
        text: "All data transmitted between your browser and our servers is encrypted using industry-standard TLS (Transport Layer Security) protocols. Stored data is encrypted at rest.",
      },
      {
        subtitle: "Access Controls",
        text: "We strictly limit employee access to personal data on a need-to-know basis. All staff with data access undergo security training and are bound by confidentiality agreements.",
      },
      {
        subtitle: "Security Audits",
        text: "We conduct regular security assessments and vulnerability testing to ensure our systems remain secure. We promptly address any identified issues.",
      },
    ],
  },
  {
    icon: <MdOutlineManageAccounts size={22} />,
    title: "Your Rights & Choices",
    id: "rights",
    content: [
      {
        subtitle: "Access & Portability",
        text: "You have the right to request a copy of the personal data we hold about you, in a commonly used, machine-readable format. Submit a request through your account settings or by contacting us.",
      },
      {
        subtitle: "Correction & Deletion",
        text: "You can update most personal information directly from your profile. To delete your account and associated data, please contact our support team. Some data may be retained for legal compliance purposes.",
      },
      {
        subtitle: "Opt-Out Options",
        text: "You may opt out of marketing communications at any time. You can also adjust cookie preferences in your browser settings, though this may affect certain platform features.",
      },
    ],
  },
  {
    icon: <MdOutlineCookie size={22} />,
    title: "Cookies & Tracking",
    id: "cookies",
    content: [
      {
        subtitle: "Essential Cookies",
        text: "These are required for the platform to function. They enable core features like authentication, session management, and security. You cannot disable these cookies.",
      },
      {
        subtitle: "Analytics Cookies",
        text: "We use analytics tools to understand how users navigate the platform. This helps us identify areas for improvement and enhance the learning experience.",
      },
      {
        subtitle: "Preference Cookies",
        text: "These cookies remember your settings and preferences (such as dark mode or language) so you don't have to reconfigure them each visit.",
      },
    ],
  },
  {
    icon: <MdOutlineUpdate size={22} />,
    title: "Policy Updates",
    id: "updates",
    content: [
      {
        subtitle: "Notification of Changes",
        text: "We may update this Privacy Policy from time to time. We will notify you of any significant changes via email or a prominent notice on our platform at least 30 days before the changes take effect.",
      },
      {
        subtitle: "Continued Use",
        text: "Your continued use of the platform after policy changes constitutes your acceptance of the updated Privacy Policy. We encourage you to review this page periodically.",
      },
    ],
  },
  {
    icon: <MdOutlineContactSupport size={22} />,
    title: "Contact Us",
    id: "contact",
    content: [
      {
        subtitle: "Data Privacy Team",
        text: "If you have questions about this Privacy Policy or wish to exercise your data rights, please contact our dedicated privacy team at privacy@elearning.com or through the support portal in your account.",
      },
      {
        subtitle: "Response Time",
        text: "We aim to respond to all data-related requests within 30 days. For complex requests, we may extend this period by an additional 60 days with prior notification.",
      },
    ],
  },
];

const Policy = () => {
  return (
    <>
      <div className="relative [overflow:clip] pb-20">
        <div className="relative z-[1] max-w-[1100px] mx-auto px-6 pt-[120px]">
          {/* Hero header */}
          <div className="text-center mb-[60px] [animation:_.7s_.1s_both]">
            <div className="inline-flex items-center gap-2 px-4 py-[6px] rounded-full bg-gradient-to-br from-[rgba(99,102,241,0.1)] to-[rgba(139,92,246,0.1)] border border-[rgba(99,102,241,0.2)] text-[12.5px] font-bold text-[#6366f1] tracking-[0.05em] uppercase mb-[18px] dark:from-[rgba(99,102,241,0.18)] dark:to-[rgba(139,92,246,0.18)] dark:border-[rgba(99,102,241,0.3)] dark:text-[#818cf8]">
              <HiOutlineShieldCheck />
              Legal
            </div>
            <h1 className="text-[clamp(2rem,4.5vw,2.8rem)] font-black leading-[1.2] tracking-[-0.03em] text-[#111827] mt-0 mb-4 dark:text-[#f3f4f6]">
              Privacy{" "}
              <span className="bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-base text-[#6b7280] max-w-[560px] mx-auto mt-0 mb-7 leading-[1.65] dark:text-[#9ca3af]">
              We take your privacy seriously. This policy explains how we
              collect, use, and protect your personal data when you use our
              platform.
            </p>
            <div className="inline-flex items-center gap-[7px] px-4 py-[7px] rounded-full bg-[rgba(255,255,255,0.85)]  border border-[rgba(99,102,241,0.12)] text-[13px] font-semibold text-[#374151] shadow-[0_2px_12px_rgba(99,102,241,0.07)] dark:bg-[rgba(15,21,53,0.75)] dark:border-[rgba(99,102,241,0.2)] dark:text-[#d1d5db]">
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669]" />
              Last updated: August 2026
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 items-start">
            {/* Sticky TOC */}
            <aside className="hidden md:block sticky top-[90px] self-start rounded-[18px] px-5 py-[22px] border-[1.5px] border-[rgba(99,102,241,0.1)] bg-[rgba(255,255,255,0.88)]  shadow-[0_4px_20px_rgba(99,102,241,0.06)] [animation:_.7s_.15s_both] dark:bg-[rgba(15,21,53,0.72)] dark:border-[rgba(99,102,241,0.16)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
              <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-[#9ca3af] mt-0 mb-[14px]">
                On This Page
              </p>
              <ul className="list-none m-0 p-0 flex flex-col gap-1.5">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="flex items-center gap-2 px-2.5 py-[7px] rounded-[10px] text-[13px] font-semibold text-[#4b5563] no-underline transition-all duration-200 hover:bg-[rgba(99,102,241,0.07)] hover:text-[#6366f1] dark:text-[#9ca3af] dark:hover:bg-[rgba(99,102,241,0.14)] dark:hover:text-[#818cf8]"
                    >
                      <span className="flex-shrink-0 w-[26px] h-[26px] rounded-[7px] bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.12)] flex items-center justify-center text-[#6366f1] text-sm dark:bg-[rgba(99,102,241,0.15)] dark:border-[rgba(99,102,241,0.2)] dark:text-[#818cf8]">
                        {s.icon}
                      </span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Content */}
            <div className="flex flex-col gap-6 [animation:_.7s_.2s_both]">
              {SECTIONS.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="rounded-[20px] border-[1.5px] border-[rgba(99,102,241,0.1)] bg-[rgba(255,255,255,0.88)]  shadow-[0_4px_20px_rgba(99,102,241,0.05)] overflow-hidden transition-all duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] hover:border-[rgba(99,102,241,0.25)] hover:shadow-[0_10px_35px_rgba(99,102,241,0.1)] hover:-translate-y-0.5 dark:bg-[rgba(15,21,53,0.72)] dark:border-[rgba(99,102,241,0.16)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_10px_35px_rgba(0,0,0,0.35)]"
                >
                  <div className="flex items-center gap-[14px] px-[26px] py-[22px] border-b border-[rgba(99,102,241,0.08)] bg-gradient-to-br from-[rgba(99,102,241,0.03)] to-[rgba(139,92,246,0.02)] dark:border-[rgba(99,102,241,0.12)] dark:from-[rgba(99,102,241,0.07)] dark:to-[rgba(139,92,246,0.05)]">
                    <div className="w-[42px] h-[42px] rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white flex-shrink-0 shadow-[0_4px_14px_rgba(99,102,241,0.3)]">
                      {section.icon}
                    </div>
                    <h2 className="text-[17px] font-extrabold text-[#111827] m-0 dark:text-[#f3f4f6]">
                      {section.title}
                    </h2>
                  </div>
                  <div className="px-[26px] py-[22px] flex flex-col gap-5">
                    {section.content.map((item, j) => (
                      <div key={j}>
                        <h3 className="text-[14.5px] font-extrabold text-[#374151] mt-0 mb-1.5 flex items-center gap-2 dark:text-[#e5e7eb] before:content-[''] before:inline-block before:w-1 before:h-4 before:rounded-[2px] before:bg-gradient-to-br before:from-[#6366f1] before:to-[#8b5cf6] before:flex-shrink-0">
                          {item.subtitle}
                        </h3>
                        <p className="text-[14.5px] text-[#4b5563] leading-[1.75] m-0 dark:text-[#9ca3af]">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Accept strip */}
              <div className="mt-3 rounded-[20px] px-[30px] py-7 border-[1.5px] border-[rgba(16,185,129,0.2)] bg-gradient-to-br from-[rgba(16,185,129,0.05)] to-[rgba(5,150,105,0.04)] flex items-center justify-between flex-wrap gap-4 [animation:_.7s_.3s_both] dark:border-[rgba(16,185,129,0.25)] dark:from-[rgba(16,185,129,0.08)] dark:to-[rgba(5,150,105,0.06)]">
                <div className="m-0">
                  <p className="text-[15.5px] font-extrabold text-[#111827] mt-0 mb-1 dark:text-[#f3f4f6]">
                    You&apos;re all caught up!
                  </p>
                  <p className="text-[13px] text-[#6b7280] m-0 dark:text-[#9ca3af]">
                    By using ELearning, you agree to this Privacy Policy.
                  </p>
                </div>
                <a
                  href="/courses"
                  className="inline-flex items-center gap-2 px-[22px] py-[10px] rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] text-white text-sm font-bold no-underline transition-all duration-300 shadow-[0_4px_14px_rgba(16,185,129,0.3)] whitespace-nowrap cursor-pointer border-none hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(16,185,129,0.4)]"
                >
                  <HiOutlineSparkles size={16} />
                  Start Learning
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Policy;
