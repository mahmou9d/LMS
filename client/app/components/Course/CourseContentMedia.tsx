"use client";
import CoursePlayer from "@/app/utills/CoursePlayer";
import {
  useAddNewAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import { format } from "timeago.js";
import { io } from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_URL || "";
const socketId = io(ENDPOINT, { transports: ["websocket"] });

import { IUser, ICourseData, IReview, IComment, ILink } from "@/app/types";

type Props = {
  data: ICourseData[];
  activeVideo: number;
  setActiveVideo: (index: number) => void;
  id: string;
  user?: IUser;
  refetch: () => void;
};

const CourseContentMedia = ({
  data,
  activeVideo,
  setActiveVideo,
  id,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [
    addNewQuestion,
    { isLoading: questionCreateLoading, error, isSuccess },
  ] = useAddNewQuestionMutation();
  const [
    addNewAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddNewAnswerInQuestionMutation();
  const [
    addReviewInCourse,
    { isSuccess: reviewSuccess, error: reviewError, isLoading: reviewLoading },
  ] = useAddReviewInCourseMutation();
  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true },
  );
  const [
    addReeplyInReview,
    {
      isSuccess: replySuccess,
      error: replyError,
      isLoading: replyCreationLoading,
    },
  ] = useAddReplyInReviewMutation();
  const course = courseData?.course;
  const isReviewExists = course?.reviews?.find(
    (item: IReview) => (item?.user?._id || item?.user) === user?._id,
  );
  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question cant be empty");
    } else {
      addNewQuestion({
        courseId: id,
        contentId: data[activeVideo]?._id,
        question,
      });
    }
  };
  // Question mutation effect
  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added successfully");
      socketId.emit("notification", {
        title: "new question",
        userId: user?._id,
        message: `You have successfully added a question to the course ${data[activeVideo].title}`,
      });
    }
    if (error) {
      if ("data" in error) {
        const errorData = error.data as { message?: string };
        toast.error(errorData.message || "An error occurred");
      }
    }
  }, [isSuccess, error]);

  // Answer mutation effect
  useEffect(() => {
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer added successfully");
      if (user?.role !== "admin") {
        socketId.emit("notification", {
          title: "new answer",
          userId: user?._id,
          message: `You have successfully added an answer to the course ${data[activeVideo].title}`,
        });
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorData = answerError.data as { message?: string };
        toast.error(errorData.message || "An error occurred");
      }
    }
  }, [answerSuccess, answerError]);

  // Review mutation effect
  useEffect(() => {
    if (reviewSuccess) {
      courseRefetch();
      toast.success("Review added successfully");
      setRating(1);
      setReview("");
      socketId.emit("notification", {
        title: "new review",
        userId: user?._id,
        message: `You have successfully added a review to the course ${data[activeVideo].title}`,
      });
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorData = reviewError.data as { message?: string };
        toast.error(errorData.message || "An error occurred");
      }
    }
  }, [reviewSuccess, reviewError]);

  // Reply mutation effect
  useEffect(() => {
    if (replySuccess) {
      courseRefetch();
      toast.success("Reply added successfully");
      setReply("");
      socketId.emit("notification", {
        title: "new reply",
        userId: user?._id,
        message: `You have successfully added a reply to the course ${data[activeVideo].title}`,
      });
    }
    if (replyError) {
      if ("data" in replyError) {
        const errorData = replyError.data as { message?: string };
        toast.error(errorData.message || "An error occurred");
      }
    }
  }, [replySuccess, replyError]);
  const handleAnswerSubmit = () => {
    addNewAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };
  const handleReviewSubmit = () => {
    if (review.length === 0) {
      toast.error("Review cant be empty");
    } else {
      addReviewInCourse({
        courseId: id,
        rating,
        review,
      });
    }
  };
  const handleReviewReplySubmit = () => {
    if (!replyCreationLoading) {
      if (reply.length === 0) {
        toast.error("Reply can't be empty");
      } else {
        addReeplyInReview({
          comment: reply,
          courseId: id,
          reviewId: reviewId,
        });
      }
    }
  };
  return (
    <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-white/[0.08] rounded-2xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300">
      <CoursePlayer
        videoUrl={data[activeVideo]?.videoUrl}
        title={data[activeVideo]?.title}
      />

      <div className="flex justify-between items-center mt-4 mb-6 gap-2">
        <button
          className="flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold cursor-pointer transition-all duration-300 bg-slate-100 dark:bg-[#1f2937] border border-slate-200/80 dark:border-white/[0.08] text-slate-600 dark:text-gray-400 hover:enabled:bg-gradient-to-br hover:enabled:from-indigo-500 hover:enabled:to-violet-500 hover:enabled:text-white hover:enabled:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => activeVideo > 0 && setActiveVideo(activeVideo - 1)}
          disabled={activeVideo === 0}
        >
          <AiOutlineArrowLeft />
          <span className="hidden sm:inline">Prev Lesson</span>
          <span className="sm:hidden">Prev</span>
        </button>
        <button
          className="flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold cursor-pointer transition-all duration-300 bg-slate-100 dark:bg-[#1f2937] border border-slate-200/80 dark:border-white/[0.08] text-slate-600 dark:text-gray-400 hover:enabled:bg-gradient-to-br hover:enabled:from-indigo-500 hover:enabled:to-violet-500 hover:enabled:text-white hover:enabled:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() =>
            activeVideo < data.length - 1 && setActiveVideo(activeVideo + 1)
          }
          disabled={activeVideo === data.length - 1}
        >
          <span className="hidden sm:inline">Next Lesson</span>
          <span className="sm:hidden">Next</span>
          <AiOutlineArrowRight />
        </button>
      </div>

      <h1 className="text-xl sm:text-2xl font-extrabold mb-5 text-slate-900 dark:text-slate-50">
        {data[activeVideo]?.title}
      </h1>

      <div className="flex border-b-2 border-slate-200 dark:border-gray-700 gap-6 mb-6 overflow-x-auto">
        {["Overview", "Resources", "Q&A", "Review"].map(
          (text: string, index: number) => (
            <div
              className={`px-1 py-3 text-[0.95rem] font-semibold cursor-pointer relative transition-colors duration-200 whitespace-nowrap hover:text-indigo-500 ${
                activeBar === index
                  ? "text-indigo-500 after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-[2.5px] after:rounded-sm after:bg-gradient-to-r after:from-indigo-500 after:to-violet-500"
                  : "text-slate-500 dark:text-gray-400"
              }`}
              onClick={() => setActiveBar(index)}
              key={index}
            >
              {text}
            </div>
          ),
        )}
      </div>

      <div>
        {activeBar === 0 && (
          <div className="text-[0.95rem] leading-[1.6] text-slate-600 dark:text-gray-400">
            <p>{data[activeVideo]?.description}</p>
          </div>
        )}

        {activeBar === 1 && (
          <div>
            {data[activeVideo]?.links &&
            data[activeVideo]?.links.filter(
              (item: ILink) => item.title && item.url,
            ).length > 0 ? (
              data[activeVideo]?.links
                .filter((item: ILink) => item.title && item.url)
                .map((item: ILink, index: number) => (
                  <div
                    className="flex items-center justify-between bg-slate-50 dark:bg-[#1f2937] border border-slate-200/80 dark:border-white/5 p-4 rounded-xl mb-3 hover:border-indigo-500"
                    key={index}
                  >
                    <h4
                      style={{ fontWeight: 600, fontSize: "0.95rem" }}
                      className="dark:text-gray-100"
                    >
                      {item.title} :
                    </h4>
                    <a
                      className="text-indigo-500 font-semibold no-underline text-sm hover:underline"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.url}
                    </a>
                  </div>
                ))
            ) : (
              <p className="text-[0.95rem] leading-[1.6] text-slate-600 dark:text-gray-400">
                No resources provided for this lesson.
              </p>
            )}
          </div>
        )}

        {activeBar === 2 && (
          <>
            <div className="flex gap-4 bg-slate-50 dark:bg-[#1f2937] border border-slate-200/80 dark:border-white/5 p-5 rounded-2xl mb-6">
              <Image
                src={
                  user?.avatar?.url ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                width={45}
                height={45}
                alt="user avatar"
                className="rounded-full border-2 border-slate-200 dark:border-gray-700 object-cover w-[45px] h-[45px]"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  gap: 12,
                }}
              >
                <textarea
                  className="flex-1 bg-white dark:bg-[#111827] border border-slate-300 dark:border-gray-600 rounded-[10px] p-3 text-[0.95rem] text-inherit resize-y outline-none transition-colors duration-200 focus:border-indigo-500"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={4}
                  placeholder="Ask a question about this lesson..."
                />
                <button
                  className="bg-gradient-to-br from-indigo-500 to-violet-500 text-white px-6 py-2.5 rounded-full font-semibold text-sm border-none cursor-pointer transition-all duration-200 self-end shadow-[0_4px_12px_rgba(99,102,241,0.25)] hover:opacity-95 hover:shadow-[0_6px_16px_rgba(99,102,241,0.35)] "
                  onClick={questionCreateLoading ? () => {} : handleQuestion}
                  disabled={questionCreateLoading}
                >
                  {questionCreateLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>

            <div className="comments-section">
              <CommentReply
                data={data}
                activevideo={activeVideo}
                user={user}
                answer={answer}
                setAnswer={setAnswer}
                handleAnswerSubmit={handleAnswerSubmit}
                setQuestionId={setQuestionId}
                answerCreationLoading={answerCreationLoading}
              />
            </div>
          </>
        )}

        {activeBar === 3 && (
          <>
            <div className="flex gap-4 bg-slate-50 dark:bg-[#1f2937] border border-slate-200/80 dark:border-white/5 p-5 rounded-2xl mb-6">
              <Image
                src={
                  user?.avatar?.url ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="user avatar"
                width={45}
                height={45}
                className="rounded-full border-2 border-slate-200 dark:border-gray-700 object-cover w-[45px] h-[45px]"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{ fontWeight: 600, fontSize: "0.95rem" }}
                    className="dark:text-gray-100"
                  >
                    Give a rating:
                  </span>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[1, 2, 3, 4, 5].map((rate) =>
                      rating >= rate ? (
                        <AiFillStar
                          key={rate}
                          size={22}
                          onClick={() => setRating(rate)}
                          style={{ color: "#eab308", cursor: "pointer" }}
                        />
                      ) : (
                        <AiOutlineStar
                          key={rate}
                          size={22}
                          onClick={() => setRating(rate)}
                          style={{ color: "#eab308", cursor: "pointer" }}
                        />
                      ),
                    )}
                  </div>
                </div>
                <textarea
                  className="flex-1 bg-white dark:bg-[#111827] border border-slate-300 dark:border-gray-600 rounded-[10px] p-3 text-[0.95rem] text-inherit resize-y outline-none transition-colors duration-200 focus:border-indigo-500"
                  rows={4}
                  placeholder="Write your review here..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
                <button
                  className="bg-gradient-to-br from-indigo-500 to-violet-500 text-white px-6 py-2.5 rounded-full font-semibold text-sm border-none cursor-pointer transition-all duration-200 self-end shadow-[0_4px_12px_rgba(99,102,241,0.25)] hover:opacity-95 hover:shadow-[0_6px_16px_rgba(99,102,241,0.35)] "
                  onClick={reviewLoading ? () => {} : handleReviewSubmit}
                  disabled={reviewLoading}
                >
                  {reviewLoading ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </div>

            <div
              style={{
                marginTop: 24,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {course?.reviews && course.reviews.length > 0 ? (
                [...course.reviews]
                  .reverse()
                  .map((item: IReview, index: number) => (
                    <ReviewItem
                      key={index}
                      item={item}
                      user={user}
                      reply={reply}
                      setReply={setReply}
                      handleReviewReplySubmit={handleReviewReplySubmit}
                      replyCreationLoading={replyCreationLoading}
                      setReviewId={setReviewId}
                      reviewId={reviewId}
                    />
                  ))
              ) : (
                <p className="text-[0.95rem] leading-[1.6] text-slate-600 dark:text-gray-400">
                  No reviews yet. Be the first to review!
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface ReviewItemProps {
  item: IReview;
  user?: IUser;
  reply: string;
  setReply: (reply: string) => void;
  handleReviewReplySubmit: () => void;
  replyCreationLoading: boolean;
  setReviewId: (id: string) => void;
  reviewId: string;
}

const ReviewItem = ({
  item,
  user,
  reply,
  setReply,
  handleReviewReplySubmit,
  replyCreationLoading,
  setReviewId,
  reviewId,
}: ReviewItemProps) => {
  const [replyActive, setReplyActive] = useState(false);

  return (
    <div className="bg-white dark:bg-[#1f2937] border border-slate-200/80 dark:border-gray-800 rounded-[14px] p-5 shadow-sm flex flex-col gap-3">
      <div style={{ display: "flex", gap: 12 }}>
        <Image
          src={
            item?.user?.avatar?.url ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="reviewer avatar"
          width={40}
          height={40}
          className="rounded-full border-2 border-slate-200 dark:border-gray-700 object-cover w-[40px] h-[40px]"
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <h5
            style={{ fontSize: "0.95rem", fontWeight: 700 }}
            className="dark:text-gray-100"
          >
            {item?.user?.name}
          </h5>
          <div style={{ display: "flex", gap: 2, margin: "2px 0" }}>
            <Rating value={item.rating} readOnly size="small" />
          </div>
          <p style={{ fontSize: "0.95rem" }} className="dark:text-gray-100">
            {item?.comment}
          </p>
          <small style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
            {format(item.createdAt)}
          </small>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "#64748b",
          marginTop: 4,
        }}
        className="dark:text-gray-400"
      >
        <span
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          onClick={() => {
            setReplyActive(!replyActive);
            setReviewId(item._id);
          }}
          className="hover:text-[#6366f1]"
        >
          <BiMessage size={18} />
          {!replyActive
            ? item?.commentReplies?.length !== 0
              ? `View replies (${item?.commentReplies?.length})`
              : user?.role === "admin"
                ? "Reply"
                : "No replies"
            : "Hide replies"}
        </span>
      </div>

      {replyActive && (
        <div
          style={{
            marginTop: 12,
            borderLeft: "2px solid #e2e8f0",
            paddingLeft: 16,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
          className="dark:border-gray-800"
        >
          {item.commentReplies &&
            item.commentReplies.map((replyItem: IComment, index: number) => (
              <div key={index} style={{ display: "flex", gap: 12 }}>
                <Image
                  src={
                    replyItem?.user?.avatar?.url ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="reply avatar"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-slate-200 dark:border-gray-700 object-cover w-[32px] h-[32px]"
                />
                <div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <h5
                      style={{ fontSize: "0.85rem", fontWeight: 700 }}
                      className="dark:text-gray-100"
                    >
                      {replyItem.user.name}
                    </h5>
                    {replyItem.user.role === "admin" && (
                      <VscVerifiedFilled style={{ color: "#6366f1" }} />
                    )}
                  </div>
                  <p
                    style={{ fontSize: "0.85rem", color: "#475569" }}
                    className="dark:text-gray-300"
                  >
                    {replyItem.comment || replyItem.answer}
                  </p>
                  <small style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                    {format(replyItem.createdAt)}
                  </small>
                </div>
              </div>
            ))}

          {user?.role === "admin" && (
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <input
                type="text"
                style={{
                  flex: 1,
                  padding: "8px 14px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.88rem",
                  outline: "none",
                  background: "transparent",
                }}
                className="dark:border-gray-700 dark:text-white focus:border-[#6366f1]"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write a reply..."
              />
              <button
                className="bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-semibold text-sm border-none cursor-pointer transition-all duration-200 hover:opacity-95"
                style={{
                  padding: "8px 18px",
                  alignSelf: "center",
                  borderRadius: "10px",
                  boxShadow: "none",
                }}
                type="submit"
                onClick={handleReviewReplySubmit}
                disabled={reply === "" || replyCreationLoading}
              >
                Reply
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface CommentReplyProps {
  data: ICourseData[];
  activevideo: number;
  user?: IUser;
  answer: string;
  setAnswer: (answer: string) => void;
  handleAnswerSubmit: () => void;
  setQuestionId: (id: string) => void;
  answerCreationLoading: boolean;
}

const CommentReply = ({
  data,
  activevideo,
  user,
  answer,
  setAnswer,
  handleAnswerSubmit,
  setQuestionId,
  answerCreationLoading,
}: CommentReplyProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {data[activevideo]?.questions?.map((item: IComment, index: number) => (
        <CommentItem
          item={item}
          data={data}
          key={index}
          setQuestionId={setQuestionId}
          activevideo={activevideo}
          answer={answer}
          setAnswer={setAnswer}
          handleAnswerSubmit={handleAnswerSubmit}
          user={user}
          answerCreationLoading={answerCreationLoading}
        />
      ))}
    </div>
  );
};

interface CommentItemProps {
  item: IComment;
  data: ICourseData[];
  setQuestionId: (id: string) => void;
  activevideo: number;
  answer: string;
  setAnswer: (answer: string) => void;
  handleAnswerSubmit: () => void;
  user?: IUser;
  answerCreationLoading: boolean;
}

const CommentItem = ({
  item,
  data,
  setQuestionId,
  activevideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  answerCreationLoading,
}: CommentItemProps) => {
  const [replyActive, setReplyActive] = useState(false);

  return (
    <div className="bg-white dark:bg-[#1f2937] border border-slate-200/80 dark:border-gray-800 rounded-[14px] p-5 shadow-sm flex flex-col gap-3">
      <div style={{ display: "flex", gap: 12 }}>
        <Image
          src={
            item?.user?.avatar?.url ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="comment avatar"
          width={40}
          height={40}
          className="rounded-full border-2 border-slate-200 dark:border-gray-700 object-cover w-[40px] h-[40px]"
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <h5
            style={{ fontSize: "0.95rem", fontWeight: 700 }}
            className="dark:text-gray-100"
          >
            {item?.user?.name}
          </h5>
          <p style={{ fontSize: "0.95rem" }} className="dark:text-gray-100">
            {item?.question}
          </p>
          <small style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
            {item.createdAt ? format(item?.createdAt) : ""}
          </small>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "#64748b",
          marginTop: 4,
        }}
        className="dark:text-gray-400"
      >
        <span
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          onClick={() => {
            setReplyActive(!replyActive);
            setQuestionId(item._id);
          }}
          className="hover:text-[#6366f1]"
        >
          <BiMessage size={18} />
          {!replyActive
            ? item?.questionReplies?.length !== 0
              ? `View replies (${item?.questionReplies?.length})`
              : "Reply"
            : "Hide replies"}
        </span>
      </div>

      {replyActive && (
        <div
          style={{
            marginTop: 12,
            borderLeft: "2px solid #e2e8f0",
            paddingLeft: 16,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
          className="dark:border-gray-800"
        >
          {item?.questionReplies &&
            item.questionReplies.map((replyItem: IComment, index: number) => (
              <div key={index} style={{ display: "flex", gap: 12 }}>
                <Image
                  src={
                    replyItem?.user?.avatar?.url ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="reply avatar"
                  width={34}
                  height={34}
                  className="rounded-full border-2 border-slate-200 dark:border-gray-700 object-cover w-[34px] h-[34px]"
                />
                <div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <h5
                      style={{ fontSize: "0.85rem", fontWeight: 700 }}
                      className="dark:text-gray-100"
                    >
                      {replyItem.user.name}
                    </h5>
                    {replyItem.user.role === "admin" && (
                      <VscVerifiedFilled style={{ color: "#6366f1" }} />
                    )}
                  </div>
                  <p
                    style={{ fontSize: "0.85rem" }}
                    className="dark:text-gray-300"
                  >
                    {replyItem.answer}
                  </p>
                  <small style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                    {format(replyItem.createdAt)}
                  </small>
                </div>
              </div>
            ))}

          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <input
              type="text"
              style={{
                flex: 1,
                padding: "8px 14px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                fontSize: "0.88rem",
                outline: "none",
                background: "transparent",
              }}
              className="dark:border-gray-700 dark:text-white focus:border-[#6366f1]"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Write a reply..."
            />
            <button
              className="bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-semibold text-sm border-none cursor-pointer transition-all duration-200 hover:opacity-95 hover:-translate-y-px active:translate-y-0"
              style={{
                padding: "8px 18px",
                alignSelf: "center",
                borderRadius: "10px",
                boxShadow: "none",
              }}
              type="submit"
              onClick={handleAnswerSubmit}
              disabled={answer === "" || answerCreationLoading}
            >
              Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default CourseContentMedia;
