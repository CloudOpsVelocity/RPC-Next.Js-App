import { useForm } from "@mantine/form";
import {
  NumberInput,
  TextInput,
  Button,
  Box,
  PasswordInput,
} from "@mantine/core";

function Individual() {
  const form = useForm({
    initialValues: { fullname: "", email: "", password: "", contact: 0 },

    // functions will be used to validate values at corresponding key
    validate: {
      fullname: (value) => (value.length < 2 ? "Full name is required" : null),
      email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !value.match(emailRegex) ? "Valid email is required" : null;
      },
      password: (value) => (value.length < 1 ? "Password is required" : null),
      contact: (value) =>
        isNaN(value) || value <= 0 ? "Valid contact number is required" : null,
    },
  });

  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit(console.log)}>
        <TextInput
          label="Full Name"
          placeholder="Full Name"
          {...form.getInputProps("fullname")}
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
          {...form.getInputProps("contact")}
        />

        <Button type="submit" mt="sm">
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default Individual;
