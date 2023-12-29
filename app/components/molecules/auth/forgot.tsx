"use client";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Box,
  PasswordInput,
  NumberInput,
} from "@mantine/core";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";

function ForgotForm() {
  const form = useForm({
    initialValues: { contact: 0 },

    // functions will be used to validate values at corresponding key
    // validate: {
    //   contact: (value) => (value.length < 2 ? "User name is required" : null),
    // },
  });
  const { login } = useAuth();
  const onSubmit = async (values: any) => {
    login(values);
  };

  return (
    <Box maw={420} mx="auto">
      <form
        onSubmit={form.onSubmit(onSubmit)}
        className="w-[100%] flex justify-center items-center flex-col "
      >
        <NumberInput
          hideControls
          mt="sm"
          label="Contact Number"
          placeholder="Contact Number"
          {...form.getInputProps("mobile")}
        />
      </form>
    </Box>
  );
}

export default ForgotForm;
