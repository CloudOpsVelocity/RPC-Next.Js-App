import { useForm, yupResolver } from "@mantine/form";
import { TextInput, Button, Box, PasswordInput } from "@mantine/core";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("User name is required")
    .test(
      "is-valid-username",
      "Invalid username. Must be a valid email or a 10-digit mobile number",
      (value) => {
        // Check if the value is a valid email
        const isEmail = yup.string().email().isValidSync(value);

        // Check if the value is a 10-digit mobile number
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

    // functions will be used to validate values at corresponding key
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
          size="md"
          className="w-[100%] mb-[3%] "
          label="User Name"
          placeholder="Enter your email or mobiile number"
          {...form.getInputProps("username")}
        />
        <PasswordInput
          size="md"
          className="w-[100%] mb-[3%]"
          mt="sm"
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />

        <Link
          href={"/forgot"}
          className="text-[14px] font-400 text-[#767270] text-left w-full cursor-pointer "
        >
          Forgot Password ?
        </Link>

        <Button
          type="submit"
          className="!w-[100%] !h-[57px] mt-[4%] !bg-[#0c7aca] rounded-[6px] text-[20px]"
        >
          LOGIN
        </Button>
      </form>
    </Box>
  );
}

export default Login;
