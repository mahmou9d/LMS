"use client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/avatar.jpg";
import {
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
} from "@/redux/features/user/userApi";
import { useLazyLoadUserQuery } from "@/redux/features/api/apiSlice";
import { IUser } from "@/app/types";
import toast from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: IUser;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user?.name || "");
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: updateError }] =
    useUpdateProfileMutation();
  const [loadUser] = useLazyLoadUserQuery();

  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (
        fileReader.readyState === 2 &&
        typeof fileReader.result === "string"
      ) {
        updateAvatar(fileReader.result);
      }
    };
    fileReader.readAsDataURL(file);
  };

  useEffect(() => {
    if (isSuccess) loadUser();
    if (error || updateError) console.log(error);
    if (success) {
      toast.success("Profile Updated Successfully");
    }
  }, [isSuccess, error, loadUser, updateError, success]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await editProfile({ name });
  };

  const imageSrc =
    user?.avatar?.url ||
    avatar ||
    avatarIcon ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <>
      <div>
        {/* Section heading */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 pb-4 border-b border-indigo-500/[0.12] dark:border-indigo-500/[0.18] mb-6">
          My Account
        </h2>

        {/* Avatar */}
        <div className="flex justify-center mb-8">
          <div className="relative rounded-full p-[3px] bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] inline-block shadow-[0_4px_20px_rgba(99,102,241,0.25)]">
            <Image
              src={imageSrc}
              alt="User Avatar"
              width={96}
              height={96}
              className="rounded-full block object-cover border-[3.5px] border-white dark:border-[#0d0d23] w-24 h-24"
            />
            <input
              type="file"
              id="avatar"
              className="hidden"
              onChange={imageHandler}
              accept="image/png,image/jpg,image/jpeg,image/webp"
            />
            <label
              htmlFor="avatar"
              className="absolute bottom-0.5 right-0.5 w-8 h-8 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_16px_rgba(99,102,241,0.55)]"
            >
              <AiOutlineCamera size={16} />
            </label>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-white/85 dark:bg-[#090919]/85 border border-indigo-500/[0.12] dark:border-indigo-500/[0.18] rounded-xl text-gray-900 dark:text-gray-100 outline-none focus:border-indigo-500/50 focus:shadow-[0_8px_30px_rgba(99,102,241,0.12),0_0_0_4px_rgba(99,102,241,0.08)]"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-3 text-sm rounded-xl outline-none bg-gray-100/50 dark:bg-[#090919]/40 text-gray-400 dark:text-gray-500 border border-indigo-500/[0.06] dark:border-indigo-500/10 cursor-not-allowed"
              placeholder="Your email address"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="relative w-full py-3 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white text-sm font-semibold border-none rounded-xl cursor-pointer overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_4px_15px_rgba(99,102,241,0.35)] tracking-[0.01em] flex items-center justify-center before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-[left] before:duration-500 before:ease-linear hover:before:left-full hover:shadow-[0_8px_25px_rgba(99,102,241,0.5)]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
