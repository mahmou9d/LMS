"use client";

import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {},
  );

  const [updatePassword, { isSuccess, error, isLoading }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully!");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    if (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;
      toast.error(err?.data?.message || "Something went wrong");
    }
  }, [isSuccess, error]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!oldPassword) newErrors.oldPassword = "Current password is required";
    if (!newPassword) newErrors.newPassword = "New password is required";
    else if (newPassword.length < 8)
      newErrors.newPassword = "Password must be at least 8 characters";
    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (newPassword !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const passwordChangeHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    await updatePassword({ oldPassword, newPassword });
  };

  const getStrength = (pwd: string) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strengthScore = getStrength(newPassword);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"][
    strengthScore
  ];
  const strengthColor = [
    "",
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#6366f1",
  ][strengthScore];

  const fields = [
    {
      label: "Current Password",
      key: "oldPassword",
      value: oldPassword,
      setter: setOldPassword,
    },
    {
      label: "New Password",
      key: "newPassword",
      value: newPassword,
      setter: setNewPassword,
    },
    {
      label: "Confirm Password",
      key: "confirmPassword",
      value: confirmPassword,
      setter: setConfirmPassword,
    },
  ];

  return (
    <>
      <div className="inline-flex items-center justify-center w-[38px] h-[38px] rounded-[10px] bg-gradient-to-br from-indigo-500/15 to-purple-500/15 mb-4">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>

      <h2 className="text-[1.1rem] font-bold bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent inline-block mb-[0.35rem]">
        Change Password
      </h2>
      <div className="h-[3px] w-12 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-full mb-7" />

      <form
        onSubmit={passwordChangeHandler}
        noValidate
        style={{ maxWidth: "440px" }}
      >
        {fields.map(({ label, key, value, setter }) => (
          <div key={key} className="relative mb-5">
            <label className="block text-[0.8rem] font-semibold text-indigo-500 dark:text-indigo-300 mb-[0.45rem] tracking-[0.03em] uppercase">
              {label}
            </label>
            <div className="relative">
              <input
                type={showPasswords[key] ? "text" : "password"}
                placeholder="••••••••"
                value={value}
                style={
                  {
                    WebkitTextSecurity: showPasswords[key] ? "none" : undefined,
                  } as React.CSSProperties
                }
                onChange={(e) => {
                  setter(e.target.value);
                  setErrors((prev) => ({ ...prev, [key]: "" }));
                }}
                className={`w-full py-3 pr-12 pl-4 rounded-xl border-[1.5px] text-[0.92rem] outline-none transition-[border-color,box-shadow,background] duration-250 box-border placeholder:text-slate-500/50 dark:placeholder:text-slate-400/40 ${
                  errors[key]
                    ? "border-red-500 bg-red-500/5 shadow-[0_0_0_4px_rgba(239,68,68,0.08)] dark:bg-red-500/[0.08] dark:shadow-[0_0_0_4px_rgba(239,68,68,0.15)]"
                    : "border-indigo-500/[0.18] bg-indigo-500/[0.04] text-inherit dark:border-indigo-300/[0.18] dark:bg-indigo-300/[0.03] dark:text-slate-100 focus:border-indigo-500 focus:bg-indigo-500/[0.08] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.12)] dark:focus:border-[#8b5cf6] dark:focus:bg-indigo-300/[0.06] dark:focus:shadow-[0_0_0_4px_rgba(139,92,246,0.18)]"
                }`}
              />
              <button
                type="button"
                className="absolute right-[0.85rem] top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-purple-500 dark:text-indigo-300 opacity-60 text-base transition-opacity duration-200 p-0 leading-none hover:opacity-100"
                onClick={() =>
                  setShowPasswords((prev) => ({ ...prev, [key]: !prev[key] }))
                }
                aria-label={
                  showPasswords[key] ? "Hide password" : "Show password"
                }
              >
                {showPasswords[key] ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {/* Strength bar only for new password */}
            {key === "newPassword" && newPassword && (
              <div className="mt-[0.6rem]">
                <div className="flex gap-1 mb-[0.3rem]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex-1 h-1 rounded-full bg-indigo-500/[0.12] dark:bg-white/[0.08] transition-[background] duration-[350ms]"
                      style={{
                        background:
                          i <= strengthScore ? strengthColor : undefined,
                      }}
                    />
                  ))}
                </div>
                <span
                  className="text-[0.72rem] font-semibold tracking-[0.03em]"
                  style={{ color: strengthColor }}
                >
                  {strengthLabel}
                </span>
              </div>
            )}

            {errors[key] && (
              <p className="mt-[0.35rem] text-xs text-red-500 flex items-center gap-[0.3rem]">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errors[key]}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isLoading}
          className="relative overflow-hidden mt-2 px-8 py-3 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white text-[0.9rem] font-bold border-none rounded-xl cursor-pointer tracking-[0.02em] transition-[transform,box-shadow] duration-200 shadow-[0_4px_20px_rgba(99,102,241,0.35)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/[0.22] before:to-transparent before:transition-[left] before:duration-500 hover:before:left-full hover:shadow-[0_8px_28px_rgba(99,102,241,0.45)] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none disabled:before:hidden"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-spin"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Updating...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Update Password
            </span>
          )}
        </button>
      </form>
    </>
  );
};

export default ChangePassword;
