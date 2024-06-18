"use client";
import S from "@/app/styles/Numinput.module.css";
import P from "@/app/styles/Pass.module.css";
import { useForm, yupResolver } from "@mantine/form";
import {
  NumberInput,
  TextInput,
  Button,
  Box,
  PasswordInput,
} from "@mantine/core";
import useAuth from "@/app/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AuthPopup from "../authPopup";
import { useDisclosure } from "@mantine/hooks";
import { individualSchema } from "@/app/validations/auth";
import CountryInput from "@/app/components/atoms/CountryInput";
import { useState } from "react";
import Success from "../success";
import { BackSvg, EyeClosed, EyeOpen } from "@/app/images/commonSvgs";
import handleTrimAndReplace from "@/app/utils/input/validations";
import StepCss from "@/app/styles/Stepper.module.css";
import clsx from "clsx";
import {
  getQueryParam,
  getQueryParamClient,
} from "@/app/hooks/custom/useRedirect";
import LoginSignupTabs from "@/app/(auth)/Components/LoginSignup";

function Individual() {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error" | "otp"
  >("idle");
  const router = useRouter();
  const { register, login } = useAuth({ type: "register" });
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: { name: "", email: "", password: "", mobile: null },
    validate: yupResolver(individualSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });
  const onSubmit = async (values: typeof form.values) => {
    setStatus("pending");
    const data = await register({ ...values, usertype: "I" });
    if (data?.status) {
      setStatus("otp");
      open();
    } else {
      if (data.flag === "m") {
        setStatus("error");
      } else if (data.flag === "e") {
        form.setFieldError("email", "Email already registered with us.");
        setStatus("idle");
      } else {
        setStatus("idle");
      }
    }
  };

  const displayCountryCode = (value: any) => {
    console.log(value);
  };
  const onClose = () => {
    setStatus("idle");
    close();
  };
  const OtpCallback = async () => {
    const data = await login({
      password: form.values.password,
      username: form.values.mobile as unknown as string,
    });
    form.reset();
    setStatus("success");
    close();
  };
  const queryParam = getQueryParamClient();
  return (
    <>
      {status === "success" ? (
        <Success />
      ) : (
        <>
          <Box className="w-full max-w-[423px] mt-[3%] " mx="auto">
            <div className=" sm:max-w-[459px] md:max-w-[597px] flex justify-center items-center gap-[15%] mb-[5%] ">
              <LoginSignupTabs
                searchParams={queryParam.query}
                state="signup"
                singupText="Individual Sign Up"
                className="!px-[14px]"
              />
              {/* <Link
                href={{
                  pathname: "/login",
                  search: queryParam.query,
                }}
                className="whitespace-nowrap  text-xl md:text-[26px] font-[500] text-[#666]"
              >
                Log In
              </Link>

              <Link
                href={{
                  pathname: "/register",
                  search: queryParam.query,
                }}
                className="whitespace-nowrap text-xl md:text-[26px] text-[#148B16] font-bold border-solid border-b-2 border-green-600"
              >
                Individual Sign Up
              </Link> */}
            </div>
            <form
              onSubmit={form.onSubmit(onSubmit)}
              className="w-[100%] flex flex-col"
            >
              <TextInput
                required
                mt={"xs"}
                size="lg"
                className="w-[100%] mb-[3%] "
                label="Your Name"
                placeholder="Enter your name here"
                {...form.getInputProps("name")}
                onBlur={(e) => handleTrimAndReplace(e, "name", form)}
                classNames={{
                  root: StepCss.inputRoot,
                  input: StepCss.textInput,
                  error: StepCss.errorMsg,
                }}
              />
              <TextInput
                type="email"
                required
                size="lg"
                mt="xs"
                label="Email"
                placeholder="Enter your email here"
                {...form.getInputProps("email")}
                onBlur={(e) => handleTrimAndReplace(e, "email", form)}
                classNames={{
                  root: StepCss.inputRoot,
                  input: StepCss.textInput,
                  error: StepCss.errorMsg,
                }}
                mb={"3%"}
              />
              <PasswordInput
                mt={"xs"}
                classNames={{
                  visibilityToggle: P.visibilityToggle,
                  root: StepCss.inputRoot,
                  input: StepCss.textInput,
                  innerInput: StepCss.textInput,
                  error: StepCss.errorMsg,
                }}
                required
                size="lg"
                className="w-[100%] mb-[3%] "
                label="Password"
                placeholder="Enter your password"
                visibilityToggleIcon={({ reveal }) =>
                  reveal ? <EyeOpen /> : <EyeClosed />
                }
                {...form.getInputProps("password")}
                onBlur={(e) => handleTrimAndReplace(e, "password", form)}
              />
              <NumberInput
                leftSection={
                  <span className="text-[#212c33] font-medium">+91</span>
                }
                mt={"xs"}
                required
                classNames={{
                  root: StepCss.inputRoot,
                  input: S.classForContact,
                  error: StepCss.errorMsg,
                }}
                hideControls
                size="lg"
                className={clsx(
                  "w-[100%] mb-[3%] ",
                  status === "error" && "!mb-[2px]"
                )}
                label="Contact Number"
                placeholder="Enter your contact number"
                {...form.getInputProps("mobile")}
                error={form.errors.mobile || status === "error"}
                onChange={(e) => {
                  form.setFieldValue("mobile", e as any);
                  if (status === "error") {
                    setStatus("idle");
                  }
                }}
                allowDecimal={false}
                maxLength={10}
                onPaste={(event) => {
                  if (status === "error") {
                    setStatus("idle");
                  }
                  const pastedText = event.clipboardData.getData("text/plain");
                  const trimmedText = pastedText.replace(/\s/g, "");
                  const first10Digits = trimmedText
                    .replace(/\D/g, "")
                    .slice(0, 10);
                  form.setFieldValue("mobile", first10Digits as any);
                }}
              />
              {status === "error" && (
                <p className=" text-right text-[color:var(--Mandatory,#F00)] text-[15px] italic font-medium leading-[normal]">
                  Account already exists. Kindly use{" "}
                  <Link
                    href={{ pathname: "/login", search: queryParam.query }}
                    className="text-[#0073C6] text-[15px] italic font-bold leading-[normal] underline"
                  >
                    Login
                  </Link>{" "}
                  below
                </p>
              )}

              {/* <div className="min-w-[30px] !max-w-[75px] flex justify-center items-center ">
                <CountryInput
                  onSelect={displayCountryCode}
                  className={`focus:outline-none min-w-[30px] !max-w-[75px] relative ${
                    (form.errors.mobile != undefined &&
                      form.errors.mobile != null) ||
                    status === "error"
                      ? "bottom-[65px]"
                      : "bottom-[45px]"
                  }  ml-[2px]`}
                />
              </div> */}

              <div className="w-full flex justify-between items-center flex-wrap-reverse">
                <Button
                  mt="sm"
                  onClick={() => router.back()}
                  className="!rounded-[6px] !border-solid  !w-[49%] !border-1 !border-blue-600 !bg-[#FFF] !text-[#0073C6] lg:!w-[100%] md:!max-w-[178px]  "
                >
                  <BackSvg /> Back
                </Button>
                <Button
                  loading={status === "pending"}
                  type="submit"
                  mt="sm"
                  className="!rounded-[6px] !w-[49%] md:!w-[100%]  md:!max-w-[225px] !bg-[#0c7aca]"
                >
                  SAVE & VERIFY
                </Button>
              </div>

              <Link
                href={{ pathname: "/login", search: queryParam.query }}
                className="text-[#282828] md:text-xl flex justify-center items-center gap-2.5 rounded border p-2 border-solid border-[#B2B2B2] mb-3 mt-[5%]"
              >
                Already have an Account ?{" "}
                <span className="md:text-xl  text-[#002749] text-xl not-italic font-semibold">
                  Log In
                </span>
              </Link>
              {status === "error" && (
                <p className="text-center text-[#556477] text-xl not-italic font-medium leading-[normal] mt-3 mb-[21px]">
                  Forget Password?{" "}
                  <Link
                    href={{ pathname: "/forgot", search: queryParam.query }}
                    className="text-[color:var(--Brand-green-primary,#148B16)] text-xl not-italic font-medium leading-[normal] underline"
                  >
                    Reset
                  </Link>
                </p>
              )}

              <Link
                href={{ pathname: queryParam.rediectPath }}
                className="text-center md:text-xl not-italic text-[#0C7ACA] text-xl   font-semibold leading-[normal] underline "
              >
                Continue without Register
              </Link>
            </form>
          </Box>
        </>
      )}

      <AuthPopup
        callback={OtpCallback}
        opened={opened}
        open={open}
        close={onClose}
        userName={form.values.email}
        mobile={form.values.mobile && form.values.mobile}
      />
    </>
  );
}

export default Individual;
