"use client";

import useAuth from "@/app/hooks/useAuth";
import { resendOtp } from "@/app/utils/auth";
import { hideMobileNumber } from "@/app/utils/parse";
import { otpSchema } from "@/app/validations/auth";
import { Box, Button, FocusTrap, Modal, PinInput, em } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect, useRef, useState } from "react";
import S from "@/app/styles/Otp.module.css";
import axios from "axios";
import { addContact, sendContact } from "@/app/utils/api/actions/contact";
import clsx from "clsx";

type Props = {
  callback: () => void;
  values: any;
  builderName?: string;
  title: string;
  Posted_BY: string;
};

export default function ReqOtpForm({
  callback,
  values,
  builderName,
  title,
  Posted_BY,
}: Props) {
  const [error, setError] = useState(false);
  const ref = useRef(null);
  const onSubmit = async (value: any) => {
    if (value.toString().length == 4) {
      const data = await sendContact({ ...values, otp: value });
      if (data?.status) {
        callback();
      } else {
        setError(true);
      }
    } else {
      setError(false);
    }
  };
  const form = useForm({
    initialValues: { otp: 0 },
    validate: yupResolver(otpSchema),
    validateInputOnChange: true,
    onValuesChange(values) {
      if (values.otp.toString().length === 4) {
        onSubmit(values.otp);
      } else {
        setError(false);
      }
    },
  });

  return (
    <div>
      <form
        onSubmit={form.onSubmit((values) => onSubmit(values.otp))}
        ref={ref}
        className="w-[100%] h-full  flex justify-start items-start flex-col "
      >
        {" "}
        <h2 className="text-[#202020] text-[20px] xl:text-[24px] xl:text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px] mb-3">
          Request A Callback
        </h2>
        <p className="text-[#00487C] text-[16px] xl:text-[20px] italic font-bold leading-[normal] tracking-[0.36px] capitalize mb-[2%] mt-1">
          <span className="text-[#4D6677]  italic font-medium leading-[normal] tracking-[0.36px] ">
            Call For
          </span>{" "}
          : {title}
        </p>
        <p className="text-[#148B16]  text-[16px] xl:text-[20px] italic font-bold leading-[normal] tracking-[0.64px] mb-[2%] ">
          <span className="text-[#4D6677]  italic font-medium leading-[normal] tracking-[0.36px]">
            {Posted_BY}
          </span>{" "}
          : {builderName}
        </p>
        <p className="text-[#EA7A00] text-[16px] xl:text-base not-italic font-semibold leading-[normal] tracking-[0.64px] py-1">
          You are one step away to get callback.
        </p>
        <p className="text-[#4D6677] text-[14px] xl:text-base not-italic font-semibold leading-[normal] tracking-[0.64px] mb-[2%] ">
          Please verify your contact !
        </p>
        <p className="text-[#242424] text-[16px] xl:text-base not-italic font-semibold leading-[normal] tracking-[0.64px] mt-2">
          An OTP has been sent to your mobile number
        </p>
        <p className="text-[#333] text-[20px] xl:text-xl not-italic font-semibold leading-[normal] tracking-[0.8px] mt-3">
          Enter OTP
        </p>
        {/* <h1 className="text-[#333] font-[600] text-lg md:text-[24px] text-center ">
          OTP VERIFICATION
        </h1>
        <p className="text-[#B5ABAC] font-[500] md:text-[20px] text-center mb-[3%]  ">
          A One Time- Password has been sent to{" "}
          {hideMobileNumber((values.mobile && values.mobile) || 0)}
        </p> */}
        {error && (
          <p className="text-[#F00] font-[500] text-[14px] w-[100%] !max-w-[423px] mt-2  ">
            Invalid OTP entered. Enter valid OTP
          </p>
        )}
        {form.errors.otp && (
          <p className="text-[#F00] font-[500]  xl:text-[14px] w-[100%] !max-w-[423px] mt-2 ">
            {form.errors.otp}
          </p>
        )}
        <FocusTrap active>
          <PinInput
            classNames={{
              pinInput: S.pinInput,
              input:
                (error || form.errors.otp) &&
                form.values.otp.toString().length == 4
                  ? S.errorInput
                  : S.input,
            }}
            name="otp"
            size="xl"
            {...form.getInputProps("otp")}
            inputMode="numeric"
            type={"number"}
            placeholder=""
          />
        </FocusTrap>
        <Resend userName={values.mobile} values={values} />
        <Button type="submit" className="!bg-[#0073C6]">
          Submit
        </Button>
      </form>
    </div>
  );
}

const Resend = ({ userName, values }: any): JSX.Element => {
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

  const resendOTP = async () => {
    if (!timerRunning) {
      setTimeRemaining({ minutes: 0, seconds: 30 });
      setTimerRunning(true);
    }
    await addContact(values);
  };

  const { minutes, seconds } = timeRemaining;

  return (
    <div className="w-full flex justify-center my-3 flex-col items-end max-w-[280px]">
      <button disabled={timerRunning} onClick={resendOTP}>
        <span
          className={clsx(
            " text-sm not-italic font-semibold leading-[normal] tracking-[0.56px] ",
            timerRunning
              ? "text-[#303A42] text-sm not-italic font-medium leading-[normal] tracking-[0.56px]"
              : "text-[#0073C6] underline"
          )}
        >
          {" "}
          Resend OTP
        </span>

        <span className="text-[#0073C6] text-sm not-italic font-medium leading-[normal] tracking-[0.56px]">
          {seconds > 0 || minutes > 0 ? (
            <>
              {" "}
              <span className="text-[#303A42] text-sm not-italic font-medium leading-[normal] tracking-[0.56px]">
                in
              </span>{" "}
              {minutes > 0 && (
                <>
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </>
              )}
              {minutes === 0 && seconds < 60 && <>{seconds} sec</>}
            </>
          ) : null}
        </span>
      </button>
    </div>
  );
};
