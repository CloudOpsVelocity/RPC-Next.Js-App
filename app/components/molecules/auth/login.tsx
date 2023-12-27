import { useForm } from "@mantine/form";
import {
  NumberInput,
  TextInput,
  Button,
  Box,
  PasswordInput,
} from "@mantine/core";

function Login() {
  const form = useForm({
    initialValues: { identifier: "", password: "", age: 0 },

    // functions will be used to validate values at corresponding key
    validate: {
      identifier: (value) =>
        value.length < 2 ? "User name is required" : null,
      password: (value) => (value.length < 1 ? "Password is required" : null),
    },
  });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit(console.log)}>
        <TextInput
          label="User Name"
          placeholder="Name"
          {...form.getInputProps("identifier")}
        />
        <PasswordInput
          mt="sm"
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />

        <Button type="submit" mt="sm">
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default Login;
