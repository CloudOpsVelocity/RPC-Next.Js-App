"use client";
import { useForm, yupResolver } from "@mantine/form";
import { TextInput, Button, Box, PasswordInput } from "@mantine/core";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";
import * as yup from "yup";
import S from "@/app/styles/Pass.module.css";
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

  return (
    <Box maw={420} mx="auto">
      <form
        onSubmit={form.onSubmit(onSubmit)}
        className="w-[100%] flex justify-center items-center flex-col "
      >
        <TextInput
          required
          size="md"
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
          size="md"
          className="w-[100%] mb-[3%]"
          mt="sm"
          label="Password"
          placeholder="Password"
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
          className="!w-[100%] !h-[57px] mt-[4%] !bg-[#0c7aca] rounded-[6px] text-[20px]"
        >
          LOGIN
        </Button>
        <div className="text-center mt-2">
          <p className="text-sm">
            Don`&apos;t have an Account?{" "}
            <Link
              href={"/register"}
              className="inline-flex items-center justify-center rounded-md text-sm  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 px-4 py-2 text-[#0C7ACA] hover:underline font-bold"
            >
              SIGN UP
            </Link>
          </p>
          <Link
            href={"/"}
            className="text-sm mt-2 text-[#148B16]  underline cursor-pointer"
          >
            Continue without register.
          </Link>
        </div>
      </form>
    </Box>
  );
}

export default Login;
