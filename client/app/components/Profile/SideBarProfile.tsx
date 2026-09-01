"use client";
import Image from "next/image";
import { FC } from "react";
import { useRouter } from "next/navigation";
import avatarDefault from "../../../public/avatar.jpg";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { HiOutlineUser } from "react-icons/hi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IUser } from "@/app/types";

type Props = {
  user: IUser;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logoutHandler: () => void;
};

const navItems = [
  {
    id: 1,
    label: "My Account",
    Icon: HiOutlineUser,
    isLogout: false,
    adminOnly: false,
    href: null,
  },
  {
    id: 2,
    label: "Change Password",
    Icon: RiLockPasswordLine,
    isLogout: false,
    adminOnly: false,
    href: null,
  },
  {
    id: 3,
    label: "Enrolled Courses",
    Icon: SiCoursera,
    isLogout: false,
    adminOnly: false,
    href: null,
  },
  {
    id: 6,
    label: "Admin Dashboard",
    Icon: MdOutlineAdminPanelSettings,
    isLogout: false,
    adminOnly: true,
    href: "/admin",
  },
  {
    id: 4,
    label: "Log Out",
    Icon: AiOutlineLogout,
    isLogout: true,
    adminOnly: false,
    href: null,
  },
];

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logoutHandler,
}) => {
  const avatarSrc =
    user?.avatar?.url ||
    avatar ||
    avatarDefault ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const isAdmin = user?.role === "admin";
  const router = useRouter();

  const handleClick = (item: (typeof navItems)[number]) => {
    if (item.isLogout) return logoutHandler();
    if (item.href) return router.push(item.href);
    setActive(item.id);
  };

  return (
    <div className="w-full py-2">
      {navItems
        .filter(({ adminOnly }) => !adminOnly || isAdmin)
        .map((item) => {
          const { id, label, Icon, isLogout } = item;
          const isActive = active === id;

          const barColor = isLogout
            ? "before:from-red-500 before:to-red-600"
            : "before:from-indigo-500 before:to-purple-500";

          const hoverColors = isLogout
            ? "hover:bg-red-500/5 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
            : "hover:bg-indigo-500/5 hover:text-indigo-500 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400";

          const activeColors = isActive
            ? "bg-indigo-500/[0.08] text-indigo-500 font-semibold pl-6 dark:bg-indigo-500/[0.15] dark:text-indigo-400 "
            : "";

          return (
            <button
              key={id}
              onClick={() => handleClick(item)}
              className={`
                relative flex w-full items-center gap-3 px-5 py-3.5
                border-none bg-transparent cursor-pointer
                text-sm font-medium text-gray-600 dark:text-gray-400
                hover:pl-6 ${hoverColors}
                before:content-[''] before:absolute before:left-0 before:top-[15%]
                before:h-[70%] before:w-[3px] before:rounded-r-[4px]
                before:bg-gradient-to-br ${barColor} before:scale-y-0
                before:transition-transform before:duration-[250ms] before:ease-[cubic-bezier(0.4,0,0.2,1)]
                ${activeColors}
              `}
            >
              {id === 1 ? (
                <div
                  className={`flex items-center justify-center rounded-full p-[1.5px] border border-black/10 dark:border-white/10 transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-indigo-500 to-purple-500 border-transparent"
                      : "bg-transparent"
                  }`}
                >
                  <Image
                    src={avatarSrc}
                    alt="avatar"
                    width={24}
                    height={24}
                    className="block rounded-full object-cover border-[1.5px] border-white dark:border-[#0d0d23]"
                  />
                </div>
              ) : (
                <Icon size={18} className="shrink-0" />
              )}
              <span className="hidden 800px:block truncate text-sm font-medium">
                {label}
              </span>
              {isActive && !isLogout && (
                <span className="hidden 800px:block ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
              )}
            </button>
          );
        })}
    </div>
  );
};

export default SideBarProfile;
