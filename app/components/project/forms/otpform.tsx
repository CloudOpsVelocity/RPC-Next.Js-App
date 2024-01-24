"use client";

import useAuth from "@/app/hooks/useAuth";
import { resendOtp } from "@/app/utils/auth";
import { hideMobileNumber } from "@/app/utils/parse";
import { otpSchema } from "@/app/validations/auth";
import { Box, Button, Modal, PinInput, em } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect, useRef, useState } from "react";
import S from "@/app/styles/Otp.module.css";
import axios from "axios";
import { sendContact } from "@/app/utils/api/actions/contact";

type Props = {
  callback: () => void;
  values: any;
};

export default function ReqOtpForm({ callback, values }: Props) {
  const [error, setError] = useState(false);
  const onSubmit = async (value: any) => {
    const data = await sendContact({ ...values, otp: value.otp });
    console.log(data);
    if (data?.status) {
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
    <div>
      <form
        onSubmit={form.onSubmit(onSubmit)}
        className="w-[100%]  flex justify-start items-start flex-col "
      >
        <p className="text-[#EA7A00] text-base not-italic font-semibold leading-[normal] tracking-[0.64px] py-1">
          You are one step away to get callback. Please verify your contact !
        </p>
        <p className="text-[#4D6677] text-[14px] font-[600] ">
          Please verify your contact !
        </p>
        <p className="mt-2 text-green-600 font-semibold">
          Builder: Sarang By Sumadhura
        </p>
        <p className="text-[#4D6677] text-base not-italic font-semibold leading-[normal] tracking-[0.64px] mt-2">
          An OTP has been sent to your mobile number
        </p>
        <p className="text-[#333] text-xl not-italic font-semibold leading-[normal] tracking-[0.8px] mt-4">
          Enter OTP
        </p>
        {/* <h1 className="text-[#333] font-[600] text-lg md:text-[24px] text-center ">
          OTP VERIFICATION
        </h1>
        <p className="text-[#B5ABAC] font-[500] md:text-[20px] text-center mb-[3%]  ">
          A One Time- Password has been sent to{" "}
          {hideMobileNumber((values.mobile && values.mobile) || 0)}
        </p> */}
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

        <Resend userName={values.mobile} />

        {error && (
          <p className="text-[#F00] font-[500] text-[14px] w-[100%] !max-w-[423px] !mb-[6%]  ">
            You&apos;ve entered wrong OTP, Please enter your OTP again!
          </p>
        )}
        {form.errors.otp && (
          <p className="text-[#F00] font-[500] text-[14px] w-[100%] !max-w-[423px] !mb-[6%]  ">
            {form.errors.otp}
          </p>
        )}
        <Button>Submit</Button>
      </form>
    </div>
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
    <div className="w-full flex justify-center my-4 flex-col items-end max-w-[280px]">
      <button disabled={timerRunning} onClick={resendOTP}>
        <span
          style={{
            color: timerRunning ? "#DFE3E8" : "#0073C6",
          }}
        >
          {" "}
          Resend OTP
        </span>

        <span
          style={{
            color: "#0073C6",
          }}
        >
          {seconds > 0 || minutes > 0 ? (
            <>
              {" "}
              in {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </>
          ) : null}
        </span>
      </button>
    </div>
  );
};
