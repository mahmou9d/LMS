"use client";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/page";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import Loader from "../Loader/Loader";

const EditHero = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const { data, isLoading, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isLoading: editLoading, isSuccess, error }] =
    useEditLayoutMutation();

  useEffect(() => {
    if (data?.layout?.banner) {
      setImage(data.layout.banner.image?.url || "");
      setTitle(data.layout.banner.title || "");
      setSubtitle(data.layout.banner.subtitle || "");
    } else if (data?.data?.banner) {
      setImage(data.data.banner.image?.url || "");
      setTitle(data.data.banner.title || "");
      setSubtitle(data.data.banner.subtitle || "");
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Hero updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as { data?: { message?: string } };
        toast.error(errorData?.data?.message as string);
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [isSuccess, error]);

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const render = new FileReader();
      render.onload = () => {
        setImage(render.result as string);
      };
      render.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subtitle,
    });
  };

  const dbTitle =
    data?.layout?.banner?.title || data?.data?.banner?.title || "";
  const dbSubtitle =
    data?.layout?.banner?.subtitle || data?.data?.banner?.subtitle || "";
  const dbImage =
    data?.layout?.banner?.image?.url || data?.data?.banner?.image?.url || "";

  const isChanged =
    title !== dbTitle || subtitle !== dbSubtitle || image !== dbImage;
  const canSave = isChanged && !editLoading;

  return (
    <>
      <div className="w-[95%] max-w-[1040px] mx-auto mt-24 mb-[60px]">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="rounded-3xl border-[1.5px] border-indigo-500/[0.12] p-9 transition-shadow duration-250 bg-white/[0.88] dark:bg-[#0f1535]/[0.72] shadow-[0_4px_24px_rgba(99,102,241,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_32px_rgba(99,102,241,0.13)]">
            <h1 className="text-[1.45rem] font-extrabold font-poppins bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent mb-1">
              Customize Hero Banner
            </h1>
            <p className="text-[0.82rem] font-medium mb-8 text-slate-500 dark:text-slate-400">
              Modify the visual and text content displayed at the top of the
              homepage.
            </p>

            <div className="grid grid-cols-[1fr_1.2fr] gap-9 items-start max-[900px]:grid-cols-1 max-[900px]:gap-7">
              {/* Image Preview Box */}
              <div>
                <label className="text-[0.75rem] font-bold text-indigo-500 uppercase tracking-[0.05em] mb-2 block">
                  Banner Image
                </label>
                <div className="relative rounded-[18px] border-2 border-dashed border-indigo-500/20 bg-indigo-500/[0.03] aspect-[4/3] flex items-center justify-center overflow-hidden transition-all duration-250 ease-in-out hover:border-indigo-500 hover:bg-indigo-500/[0.06]">
                  {image ? (
                    <img
                      src={image}
                      alt="Hero banner preview"
                      className="w-full h-full object-contain p-3"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-indigo-500 text-[0.85rem] font-semibold">
                      <span>No image loaded</span>
                    </div>
                  )}

                  <input
                    type="file"
                    id="banner"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUpdate}
                  />
                  <label
                    htmlFor="banner"
                    className="absolute bottom-3 right-3 w-[42px] h-[42px] rounded-full bg-indigo-500 text-white flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(99,102,241,0.35)] transition-all duration-200 hover:scale-[1.08] hover:bg-[#8b5cf6] hover:shadow-[0_4px_14px_rgba(139,92,246,0.45)]"
                  >
                    <AiOutlineCamera size={20} />
                  </label>
                </div>
              </div>

              {/* Input details form */}
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-[0.75rem] font-bold text-indigo-500 uppercase tracking-[0.05em]"
                    htmlFor="title"
                  >
                    Hero Title
                  </label>
                  <textarea
                    id="title"
                    placeholder="Enter main header title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-[0.8rem] rounded-[14px] border-[1.5px] border-indigo-500/[0.16] bg-indigo-500/[0.04] text-[0.9rem] outline-none text-inherit transition-all duration-250 ease-in-out font-inherit resize-y leading-[1.6] focus:border-indigo-500 focus:bg-indigo-500/[0.07] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.10)]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-[0.75rem] font-bold text-indigo-500 uppercase tracking-[0.05em]"
                    htmlFor="subtitle"
                  >
                    Hero Subtitle
                  </label>
                  <textarea
                    id="subtitle"
                    placeholder="Enter supporting subtext details..."
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-[0.8rem] rounded-[14px] border-[1.5px] border-indigo-500/[0.16] bg-indigo-500/[0.04] text-[0.9rem] outline-none text-inherit transition-all duration-250 ease-in-out font-inherit resize-y leading-[1.6] focus:border-indigo-500 focus:bg-indigo-500/[0.07] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.10)]"
                  />
                </div>
              </div>
            </div>

            {/* Save bar */}
            <div className="flex justify-end mt-3 pt-5 border-t-[1.5px] border-indigo-500/10">
              <button
                type="button"
                className={
                  canSave
                    ? "relative overflow-hidden px-9 py-[11px] rounded-xl text-[0.9rem] font-bold transition-all duration-250 ease-in-out border-none bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white shadow-[0_4px_16px_rgba(99,102,241,0.3)] cursor-pointer before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-[left] before:duration-500 hover:before:left-full hover:shadow-[0_6px_22px_rgba(99,102,241,0.4)]"
                    : "relative overflow-hidden px-9 py-[11px] rounded-xl text-[0.9rem] font-bold transition-all duration-250 ease-in-out border-none bg-slate-400/[0.15] text-slate-400/50 cursor-not-allowed"
                }
                onClick={canSave ? handleEdit : undefined}
              >
                {editLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditHero;
