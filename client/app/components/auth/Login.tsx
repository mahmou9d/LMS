/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email"),
  password: Yup.string()
    .required("Please enter your password")
    .min(6, "Password must be at least 6 characters"),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const [login, { data, error, isSuccess }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Login successful";
      toast.success(message);
      setOpen(false);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error.data as any;
        toast.error(errorData.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [isSuccess, error]);

  const { errors, touched, values, handleSubmit, handleChange } = formik;

  const inputClass =
    "w-full px-4 py-[0.72rem] rounded-xl border-[1.5px] border-indigo-500/[0.16] bg-indigo-500/[0.04] text-[0.88rem] outline-none text-inherit font-inherit transition-all duration-300 box-border focus:border-indigo-500 focus:bg-indigo-500/[0.07] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.10)]";
  const inputErrorClass =
    "border-red-500 bg-red-500/[0.03] focus:shadow-[0_0_0_4px_rgba(239,68,68,0.08)]";

  return (
    <div className="w-full px-1 sm:px-2 py-4">
      <h1 className="text-[1.35rem] sm:text-[1.6rem] font-extrabold font-poppins text-center bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent mb-6">
        Welcome Back
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Email field */}
        <div className="relative mb-4">
          <label
            className="block text-xs font-bold text-indigo-500 uppercase tracking-wide mb-1.5 font-poppins"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className={`${inputClass} ${errors.email && touched.email ? inputErrorClass : ""}`}
          />
          {errors.email && touched.email && (
            <span className="text-xs text-red-500 font-semibold mt-1 block">
              {errors.email}
            </span>
          )}
        </div>

        {/* Password field */}
        <div className="relative mb-4">
          <label
            className="block text-xs font-bold text-indigo-500 uppercase tracking-wide mb-1.5 font-poppins"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type={show ? "text" : "password"}
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            placeholder="••••••••"
            className={`${inputClass} ${errors.password && touched.password ? inputErrorClass : ""}`}
          />
          <div className="absolute right-3 top-[38px] text-violet-500 cursor-pointer opacity-80 transition-all duration-200 hover:opacity-100 hover:scale-110">
            {show ? (
              <AiOutlineEye size={20} onClick={() => setShow(false)} />
            ) : (
              <AiOutlineEyeInvisible size={20} onClick={() => setShow(true)} />
            )}
          </div>
          {errors.password && touched.password && (
            <span className="text-xs text-red-500 font-semibold mt-1 block">
              {errors.password}
            </span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="relative overflow-hidden w-full py-3 px-6 rounded-2xl cursor-pointer text-[0.9rem] font-bold font-poppins bg-gradient-to-br from-indigo-500 to-violet-500 text-white border-none shadow-[0_4px_16px_rgba(99,102,241,0.3)] transition-transform duration-200 text-center mt-2.5 hover:shadow-[0_6px_22px_rgba(99,102,241,0.4)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-[left] before:duration-500 hover:before:left-full"
        >
          Sign In
        </button>

        {/* Social Sign-in */}
        <div className="flex items-center gap-3 mt-5 mb-4">
          <span className="flex-1 h-px bg-indigo-500/10" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
            Or continue with
          </span>
          <span className="flex-1 h-px bg-indigo-500/10" />
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <div
            className="w-[50px] h-[50px] rounded-xl border-[1.5px] border-indigo-500/10 flex items-center justify-center cursor-pointer transition-all duration-200 bg-white/80 dark:bg-[#0f1535]/60 hover:border-indigo-500 hover:shadow-[0_4px_12px_rgba(99,102,241,0.12)]"
            onClick={() => signIn("google")}
          >
            <FcGoogle size={26} />
          </div>
          <div
            className="w-[50px] h-[50px] rounded-xl border-[1.5px] border-indigo-500/10 flex items-center justify-center cursor-pointer transition-all duration-200 bg-white/80 dark:bg-[#0f1535]/60 hover:border-indigo-500 hover:shadow-[0_4px_12px_rgba(99,102,241,0.12)]"
            onClick={() => signIn("github")}
          >
            <AiFillGithub size={26} className="text-black dark:text-white" />
          </div>
        </div>

        {/* Switch Route */}
        <div className="text-center text-[0.83rem] font-semibold text-slate-500 dark:text-slate-300">
          Don&apos;t have an account?
          <span
            className="text-indigo-500 cursor-pointer font-bold transition-colors duration-150 ml-1 hover:text-violet-500 hover:underline"
            onClick={() => setRoute("Sign-Up")}
          >
            Sign Up
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
