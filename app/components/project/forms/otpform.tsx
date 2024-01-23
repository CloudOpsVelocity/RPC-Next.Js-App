"use client";

import useAuth from "@/app/hooks/useAuth";
import { resendOtp } from "@/app/utils/auth";
import { hideMobileNumber } from "@/app/utils/parse";
import { otpSchema } from "@/app/validations/auth";
import { Box, Button, Modal, PinInput, em } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect, useRef, useState } from "react";
import S from "@/app/styles/Otp.module.css";

type Props = {
  callback: () => void;
  mobile: number | null;
};

export default function ReqOtpForm({ callback, mobile }: Props) {
  const { verifyOtp } = useAuth();
  const [error, setError] = useState(false);
  const onSubmit = async (value: any) => {
    const data = await verifyOtp({ ...value, username: mobile });
    if (data?.success) {
      callback();
    } else {
      setError(true);
    }
  };

  const form = useForm({
    initialValues: { otp: 0 },
    validate: yupResolver(otpSchema),
    validateInputOnChange: true,
    onValuesChange(values) {
      if (values.otp.toString().length === 4) {
        onSubmit(values);
      } else {
        setError(false);
      }
    },
  });

  return (
    <Box maw={551} mx="auto">
      <form
        onSubmit={form.onSubmit(onSubmit)}
        className="w-[100%] h-[70vh] flex justify-center items-center flex-col "
      >
        <h1 className="text-[#333] font-[600] text-lg md:text-[24px] text-center ">
          OTP VERIFICATION
        </h1>
        <p className="text-[#B5ABAC] font-[500] md:text-[20px] text-center mb-[3%]  ">
          A One Time- Password has been sent to{" "}
          {hideMobileNumber((mobile && mobile) || 0)}
        </p>
        <PinInput
          classNames={{
            pinInput: S.pinInput,
            input: S.input,
          }}
          name="otp"
          size="xl"
          {...form.getInputProps("otp")}
          className=""
          inputMode="numeric"
          type={"number"}
          placeholder=""
        />

        <Resend userName={mobile} />

        {error && (
          <p className="text-[#F00] font-[500] text-[16px] w-[100%] !max-w-[423px] !mb-[6%] text-center ">
            You&apos;ve entered wrong OTP, Please enter your OTP again!
          </p>
        )}
        {form.errors.otp && (
          <p className="text-[#F00] font-[500] text-[16px] w-[100%] !max-w-[423px] !mb-[6%] text-center ">
            {form.errors.otp}
          </p>
        )}
        <Button>Submit</Button>
      </form>
    </Box>
  );
}

const Resend = ({ userName }: any): JSX.Element => {
  const [timeRemaining, setTimeRemaining] = useState({
    minutes: 0,
    seconds: 30,
  });

  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerRunning) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime.seconds > 0) {
            return { ...prevTime, seconds: prevTime.seconds - 1 };
          } else if (prevTime.minutes > 0) {
            return { minutes: prevTime.minutes - 1, seconds: 59 };
          } else {
            clearInterval(interval);
            setTimerRunning(false);
            return prevTime;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerRunning]);

  const resendOTP = () => {
    if (!timerRunning) {
      setTimeRemaining({ minutes: 0, seconds: 30 });
      setTimerRunning(true);
    }
    // await resendOtp(userName);
  };

  const { minutes, seconds } = timeRemaining;

  return (
    <div className="w-full flex justify-center my-4 flex-col items-end">
      {seconds > 0 || minutes > 0 ? (
        <p>
          Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </p>
      ) : (
        <p>Didn&apos;t receive otp?</p>
      )}

      <button
        disabled={timerRunning}
        style={{
          color: timerRunning ? "#DFE3E8" : "#0073C6",
        }}
        onClick={resendOTP}
      >
        Resend OTP
      </button>
    </div>
  );
};
