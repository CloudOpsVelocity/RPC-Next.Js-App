"use client";
import { useForm, yupResolver } from "@mantine/form";
import {
  TextInput,
  Button,
  Box,
  PasswordInput,
  NumberInput,
} from "@mantine/core";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CountryInput from "../../atoms/CountryInput";
import S from "@/app/styles/Numinput.module.css";
import * as yup from "yup";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import AuthPopup from "./authPopup";
import { resendOtp } from "@/app/utils/auth";
import { BackSvg } from "@/app/images/commonSvgs";
import Image from "next/image";
import { forgetPasswordLockImg } from "@/app/images/commonImages";
const schema = yup.object().shape({
  mobile: yup
    .number()
    .positive("Mobile number must be positive")
    .integer("Mobile number must be an integer")
    .typeError("Valid 10-digit contact number is required")
    .test(
      "len",
      "Mobile number must be exactly 10 digits",
      (val) => val?.toString().length === 10
    )
    .required("Mobile number is required"),
});
function ForgotForm() {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error" | "otp"
  >("success");
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const form = useForm({
    initialValues: { mobile: null },

    // functions will be used to validate values at corresponding key
    validate: yupResolver(schema),
  });
  const onSubmit = async (values: any) => {
    // await resendOtp(values.mobile);
    open();
    console.log(values);
  };
  const displayCountryCode = (value: any) => {
    console.log(value);
  };
  const onClose = () => {
    setStatus("idle");
    close();
  };
  const OtpCallback = async () => {
    form.reset();
    setStatus("success");
    close();
  };

  return (
    <div className="w-[100%]  max-w-[459px] flex justify-center items-center flex-col  mt-[3%] p-[10%] md:p-[2%]">
      {status === "success" ? (
        <div>Form</div>
      ) : (
        <form
          onSubmit={form.onSubmit(onSubmit)}
          className="w-[100%] flex justify-center items-center flex-col "
        >
          <h2
            className={`whitespace-nowrap text-2xl font-bold text-[#148B16] text-center mt-3`}
          >
            Forgot Password ?
          </h2>
          <Image
            src={forgetPasswordLockImg}
            alt="lock"
            width={200}
            height={200}
          />
          <h3 className="font-normal text-lg max-w-xl text-center">
            Don’t worry ! It happens. Please enter the phone number we will send
            the OTP in this phone number.
          </h3>
          <NumberInput
            classNames={{ input: S.input }}
            hideControls
            size="md"
            mt="sm"
            className="w-[100%] mb-[3%] rounded-[8px] bg-transparent shadow-md "
            label=""
            placeholder="Enter your registerd mobile number..."
            {...form.getInputProps("mobile")}
            maxLength={10}
          />
          <CountryInput
            onSelect={displayCountryCode}
            className={`focus:outline-none min-w-[30px] max-w-[70px] self-start relative ${
              form.errors.mobile != undefined && form.errors.mobile != null
                ? "bottom-[65px]"
                : "bottom-[45px]"
            }  ml-[2px]`}
          />

          <div className="w-full flex justify-between items-center flex-wrap-reverse">
            <Button
              mt="sm"
              onClick={() => router.back()}
              className="!rounded-[6px] !border-solid  !w-[49%] !border-1 !border-blue-600 !bg-[#FFF] !text-[#0073C6] md:!w-[100%] md:!max-w-[178px]  "
            >
              <BackSvg /> Back
            </Button>
            <Button
              loading={status === "pending"}
              type="submit"
              mt="sm"
              className="!rounded-[6px] !w-[49%] md:!w-[100%]  md:!max-w-[225px] !bg-[#0c7aca]"
            >
              CONTINUE
            </Button>
          </div>
        </form>
      )}

      <AuthPopup
        callback={OtpCallback}
        opened={opened}
        open={open}
        close={onClose}
        userName={""}
        mobile={form.values.mobile && form.values.mobile}
      />
    </div>
  );
}

export default ForgotForm;
