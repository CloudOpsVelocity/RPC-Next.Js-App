"use client";
import { useForm, yupResolver } from "@mantine/form";
import {
  TextInput,
  Button,
  Box,
  PasswordInput,
  NumberInput,
  em,
} from "@mantine/core";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CountryInput from "../../atoms/CountryInput";
import S from "@/app/styles/Numinput.module.css";
import * as yup from "yup";
import { useState } from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import AuthPopup from "./authPopup";
import { resendOtp, resetPasswordApi } from "@/app/utils/auth";
import { BackSvg, EyeClosed, EyeOpen } from "@/app/images/commonSvgs";
import Image from "next/image";
import { forgetPasswordLockImg } from "@/app/images/commonImages";
import { signIn } from "next-auth/react";
import ForgotAuthPopup from "../../atoms/ForgotPopup";
import handleTrimAndReplace from "@/app/utils/input/validations";
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
    "idle" | "pending" | "success" | "error" | "otp" | "form"
  >("idle");
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const form = useForm({
    initialValues: { mobile: null, otp: false },
    validate: yupResolver(schema),
    validateInputOnChange: true,
    validateInputOnBlur: true,
  });
  const onSubmit = async (values: any) => {
    setStatus("pending");
    const data = await resendOtp(values.mobile);
    if (data?.status) {
      setStatus("otp");
      open();
    }
    setStatus("idle");
  };

  const onClose = () => {
    setStatus("idle");
    close();
  };
  const OtpCallback = async () => {
    form.setFieldValue("otp", true);
    close();
  };

  return (
    <div
      className={clsx(
        "w-[100%]   flex justify-center items-center flex-col  mt-[3%] p-[10%] md:p-[2%]",
        status === "success" ? "max-w-[90%]" : "max-w-[459px]"
      )}
    >
      {status === "success" ? (
        <ForgotSucess />
      ) : form.values.otp ? (
        <Form status={status} setStatus={setStatus} />
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
            leftSection={
              <span className="text-[#212c33] font-medium">+91</span>
            }
            classNames={{
              input: S.classForContact,
              error: S.errorMsg,
            }}
            hideControls
            size="lg"
            mt="sm"
            className="w-[100%] mb-[3%] rounded-[8px] bg-transparent "
            label=""
            placeholder="Enter Registerd Mobile Number..."
            {...form.getInputProps("mobile")}
            maxLength={10}
            allowDecimal={false}
            onPaste={(event) => {
              const pastedText = event.clipboardData.getData("text/plain");
              const trimmedText = pastedText.replace(/\s/g, "");
              const first10Digits = trimmedText.replace(/\D/g, "").slice(0, 10);
              form.setFieldValue("mobile", first10Digits as any);
            }}
          />
          {/* <div className="min-w-[30px] self-start !max-w-[75px] flex justify-center items-center ">
            <CountryInput
              onSelect={displayCountryCode}
              className={`focus:outline-none min-w-[30px] !max-w-[75px] relative ${
                (form.errors.mobile != undefined &&
                  form.errors.mobile != null) ||
                status === "error"
                  ? "bottom-[71px]"
                  : "bottom-[47px]"
              }  ml-[2px]`}
            />
          </div> */}

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

      <ForgotAuthPopup
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
import StepCss from "@/app/styles/Stepper.module.css";
import ForgotSucess from "./complete/page";
import clsx from "clsx";
const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at-least 6 digits")
    .required("New password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password not matched")
    .required("Re- enter password is required"),
});
const Form = ({ status, setStatus }: any) => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validate: yupResolver(validationSchema),
    validateInputOnBlur: true,
    clearInputErrorOnChange: true,
  });
  const onSubmit = async (values: any) => {
    const data = await resetPasswordApi(values.password);
    // router.push("/login");
    setStatus("success");
  };
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return (
    <div className="w-full">
      <form
        onSubmit={form.onSubmit(onSubmit)}
        className="w-[100%] flex justify-center items-center flex-col "
      >
        <h2
          className={`whitespace-nowrap text-2xl font-bold text-[#148B16] text-center mt-3 mb-10`}
        >
          Reset Password
        </h2>
        <PasswordInput
          required
          size="lg"
          className="w-[100%] mb-[3%]"
          mt="sm"
          label="Enter New Password"
          placeholder="Enter Your Password"
          visibilityToggleIcon={({ reveal }) =>
            reveal ? <EyeOpen /> : <EyeClosed />
          }
          {...form.getInputProps("password")}
          onBlurCapture={(e) => handleTrimAndReplace(e, "password", form)}
          type="text"
          classNames={{
            root: StepCss.inputRoot,
            error: StepCss.errorMsg,
            innerInput: StepCss.textInput,
          }}
        />
        <PasswordInput
          required
          size="lg"
          className="w-[100%] mb-[3%]"
          mt="sm"
          label="Re-Enter New Password"
          placeholder="Enter Your Password"
          visibilityToggleIcon={({ reveal }) =>
            reveal ? <EyeOpen /> : <EyeClosed />
          }
          {...form.getInputProps("confirmPassword")}
          onBlurCapture={(e) =>
            handleTrimAndReplace(e, "confirmPassword", form)
          }
          type="text"
          classNames={{
            root: StepCss.inputRoot,
            error: StepCss.errorMsg,
            innerInput: StepCss.textInput,
          }}
        />

        <Button
          type="submit"
          size={isMobile ? "compact-xs" : "md"}
          className="!w-[100%] !h-[57px] mt-[4%] !bg-[#0c7aca] rounded-[6px] text-[20px]"
        >
          Update Password
        </Button>
      </form>
    </div>
  );
};
