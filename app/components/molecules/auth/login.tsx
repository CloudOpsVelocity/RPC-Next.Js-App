"use client";
import { useForm, yupResolver } from "@mantine/form";
import { Button, Box, PasswordInput, em, NumberInput } from "@mantine/core";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";
import * as yup from "yup";
import { EyeClosed, EyeOpen } from "@/app/images/commonSvgs";
import { useMediaQuery } from "@mantine/hooks";
import handleTrimAndReplace, {
  handleAllTrimAndReplace,
} from "@/app/utils/input/validations";
import StepCss from "@/app/styles/Stepper.module.css";
import {
  getCallPathServer,
  getQueryParam,
} from "@/app/hooks/custom/useRedirect";
const schema = yup.object().shape({
  username: yup
    .number()
    .positive("Mobile number must be positive")
    .integer("Mobile number must be an integer")
    .test(
      "len",
      "Mobile number should be 10 digit",
      (val) => val?.toString().length === 10
    )
    .required("Mobile number is required")
    .typeError("Mobile number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Login({ params }: any) {
  const [state, setState] = useState<"idle" | "pending" | "success">("idle");
  const form = useForm({
    initialValues: { username: "", password: "" },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const { login } = useAuth({ type: "login" });
  const onSubmit = async (values: any) => {
    setState("pending");
    login(values);
    setState("success");
  };
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return (
    <Box maw={420} mx="auto">
      <form
        onSubmit={form.onSubmit(onSubmit)}
        className="w-[100%] flex justify-center items-center flex-col "
      >
        <NumberInput
          mt={"xs"}
          required
          classNames={{
            root: StepCss.inputRoot,
            input: StepCss.textInput,
            error: StepCss.errorMsg,
            label:StepCss.custlabelOfNum,
          }}
          hideControls
          size="lg"
          className="w-[100%]  mb-[3%] "
          label="Mobile Number"
          placeholder="Enter Your Mobile Number"
          {...form.getInputProps("username")}
          maxLength={10}
          allowDecimal={false}
          onPaste={(event) => {
            const pastedText = event.clipboardData.getData("text/plain");
            const trimmedText = pastedText.replace(/\s/g, "");
            const first10Digits = trimmedText.replace(/\D/g, "").slice(0, 10);
            form.setFieldValue("username", first10Digits);
          }}
        />

        <PasswordInput
          classNames={{
            root: StepCss.inputRoot,
            error: StepCss.errorMsg,
            innerInput: StepCss.textInput,
            label:StepCss.custlabelOfNum,
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
          onBlurCapture={(e) => handleTrimAndReplace(e, "password", form)}
        />

        <Link
          href={{ pathname: "/forgot", search: getQueryParam(params) }}
          className="text-[#0C7ACA] text-sm not-italic font-semibold mb-[2%]  w-full cursor-pointer "
        >
          Forgot Password ?
        </Link>

        <Button
          loading={state === "pending"}
          type="submit"
          size={isMobile ? "compact-xs" : "md"}
          className="!w-[100%] !h-[50px]  mt-[4%] !bg-[#0c7aca] rounded-[6px] !text-[20px] sm:h-[57px] !font-extrabold:"
        >
          LOGIN
        </Button>
        <div className="text-center mt-6 ">
          <Link
            href={{ pathname: "/register", search: getQueryParam(params) }}
            className="text-[#282828] md:text-xl flex justify-center font-semibold items-center gap-2.5 rounded border p-2 border-solid border-[#B2B2B2] mb-8 text-nowrap sm:!text-[20px] "
          >
            New User?{" "}
            <span className="md:text-xl  text-[#0C7ACA]  font-semibold text-xl not-italic text-nowrap sm:!text-[20px]  ">
              Create an account
            </span>
          </Link>
          <Link
            href={{ pathname: getCallPathServer(params) }}
            className=" md:text-xl not-italic text-[#148B16] font-semibold !text-18px   leading-[normal] b sm:!text-[16px] sm:font-[400] border rounded-sm p-2 border-solid border-[#148B16]"
          >
            Continue without login
          </Link>
        </div>
      </form>
    </Box>
  );
}

export default Login;
