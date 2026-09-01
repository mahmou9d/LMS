"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();


  return (
    <div className="flex items-center justify-center mx-4">
      {theme === "light" ? (
        <BiMoon
          className="cursor-pointer text-gray-800 hover:text-blue-600 transition-colors"
          size={25}
          onClick={() => setTheme("dark")}
        />
      ) : (
        <BiSun
          className="cursor-pointer text-yellow-400 hover:text-yellow-300 transition-colors"
          size={25}
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
};
