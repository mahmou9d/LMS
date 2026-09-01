import React, { FC } from "react";
import { AiOutlineClose, AiOutlineWarning } from "react-icons/ai";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  userId: string;
  handleDelete: (id: string) => void;
};

const DeleteUserModal: FC<Props> = ({
  open,
  setOpen,
  userId,
  handleDelete,
}) => {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/65"
          onClick={() => setOpen(false)}
        />

        {/* Modal */}
        <div className="relative z-10 w-full max-w-[400px] overflow-hidden rounded-[20px] border-[1.5px] border-red-500/[0.18] bg-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:bg-gradient-to-b dark:from-[#180f1c] dark:to-[#150f24] ">
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 border-none bg-transparent text-slate-400 transition-colors hover:text-red-500"
          >
            <AiOutlineClose size={20} />
          </button>

          {/* Body */}
          <div className="flex flex-col items-center gap-3 px-8 pt-10 pb-6">
            {/* Warning Icon */}
            <div className="relative mb-2 flex h-[72px] w-[72px] items-center justify-center rounded-full border-[1.5px] border-red-500/20 bg-red-500/[0.08] after:absolute after:-inset-1.5 after:rounded-full after:border after:border-dashed after:border-red-500/35 ">
              <AiOutlineWarning className="text-red-500" size={32} />
            </div>

            <h2 className="mt-2 text-center font-poppins text-xl font-bold text-gray-800 dark:text-white">
              Confirm Delete
            </h2>

            <p className="text-center text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-400">
              Are you sure you want to delete this user? This action{" "}
              <span className="font-bold text-red-500 underline">
                cannot be undone
              </span>
              . All associated student progress and details will be permanently
              removed.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 px-6 pb-6">
            <button
              onClick={() => setOpen(false)}
              className="flex-1 rounded-xl border-[1.5px] border-indigo-500/[0.18] bg-indigo-500/[0.04] px-5 py-[11px] text-[0.88rem] font-bold text-indigo-500 transition-all duration-200 hover:-translate-y-px hover:bg-indigo-500/[0.08]"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleDelete(userId);
                setOpen(false);
              }}
              className="group relative flex-1 overflow-hidden rounded-xl border-none bg-gradient-to-br from-red-500 to-red-600 px-5 py-[11px] text-[0.88rem] font-bold text-white shadow-[0_4px_16px_rgba(239,68,68,0.35)] hover:shadow-[0_6px_22px_rgba(239,68,68,0.45)] "
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.22] to-transparent " />
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteUserModal;
