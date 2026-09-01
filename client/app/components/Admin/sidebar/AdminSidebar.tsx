"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import avatar from "../../../../public/avatar.jpg";
import {
  HomeOutlined,
  PeopleOutline,
  ReceiptOutlined,
  BarChartOutlined,
  MapOutlined,
  Group,
  OndemandVideo,
  VideoCall,
  Web,
  Quiz,
  Wysiwyg,
  Settings,
  Groups,
  ChevronLeft,
  ChevronRight,
  Close,
} from "@mui/icons-material";

import { RootState } from "@/redux/store";

// ── nav structure ────────────────────────────────────────────────────────────
const NAV = [
  {
    section: "Main",
    items: [{ title: "Dashboard", to: "/admin", Icon: HomeOutlined }],
  },
  {
    section: "Data",
    items: [
      { title: "Users", to: "/admin/users", Icon: Groups },
      { title: "Invoices", to: "/admin/Invoices", Icon: ReceiptOutlined },
    ],
  },
  {
    section: "Content",
    items: [
      { title: "Create Course", to: "/admin/create-course", Icon: VideoCall },
      { title: "Live Courses", to: "/admin/courses", Icon: OndemandVideo },
    ],
  },
  {
    section: "Customization",
    items: [
      { title: "Hero", to: "/admin/hero", Icon: Web },
      { title: "FAQ", to: "/admin/faq", Icon: Quiz },
      { title: "Categories", to: "/admin/categories", Icon: Wysiwyg },
    ],
  },
  {
    section: "Controllers",
    items: [{ title: "Manage Team", to: "/admin/team", Icon: PeopleOutline }],
  },
  {
    section: "Analytics",
    items: [
      {
        title: "Courses Analytics",
        to: "/admin/courses-analytics",
        Icon: BarChartOutlined,
      },
      {
        title: "Orders Analytics",
        to: "/admin/orders-analytics",
        Icon: MapOutlined,
      },
      { title: "Users Analytics", to: "/admin/users-analytics", Icon: Group },
    ],
  },
];

const SIDEBAR_W = 256;
const SIDEBAR_W_COLLAPSED = 72;

type Props = {
  /** Mobile drawer open state — controlled from parent */
  mobileOpen?: boolean;
  onMobileClose?: () => void;
};

