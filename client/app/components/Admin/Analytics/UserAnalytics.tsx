"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IMonthData } from "@/app/types";
import { MdSwipe } from "react-icons/md";

type Props = {
  isDashboard?: boolean;
};

// ── Custom Tooltip for Premium Aesthetics ──────────────────────────────────
interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
  isDark?: boolean;
}

const CustomTooltip = ({ active, payload, label, isDark }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: isDark
            ? "rgba(15, 21, 53, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
          border: isDark
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(99, 102, 241, 0.15)",
          borderRadius: "12px",
          padding: "12px 16px",
          boxShadow: isDark
            ? "0 10px 30px rgba(0, 0, 0, 0.5)"
            : "0 10px 30px rgba(99, 102, 241, 0.1)",
        }}
      >
        <p className="text-[11px] font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider mb-1">
          {label}
        </p>
        <p
          className={`text-[14px] font-bold ${isDark ? "text-white" : "text-slate-800"}`}
        >
          Users:{" "}
          <span className="text-indigo-500 dark:text-indigo-400">
            {payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const UserAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery();
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || theme === "dark";
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const analyticsData: Array<{ name: string; count: number }> = [];
  data?.users?.last12Months?.forEach((item: IMonthData) => {
    let shortName = item.month;
    const parts = item.month.split(" ");
    if (parts.length === 3) {
      shortName = `${parts[1]} ${parts[2].slice(-2)}`;
    }
    analyticsData.push({
      name: shortName,
      count: item.count,
    });
  });

  const tickColor = isDark ? "#cbd5e1" : "#64748b";

  return (
    <>
      {isLoading || !mounted ? (
        <Loader />
      ) : (
        <div
          className={`${
            isDashboard
              ? "p-4 sm:p-5"
              : "mt-[80px] sm:mt-[120px] p-4 sm:p-8 mx-auto max-w-[95%] rounded-[20px] border-[1.5px] border-indigo-500/10 bg-white/[0.85] shadow-[0_4px_24px_rgba(99,102,241,0.07)] hover:shadow-[0_10px_36px_rgba(99,102,241,0.15)] dark:bg-[#0f1535]/70 dark:shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
          }`}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h1 className="text-[20px] font-bold font-poppins bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">
                Users Analytics
              </h1>
              {!isDashboard && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Last 12 months Analytics data
                </p>
              )}
            </div>
            {isMobile && !isDashboard && (
              <div className="flex items-center gap-1.5 text-[0.72rem] font-bold text-indigo-500 bg-indigo-500/10 px-3 py-1.5 rounded-lg w-fit">
                <MdSwipe className="text-[1.05rem] animate-pulse" />
                <span>Swipe chart to scroll history</span>
              </div>
            )}
          </div>

          {/* Chart Section */}
          {isMobile ? (
            <div className="flex items-stretch overflow-hidden">
              {/* Sticky Y-Axis */}
              <div className="w-[32px] shrink-0">
                <AreaChart
                  width={32}
                  height={260}
                  data={analyticsData}
                  margin={{ top: 10, right: 0, left: -28, bottom: 20 }}
                >
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fill: tickColor,
                      fontSize: 10,
                      fontWeight: 600,
                    }}
                    allowDecimals={false}
                  />
                </AreaChart>
              </div>

              {/* Scrollable Chart Body */}
              <div className="flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <AreaChart
                  width={580}
                  height={260}
                  data={analyticsData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#6366f1"
                        stopOpacity={isDark ? 0.45 : 0.25}
                      />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={
                      isDark ? "rgba(255,255,255,0.04)" : "rgba(99,102,241,0.05)"
                    }
                  />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fill: tickColor,
                      fontSize: 10,
                      fontWeight: 600,
                    }}
                  />
                  <Tooltip
                    content={<CustomTooltip isDark={isDark} />}
                    cursor={{
                      stroke: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(99,102,241,0.12)",
                      strokeWidth: 1,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#userGrad)"
                  />
                </AreaChart>
              </div>
            </div>
          ) : (
            /* Desktop Layout */
            <div
              style={{
                height: isDashboard ? "280px" : "50vh",
                width: "100%",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={analyticsData}
                  margin={{
                    top: 10,
                    right: 15,
                    left: -15,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#6366f1"
                        stopOpacity={isDark ? 0.45 : 0.25}
                      />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={
                      isDark ? "rgba(255,255,255,0.04)" : "rgba(99,102,241,0.05)"
                    }
                  />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fill: isDark ? "#cbd5e1" : "#64748b",
                      fontSize: 11,
                      fontWeight: 500,
                    }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fill: isDark ? "#cbd5e1" : "#64748b",
                      fontSize: 11,
                      fontWeight: 500,
                    }}
                  />
                  <Tooltip
                    content={<CustomTooltip isDark={isDark} />}
                    cursor={{
                      stroke: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(99,102,241,0.12)",
                      strokeWidth: 1,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#6366f1"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#userGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
