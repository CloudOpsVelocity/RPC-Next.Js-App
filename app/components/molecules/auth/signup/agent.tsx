"use client";
import { useState } from "react";
import {
  Stepper,
  Button,
  Group,
  TextInput,
  PasswordInput,
  Code,
  NumberInput,
  rem,
} from "@mantine/core";
import N from "@/app/styles/Numinput.module.css";
import S from "@/app/styles/Pass.module.css";
import { useForm, yupResolver } from "@mantine/form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { styles } from "@/app/styles/Stepper";
import { DropZone } from "./dropzone";
import { useDisclosure } from "@mantine/hooks";
import AuthPopup from "../authPopup";
import useAuth from "@/app/hooks/useAuth";
import { actionAsyncStorage } from "next/dist/client/components/action-async-storage.external";
import Success from "../success";
import { agentSchema } from "@/app/validations/auth";
import CountryInput from "@/app/components/atoms/CountryInput";
import {
  BackSvg,
  EyeClosed,
  EyeOpen,
  StepperDotGray,
  StepperDotGreen,
  StepperIcon,
} from "@/app/images/commonSvgs";
import StepCss from "@/app/styles/Stepper.module.css";
import { registerOtherParser } from "@/app/utils/parse";

function Agent() {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error" | "otp"
  >("idle");
  const [active, setActive] = useState(1);
  const router = useRouter();
  const { registerOtherDetails, register, login } = useAuth();

  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      mobile: null,
      address: "",
      companyName: "",
      companyLogo: undefined,
      otp: false,
      prevMobile: 0,
    },
    // @ts-ignore
    validate: (values) => {
      if (active === 0) {
        const data = yupResolver(agentSchema)(values);
        return data;
      }

      if (active === 1) {
        return {
          address:
            values.address.trim().length < 2 ? "Address is required" : null,
          companyName:
            values.companyName.trim().length < 2
              ? "Company name is required"
              : null,
        };
      }

      return {};
    },
  });
  const OtpCallback = () => {
    close();
    form.setValues({
      otp: true,
      prevMobile: form.values.mobile as unknown as number,
    });
    setActive(1);
  };
  const nextStep = async () => {
    // Validate the form
    if (form.validate().hasErrors) {
      return;
    }

    // Handle API call based on the current step
    let values = form.values;
    if (active === 0) {
      if (form.values.otp && form.values.mobile === form.values.prevMobile) {
        // If OTP is already verified and mobile number is the same, move to the next step
        setActive(1);
      } else {
        // If OTP is not verified or mobile number has changed, make the API call
        setStatus("pending");
        //@ts-ignore
        let data = await register({ ...values, usertype: "A" });
        if (data?.status) {
          setStatus("otp");
          open();
        } else {
          setStatus("error");
        }
      }
    }
    if (active === 1) {
      if (!form.validate().hasErrors) {
        const data = await registerOtherDetails(
          registerOtherParser({ ...values })
        );
        await login({
          password: form.values.password,
          username: form.values.mobile as unknown as string,
        });

        console.log(data);
        setActive((current) => (current < 3 ? current + 1 : current));
      }
      // API call for the second step
      // Customize this based on your requirements
    } else if (active === 2) {
      // Proceed to the next step after the API call
      setActive((current) => (current < 3 ? current + 1 : current));
    }
  };
  type LogoFile = File | null;

  const handleLogoSelect = (logo: LogoFile): void => {
    // @ts-ignore
    form.setFieldValue("companyLogo", logo);
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const displayCountryCode = (value: any) => {
    console.log(value);
  };
  return (
    <div className="w-full max-w-[423px] flex justify-center items-center flex-col m-[2%] ">
      <div className=" sm:max-w-[459px] md:max-w-[597px] flex justify-center items-center gap-[15%] mb-[5%] ">
        <Link
          href="/login"
          className="whitespace-nowrap  text-xl md:text-[26px] font-[500] text-[#666]"
        >
          Log In
        </Link>

        <Link
          href="/register"
          className="whitespace-nowrap text-xl md:text-[26px] text-[#148B16] font-bold border-solid border-b-2 border-green-600"
        >
          Agent Sign Up
        </Link>
      </div>
      <AuthPopup
        mobile={form.values.mobile}
        callback={OtpCallback}
        opened={opened}
        open={open}
        close={close}
        userName={form.values.email}
      />
      <Stepper
        color="green"
        iconSize={24}
        active={active}
        mt={"sm"}
        className="w-full"
        // @ts-ignore
        classNames={{
          steps: StepCss.steps,
          step: StepCss.step,
          separator: StepCss.separator,
          root: status === "success" ? StepCss.rootSuccess : StepCss.root,
        }}
        // styles={styles}
      >
        <Stepper.Step
          icon={<StepperDotGreen />}
          label="Personal Details"
          classNames={{
            stepLabel:
              active === 0 ? StepCss.stepLabel : StepCss.stepLabelActive,
            stepIcon: active === 0 ? StepCss.stepIcon : "",
          }}
        >
          <TextInput
            required
            size="md"
            label="Full Name"
            placeholder="Enter your name here"
            {...form.getInputProps("userName")}
          />
          <TextInput
            type="email"
            required
            size="md"
            mt="sm"
            label="Email"
            placeholder="Enter your email here"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            required
            classNames={{
              visibilityToggle: S.visibilityToggle,
            }}
            size="md"
            mt="sm"
            label="Password"
            placeholder="Enter your password here"
            {...form.getInputProps("password")}
            visibilityToggleIcon={({ reveal }) =>
              reveal ? <EyeOpen /> : <EyeClosed />
            }
          />
          <NumberInput
            required
            classNames={{
              input: N.input,
            }}
            hideControls
            size="md"
            mt="sm"
            className="w-[100%] mb-[3%] "
            label="Contact Number"
            placeholder="Enter your contact number here"
            {...form.getInputProps("mobile")}
            maxLength={10}
            error={
              form.errors.mobile ||
              (status === "error" &&
                "Provided number is already registered with us")
            }
          />

          <CountryInput
            onSelect={displayCountryCode}
            className={`focus:outline-none min-w-[30px] max-w-[70px] self-start relative ${
              (form.errors.mobile != undefined && form.errors.mobile != null) ||
              status === "error"
                ? "bottom-[65px]"
                : "bottom-[45px]"
            }  ml-[2px]`}
          />
        </Stepper.Step>

        <Stepper.Step
          icon={active > 0 ? <StepperDotGreen /> : <StepperDotGray />}
          label="Address & Others"
          classNames={{
            stepLabel: active > 1 ? StepCss.stepLabelActive : StepCss.stepLabel,
            stepIcon: active > 1 ? StepCss.stepIconActive : StepCss.stepIcon,
          }}
        >
          <TextInput
            required
            size="md"
            label="Address"
            placeholder="Enter your address here"
            {...form.getInputProps("address")}
          />
          <TextInput
            required
            size="md"
            mt="md"
            label="Company Name"
            placeholder="Enter your company name here"
            {...form.getInputProps("companyName")}
          />
          <DropZone
            onLogoSelect={handleLogoSelect}
            logo={form.values.companyLogo}
          />
        </Stepper.Step>

        <Stepper.Completed>
          {/* Completed! Form values: */}
          <Success />
          {/* <Code block mt="xl">
            {JSON.stringify(form.values, null, 2)}
          </Code> */}
          {/* {(window.location.href = "http://localhost:3000/success")} */}
        </Stepper.Completed>
      </Stepper>

      <Group justify="flex-end" className="w-full">
        {active !== 2 && (
          <div className="w-[100%] flex justify-between items-center flex-wrap">
            <Button
              mt="sm"
              onClick={() => {
                active !== 0 ? prevStep() : router.back();
              }}
              className="!rounded-[6px] !border-solid  !w-[49%] !border-1 !border-blue-600 !bg-[#FFF] !text-[#0073C6] md:!w-[100%] md:!max-w-[178px] "
            >
              <BackSvg />
              Back
            </Button>

            <Button
              loading={status === "pending"}
              mt="sm"
              className="!rounded-[6px] !w-[49%] md:!w-[100%]  md:!max-w-[225px] !bg-[#0c7aca]"
              onClick={nextStep}
            >
              {active === 0 ? "SAVE & VERIFY" : "SAVE & CONTINUE"}
            </Button>
          </div>
        )}
      </Group>

      <p className="md:text-xl font-[400] text-[#202020] mt-[5%]">
        Already have an Account ?{" "}
        <Link href="/login" className="md:text-xl font-[600] text-[#0073C6]">
          Log In
        </Link>
      </p>

      <Link
        href="/"
        className="md:text-xl font-[700] text-[#148B16] underline "
      >
        Continue Without Register
      </Link>
    </div>
  );
}

export default Agent;
