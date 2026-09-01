"use client";
import { useLazyLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ICourse, IUser } from "@/app/types";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_URL || "";
const socketId = io(ENDPOINT, { transports: ["websocket"] });

type Props = {
  setOpen: (open: boolean) => void;
  data: ICourse;
  user: IUser;
};

const CheckoutForm = ({ setOpen, data, user }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [message, setmessage] = useState("");
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loaduser, setLoadUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadUser, { data: userData }] = useLazyLoadUserQuery();
  const isSubmitting = React.useRef(false);
  useEffect(() => {
    if (loaduser) {
      loadUser();
    }
  }, [loaduser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements || isSubmitting.current) return;
    isSubmitting.current = true;
    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      setmessage(error?.message || "Something went wrong");
      setIsLoading(false);
      isSubmitting.current = false;
    } else if (paymentIntent && paymentIntent?.status === "succeeded") {
      // Keep isLoading = true until redirect happens
      createOrder({
        courseId: data._id,
        payment_info: paymentIntent,
      });
    }
  };

  useEffect(() => {
    if (orderData) {
      socketId.emit("notification", {
        title: "new order",
        userId: user._id,
        message: `You have successfully purchased the course ${data?.name}`,
      });
      setLoadUser(true);
    }
    if (error) {
      if ("data" in error) {
        const err = error as { data: { message: string } };
        setmessage(err?.data?.message || "Something went wrong");
      }
      setIsLoading(false);
      isSubmitting.current = false;
    }
  }, [orderData, error]);

  useEffect(() => {
    if (userData) {
      setOpen(false);
      router.push(`/course-access/${data?._id}`);
    }
  }, [userData]);

  return (
    <>
      <form
        id="payment-form"
        className="flex flex-col gap-5 mt-[10px]"
        onSubmit={handleSubmit}
      >
        <LinkAuthenticationElement id="link-authentication-element" />
        <PaymentElement id="payment-element" />

        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="w-full p-3 rounded-xl text-[0.95rem] font-bold cursor-pointer bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white border-none shadow-[0_4px_18px_rgba(99,102,241,0.3)] transition-[transform,box-shadow] duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none enabled:hover:shadow-[0_6px_22px_rgba(99,102,241,0.4)]"
        >
          {isLoading ? (
            <>
              <span className="cf-spinner" />
              Processing...
            </>
          ) : (
            `Pay Now — $${data?.price}`
          )}
        </button>

        {message && (
          <div className="text-[0.85rem] text-red-500 bg-red-500/[0.06] px-[14px] py-[10px] rounded-[10px] border border-red-500/15 text-center">
            {message}
          </div>
        )}
      </form>
    </>
  );
};

export default CheckoutForm;
