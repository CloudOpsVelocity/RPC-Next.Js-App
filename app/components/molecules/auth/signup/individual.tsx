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
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthPopup from "../authPopup";
import { useDisclosure } from "@mantine/hooks";
import { individualSchema } from "@/app/validations/auth";
import CountryInput from "@/app/components/atoms/CountryInput";
import { useState } from "react";
import Success from "../success";
import Login from "../login";
import { BackSvg, EyeClosed, EyeOpen } from "@/app/images/commonSvgs";
import handleTrimAndReplace from "@/app/utils/input/validations";

function Individual() {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error" | "otp"
  >("idle");
  const router = useRouter();
  const { register, login } = useAuth();
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: { name: "", email: "", password: "", mobile: null },
    validate: yupResolver(individualSchema),
  });
  const onSubmit = async (values: typeof form.values) => {
    setStatus("pending");
    const data = await register({ ...values, usertype: "I" });
    console.log({ data });
    if (data?.status) {
      setStatus("otp");
      open();
    } else {
      if (data.flag === "m") {
        setStatus("error");
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
  return (
    <>
      {status === "success" ? (
        <Success />
      ) : (
        <>
          <Box className="w-full max-w-[423px] mt-[3%] " mx="auto">
            <div className=" sm:max-w-[459px] md:max-w-[597px] flex justify-center items-center gap-[15%] mb-[5%] ">
              <Link
                href="/login"
                className="whitespace-nowrap  text-xl md:text-[26px] font-[500] text-[#666]"
              >
                Log In
              </Link>

              <Link
                href="/register"
                className="whitespace-nowrap text-xl md:text-[26px] text-[#148B16] font-bold border-solid border-b-2 border-green-600"
              >
                Individual Sign Up
              </Link>
            </div>
            <form
              onSubmit={form.onSubmit(onSubmit)}
              className="w-[100%] flex justify-center items-center flex-col"
            >
              <TextInput
                required
                mt={"xs"}
                size="lg"
                className="w-[100%] mb-[3%] "
                label="Full Name"
                placeholder="Enter your name here"
                {...form.getInputProps("name")}
                onBlur={(e) => handleTrimAndReplace(e, "name", form)}
              />
              <TextInput
                mt={"xs"}
                type="email"
                required
                size="lg"
                className="w-[100%] mb-[3%] "
                label="Email"
                placeholder="Enter your email here"
                {...form.getInputProps("email")}
                onBlur={(e) => handleTrimAndReplace(e, "email", form)}
              />
              <PasswordInput
                mt={"xs"}
                classNames={{
                  visibilityToggle: P.visibilityToggle,
                }}
                required
                size="lg"
                className="w-[100%] mb-[3%] "
                label="Password"
                placeholder="Enter your password here"
                visibilityToggleIcon={({ reveal }) =>
                  reveal ? <EyeOpen /> : <EyeClosed />
                }
                {...form.getInputProps("password")}
                onBlur={(e) => handleTrimAndReplace(e, "password", form)}
              />
              <NumberInput
                mt={"xs"}
                required
                classNames={{
                  input: S.classForContact,
                }}
                hideControls
                size="lg"
                className="w-[100%] mb-[3%] "
                label="Contact Number"
                placeholder="Enter your contact number here"
                {...form.getInputProps("mobile")}
                maxLength={10}
                error={
                  form.errors.mobile ||
                  (status === "error" &&
                    "Provided number is already registered with us")
                }
                onChange={(e) => {
                  form.setFieldValue("mobile", e as any);
                  if (status === "error") {
                    setStatus("idle");
                  }
                }}
              />

              <CountryInput
                onSelect={displayCountryCode}
                className={`focus:outline-none min-w-[30px] max-w-[70px] self-start relative ${
                  (form.errors.mobile != undefined &&
                    form.errors.mobile != null) ||
                  status === "error"
                    ? "bottom-[65px]"
                    : "bottom-[45px]"
                }  ml-[2px]`}
              />

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

              <p className="md:text-xl font-[400] text-[#202020] mt-[5%]">
                Already have an Account ?{" "}
                <Link
                  href="/login"
                  className="md:text-xl] font-[600] text-[#0073C6]"
                >
                  Log In
                </Link>
              </p>

              <Link
                href="/"
                className="md:text-xl font-[700] text-[#148B16] underline "
              >
                Continue Without Register
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
