"use client";
import { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";
import { useTheme } from "next-themes";

type Props = {
  open?: boolean;
  value?: number;
};

// ── Circular progress ring ───────────────────────────────────────────────────
const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box className="relative inline-flex">
      <CircularProgress
        variant="determinate"
        value={100}
        size={52}
        thickness={4}
        sx={{ color: "rgba(99,102,241,0.12)" }}
      />
      <CircularProgress
        variant="determinate"
        value={value}
        size={52}
        thickness={4}
        className={`absolute left-0 ${open ? "-z-10" : "z-10"}`}
        sx={{
          color: value && value > 99 ? "#6366f1" : "#8b5cf6",
          "& .MuiCircularProgress-circle": { strokeLinecap: "round" },
        }}
      />
      <Box className="absolute inset-0 flex items-center justify-center">
        <span className="text-[0.65rem] font-bold bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent">
          {value}%
        </span>
      </Box>
    </Box>
  );
};

interface ICompareData {
  currentMonth: number;
  prevMonth: number;
  percentChange: number;
}

// ── Main component ───────────────────────────────────────────────────────────
const DashboardWidgets: FC<Props> = ({ open }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || theme === "dark";

  const [orderComparePercentage, setOrderComparePercentage] = useState<ICompareData>();
  const [userComparePercentage, setUserComparePercentage] = useState<ICompareData>();
  const { data, isLoading } = useGetUsersAnalyticsQuery();
  const { data: orderData, isLoading: orderIsLoading } =
    useGetOrdersAnalyticsQuery();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (data && orderIsLoading) return;
    if (orderData && data) {
      const usersLastTwoMonths = data.users?.last12Months?.slice(-2);
      const orderLastTwoMonths = orderData.orders?.last12Months?.slice(-2);
      if (
        usersLastTwoMonths?.length === 2 &&
        orderLastTwoMonths?.length === 2
      ) {
        const usersCourseMonth = usersLastTwoMonths[1].count;
        const usersPrevMonth = usersLastTwoMonths[0].count;
        const orderCourseMonth = orderLastTwoMonths[1].count;
        const orderPrevMonth = orderLastTwoMonths[0].count;

        const userPercent =
          usersPrevMonth !== 0
            ? ((usersCourseMonth - usersPrevMonth) / usersPrevMonth) * 100
            : 100;
        const orderPercent =
          orderPrevMonth !== 0
            ? ((orderCourseMonth - orderPrevMonth) / orderPrevMonth) * 100
            : 100;

        setUserComparePercentage({
          currentMonth: usersCourseMonth,
          prevMonth: usersPrevMonth,
          percentChange: userPercent,
        });
        setOrderComparePercentage({
          currentMonth: orderCourseMonth,
          prevMonth: orderPrevMonth,
          percentChange: orderPercent,
        });
      }
    }
  }, [data, orderData, isLoading, orderIsLoading]);

  if (!mounted) return null;

  // ── derived style tokens ─────────────────────────────────────────────────
  const bg = isDark
    ? "bg-gradient-to-br from-[#0a0f2c] via-[#0f1535] to-[#0d1445]"
    : "bg-gradient-to-br from-[#f8f9ff] via-[#f0f2ff] to-[#ede9fe]";

  const cardBg = isDark
    ? "bg-[rgba(15,23,60,0.75)]"
    : "bg-[rgba(255,255,255,0.92)]";

  const cardBorder = isDark
    ? "border-[1.5px] border-[rgba(99,102,241,0.18)]"
    : "border-[1.5px] border-[rgba(99,102,241,0.12)]";

  const cardShadow = isDark
    ? "shadow-[0_4px_28px_rgba(0,0,0,0.35)]"
    : "shadow-[0_4px_24px_rgba(99,102,241,0.08)]";

  const labelColor = isDark ? "text-slate-400" : "text-slate-500";
  const subtitleColor = isDark ? "text-slate-500" : "text-slate-400";

  const cardBase = `${cardBg} rounded-[20px] ${cardBorder} ${cardShadow} overflow-hidden transition-[box-shadow,transform] duration-[250ms]`;

  return (
    <div
      className={`${bg} min-h-screen px-4 sm:px-7 pt-[80px] sm:pt-20 pb-14 font-['Poppins','Inter',sans-serif] transition-[background] duration-300`}
    >
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <div className="mb-7">
        <h1 className="text-[1.45rem] font-extrabold bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent m-0">
          Dashboard Overview
        </h1>
        <p className={`text-[0.82rem] ${subtitleColor} mt-1 font-medium`}>
          Track your platform performance at a glance
        </p>
      </div>

      {/* ── Top Row: User Analytics + Stat Cards ─────────────────────── */}
      <div
        className="dw-top-grid grid grid-cols-1 min-[900px]:grid-cols-[1fr_280px] gap-6 mb-6 items-start"
      >
        {/* Chart Card */}
        <div className={cardBase}>
          <UserAnalytics isDashboard={true} />
        </div>

        {/* Stat Cards Stack */}
        <div className="flex flex-col gap-4">
          {/* Sales */}
          <StatCard
            icon={<BiBorderLeft className="text-[1.4rem] text-indigo-500" />}
            iconBg="bg-[rgba(99,102,241,0.1)]"
            label="Sales Obtained"
            value={orderComparePercentage?.currentMonth ?? 0}
            percentChange={orderComparePercentage?.percentChange}
            prevMonth={orderComparePercentage?.prevMonth ?? 0}
            open={open}
            cardBg={cardBg}
            cardBorder={cardBorder}
            cardShadow={cardShadow}
            labelColor={labelColor}
          />
          {/* Users */}
          <StatCard
            icon={
              <PiUsersFourLight className="text-[1.4rem] text-violet-500" />
            }
            iconBg="bg-[rgba(139,92,246,0.1)]"
            label="New Users"
            value={userComparePercentage?.currentMonth ?? 0}
            percentChange={userComparePercentage?.percentChange}
            prevMonth={userComparePercentage?.prevMonth ?? 0}
            open={open}
            cardBg={cardBg}
            cardBorder={cardBorder}
            cardShadow={cardShadow}
            labelColor={labelColor}
          />
        </div>
      </div>

      {/* ── Bottom Row: Orders + Recent Transactions ──────────────────── */}
      <div className="dw-bottom-grid grid grid-cols-1 min-[900px]:grid-cols-2 gap-6">
        {/* Orders Analytics */}
        <div className={cardBase}>
          <OrdersAnalytics isDashboard={true} />
        </div>

        {/* Recent Transactions */}
        <div className={`${cardBase} px-[22px] py-5`}>
          <div className="mb-4">
            <h3 className="text-[0.88rem] font-bold bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent m-0">
              Recent Transactions
            </h3>
            <p
              className={`text-[0.73rem] ${labelColor} mt-[3px] mb-0 font-medium`}
            >
              Latest orders from your platform
            </p>
          </div>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

// ── Reusable Stat Card ────────────────────────────────────────────────────────
type StatCardProps = {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: number;
  percentChange?: number;
  prevMonth: number;
  open?: boolean;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  labelColor: string;
};

const StatCard: FC<StatCardProps> = ({
  icon,
  iconBg,
  label,
  value,
  percentChange,
  prevMonth,
  open,
  cardBg,
  cardBorder,
  cardShadow,
  labelColor,
}) => {
  const isPositive = (percentChange ?? 0) >= 0;
  const changeDisplay =
    percentChange !== undefined
      ? (isPositive ? "+" : "-") + Math.abs(percentChange).toFixed(1) + "%"
      : "—";

  return (
    <div
      className={`flex items-center gap-3.5 px-5 py-[18px] rounded-[18px] ${cardBg} ${cardBorder} ${cardShadow} transition-transform transition-shadow duration-[220ms] cursor-default  hover:shadow-[0_12px_32px_rgba(99,102,241,0.2)]`}
    >
      {/* Icon */}
      <div
        className={`flex items-center justify-center w-[46px] h-[46px] rounded-[13px] ${iconBg} shrink-0`}
      >
        {icon}
      </div>

      {/* Info */}
      <div className="flex-1">
        <p className="text-[1.6rem] font-extrabold leading-[1.1] bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent m-0">
          {value}
        </p>
        <p className={`text-[0.75rem] font-medium ${labelColor} mt-[3px] mb-0`}>
          {label}
        </p>
        <p className={`text-[0.68rem] ${labelColor} mt-0.5 mb-0 opacity-75`}>
          Last month: {prevMonth}
        </p>
      </div>

      {/* Ring + Badge */}
      <div className="flex flex-col items-center gap-1.5">
        <CircularProgressWithLabel
          value={(percentChange ?? 0) > 0 ? 100 : Math.abs(percentChange ?? 0)}
          open={open}
        />
        <span
          className={`text-[0.7rem] font-bold px-2.5 py-0.5 rounded-full ${
            isPositive
              ? "bg-[rgba(99,102,241,0.1)] text-indigo-500"
              : "bg-[rgba(239,68,68,0.1)] text-red-500"
          }`}
        >
          {changeDisplay}
        </span>
      </div>
    </div>
  );
};

export default DashboardWidgets;
