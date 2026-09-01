"use client";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";
import DeleteCourseModal from "./DeleteCourseModal";
import { useRouter } from "next/navigation";
import { ICourse } from "@/app/types";

type Props = {};

const AllCourses: FC<Props> = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || theme === "dark";
  const router = useRouter();
  const [courseId, setCourseId] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleteCourse, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteCourseMutation();
  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (deleteError) {
      if ("data" in deleteError) {
        const errorData = deleteError as { data: { message: string } };
        toast.error(errorData.data.message);
      }
    }
    if (deleteSuccess) {
      refetch();
      toast.success("Course deleted successfully");
      setDeleteOpen(false);
    }
  }, [deleteError, deleteSuccess]);

  const handleDeleteCourse = (id: string) => {
    deleteCourse(id);
  };

  const colums: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 100 },
    { field: "title", headerName: "Course Title", flex: 1, minWidth: 200 },
    { field: "rating", headerName: "Rating", flex: 0.5, minWidth: 100 },
    { field: "purchased", headerName: "Purchased", flex: 0.5, minWidth: 120 },
    { field: "created_at", headerName: "Created At", flex: 0.5, minWidth: 120 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      minWidth: 80,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <button
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-indigo-500/15 bg-indigo-500/[0.04] text-indigo-500 transition-all duration-200 cursor-pointer hover:bg-indigo-500 hover:text-white hover:scale-[1.08]"
            onClick={() => {
              router.push(`/admin/edit-course/${params.row.id}`);
            }}
          >
            <AiFillEdit size={16} />
          </button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      minWidth: 80,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <button
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-red-500/20 bg-red-500/[0.04] text-red-500 transition-all duration-200 cursor-pointer hover:bg-red-500 hover:text-white hover:scale-[1.08]"
            onClick={() => {
              setCourseId(params.row.id);
              setDeleteOpen(true);
            }}
          >
            <AiOutlineDelete size={16} />
          </button>
        );
      },
    },
  ];

  const rows: Array<{
    id: string;
    title: string;
    rating: number;
    purchased: number;
    created_at: string;
  }> = [];
  data &&
    (data.courses as ICourse[]).forEach((item: ICourse) => {
      rows.push({
        id: item._id,
        title: item.name,
        rating: item.rating,
        purchased: item.purchased,
        created_at: format(item.createdAt),
      });
    });

  if (!mounted) return <Loader />;

  return (
    <>
      <div className="w-[95%] mx-auto mt-[90px] sm:mt-[120px] p-4 sm:p-8 rounded-[20px] border-[1.5px] border-indigo-500/[0.12] transition-all duration-[250ms] bg-white/85 dark:bg-[#0f1535]/70 shadow-[0_4px_24px_rgba(99,102,241,0.07)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
        <div className="mb-6">
          <h1 className="text-[20px] font-bold font-poppins bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">
            All Courses
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Manage all platform courses, track ratings and enrollments
          </p>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <Box
            sx={{
              height: "650px",
              width: "100%",
              "& .MuiDataGrid-root": {
                border: "none",
                fontFamily: "Poppins, sans-serif",
                background: `${isDark ? "rgba(10,15,44,0.6) !important" : "rgba(255,255,255,0.0) !important"}`,
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid rgba(99,102,241,0.06)",
                color: isDark ? "#cbd5e1" : "#334155",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: `${isDark ? "rgba(99,102,241,0.1) !important" : "rgba(99,102,241,0.05) !important"}`,
                borderBottom: "1.5px solid rgba(99,102,241,0.12)",
                color: isDark ? "#a5b4fc" : "#6366f1",
                fontSize: "0.88rem",
                fontWeight: 700,
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
                borderTop: "1.5px solid rgba(99,102,241,0.12)",
                backgroundColor: `${isDark ? "rgba(99,102,241,0.02) !important" : "rgba(99,102,241,0.01) !important"}`,
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
                  ? "rgba(99,102,241,0.04) !important"
                  : "rgba(99,102,241,0.02) !important",
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={colums} />
          </Box>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteCourseModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        courseId={courseId}
        handleDelete={handleDeleteCourse}
      />
    </>
  );
};

export default AllCourses;
