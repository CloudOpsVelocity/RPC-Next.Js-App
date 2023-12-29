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
import { useRouter } from "next/navigation";

function ForgotForm() {
  const router = useRouter();
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
          size="md"
          mt="sm"
          className="w-[100%] mb-[3%]"
          label="Contact Number"
          placeholder="Contact Number"
          {...form.getInputProps("mobile")}
        />
        <div className="w-full flex justify-between items-center flex-wrap">
          <Button
            mt="sm"
            onClick={() => router.back()}
            className="!rounded-[6px] !border-solid !border-1 !border-blue-600 !bg-[#FFF] !text-[#0073C6] !w-[100%] !max-w-[178px]  "
          >
            Back
          </Button>
          <Button mt="sm" className="!rounded-[6px] !w-[100%] !max-w-[225px] ">
            Continue
          </Button>
        </div>
      </form>
    </Box>
  );
}

export default ForgotForm;
