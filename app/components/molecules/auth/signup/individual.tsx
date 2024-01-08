"use client";
import { useForm, yupResolver } from "@mantine/form";
import {
  NumberInput,
  TextInput,
  Button,
  Box,
  PasswordInput,
} from "@mantine/core";
import useAuth from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthPopup from "../authPopup";
import { useDisclosure } from "@mantine/hooks";
import { individualSchema } from "@/app/validations/auth";
import CountryInput from "@/app/components/atoms/CountryInput";

function Individual() {
  const router = useRouter();
  const { register } = useAuth();
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: { name: "", email: "", password: "", mobile: 0 },
    validate: yupResolver(individualSchema),
  });
  const onSubmit = async (values: typeof form.values) => {
    const data = await register({ ...values, usertype: "I" });
    console.log(data);
    if (data.success) {
      open();
    }
  };

  const displayCountryCode = (value: any) => {
    console.log(value);
    // var countrycode = document.getElementById("isdCodes");
    // setIsdidValue(countrycode.options[countrycode.selectedIndex].text);
    // countrycode.options[countrycode.selectedIndex].text = countrycode.value;
  };

  // const openOtpBox = (open: any) => {
  //   console.log("otp Box");
  //   open();
  // };

  return (
    <Box className="w-full max-w-[423px] mt-[3%] " mx="auto">
      <div className="w-full max-w-[459px] md:max-w-[597px] flex justify-center items-center gap-[5%] mb-[5%] ">
        <Link
          href="/login"
          className="whitespace-nowrap text-[26px] font-[500] text-[#666]"
        >
          Log In
        </Link>

        <Link
          href="/register"
          className="whitespace-nowrap text-[26px] text-[#148B16] font-bold border-solid border-b-2 border-green-600"
        >
          Individual Sign Up
        </Link>
      </div>
      <form
        onSubmit={form.onSubmit(onSubmit)}
        className="w-[100%] flex justify-center items-center flex-col"
      >
        <TextInput
          size="md"
          label="Full Name"
          className="w-[100%] mb-[3%] "
          placeholder="Full Name"
          {...form.getInputProps("name")}
        />
        <TextInput
          mt="sm"
          size="md"
          className="w-[100%] mb-[3%] "
          label="Email"
          placeholder="Email"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          size="md"
          mt="sm"
          className="w-[100%] mb-[3%] "
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />
        <NumberInput
          hideControls
          size="md"
          mt="sm"
          className="w-[100%] mb-[3%] "
          label="Contact Number"
          placeholder="Contact Number"
          {...form.getInputProps("mobile")}
        />

        <CountryInput
          onSelect={displayCountryCode}
          className="focus:outline-none min-w-[30px] max-w-[70px] self-start relative bottom-[60px] ml-[2px]"
        />

        <div className="w-full flex justify-between items-center flex-wrap">
          <Button
            mt="sm"
            onClick={() => router.back()}
            className="!rounded-[6px] !border-solid !border-1 !border-blue-600 !bg-[#FFF] !text-[#0073C6] !w-[100%] !max-w-[178px]  "
          >
            Back
          </Button>
          <Button
            type="submit"
            mt="sm"
            className="!rounded-[6px] !w-[100%] !max-w-[225px] !bg-[#0c7aca]"
          >
            SAVE & VERIFY
          </Button>
        </div>

        <p className="text-[20px] font-[400] text-[#202020] mt-[5%]">
          Already have an Account ?{" "}
          <Link href="/login" className="text-[20px] font-[600] text-[#0073C6]">
            Log In
          </Link>
        </p>

        <Link
          href="/"
          className="text-[20px] font-[700] text-[#148B16] underline "
        >
          Continue Without Register
        </Link>
      </form>
      <AuthPopup
        opened={opened}
        open={open}
        close={close}
        userName={form.values.email}
      />
    </Box>
  );
}

export default Individual;
