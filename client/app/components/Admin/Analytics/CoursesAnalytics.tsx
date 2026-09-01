"use client";
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import Loader from "../../Loader/Loader";
import {
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  LabelList,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IMonthData } from "@/app/types";
import { MdSwipe } from "react-icons/md";

// ── Custom Tooltip ─────────────────────────────────────────────────────────
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
        className={`rounded-xl px-[18px] py-3 ${
          isDark
            ? "bg-[rgba(15,21,53,0.97)] border border-indigo-500/25 shadow-[0_12px_32px_rgba(0,0,0,0.55)]"
            : "bg-white/[0.97] border border-indigo-500/[0.18] shadow-[0_8px_28px_rgba(99,102,241,0.12)]"
        }`}
      >
        <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-[0.07em] mb-1">
          {label}
        </p>
        <p
          className={`text-sm font-bold ${
            isDark ? "text-slate-200" : "text-slate-800"
          }`}
        >
          Courses: <span className="text-indigo-500">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

// ── Main Component ─────────────────────────────────────────────────────────
const CoursesAnalytics = () => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  const AnalyticsData: Array<{ name: string; uv: number }> = [];
  data?.course?.last12Months?.forEach((item: IMonthData) => {
    // Simplify name format if it is too long (e.g. "12 Aug 2026" -> "Aug 26" or similar)
    // to make it look cleaner. Let's keep it clean.
    let shortName = item.month;
    const parts = item.month.split(" ");
    if (parts.length === 3) {
      // "12 Aug 2026" -> "Aug 26"
      shortName = `${parts[1]} ${parts[2].slice(-2)}`;
    }
    AnalyticsData.push({ name: shortName, uv: item.count });
  });

  const gridStroke = isDark
    ? "rgba(255,255,255,0.05)"
    : "rgba(99,102,241,0.07)";
  const tickColor = isDark ? "#94a3b8" : "#64748b";
  const labelColor = isDark ? "#cbd5e1" : "#475569";

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`mt-[80px] sm:mt-[120px] mx-auto p-4 sm:p-8 rounded-[22px] transition-[background,box-shadow] duration-300 max-w-[95%] ${
            isDark
              ? "border-[1.5px] border-indigo-500/20 shadow-[0_6px_32px_rgba(0,0,0,0.42)] bg-[rgba(15,21,53,0.78)]"
              : "border-[1.5px] border-indigo-500/[0.12] shadow-[0_4px_24px_rgba(99,102,241,0.08)] bg-white/[0.92]"
          }`}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h1 className="text-[1.18rem] font-bold bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent m-0">
                Courses Analytics
              </h1>
              <p
                className={`text-[0.82rem] mt-1 font-medium ${
                  isDark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Last 12 months data
              </p>
            </div>
            {isMobile && (
              <div className="flex items-center gap-1.5 text-[0.72rem] font-bold text-indigo-500 bg-indigo-500/10 px-3 py-1.5 rounded-lg w-fit">
                <MdSwipe className="text-[1.05rem] animate-pulse" />
                <span>Swipe chart to scroll history</span>
              </div>
            )}
          </div>

          {/* Chart Wrapper */}
          {isMobile ? (
            <div className="flex items-stretch overflow-hidden">
              {/* Sticky Y-Axis */}
              <div className="w-[32px] shrink-0">
                <BarChart
                  width={32}
                  height={260}
                  data={AnalyticsData}
                  margin={{ top: 16, right: 0, left: -28, bottom: 20 }}
                >
                  <YAxis
                    domain={[0, "auto"]}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: tickColor, fontSize: 10, fontWeight: 600 }}
                    allowDecimals={false}
                  />
                </BarChart>
              </div>

              {/* Scrollable Chart Body */}
              <div className="flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <BarChart
                  width={580}
                  height={260}
                  data={AnalyticsData}
                  margin={{ top: 16, right: 10, left: 10, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="caBarGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={gridStroke}
                    vertical={false}
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
                      fill: isDark
                        ? "rgba(99,102,241,0.08)"
                        : "rgba(99,102,241,0.04)",
                      radius: 6,
                    }}
                  />

                  <Bar
                    dataKey="uv"
                    fill="url(#caBarGrad)"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={32}
                  >
                    <LabelList
                      dataKey="uv"
                      position="top"
                      fill={labelColor}
                      fontSize={9}
                      fontWeight={700}
                    />
                  </Bar>
                </BarChart>
              </div>
            </div>
          ) : (
            /* Desktop Layout */
            <div className="h-[50vh] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={AnalyticsData}
                  margin={{ top: 16, right: 20, left: -10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="caBarGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={gridStroke}
                    vertical={false}
                  />

                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: tickColor, fontSize: 11, fontWeight: 500 }}
                  />
                  <YAxis
                    domain={[0, "auto"]}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: tickColor, fontSize: 11, fontWeight: 500 }}
                    allowDecimals={false}
                  />

                  <Tooltip
                    content={<CustomTooltip isDark={isDark} />}
                    cursor={{
                      fill: isDark
                        ? "rgba(99,102,241,0.08)"
                        : "rgba(99,102,241,0.04)",
                      radius: 6,
                    }}
                  />

                  <Bar
                    dataKey="uv"
                    fill="url(#caBarGrad)"
                    radius={[8, 8, 0, 0]}
                    maxBarSize={52}
                  >
                    <LabelList
                      dataKey="uv"
                      position="top"
                      fill={labelColor}
                      fontSize={11}
                      fontWeight={700}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CoursesAnalytics;
