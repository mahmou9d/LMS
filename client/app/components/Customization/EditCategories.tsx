"use client";
import {
  useGetHeroDataQuery,
  useEditLayoutMutation,
} from "@/redux/features/layout/page";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import { ICategory } from "@/app/types";

const EditCategories = () => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    if (data?.layout?.categories) {
      setCategories(data.layout.categories);
    }
    if (isSuccess) {
      refetch();
      toast.success("Categories edited successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleCategoriesAdd = (id: string, title: string) => {
    setCategories((prevCategory: ICategory[]) =>
      prevCategory.map((item: ICategory) =>
        item._id === id ? { ...item, title } : item,
      ),
    );
  };

  const newCategoriesHandler = () => {
    if (
      categories.length > 0 &&
      categories[categories.length - 1].title === ""
    ) {
      toast.error("Please enter a category title");
    } else {
      setCategories((prevCategory: ICategory[]) => [...prevCategory, { title: "" }]);
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: ICategory[],
    newCategories: ICategory[],
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryEmpty = (categories: ICategory[]) => {
    return categories.some((item: ICategory) => item.title === "");
  };

  const editCategoriesHandler = async () => {
    const originalCategories = data?.layout?.categories ?? [];
    if (
      !areCategoriesUnchanged(originalCategories, categories) &&
      !isAnyCategoryEmpty(categories)
    ) {
      await editLayout({ type: "Categories", categories });
    }
  };

  const isUnchanged = areCategoriesUnchanged(
    data?.layout?.categories ?? [],
    categories,
  );
  const isEmpty = isAnyCategoryEmpty(categories);
  const canSave = !isUnchanged && !isEmpty;

  return (
    <div className="w-[90%] max-w-[760px] mx-auto mt-24 mb-[60px]">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="rounded-[22px] border-[1.5px] border-indigo-500/10 p-8 px-9 transition-shadow duration-300 bg-white/90 shadow-[0_4px_24px_rgba(99,102,241,0.06)] hover:shadow-[0_8px_32px_rgba(99,102,241,0.13)] dark:bg-[#0f1535]/70 dark:shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
          <h1 className="text-[1.45rem] font-extrabold font-poppins bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent mb-1">
            Edit Categories
          </h1>
          <p className="text-[0.82rem] font-medium mb-7 text-slate-500 dark:text-slate-400">
            Customize and manage categories available for courses.
          </p>

          <div className="flex flex-col gap-3 mb-6">
            {categories &&
              categories.map((i: ICategory, index: number) => {
                return (
                  <div key={i._id || index} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={i.title}
                      onChange={(e) =>
                        handleCategoriesAdd(i._id ?? "", e.target.value)
                      }
                      placeholder="Enter category title..."
                      className="flex-1 py-[0.65rem] px-4 rounded-xl border-[1.5px] border-indigo-500/[0.16] bg-indigo-500/[0.04] text-[0.88rem] outline-none text-inherit transition-all duration-300 placeholder:text-slate-500/50 focus:border-indigo-500 focus:bg-indigo-500/[0.07] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)]"
                    />
                    <button
                      type="button"
                      className="inline-flex items-center justify-center w-[38px] h-[38px] rounded-[10px] cursor-pointer border-[1.5px] border-red-500/20 bg-red-500/[0.04] text-red-500 transition-all duration-200 hover:bg-red-500 hover:text-white hover:scale-[1.06]"
                      onClick={() => {
                        setCategories((prevCategory: ICategory[]) =>
                          prevCategory.filter(
                            (item: ICategory) => item._id !== i._id,
                          ),
                        );
                      }}
                    >
                      <AiOutlineDelete size={17} />
                    </button>
                  </div>
                );
              })}
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 py-2 px-[18px] rounded-xl cursor-pointer text-[0.85rem] font-bold border-[1.5px] border-indigo-500/20 bg-indigo-500/5 text-indigo-500 transition-all duration-200 hover:bg-indigo-500/10 hover:border-indigo-500/35"
            onClick={newCategoriesHandler}
          >
            <IoMdAddCircleOutline className="text-[1.15rem]" /> Add Category
          </button>

          <div className="flex justify-end mt-8 pt-5 border-t-[1.5px] border-indigo-500/10">
            <button
              type="button"
              className={`relative overflow-hidden py-[10px] px-8 rounded-xl text-[0.88rem] font-bold border-none group ${
                canSave
                  ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-[0_4px_16px_rgba(99,102,241,0.3)] cursor-pointer"
                  : "bg-slate-400/[0.15] text-slate-400/50 cursor-not-allowed"
              }`}
              onClick={canSave ? editCategoriesHandler : undefined}
            >
              {canSave && (
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              )}
              <span className="relative">Save Changes</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCategories;