const AdminSidebar = ({ mobileOpen = false, onMobileClose }: Props) => {
  const { user: dataUser } = useSelector((state: RootState) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  const user = dataUser ?? null;

  useEffect(() => setMounted(true), []);

  // Close mobile drawer on route change
  useEffect(() => {
    onMobileClose?.();
  }, [pathname]);

  // Derive active item from current URL — exact match first, then prefix
  const allItems = NAV.flatMap((g) => g.items);
  const activeTitle =
    allItems.find((item) => pathname === item.to)?.title ??
    allItems
      .filter((item) => item.to !== "/admin" && pathname?.startsWith(item.to))
      .sort((a, b) => b.to.length - a.to.length)[0]?.title ??
    (pathname === "/admin" || pathname?.startsWith("/admin")
      ? "Dashboard"
      : "");

  // Auto-scroll active item into view whenever pathname changes
  useEffect(() => {
    if (!mounted || !navRef.current) return;
    const activeEl =
      navRef.current.querySelector<HTMLElement>(".as-item.active");
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [mounted, activeTitle]);

  if (!mounted) return null;

  const dark = resolvedTheme === "dark" || theme === "dark";
  const w = isCollapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W;

  const sidebarContent = (isMobile: boolean) => (
    <aside
      className={`flex flex-col overflow-hidden border-r-[1.5px] border-indigo-500/[0.13] shadow-[4px_0_32px_rgba(99,102,241,0.08)] ${
        dark
          ? "bg-gradient-to-b from-[#0f1535] to-[#111c43]"
          : "bg-gradient-to-b from-white to-[#f5f6ff]"
      }`}
      style={{ width: isMobile ? SIDEBAR_W : w, height: "100%" }}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 pt-[18px] pb-4 border-b border-indigo-500/10 shrink-0">
        <Link
          href="/"
          className={`text-[1.15rem] font-extrabold bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent tracking-[0.06em] whitespace-nowrap overflow-hidden no-underline ${isCollapsed ? "hidden" : "md:block"}`}
        >
          ELearning
        </Link>
        {isMobile ? (
          <button
            className="flex items-center justify-center w-[30px] h-[30px] rounded-lg border-[1.5px] border-indigo-500/20 bg-indigo-500/[0.08] cursor-pointer text-indigo-500 transition-all duration-200 shrink-0 hover:bg-indigo-500/[0.18]"
            onClick={onMobileClose}
            aria-label="Close sidebar"
          >
            <Close style={{ fontSize: 18 }} />
          </button>
        ) : (
          <button
            className="flex items-center justify-center w-[30px] h-[30px] rounded-lg border-[1.5px] border-indigo-500/20 bg-indigo-500/[0.08] cursor-pointer text-indigo-500 transition-[background,border-color,transform] duration-200 shrink-0 hover:bg-indigo-500/[0.18] hover:border-indigo-500/40 hover:scale-105"
            onClick={() => setIsCollapsed((v) => !v)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight style={{ fontSize: 18 }} />
            ) : (
              <ChevronLeft style={{ fontSize: 18 }} />
            )}
          </button>
        )}
      </div>

      {/* ── Avatar ── */}
      <div className="flex flex-col items-center px-4 pt-5 pb-4 border-b border-indigo-500/[0.08] shrink-0 overflow-hidden">
        <div className="p-[3px] rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 shadow-[0_0_18px_rgba(99,102,241,0.4)] shrink-0">
          <Image
            src={
              user?.avatar?.url ||
              avatar ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            width={isMobile ? 72 : isCollapsed ? 38 : 72}
            height={isMobile ? 72 : isCollapsed ? 38 : 72}
            className="rounded-full block"
            style={{ transition: "width 0.3s, height 0.3s" }}
          />
        </div>
        {(isMobile || !isCollapsed) && (
          <>
            <p
              className={`mt-2.5 text-[0.92rem] font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px] ${
                dark ? "text-slate-200" : "text-[#1e1b4b]"
              }`}
            >
              {user?.name}
            </p>
            <span className="text-[0.72rem] font-semibold tracking-[0.07em] uppercase bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent mt-0.5">
              {user?.role}
            </span>
          </>
        )}
      </div>

      {/* ── Nav ── */}
      <nav
        className="flex-1 overflow-y-auto overflow-x-hidden py-3 pb-6 [scrollbar-width:thin] [scrollbar-color:rgba(99,102,241,0.2)_transparent] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-indigo-500/25 [&::-webkit-scrollbar-thumb]:rounded-full"
        ref={navRef}
      >
        {NAV.map((group, gi) => (
          <div key={group.section}>
            {gi > 0 && <div className="h-px mx-4 my-2 bg-indigo-500/[0.08]" />}
            {(isMobile || !isCollapsed) && (
              <p
                className={`text-[0.65rem] font-bold tracking-[0.1em] uppercase px-5 pt-3.5 pb-1.5 whitespace-nowrap overflow-hidden ${
                  dark ? "text-slate-400/55" : "text-slate-500/60"
                }`}
              >
                {group.section}
              </p>
            )}
            {group.items.map(({ title, to, Icon }) => {
              const isActive = activeTitle === title;
              return (
                <Link
                  key={title}
                  href={to}
                  className={`as-item group relative flex items-center gap-3 px-4 h-11 cursor-pointer no-underline overflow-hidden transition-colors duration-200 before:content-[''] before:absolute before:inset-0 before:rounded-[10px] before:mx-2 before:my-0.5 before:transition-transform ${
                    isActive
                      ? "active text-white before:translate-x-0 before:bg-gradient-to-br before:from-indigo-500 before:to-violet-500 before:shadow-[0_4px_18px_rgba(99,102,241,0.35)] after:content-[''] after:absolute after:left-0 after:top-1.5 after:bottom-1.5 after:w-[3px] after:rounded-[0_3px_3px_0] after:bg-white"
                      : `before:-translate-x-full before:bg-indigo-500/[0.08] hover:before:translate-x-0 ${
                          dark
                            ? "text-slate-300/75 hover:text-indigo-300"
                            : "text-slate-700/75 hover:text-indigo-500"
                        }`
                  }`}
                >
                  <span className="flex items-center justify-center shrink-0 w-[22px] relative z-[1]">
                    <Icon style={{ fontSize: 20 }} />
                  </span>
                  {(isMobile || !isCollapsed) && (
                    <span className="text-sm font-medium whitespace-nowrap overflow-hidden relative z-[1] transition-opacity duration-200">
                      {title}
                    </span>
                  )}
                  {!isMobile && isCollapsed && (
                    <span className="fixed left-20 bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-xs font-semibold px-2.5 py-[5px] rounded-lg pointer-events-none whitespace-nowrap shadow-[0_4px_16px_rgba(99,102,241,0.35)] z-[200] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                      {title}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );

  return (
    <>
      {/* ── Desktop sidebar (900px+): fixed, collapse/expand ── */}
      <div
        className="hidden min-[900px]:block fixed top-0 left-0 bottom-0 z-[100] transition-[width] duration-300"
        style={{ width: w }}
      >
        {sidebarContent(false)}
      </div>

      {/* ── Mobile drawer overlay ── */}
      {mobileOpen && (
        <div className="min-[900px]:hidden fixed inset-0 z-[200]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          {/* Drawer panel */}
          <div className="absolute top-0 left-0 bottom-0 w-[260px] z-10 shadow-[4px_0_40px_rgba(0,0,0,0.25)]">
            {sidebarContent(true)}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
