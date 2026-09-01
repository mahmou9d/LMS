"use client";

import { ThemeSwitcher } from "@/app/utills/ThemeSwitcher";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationMutation,
} from "@/redux/features/notifications/notificationApi";
import { FC, useEffect, useRef, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { io } from "socket.io-client";
import { format } from "timeago.js";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_URL || "";
const socketId = io(ENDPOINT, { transports: ["websocket"] });

import { INotification } from "@/app/types";

type Props = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  /** Mobile sidebar toggle */
  onMenuClick?: () => void;
};

// ── Static placeholder notifications ────────────────────────────────────────
const NOTIFICATIONS = [
  {
    id: 1,
    title: "New Question Received",
    body: "A student asked a question in your Advanced React course lesson 4.",
    time: "5 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "New Order Placed",
    body: "Someone just purchased your Node.js Bootcamp course.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    title: "Course Review",
    body: "Your course received a new 5-star rating from a student.",
    time: "3 hours ago",
    read: true,
  },
];

const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

const DashboardHeader: FC<Props> = ({ open, setOpen, onMenuClick }: Props) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [
    updateNotificationStatus,
    { data: updatedNotificationData, isSuccess },
  ] = useUpdateNotificationMutation();
  const [notification, setNotification] = useState<INotification[]>([]);
  const [audio] = useState(
    typeof window !== "undefined"
      ? new Audio("/sounds/notification.mp3")
      : null,
  );
  const playerNotificationSound = () => {
    audio?.play().catch((err) => {
      console.log("Audio playback failed:", err);
    });
  };
  useEffect(() => {
    if (data) {
      setNotification(
        data.notifications.filter(
          (item: INotification) => item.status === "unread",
        ),
      );
    }
    if (isSuccess) {
      refetch();
    }
    audio?.load();
  }, [data, isSuccess]);
  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
      playerNotificationSound();
    });
  }, [socketId]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen?.(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, setOpen]);

  const handleNotificationStatus = async (id: string) => {
    if (!id) return;
    await updateNotificationStatus({ id });
  };
  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-[90] flex items-center justify-between gap-[10px] px-4 sm:px-7 py-[14px] border-b border-indigo-500/10 bg-white/[0.72] backdrop-blur-md dark:bg-[rgba(15,21,53,0.78)]">
        {/* Hamburger — mobile only */}
        <button
          className="min-[900px]:hidden flex items-center justify-center w-9 h-9 rounded-xl border-[1.5px] border-indigo-500/[0.18] bg-indigo-500/[0.07] cursor-pointer text-indigo-500 transition-all duration-200 hover:bg-indigo-500/[0.15]"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <RxHamburgerMenu size={18} />
        </button>
        {/* Right controls */}
        <div className="flex items-center gap-[10px] ml-auto">
          <ThemeSwitcher />

          <div ref={dropdownRef} className="relative">
            {/* Bell button */}
            <button
              className="relative flex items-center justify-center w-10 h-10 rounded-xl border-[1.5px] border-indigo-500/[0.18] bg-indigo-500/[0.07] cursor-pointer transition-all duration-200 text-indigo-500 hover:bg-indigo-500/[0.15] hover:border-indigo-500/[0.35] hover:scale-[1.06]"
              onClick={() => setOpen?.(!open)}
              aria-label="Notifications"
            >
              <IoMdNotificationsOutline className="text-[1.3rem]" />
              {notification && notification.length > 0 && (
                <span className="absolute -top-[5px] -right-[5px] min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-[0.65rem] font-bold flex items-center justify-center shadow-[0_2px_8px_rgba(99,102,241,0.5)]">
                  {notification.length}
                </span>
              )}
            </button>

            {/* Dropdown */}
            {open && (
              <div className="fixed top-[66px] right-2 sm:right-5 w-[calc(100vw-16px)] sm:w-[360px] max-h-[480px] rounded-[18px] border-[1.5px] border-indigo-500/[0.14] overflow-hidden flex flex-col shadow-[0_20px_60px_rgba(99,102,241,0.18),0_4px_20px_rgba(0,0,0,0.12)] z-[200] bg-white/[0.92] dark:bg-[rgba(15,21,53,0.94)]">
                {/* Header */}
                <div className="flex items-center justify-between px-[18px] pt-4 pb-3 border-b border-indigo-500/10 flex-shrink-0">
                  <span className="text-[0.92rem] font-bold bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                    Notifications
                  </span>
                  {notification && notification.length > 0 && (
                    <span className="text-[0.7rem] font-bold px-2 py-0.5 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
                      {notification.length} new
                    </span>
                  )}
                </div>

                {/* List */}
                <div className="overflow-y-auto flex-1 [scrollbar-width:thin] [scrollbar-color:rgba(99,102,241,0.2)_transparent] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-indigo-500/25 [&::-webkit-scrollbar-thumb]:rounded-full">
                  {notification?.map((n: INotification, i: number) => (
                    <div
                      key={i}
                      className="px-[18px] py-[14px] border-b border-indigo-500/[0.07] transition-colors duration-[180ms] hover:bg-indigo-500/5 last:border-b-0"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-[0.83rem] font-semibold flex items-center gap-1.5 text-[#1e1b4b] dark:text-slate-200">
                          {n.title}
                        </p>
                        <p
                          className="text-[0.7rem] font-semibold bg-transparent border border-indigo-500/25 rounded-md px-2 py-0.5 cursor-pointer text-indigo-500 whitespace-nowrap transition-colors duration-[180ms] hover:bg-gradient-to-br hover:from-indigo-500 hover:to-violet-500 hover:text-white hover:border-transparent"
                          onClick={() => handleNotificationStatus(n._id)}
                        >
                          mark as read
                        </p>
                      </div>
                      <div>
                        <p className="text-[0.78rem] leading-[1.45] mb-[5px] text-slate-600 dark:text-slate-400">
                          {n.message}
                        </p>
                        <p className="text-[0.7rem] font-medium text-violet-500">
                          {format(n.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;
