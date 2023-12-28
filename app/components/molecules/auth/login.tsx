import { useForm } from "@mantine/form";
import {
  NumberInput,
  TextInput,
  Button,
  Box,
  PasswordInput,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";

function Login() {
  const router = useRouter();
  const form = useForm({
    initialValues: { username: "", password: "" },

    // functions will be used to validate values at corresponding key
    validate: {
      username: (value) => (value.length < 2 ? "User name is required" : null),
      password: (value) => (value.length < 1 ? "Password is required" : null),
    },
  });
  const { login } = useAuth();
  const onSubmit = async (values: any) => {
    login(values);
  };

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          label="User Name"
          placeholder="Name"
          {...form.getInputProps("username")}
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
