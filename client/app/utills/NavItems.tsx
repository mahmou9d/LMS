"use client";
import Link from "next/link";
import React, { FC } from "react";
import { usePathname } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineBookOpen, HiOutlineUsers, HiOutlineDocumentText, HiOutlineQuestionMarkCircle } from "react-icons/hi";

export const navItemsData = [
  { name: "Home",    url: "/",       icon: AiOutlineHome },
  { name: "Courses", url: "/courses", icon: HiOutlineBookOpen },
  { name: "About",   url: "/about",   icon: HiOutlineUsers },
  { name: "Policy",  url: "/policy",  icon: HiOutlineDocumentText },
  { name: "FAQ",     url: "/faq",     icon: HiOutlineQuestionMarkCircle },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
  const pathname = usePathname();

  /* ── Desktop ── */
  if (!isMobile) {
    return (
      <>
        <style>{`
          .nav-link-desktop {
            position: relative;
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 7px 14px;
            font-size: 14.5px;
            font-weight: 500;
            border-radius: 8px;
            text-decoration: none;
            transition: all 0.25s ease;
            white-space: nowrap;
            letter-spacing: 0.01em;
          }
          .nav-link-desktop.inactive {
            color: #4b5563;
          }
          .dark .nav-link-desktop.inactive {
            color: #9ca3af;
          }
          .nav-link-desktop.inactive:hover {
            color: #6366f1;
            background: rgba(99, 102, 241, 0.07);
          }
          .dark .nav-link-desktop.inactive:hover {
            color: #818cf8;
            background: rgba(99, 102, 241, 0.12);
          }
          .nav-link-desktop.active {
            color: #6366f1;
            background: rgba(99, 102, 241, 0.08);
          }
          .dark .nav-link-desktop.active {
            color: #818cf8;
            background: rgba(99, 102, 241, 0.15);
          }
          .nav-dot {
            position: absolute;
            bottom: 4px;
            left: 50%;
            transform: translateX(-50%);
            width: 4px; height: 4px;
            border-radius: 50%;
            background: linear-gradient(135deg, #6366f1, #a855f7);
          }
        `}</style>
        <nav style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {navItemsData.map((item, index) => {
            const isActive = pathname === item.url;
            const Icon = item.icon;
            return (
              <Link
                href={item.url}
                key={index}
                className={`nav-link-desktop ${isActive ? "active" : "inactive"}`}
              >
                <Icon size={16} />
                {item.name}
                {isActive && <span className="nav-dot" />}
              </Link>
            );
          })}
        </nav>
      </>
    );
  }

  /* ── Mobile ── */
  return (
    <>
      <style>{`
        .nav-link-mobile {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
          border-left: 3px solid transparent;
        }
        .nav-link-mobile.inactive {
          color: #4b5563;
        }
        .dark .nav-link-mobile.inactive {
          color: #9ca3af;
        }
        .nav-link-mobile.inactive:hover {
          color: #6366f1;
          background: rgba(99, 102, 241, 0.05);
          border-left-color: rgba(99, 102, 241, 0.3);
        }
        .dark .nav-link-mobile.inactive:hover {
          color: #818cf8;
          background: rgba(99, 102, 241, 0.08);
        }
        .nav-link-mobile.active {
          color: #6366f1;
          background: linear-gradient(90deg, rgba(99, 102, 241, 0.08), transparent);
          border-left-color: #6366f1;
          font-weight: 600;
        }
        .dark .nav-link-mobile.active {
          color: #818cf8;
          background: linear-gradient(90deg, rgba(99, 102, 241, 0.15), transparent);
          border-left-color: #818cf8;
        }
        .nav-icon-badge {
          width: 32px; height: 32px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }
        .nav-icon-badge.active-badge {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);
        }
        .nav-icon-badge.inactive-badge {
          background: rgba(107, 114, 128, 0.1);
          color: #9ca3af;
        }
        .dark .nav-icon-badge.inactive-badge {
          background: rgba(107, 114, 128, 0.15);
          color: #6b7280;
        }
      `}</style>
      <nav style={{ display: "flex", flexDirection: "column" }}>
        {navItemsData.map((item, index) => {
          const isActive = pathname === item.url;
          const Icon = item.icon;
          return (
            <Link
              href={item.url}
              key={index}
              className={`nav-link-mobile ${isActive ? "active" : "inactive"}`}
            >
              <span className={`nav-icon-badge ${isActive ? "active-badge" : "inactive-badge"}`}>
                <Icon size={17} />
              </span>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default NavItems;
