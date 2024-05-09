"use client";
import { useForm, yupResolver } from "@mantine/form";
import {
  TextInput,
  Button,
  Box,
  PasswordInput,
  em,
  NumberInput,
} from "@mantine/core";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";
import * as yup from "yup";
import S from "@/app/styles/Pass.module.css";
import { EyeClosed, EyeOpen } from "@/app/images/commonSvgs";
import { useMediaQuery } from "@mantine/hooks";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import handleTrimAndReplace from "@/app/utils/input/validations";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import CryptoJS from "crypto-js";
import usePathToOrigin from "@/app/hooks/custom/useRedirect";
import StepCss from "@/app/styles/Stepper.module.css";

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
type Action = {
  username: string;
  password: string;
};
interface Login {
  username: string | number;
  password: string;
}
function LoginPopupForm({ closePopup }: { closePopup?: () => void }) {
  const [opened, { close }] = usePopShortList();

  const [state, setState] = useState<"idle" | "pending" | "success">("idle");
  const form = useForm({
    initialValues: { username: "", password: "" },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });
  const loginWithCredentials = async (data: Login): Promise<any> => {
    const encryptedPassword = CryptoJS.AES.encrypt(
      data.password,
      process.env.NEXT_PUBLIC_SECRET!!
    ).toString();
    const requestData = {
      username: data.username,
      password: encryptedPassword,
    };
    const res = await signIn("credentials", {
      ...requestData,
      redirect: false,
    });
    if (res?.ok) {
      close();
    } else {
      const errorsParam =
        res?.error === "Please enter correct password"
          ? "password"
          : "username";
      form.setErrors({
        [errorsParam]: res?.error || "Something went wrong. Please try again.",
      });
      toast.error(res?.error || "Something went wrong. Please try again.");
    }
  };

  const login = async (data: Action) => {
    loginWithCredentials({
      username: data.username,
      password: data.password,
    });
  };
  const onSubmit = async (values: any) => {
    setState("pending");
    await login(values);
    setState("success");
  };
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const { redirectQueryParam } = usePathToOrigin();
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
          }}
          hideControls
          size="lg"
          className="w-[100%] mb-[3%] "
          label="Mobile Number"
          placeholder="Enter Your Registered Mobile Number"
          {...form.getInputProps("username")}
          maxLength={10}
        />
        <PasswordInput
          classNames={{
            root: StepCss.inputRoot,
            error: StepCss.errorMsg,
            innerInput: StepCss.textInput,
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
          onBlur={(e) => handleTrimAndReplace(e, "password", form)}
        />

        <Link
          href={{
            pathname: "/forgot",
            search: redirectQueryParam,
          }}
          onClick={closePopup && closePopup}
          className="text-[14px] font-medium text-[#767270]  w-full cursor-pointer "
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
              href={{
                pathname: "/register",
                search: redirectQueryParam,
              }}
              onClick={closePopup && closePopup}
              className="text-[#0C7ACA] md:text-xl not-italic font-bold leading-[normal]"
            >
              SIGN UP
            </Link>
          </p>
        </div>
      </form>
    </Box>
  );
}

export default LoginPopupForm;
