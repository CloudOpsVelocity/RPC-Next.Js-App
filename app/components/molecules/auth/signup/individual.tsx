"use client";
import { useForm } from "@mantine/form";
import {
  NumberInput,
  TextInput,
  Button,
  Box,
  PasswordInput,
} from "@mantine/core";
import useAuth from "@/app/hooks/useAuth";

function Individual() {
  const { register } = useAuth();
  const form = useForm({
    initialValues: { name: "", email: "", password: "", mobile: 0 },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? "Full name is required" : null),
      email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !value.match(emailRegex) ? "Valid email is required" : null;
      },
      password: (value) => (value.length < 1 ? "Password is required" : null),
      mobile: (value) =>
        isNaN(value) || value <= 0 ? "Valid mobile number is required" : null,
    },
  });
  const onSubmit = async (values: typeof form.values) => {
    const data = await register({ ...values, usertype: "I" });
    console.log(data);
  };
  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          label="Full Name"
          placeholder="Full Name"
          {...form.getInputProps("name")}
        />
        <TextInput
          mt="sm"
          label="Email"
          placeholder="Email"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          mt="sm"
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />
        <NumberInput
          mt="sm"
          label="Contact Number"
          placeholder="Contact Number"
          {...form.getInputProps("mobile")}
        />

        <Button type="submit" mt="sm">
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default Individual;
