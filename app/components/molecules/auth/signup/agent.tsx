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
import handleTrimAndReplace from "@/app/utils/input/validations";

function Agent() {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error" | "otp"
  >("idle");
  const [active, setActive] = useState(0);
  const router = useRouter();
  const { registerOtherDetails, register, login } = useAuth({
    type: "register",
  });

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
      prevEmail: "",
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
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });
  const OtpCallback = () => {
    close();
    form.setValues({
      otp: true,
      prevMobile: form.values.mobile as unknown as number,
      prevEmail: form.values.email as unknown as string,
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
      if (
        form.values.otp &&
        form.values.mobile === form.values.prevMobile &&
        form.values.email === form.values.prevEmail
      ) {
        // If OTP is already verified and mobile number is the same, move to the next step
        setActive(1);
      } else {
        // If OTP is not verified or mobile number has changed, make the API call
        setStatus("pending");
        //@ts-ignore
        let data = await register({ ...values, usertype: "A" });
        console.log(data);
        if (data?.status) {
          setStatus("otp");
          open();
        } else {
          if (data.flag === "m") {
            setStatus("error");
          } else {
            setStatus("idle");
          }
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
      {active !== 2 && (
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
      )}

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
        mt={"xs"}
        size="xs"
        className="w-full"
        // @ts-ignore
        styles={styles}
        classNames={{
          root: StepCss.root,
          steps: active === 2 ? StepCss.rootSuccess : StepCss.steps,
          step: StepCss.step,
          separator: StepCss.separatorForAgent,
          stepLabel: StepCss.steplabelCommonForAll,
          content: StepCss.content,
        }}
        // styles={styles}
      >
        <Stepper.Step
          label="Personal Details"
          icon={<StepperDotGreen className={StepCss.stepperIcon} />}
          classNames={{
            stepLabel:
              active === 0
                ? StepCss.stepLabelActive
                : active > 0
                ? StepCss.stepLabelDone
                : StepCss.stepLabel,
            stepIcon: active === 0 ? StepCss.stepIcon : "",
          }}
        >
          <TextInput
            required
            size="lg"
            label="Full Name"
            placeholder="Enter your name here"
            {...form.getInputProps("userName")}
            onBlur={(e) => handleTrimAndReplace(e, "userName", form)}
            classNames={{
              root: StepCss.inputRoot,
              input: StepCss.textInput,
              error: StepCss.errorMsg,
            }}
          />
          <TextInput
            required
            size="lg"
            mt="sm"
            label="Email"
            placeholder="Enter your email here"
            {...form.getInputProps("email")}
            onBlur={(e) => handleTrimAndReplace(e, "email", form)}
            classNames={{
              root: StepCss.inputRoot,
              input: StepCss.textInput,
              error: StepCss.errorMsg,
            }}
          />
          <PasswordInput
            required
            classNames={{
              visibilityToggle: S.visibilityToggle,
              root: StepCss.inputRoot,
              innerInput: StepCss.textInput,
              input: StepCss.textInput,
              error: StepCss.errorMsg,
            }}
            size="lg"
            mt={"xs"}
            label="Password"
            placeholder="Enter your password here"
            {...form.getInputProps("password")}
            visibilityToggleIcon={({ reveal }) =>
              reveal ? <EyeOpen /> : <EyeClosed />
            }
            onBlur={(e) => handleTrimAndReplace(e, "password", form)}
          />
          <NumberInput
            leftSection={
              <span className="text-[#212c33] font-medium">+91</span>
            }
            required
            hideControls
            size="lg"
            mt={"xs"}
            className="w-[100%] mb-[3%] "
            label="Contact Number"
            placeholder="Enter your contact number"
            {...form.getInputProps("mobile")}
            error={
              form.errors.mobile ||
              (status === "error" &&
                "Provided number is already registered with us")
            }
            onChange={(e) => {
              form.setFieldValue("mobile", e as any);
              if (status === "error") {
                setStatus("idle");
              }
            }}
            classNames={{
              root: StepCss.inputRoot,
              input: N.classForContact,
              error: StepCss.errorMsg,
            }}
            maxLength={10}
            allowDecimal={false}
            onPaste={(event) => {
              const pastedText = event.clipboardData.getData("text/plain");
              const trimmedText = pastedText.replace(/\s/g, "");
              const first10Digits = trimmedText.replace(/\D/g, "").slice(0, 10);
              form.setFieldValue("mobile", first10Digits as any);
            }}
          />
          {/* <div className="min-w-[30px] !max-w-[75px] flex justify-center items-center ">
            <CountryInput
              onSelect={displayCountryCode}
              className={`focus:outline-none min-w-[30px] !max-w-[75px] relative ${
                (form.errors.mobile != undefined &&
                  form.errors.mobile != null) ||
                status === "error"
                  ? "bottom-[65px]"
                  : "bottom-[45px]"
              }  ml-[2px]`}
            />
          </div> */}
        </Stepper.Step>

        <Stepper.Step
          label="Address & Others"
          icon={active > 0 ? <StepperDotGreen /> : <StepperDotGray />}
          classNames={{
            stepLabel: active > 1 ? StepCss.stepLabelActive : StepCss.stepLabel,
            stepIcon: active > 1 ? StepCss.stepIconActive : StepCss.stepIcon,
          }}
        >
          <TextInput
            required
            size="lg"
            label="Office Address"
            placeholder="Enter your office address here"
            {...form.getInputProps("address")}
            classNames={{
              root: StepCss.inputRoot,
              input: StepCss.textInput,
              error: StepCss.errorMsg,
            }}
            onBlurCapture={(e) => handleTrimAndReplace(e, "address", form)}
          />
          <TextInput
            required
            size="lg"
            mt={"xs"}
            label="Company Name"
            placeholder="Enter your company name here"
            {...form.getInputProps("companyName")}
            classNames={{
              root: StepCss.inputRoot,
              input: StepCss.textInput,
              error: StepCss.errorMsg,
            }}
            onBlurCapture={(e) => handleTrimAndReplace(e, "companyName", form)}
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
      {active === 0 && (
        <>
          <p className="md:text-xl font-[400] text-[#202020] mt-[5%]">
            Already have an Account ?{" "}
            <Link
              href="/login"
              className="md:text-xl font-[600] text-[#0073C6]"
            >
              Log In
            </Link>
          </p>

          <Link
            href="/"
            className="md:text-xl font-[700] text-[#148B16] underline "
          >
            Continue Without Register
          </Link>
        </>
      )}
    </div>
  );
}

export default Agent;
