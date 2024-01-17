"use client";
import { useForm, yupResolver } from "@mantine/form";
import { TextInput, Button, Box, PasswordInput, em } from "@mantine/core";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";
import * as yup from "yup";
import S from "@/app/styles/Pass.module.css";
import { EyeClosed, EyeOpen } from "@/app/images/commonSvgs";
import { useMediaQuery } from "@mantine/hooks";
const schema = yup.object().shape({
  username: yup
    .string()
    .required("User name is required")
    .test(
      "is-valid-username",
      "Invalid username. Must be a valid email or a 10-digit mobile number",
      (value) => {
        const isEmail = yup.string().email().isValidSync(value);
        const isMobileNumber = /^[0-9]{10}$/i.test(value);
        return isEmail || isMobileNumber;
      }
    ),
  password: yup.string().required("Password is required"),
});

function Login() {
  const [state, setState] = useState<"idle" | "pending" | "success">("idle");
  const form = useForm({
    initialValues: { username: "", password: "" },
    validate: yupResolver(schema),
  });
  const { login } = useAuth();
  const onSubmit = async (values: any) => {
    setState("pending");
    login(values);
    setState("success");
  };
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  console.log(isMobile);

  return (
    <Box maw={420} mx="auto">
      <form
        onSubmit={form.onSubmit(onSubmit)}
        className="w-[100%] flex justify-center items-center flex-col "
      >
        <TextInput
          required
          size="lg"
          className="w-[100%] mb-[3%] "
          label="User Name"
          placeholder="Enter your email or mobiile number"
          {...form.getInputProps("username")}
        />
        <PasswordInput
          classNames={{
            visibilityToggle: S.visibilityToggle,
          }}
          required
          size="lg"
          className="w-[100%] mb-[3%]"
          mt="sm"
          label="Password"
          placeholder="Enter Your Password"
          visibilityToggleIcon={({ reveal }) =>
            reveal ? <EyeOpen /> : <EyeClosed />
          }
          {...form.getInputProps("password")}
        />

        <Link
          href={"/forgot"}
          className="text-[14px] font-400 text-[#767270] text-right w-full cursor-pointer "
        >
          Forgot Password ?
        </Link>

        <Button
          loading={state === "pending"}
          type="submit"
          size={isMobile ? "compact-xs" : "md"}
          className="!w-[100%] !h-[57px] mt-[4%] !bg-[#0c7aca] rounded-[6px] text-[20px]"
        >
          LOGIN
        </Button>
        <div className="text-center mt-4 ">
          <p className="text-[#282828] md:text-xl not-italic font-normal leading-[normal] mb-3">
            Don&apos;t have an Account?{" "}
            <Link
              href={"/register"}
              className="text-[#0C7ACA] md:text-xl not-italic font-bold leading-[normal]"
            >
              SIGN UP
            </Link>
          </p>
          <Link
            href={"/"}
            className="text-[#148B16] md:text-xl not-italic font-medium leading-[normal] underline "
          >
            Continue without register
          </Link>
        </div>
      </form>
    </Box>
  );
}

export default Login;
