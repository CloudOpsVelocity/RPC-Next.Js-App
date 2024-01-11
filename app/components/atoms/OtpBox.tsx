"use client";

import useAuth from "@/app/hooks/useAuth";
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
};

export default function OtpBox({ userName, close, callback }: Props) {
  const { verifyOtp } = useAuth();
  const [error, setError] = useState(false);

  const onSubmit = async (value: any) => {
    const data = await verifyOtp({ ...value, username: userName });
    if (data?.success) {
      callback();
      close();
      //Close OTP Popup
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
        {/* <div className="w-full max-w-[459px] md:max-w-[597px] flex justify-center items-center gap-[5%] mb-[5%] ">
          <Link
            href="/login"
            className="whitespace-nowrap text-[26px] font-[500] text-[#666]"
          >
            Log In
          </Link>

          <Link
            href="/register"
            className="whitespace-nowrap text-[26px] text-[#148B16] font-bold border-solid border-b-2 border-green-600"
          >
            Individual Sign Up
          </Link>
        </div> */}
        <h1 className="text-[#333] font-[600] text-[24px] text-center ">
          Please enter your OTP to verify your account
        </h1>
        <p className="text-[#B5ABAC] font-[500] text-[20px] text-center mb-[3%]  ">
          A One Time- Password has been sent to 8305575XXX
        </p>
        <PinInput
          size="md"
          {...form.getInputProps("otp")}
          className=""
          inputMode="numeric"
          //error
        />

        <Resend />

        {error && (
          <p className="text-[#F00] font-[500] text-[16px] w-[100%] !max-w-[423px] !mb-[6%] text-center ">
            You’ve entered wrong OTP, Please enter your OTP again!
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

/**
 * Resend OTP component.
 *
 * @returns JSX.Element
 */
const Resend = (): JSX.Element => {
  const [seconds, setSeconds] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((prevSeconds: number) => prevSeconds + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (seconds >= 30 && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [seconds]);

  const handleResendClick = (): void => {
    setSeconds(0);
  };

  const isResendDisabled: boolean = seconds > 0;

  return (
    <>
      <p
        onClick={handleResendClick}
        className={`font-[500] text-[16px] text-right w-[100%] !max-w-[423px] !mb-[6%] underline text-[#0c7aca] cursor-pointer mt-2 ${
          isResendDisabled ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        {isResendDisabled ? `Resend OTP in ${30 - seconds}s` : "Resend OTP"}
      </p>
    </>
  );
};
