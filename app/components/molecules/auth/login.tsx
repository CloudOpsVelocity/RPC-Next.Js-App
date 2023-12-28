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
      <form
        onSubmit={form.onSubmit(console.log)}
        className="w-[100%] flex justify-center items-center flex-col"
      >
        <TextInput
          className="w-[100%]"
          label="User Name"
          placeholder="Name"
          {...form.getInputProps("username")}
        />
        <PasswordInput
          className="w-[100%]"
          mt="sm"
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />

        <Button
          type="submit"
          className="!w-[100%] !h-[57px] !bg-[#0c7aca] rounded-[6px] mt-[10%] text-[20px"
        >
          LOGIN
        </Button>
      </form>
    </Box>
  );
}

export default Login;
