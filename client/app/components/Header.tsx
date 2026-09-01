/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { FC, useState, useEffect, useRef } from "react";
import NavItems from "../utills/NavItems";
import { ThemeSwitcher } from "../utills/ThemeSwitcher";
import { MdOutlineMenu, MdPerson, MdClose } from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi";
import CustomModel from "../utills/CustomModel";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Verification from "./auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/avatar.jpg";
import { useSession } from "next-auth/react";
import {
  useLogoutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { RootState } from "@/redux/store";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, open, route, setRoute }) => {
  const [scrolled, setScrolled] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  const { user: dataUser, isAuthLoading } = useSelector(
    (state: RootState) => state.auth,
  );
  const { data: session } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  useLogoutQuery(undefined, { skip: !logout });
  const socialAuthCalled = useRef(false);

  const user = dataUser
    ? typeof dataUser === "string"
      ? JSON.parse(dataUser)
      : dataUser
    : null;

  useEffect(() => {
    // ⏳ انتظر حتى يكتمل التحقق من الجلسة أولاً
    if (isAuthLoading) return;

    if (session) {
      if (!user && !socialAuthCalled.current) {
        socialAuthCalled.current = true;
        socialAuth({
          name: session.user?.name,
          email: session.user?.email,
          avatar: session.user?.image,
        });
      }
    } else {
      socialAuthCalled.current = false;
    }
  }, [user, session, socialAuth, isAuthLoading]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful");
      setOpen(false);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error.data as any;
        toast.error(errorData.message || "Social login failed");
      } else {
        toast.error("Social login failed");
      }
    }
  }, [isSuccess, error, setOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "overlay") setOpenSideBar(false);
  };

  return (
    <>
      {/* Animated top accent bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] [background-image:linear-gradient(90deg,#6366f1,#8b5cf6,#a855f7,#ec4899,#a855f7,#8b5cf6,#6366f1)] bg-[length:200%_100%] [animation:_4s_linear_infinite] z-[1001]" />

      {/* ── Navbar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] h-[70px] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] ${
          scrolled
            ? "bg-white/85 border-b border-[rgba(99,102,241,0.12)] shadow-[0_4px_30px_rgba(99,102,241,0.08)] dark:bg-[rgba(9,9,25,0.85)] dark:border-b-[rgba(99,102,241,0.18)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.35)]"
            : "bg-transparent border-b border-transparent dark:bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 no-underline flex-shrink-0"
          >
            <div className="relative w-[38px] h-[38px] bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] rounded-[10px] flex items-center justify-center shadow-[0_4px_15px_rgba(99,102,241,0.4)] overflow-hidden transition-[transform,box-shadow] duration-300 ease-in-out hover:rotate-[-5deg] hover:scale-[1.08] hover:shadow-[0_6px_25px_rgba(99,102,241,0.55)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.25)_0%,transparent_60%)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
            <span className="text-[1.25rem] font-extrabold bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] bg-clip-text text-transparent tracking-[-0.02em]">
              ELearning
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="max-lg:hidden flex items-center gap-1">
            <NavItems activeItem={activeItem} isMobile={false} />
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            {/* Theme */}
            <ThemeSwitcher />

            {/* Avatar or Sign In */}
            {user ? (
              <Link
                href="/profile"
                className="rounded-full p-0.5 bg-gradient-to-br from-[#6366f1] to-[#a855f7] inline-block transition-transform duration-300 ease-in-out hover:scale-[1.08]"
              >
                <Image
                  src={
                    user?.avatar?.url ||
                    avatar ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="avatar"
                  width={34}
                  height={34}
                  className="rounded-full block border-2 border-white dark:border-[#111827]"
                />
              </Link>
            ) : (
              <button
                onClick={() => setOpen(true)}
                className="max-lg:hidden relative flex items-center gap-2 px-[22px] py-[9px] bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white text-sm font-semibold rounded-full border-0 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out shadow-[0_4px_15px_rgba(99,102,241,0.35)] tracking-[0.01em] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(99,102,241,0.5)] active:translate-y-0 before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] before:transition-[left] before:duration-500 before:ease-in-out hover:before:left-full"
                aria-label="Sign In"
              >
                <MdPerson size={17} />
                Sign In
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-10 h-10 rounded-[10px] border border-[rgba(99,102,241,0.15)] bg-[rgba(99,102,241,0.05)] cursor-pointer flex items-center justify-center text-[#4b5563] transition-all duration-200 ease-in-out hover:bg-[rgba(99,102,241,0.12)] hover:border-[rgba(99,102,241,0.35)] hover:text-[#6366f1] dark:border-[rgba(99,102,241,0.25)] dark:bg-[rgba(99,102,241,0.1)] dark:text-[#9ca3af]"
              onClick={() => setOpenSideBar(true)}
              aria-label="Open menu"
            >
              <MdOutlineMenu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Sidebar ── */}
      {openSideBar && (
        <div
          id="overlay"
          className="fixed inset-0 z-[1200] bg-black/55"
          onClick={handleOverlayClick}
        >
          <div
            className="absolute top-0 right-0 h-full w-[85%] max-w-[300px] bg-white dark:bg-[#0d0d23] flex flex-col shadow-[-20px_0_60px_rgba(0,0,0,0.2)] [animation:_0.3s_cubic-bezier(0.4,0,0.2,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sidebar header */}
            <div className="flex items-center justify-between px-5 py-[18px] border-b border-[rgba(99,102,241,0.1)] bg-[linear-gradient(135deg,rgba(99,102,241,0.04),rgba(168,85,247,0.04))]">
              <Link
                href="/"
                className="flex items-center gap-2.5 no-underline flex-shrink-0"
                onClick={() => setOpenSideBar(false)}
              >
                <div className="relative w-[38px] h-[38px] bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] rounded-[10px] flex items-center justify-center shadow-[0_4px_15px_rgba(99,102,241,0.4)] overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.25)_0%,transparent_60%)]">
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
                <span className="text-[1.25rem] font-extrabold bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] bg-clip-text text-transparent tracking-[-0.02em]">
                  ELearning
                </span>
              </Link>
              <button
                className="w-9 h-9 rounded-lg border border-[rgba(99,102,241,0.15)] bg-transparent cursor-pointer flex items-center justify-center text-[#6b7280] transition-all duration-200 ease-in-out hover:bg-[rgba(239,68,68,0.08)] hover:border-[rgba(239,68,68,0.25)] hover:text-[#ef4444] dark:text-[#9ca3af]"
                onClick={() => setOpenSideBar(false)}
                aria-label="Close menu"
              >
                <MdClose size={18} />
              </button>
            </div>

            {/* Nav items */}
            <div className="flex-1 overflow-y-auto pt-2 pb-2">
              <NavItems activeItem={activeItem} isMobile={true} />
            </div>

            {/* Sidebar footer */}
            <div className="px-5 py-4 border-t border-[rgba(99,102,241,0.1)] bg-[linear-gradient(135deg,rgba(99,102,241,0.02),rgba(168,85,247,0.02))]">
              {user ? (
                <Link
                  href="/profile"
                  onClick={() => setOpenSideBar(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] no-underline bg-[rgba(99,102,241,0.05)] border border-[rgba(99,102,241,0.1)] transition-all duration-200 ease-in-out hover:bg-[rgba(99,102,241,0.1)] hover:border-[rgba(99,102,241,0.25)]"
                >
                  <div className="rounded-full p-0.5 bg-gradient-to-br from-[#6366f1] to-[#a855f7] inline-block transition-transform duration-300 ease-in-out hover:scale-[1.08]">
                    <Image
                      src={
                        user?.avatar?.url ||
                        avatar ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="avatar"
                      width={30}
                      height={30}
                      className="rounded-full block border-2 border-white dark:border-[#111827]"
                    />
                  </div>
                  <span className="text-sm font-semibold text-[#374151] dark:text-[#e5e7eb]">
                    {user?.name}
                  </span>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setOpen(true);
                    setOpenSideBar(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white text-sm font-semibold rounded-[10px] border-0 cursor-pointer transition-all duration-300 ease-in-out shadow-[0_4px_15px_rgba(99,102,241,0.35)] tracking-[0.01em] hover:opacity-90 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(99,102,241,0.45)]"
                >
                  <MdPerson size={18} />
                  Sign In
                </button>
              )}
              <p className="text-center text-[11px] text-[#9ca3af] mt-2.5">
                © 2026 ELearning. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Modals ── */}
      {open && route === "Login" && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          Component={Login}
          setRoute={setRoute}
        />
      )}
      {open && route === "Sign-Up" && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          Component={SignUp}
          setRoute={setRoute}
        />
      )}
      {open && route === "Verification" && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          Component={Verification}
          setRoute={setRoute}
        />
      )}
    </>
  );
};

export default Header;
