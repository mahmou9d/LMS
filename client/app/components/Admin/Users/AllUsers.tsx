"use client";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";
import { AiFillEdit, AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";
import EditUserRoleModal from "./EditUserRoleModal";
import DeleteUserModal from "./DeleteUserModal";
import { IUser } from "@/app/types";

type Props = {
  isTeam?: boolean;
};

const AllCourses: FC<Props> = (props: Props) => {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || theme === "dark";
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("admin");
  const [userId, setUserId] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation();
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorData = updateError as { data: { message: string } };
        toast.error(errorData.data.message);
      }
    }
    if (isSuccess) {
      refetch();
      toast.success("User role updated successfully");
      setActive(false);
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorData = deleteError as { data: { message: string } };
        toast.error(errorData.data.message);
      }
    }
    if (deleteSuccess) {
      refetch();
      toast.success("Deleted user successfully");
      setDeleteOpen(false);
    }
  }, [updateError, isSuccess, deleteError, deleteSuccess]);

  const handleUpdateRole = (email: string, role: string) => {
    updateUserRole({ email, role });
  };

  const handleDeleteUser = (id: string) => {
    deleteUser(id);
  };

  // Tailwind classes for the action buttons (mirrors old .au-action-btn / .delete rules)
  const actionBtnBase =
    "inline-flex items-center justify-center w-8 h-8 rounded-lg border transition-[background-color,transform,color] duration-200 cursor-pointer";
  const actionBtnEdit =
    "border-[rgba(99,102,241,0.15)] bg-[rgba(99,102,241,0.04)] text-[#6366f1] hover:bg-[#6366f1] hover:text-white hover:scale-[1.08]";
  const actionBtnDelete =
    "border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.04)] text-[#ef4444] hover:bg-[#ef4444] hover:text-white hover:scale-[1.08]";

  const colums: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 100 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 0.5, minWidth: 200 },
    { field: "role", headerName: "Role", flex: 0.5, minWidth: 100 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5, minWidth: 150 },
    { field: "createdAt", headerName: "Joined At", flex: 0.5, minWidth: 120 },
    {
      field: "edit",
      headerName: "Edit Role",
      flex: 0.2,
      minWidth: 90,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <button
            className={`${actionBtnBase} ${actionBtnEdit}`}
            onClick={() => {
              setUserId(params.row.id);
              setActive(true);
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
      minWidth: 90,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <button
            className={`${actionBtnBase} ${actionBtnDelete}`}
            onClick={() => {
              setUserId(params.row.id);
              setDeleteOpen(true);
            }}
          >
            <AiOutlineDelete size={16} />
          </button>
        );
      },
    },
    {
      field: "mail",
      headerName: "Email",
      flex: 0.2,
      minWidth: 90,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <a
            href={`mailto:${params.row.email}`}
            className={`${actionBtnBase} ${actionBtnEdit}`}
          >
            <AiOutlineMail size={16} />
          </a>
        );
      },
    },
  ];

  const rows: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    courses: number;
    createdAt: string;
  }> = [];
  if (props.isTeam) {
    const newData =
      data && (data.users as IUser[]).filter((item: IUser) => item.role === "admin");
    newData &&
      newData.forEach((item: IUser) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          createdAt: item.createdAt,
        });
      });
  } else {
    data &&
      (data.users as IUser[]).forEach((item: IUser) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          createdAt: item.createdAt,
        });
      });
  }

  if (!mounted) return <Loader />;

  return (
    <>
      <div
        className="w-[95%] mx-auto mt-[90px] sm:mt-[120px] p-4 sm:p-8 rounded-[20px] border-[1.5px] border-[rgba(99,102,241,0.12)] transition-[transform,box-shadow] duration-[250ms] bg-[rgba(255,255,255,0.85)] shadow-[0_4px_24px_rgba(99,102,241,0.07)] hover:shadow-[0_10px_36px_rgba(99,102,241,0.15)] dark:bg-[rgba(15,21,53,0.7)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[20px] font-bold font-poppins bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">
              {props.isTeam ? "Manage Team Access" : "Users Management"}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
              {props.isTeam
                ? "View and configure access roles and administration privileges for platform team members"
                : "View and keep track of registered platform students and active courses subscriptions"}
            </p>
          </div>
          {props.isTeam && (
            <button
              className="relative overflow-hidden px-6 py-2 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white text-[0.88rem] font-bold rounded-xl cursor-pointer border-none shadow-[0_4px_16px_rgba(99,102,241,0.3)] transition-[transform,box-shadow] duration-200  hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-[rgba(255,255,255,0.2)] before:to-transparent before:transition-[left] before:duration-500 hover:before:left-full"
              onClick={() => setActive(!active)}
            >
              Add Team Member
            </button>
          )}
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
              "& .name-column--cell": {
                color: isDark ? "#e2e8f0" : "#1e293b",
                fontWeight: 600,
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

      {/* Edit Role Modal */}
      <EditUserRoleModal
        open={active}
        setOpen={setActive}
        handleSubmit={handleUpdateRole}
      />

      {/* Delete Confirmation Modal */}
      <DeleteUserModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        userId={userId}
        handleDelete={handleDeleteUser}
      />
    </>
  );
};

export default AllCourses;
