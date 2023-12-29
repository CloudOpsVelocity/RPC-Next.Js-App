import { useForm } from "@mantine/form";
import { TextInput, Button, Box, PasswordInput } from "@mantine/core";
import useAuth from "@/app/hooks/useAuth";

function Login() {
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
    <Box maw={420} mx="auto">
      <form
        onSubmit={form.onSubmit(onSubmit)}
        className="w-[100%] flex justify-center items-center flex-col "
      >
        <TextInput
          size="md"
          className="w-[100%] mb-[3%] "
          label="User Name"
          placeholder="Name"
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

        <p className="text-[14px] font-400 text-[#767270] text-left w-full cursor-pointer ">
          Forgot Password ?
        </p>

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
