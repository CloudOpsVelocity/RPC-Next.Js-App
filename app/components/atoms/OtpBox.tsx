"use client";

import useAuth from "@/app/hooks/useAuth";
import { resendOtp } from "@/app/utils/auth";
import { hideMobileNumber } from "@/app/utils/parse";
import { otpSchema } from "@/app/validations/auth";
import { Box, Button, Modal, PinInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useInterval } from "@mantine/hooks";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  userName: string;
  close: () => void;
  callback: () => void;
  mobile: number | null;
};

export default function OtpBox({ userName, close, callback, mobile }: Props) {
  const { verifyOtp } = useAuth();
  const [error, setError] = useState(false);
  const onSubmit = async (value: any) => {
    const data = await verifyOtp({ ...value, username: userName });
    if (data?.success) {
      callback();
      close();
    } else {
      setError(true);
    }
  };

  const form = useForm({
    initialValues: { otp: 0 },
    validate: yupResolver(otpSchema),
  });

  return (
    <Box maw={551} mx="auto">
      <form
        onSubmit={form.onSubmit(onSubmit)}
        className="w-[100%] h-[70vh] flex justify-center items-center flex-col "
      >
        <h1 className="text-[#333] font-[600] text-[24px] text-center ">
          Please enter your OTP to verify your account
        </h1>
        <p className="text-[#B5ABAC] font-[500] text-[20px] text-center mb-[3%]  ">
          A One Time- Password has been sent to{" "}
          {hideMobileNumber((mobile && mobile) || 0)}
        </p>
        <PinInput
          size="md"
          {...form.getInputProps("otp")}
          className=""
          inputMode="numeric"
        />

        <Resend userName={userName} />

        {error && (
          <p className="text-[#F00] font-[500] text-[16px] w-[100%] !max-w-[423px] !mb-[6%] text-center ">
            You&apos;ve entered wrong OTP, Please enter your OTP again!
          </p>
        )}

        <Button
          type="submit"
          mt="sm"
          className="!rounded-[6px] !w-[100%] !max-w-[423px] !bg-[#0c7aca]"
        >
          VALIDATE
        </Button>
      </form>
    </Box>
  );
}

const Resend = ({ userName }: { userName: string }): JSX.Element => {
  const [timeRemaining, setTimeRemaining] = useState({
    minutes: 0,
    seconds: 5,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { minutes: prevTime.minutes - 1, seconds: 59 };
        } else {
          clearInterval(interval);
          return prevTime;
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const resendOTP = async () => {
    setTimeRemaining({ minutes: 0, seconds: 30 });
    await resendOtp(userName);
  };

  const { minutes, seconds } = timeRemaining;

  return (
    <div className="w-full flex justify-center my-2 flex-col items-end">
      {seconds > 0 || minutes > 0 ? (
        <p>
          Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </p>
      ) : (
        <p>Didn&apos;t receive code?</p>
      )}

      <button
        disabled={seconds > 0 || minutes > 0}
        style={{
          color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#0073C6",
        }}
        onClick={resendOTP}
      >
        Resend OTP
      </button>
    </div>
  );
};
