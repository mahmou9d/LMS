"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { AiOutlineMail } from "react-icons/ai";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { IUser, ICourse, IOrder } from "@/app/types";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || theme === "dark";

  const { data, isLoading } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});
  const [orderData, setOrderData] = useState<Array<IOrder & {
    userName?: string;
    userEmail?: string;
    title?: string;
    price?: string;
  }>>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (data && data.orders) {
      const temp = (data.orders as IOrder[])?.map((item: IOrder) => {
        const user = (usersData?.users as IUser[])?.find(
          (user: IUser) => user._id === item.userId,
        );
        const course = (coursesData?.courses as ICourse[])?.find(
          (course: ICourse) => course._id === item.courseId,
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "$" + (course?.price ?? 0),
        };
      });
      setOrderData(temp || []);
    }
  }, [data, usersData, coursesData]);

  if (!mounted) {
    return <Loader />;
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.1, minWidth: 100 },
    { field: "userName", headerName: "User Name", flex: 0.15, minWidth: 150 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "User Email", flex: 0.2, minWidth: 200 },
          { field: "title", headerName: "Course Title", flex: 0.2, minWidth: 200 },
        ]),
    { field: "price", headerName: "Price", flex: 0.1, minWidth: 100 },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "Created At", flex: 0.15, minWidth: 150 }]
      : [
          {
            field: "",
            headerName: "Email",
            flex: 0.08,
            minWidth: 80,
            renderCell: (params: GridRenderCellParams) => {
              return (
                <a href={`mailto:${params.row.userEmail}`}>
                  <AiOutlineMail className="text-[20px] text-indigo-500 cursor-pointer hover:text-purple-500 transition-colors" />
                </a>
              );
            },
          },
        ]),
  ];

  const rows: Array<{
    id: string;
    userName: string;
    userEmail: string;
    title: string;
    price: string;
    created_at: string;
  }> = [];
  orderData &&
    orderData?.forEach((item) => {
      rows.push({
        id: item._id,
        userName: item.userName || "",
        userEmail: item.userEmail || "",
        title: item.title || "",
        price: item.price || "",
        created_at: format(item.createdAt),
      });
    });
  const gridBg = isDark ? "rgba(10,15,44,0.6)" : "rgba(255,255,255,0.0)";

  return (
    <div
      className={
        !isDashboard
          ? "min-h-screen px-7 pt-[120px] pb-14 font-poppins transition-[background] duration-300 " +
            (isDark
              ? "bg-[linear-gradient(135deg,#0a0f2c_0%,#0f1535_50%,#0d1445_100%)]"
              : "bg-[linear-gradient(135deg,#f8f9ff_0%,#f0f2ff_50%,#ede9fe_100%)]")
          : ""
      }
    >
      <div
        className={
          !isDashboard
            ? "mx-auto max-w-[95%] rounded-[20px] px-4 sm:px-7 pt-5 sm:pt-7 pb-8 " +
              (isDark
                ? "border-[1.5px] border-indigo-500/[0.18] bg-[rgba(15,23,60,0.82)] shadow-[0_4px_28px_rgba(0,0,0,0.4)]"
                : "border-[1.5px] border-indigo-500/[0.12] bg-white/95 shadow-[0_4px_24px_rgba(99,102,241,0.08)]")
            : ""
        }
      >
        {/* ── Page Header (full page only) ─────────────────────── */}
        {!isDashboard && (
          <div className="mb-6">
            <h1 className="m-0 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] bg-clip-text text-[1.35rem] font-extrabold text-transparent">
              Invoices &amp; Billing
            </h1>
            <p
              className={
                "mt-[5px] text-[0.82rem] font-medium " +
                (isDark ? "text-slate-500" : "text-slate-400")
              }
            >
              Manage and track student course subscriptions and transaction
              history
            </p>
          </div>
        )}

        {isLoading ? (
          <Loader />
        ) : (
          <Box
            sx={{
              height: isDashboard ? "350px" : "620px",
              width: "100%",
              "& .MuiDataGrid-root": {
                border: "none",
                fontFamily: "Poppins, sans-serif",
                background: `${gridBg} !important`,
                borderRadius: "12px",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: `1px solid ${isDark ? "rgba(99,102,241,0.07)" : "rgba(99,102,241,0.06)"}`,
                color: isDark ? "#cbd5e1" : "#334155",
                fontSize: "0.84rem",
                display: "flex",
                alignItems: "center",
              },
              "& .name-column--cell": {
                color: isDark ? "#e2e8f0" : "#1e293b",
                fontWeight: 600,
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: `${isDark ? "rgba(99,102,241,0.1) !important" : "rgba(99,102,241,0.05) !important"}`,
                borderBottom: `1.5px solid ${isDark ? "rgba(99,102,241,0.18)" : "rgba(99,102,241,0.12)"}`,
                color: isDark ? "#a5b4fc" : "#6366f1",
                fontSize: "0.86rem",
                fontWeight: 700,
                borderRadius: "12px 12px 0 0",
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: `${isDark ? "rgba(20,26,60,0.85) !important" : "rgba(240,242,255,0.9) !important"}`,
                color: isDark ? "#a5b4fc" : "#6366f1",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: 700,
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "transparent !important",
              },
              "& .MuiDataGrid-overlay": {
                backgroundColor: "transparent !important",
                color: isDark ? "#cbd5e1 !important" : "#334155 !important",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: `1.5px solid ${isDark ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.08)"}`,
                backgroundColor: `${isDark ? "rgba(99,102,241,0.04) !important" : "rgba(99,102,241,0.01) !important"}`,
                color: isDark ? "#94a3b8" : "#475569",
                borderRadius: "0 0 12px 12px",
              },
              "& .MuiTablePagination-root": {
                color: isDark ? "#94a3b8" : "#475569",
              },
              "& .MuiTablePagination-selectIcon": {
                color: isDark ? "#94a3b8" : "#475569",
              },
              "& .MuiIconButton-root": {
                color: isDark ? "#94a3b8" : "#475569",
              },
              "& .MuiCheckbox-root": {
                color: isDark
                  ? "rgba(139,92,246,0.4) !important"
                  : "rgba(99,102,241,0.4) !important",
              },
              "& .MuiCheckbox-root.Mui-checked": {
                color: "#8b5cf6 !important",
              },
              "& .MuiDataGrid-row": {
                backgroundColor: "transparent !important",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: isDark
                  ? "rgba(99,102,241,0.06) !important"
                  : "rgba(99,102,241,0.03) !important",
              },
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor: isDark
                  ? "rgba(99,102,241,0.12) !important"
                  : "rgba(99,102,241,0.07) !important",
              },
              "& .MuiDataGrid-toolbarContainer": {
                borderBottom: `1px solid ${isDark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.07)"}`,
                padding: "8px 12px",
                backgroundColor: isDark
                  ? "rgba(99,102,241,0.04) !important"
                  : "rgba(99,102,241,0.02) !important",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "#6366f1 !important",
                fontWeight: 600,
                fontSize: "0.78rem",
              },
              "& .MuiInputBase-root": {
                color: isDark ? "#cbd5e1" : "#334155",
              },
              "& .MuiSvgIcon-root": {
                color: isDark ? "#94a3b8" : "#64748b",
              },
            }}
          >
            <DataGrid
              checkboxSelection={!isDashboard}
              rows={rows}
              columns={columns}
              slots={
                isDashboard
                  ? {}
                  : {
                      toolbar: GridToolbar,
                    }
              }
            />
          </Box>
        )}
      </div>
    </div>
  );
};

export default AllInvoices;
