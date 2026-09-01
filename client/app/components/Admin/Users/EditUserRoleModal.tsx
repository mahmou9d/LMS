"use client";
import React, { FC, useEffect, useState } from "react";
import { styles } from "@/app/styles/style";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleSubmit: (email: string, role: string) => void;
};

const EditUserRoleModal: FC<Props> = ({ open, setOpen, handleSubmit }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");

  useEffect(() => {
    if (!open) {
      setEmail("");
      setRole("admin");
    }
  }, [open]);

  if (!open) return null;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    handleSubmit(email, role);
  };

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/65"
          onClick={() => setOpen(false)}
        />

        {/* Modal */}
        <div className="relative z-10 w-full max-w-[440px] overflow-hidden rounded-[20px] border-[1.5px] border-indigo-500/[0.14] bg-white/95 shadow-[0_20px_50px_rgba(99,102,241,0.12)] dark:bg-gradient-to-b dark:from-[#180f1c] dark:to-[#150f24] ">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 dark:border-white/10">
            <h2 className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text font-poppins text-lg font-bold text-transparent">
              Edit User Role
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="border-none bg-transparent text-slate-400 transition-colors hover:text-red-500"
            >
              <AiOutlineClose size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="flex flex-col gap-5 px-6 py-6">
            {/* Email Field */}
            <div className="flex flex-col gap-1">
              <label className="mb-[0.45rem] block text-[0.78rem] font-semibold uppercase tracking-[0.03em] text-indigo-500">
                User Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter user email..."
                required
                className="box-border w-full rounded-xl border-[1.5px] border-indigo-500/[0.18] bg-indigo-500/[0.04] px-4 py-3 text-[0.92rem] text-inherit outline-none transition-all duration-[250ms] focus:border-indigo-500 focus:bg-indigo-500/[0.08] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.12)]"
              />
            </div>

            {/* Role Field */}
            <div className="flex flex-col gap-1">
              <label className="mb-[0.45rem] block text-[0.78rem] font-semibold uppercase tracking-[0.03em] text-indigo-500">
                New Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="box-border w-full rounded-xl border-[1.5px] border-indigo-500/[0.18] bg-indigo-500/[0.04] px-4 py-3 text-[0.92rem] text-inherit outline-none transition-all duration-[250ms] focus:border-indigo-500 focus:bg-indigo-500/[0.08] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.12)]"
              >
                <option value="admin" className="bg-white dark:bg-[#1a1f35]">
                  Admin
                </option>
                <option value="user" className="bg-white dark:bg-[#1a1f35]">
                  User
                </option>
              </select>
            </div>

            {/* Actions */}
            <div className="mt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-xl border-[1.5px] border-indigo-500/[0.18] bg-indigo-500/[0.04] px-5 py-[11px] text-[0.88rem] font-bold text-indigo-500 transition-all duration-200 hover:-translate-y-px hover:bg-indigo-500/[0.08]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="group relative flex-1 overflow-hidden rounded-xl border-none bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] px-5 py-[11px] text-[0.88rem] font-bold text-white shadow-[0_4px_16px_rgba(99,102,241,0.35)] hover:shadow-[0_6px_22px_rgba(99,102,241,0.45)] "
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.22] to-transparent " />
                Update Role
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUserRoleModal;
