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
import toast from "react-hot-toast";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { signIn } from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email"),
  password: Yup.string()
    .required("Please enter your password")
    .min(6, "Password must be at least 6 characters"),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { data, error, isSuccess }] = useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      await register({ name, email, password });
    },
  });

  const { errors, touched, values, handleSubmit, handleChange } = formik;

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error.data as any;
        toast.error(errorData.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [isSuccess, error, data]);

  return (
    <div className="w-full px-1 sm:px-2 py-4">
      <h1
        className="text-center mb-6 text-[1.35rem] sm:text-[1.6rem] font-extrabold"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <span className="bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent">
          Create Account
        </span>
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Name field */}
        <div className="relative mb-4">
          <label
            className="block text-[0.75rem] font-bold text-indigo-500 uppercase tracking-wider mb-1.5"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={`w-full box-border py-[0.72rem] px-4 rounded-xl text-[0.88rem] outline-none text-inherit
              ${
                errors.name && touched.name
                  ? "border-[1.5px] border-red-500 bg-red-500/[0.03] focus:shadow-[0_0_0_4px_rgba(239,68,68,0.08)]"
                  : "border-[1.5px] border-indigo-500/[0.16] bg-indigo-500/[0.04] focus:border-indigo-500 focus:bg-indigo-500/[0.07] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)]"
              }`}
          />
          {errors.name && touched.name && (
            <span className="text-[0.75rem] text-red-500 font-semibold mt-1 block">
              {errors.name}
            </span>
          )}
        </div>

        {/* Email field */}
        <div className="relative mb-4">
          <label
            className="block text-[0.75rem] font-bold text-indigo-500 uppercase tracking-wider mb-1.5"
            style={{ fontFamily: "'Poppins', sans-serif" }}
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
            className={`w-full box-border py-[0.72rem] px-4 rounded-xl text-[0.88rem] outline-none text-inherit
              ${
                errors.email && touched.email
                  ? "border-[1.5px] border-red-500 bg-red-500/[0.03] focus:shadow-[0_0_0_4px_rgba(239,68,68,0.08)]"
                  : "border-[1.5px] border-indigo-500/[0.16] bg-indigo-500/[0.04] focus:border-indigo-500 focus:bg-indigo-500/[0.07] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)]"
              }`}
          />
          {errors.email && touched.email && (
            <span className="text-[0.75rem] text-red-500 font-semibold mt-1 block">
              {errors.email}
            </span>
          )}
        </div>

        {/* Password field */}
        <div className="relative mb-4">
          <label
            className="block text-[0.75rem] font-bold text-indigo-500 uppercase tracking-wider mb-1.5"
            style={{ fontFamily: "'Poppins', sans-serif" }}
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
            className={`w-full box-border py-[0.72rem] px-4 rounded-xl text-[0.88rem] outline-none text-inherit
              ${
                errors.password && touched.password
                  ? "border-[1.5px] border-red-500 bg-red-500/[0.03] focus:shadow-[0_0_0_4px_rgba(239,68,68,0.08)]"
                  : "border-[1.5px] border-indigo-500/[0.16] bg-indigo-500/[0.04] focus:border-indigo-500 focus:bg-indigo-500/[0.07] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)]"
              }`}
          />
          <div className="absolute right-3 top-[38px] text-violet-500 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-200">
            {show ? (
              <AiOutlineEye size={20} onClick={() => setShow(false)} />
            ) : (
              <AiOutlineEyeInvisible size={20} onClick={() => setShow(true)} />
            )}
          </div>
          {errors.password && touched.password && (
            <span className="text-[0.75rem] text-red-500 font-semibold mt-1 block">
              {errors.password}
            </span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="group relative overflow-hidden w-full py-3 px-6 rounded-2xl cursor-pointer text-[0.9rem] font-bold text-white bg-gradient-to-br from-indigo-500 to-violet-500 border-none shadow-[0_4px_16px_rgba(99,102,241,0.3)] transition-transform duration-200 text-center mt-2.5 hover:shadow-[0_6px_22px_rgba(99,102,241,0.4)]"
        >
          <span className="pointer-events-none absolute top-0 -left-full h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-[left] duration-500 group-hover:left-full" />
          Sign Up
        </button>

        {/* Divider */}
        <div className="text-center text-[0.75rem] font-bold text-slate-400 uppercase tracking-wider my-5 mb-4">
          Or join with
        </div>

        {/* Social Sign-in */}
        <div className="flex justify-center gap-4 mb-6">
          <div
            className="w-[50px] h-[50px] rounded-xl border-[1.5px] border-indigo-500/[0.12] flex items-center justify-center cursor-pointer transition-all duration-200 bg-white/80 dark:bg-[rgba(15,21,53,0.6)] hover:border-indigo-500 hover:shadow-[0_4px_12px_rgba(99,102,241,0.12)]"
            onClick={() => signIn("google")}
          >
            <FcGoogle size={26} />
          </div>
          <div
            className="w-[50px] h-[50px] rounded-xl border-[1.5px] border-indigo-500/[0.12] flex items-center justify-center cursor-pointer transition-all duration-200 bg-white/80 dark:bg-[rgba(15,21,53,0.6)] hover:border-indigo-500 hover:shadow-[0_4px_12px_rgba(99,102,241,0.12)]"
            onClick={() => signIn("github")}
          >
            <AiFillGithub size={26} className="text-black dark:text-white" />
          </div>
        </div>

        {/* Switch Route */}
        <div className="text-center text-[0.83rem] font-semibold text-slate-500 dark:text-slate-300">
          Already have an account?
          <span
            className="text-indigo-500 cursor-pointer font-bold transition-colors duration-150 ml-1 hover:text-violet-500 hover:underline"
            onClick={() => setRoute("Login")}
          >
            Sign In
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
