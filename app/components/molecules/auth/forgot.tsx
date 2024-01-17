"use client";
import { useForm, yupResolver } from "@mantine/form";
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
import CountryInput from "../../atoms/CountryInput";
import S from "@/app/styles/Numinput.module.css";
import * as yup from "yup";
const schema = yup.object().shape({
  mobile: yup
    .number()
    .positive("Mobile number must be positive")
    .integer("Mobile number must be an integer")
    .typeError("Valid 10-digit contact number is required")
    .test(
      "len",
      "Mobile number must be exactly 10 digits",
      (val) => val?.toString().length === 10
    )
    .required("Mobile number is required"),
});
function ForgotForm() {
  const router = useRouter();
  const form = useForm({
    initialValues: { mobile: null },

    // functions will be used to validate values at corresponding key
    validate: yupResolver(schema),
  });
  const onSubmit = async (values: any) => {};
  const displayCountryCode = (value: any) => {
    console.log(value);
  };
  return (
    <Box mx="auto" className="w-full max-w-[423px] mt-[3%] ">
      <form
        onSubmit={form.onSubmit(onSubmit)}
        className="w-[100%] flex justify-center items-center flex-col "
      >
        <NumberInput
          classNames={{ input: S.input }}
          hideControls
          size="md"
          mt="sm"
          className="w-[100%] mb-[3%] rounded-[8px] bg-transparent shadow-md "
          label=""
          placeholder="Enter your registerd mobile number..."
          {...form.getInputProps("mobile")}
          maxLength={10}
        />
        <CountryInput
          onSelect={displayCountryCode}
          className={`focus:outline-none min-w-[30px] max-w-[70px] self-start relative ${
            form.errors.mobile != undefined && form.errors.mobile != null
              ? "bottom-[65px]"
              : "bottom-[45px]"
          }  ml-[2px]`}
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
            className="!rounded-[6px] !w-[100%] !max-w-[225px] "
          >
            Continue
          </Button>
        </div>
      </form>
    </Box>
  );
}

export default ForgotForm;
