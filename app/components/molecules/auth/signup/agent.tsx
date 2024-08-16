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
  FocusTrap,
} from "@mantine/core";
import N from "@/app/styles/Numinput.module.css";
import S from "@/app/styles/Pass.module.css";
import { Form, useForm, yupResolver } from "@mantine/form";
import { useRouter, useSearchParams } from "next/navigation";
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
import clsx from "clsx";
import { getQueryParamClient } from "@/app/hooks/custom/useRedirect";
import LoginSignupTabs from "@/app/(auth)/Components/LoginSignup";
import { CompletedIcon } from "@/app/images/HomePageIcons";

function Agent() {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error" | "otp"
  >("idle");
  const [active, setActive] = useState(0);
  const router = useRouter();
  const { registerOtherDetails, register, login, saveStep } = useAuth({
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
            values.address.trim().length < 1
              ? "Office Address is required"
              : null,
          companyName:
            values.companyName.trim().length < 1
              ? "Company name is required"
              : null,
        };
      }

      return {};
    },
    validateInputOnBlur: true,
  });
  const OtpCallback = () => {
    close();
    form.setValues({
      otp: true,
      prevMobile: form.values.mobile as unknown as number,
      prevEmail: form.values.email as unknown as string,
    });
    setActive(1);
    saveStep(2);
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
          } else if (data.flag === "e") {
            form.setFieldError("email", "Email already registered with us.");
            setStatus("idle");
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
        ).then((res) => {
          saveStep(3);
        });
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
  const queryParam = getQueryParamClient();
  return (
    <div
      className={clsx(
        "w-full max-w-[423px] flex justify-center items-center flex-col m-[2%] ",
        active == 2 && "max-w-full"
      )}
    >
      {active !== 2 && (
        <div className=" sm:max-w-[459px] md:max-w-[597px] flex justify-center items-center gap-[15%] mb-[5%] ">
          <LoginSignupTabs
            searchParams={queryParam.query}
            state="signup"
            singupText="Agent Sign Up"
            className="!px-[14px]"
          />
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
      <form onSubmit={form.onSubmit(nextStep)} className="w-full ">
        <Stepper
          color="green"
          iconSize={24}
          active={active}
          mt={"xs"}
          size="xs"
          className="!w-full"
          // @ts-ignore
          styles={styles}
          classNames={{
            root: StepCss.aRoot,
            steps: active === 2 ? StepCss.rootSuccess : StepCss.aSteps,
            step: StepCss.step,
            separator: StepCss.separatorForAgent,
            stepLabel: StepCss.steplabelCommonForAll,
            content: StepCss.content,
            stepCompletedIcon: StepCss.compltedIcon,
          }}
        >
          <Stepper.Step
            autoSave={"true"}
            label="Personal Details"
            icon={<StepperDotGreen className={StepCss.stepperIcon} />}
            classNames={{
              stepLabel:
                active === 0
                  ? StepCss.stepLabelActive
                  : active > 0
                  ? StepCss.stepLabelDone
                  : StepCss.stepLabel,
              stepIcon: active === 0 ? StepCss.stepIcon : StepCss.compltedIcon,
            }}
          >
            <TextInput
              required
              size="lg"
              label="Your Name"
              placeholder="Enter your name here"
              {...form.getInputProps("userName")}
              onBlurCapture={(e) => handleTrimAndReplace(e, "userName", form)}
              classNames={{
                root: StepCss.inputRoot,
                input: StepCss.textInput,
                error: StepCss.errorMsg,
                label: StepCss.mlabelCss,
              }}
            />
            <TextInput
              required
              size="lg"
              mt="sm"
              label="Email"
              placeholder="Enter your email here"
              {...form.getInputProps("email")}
              onBlurCapture={(e) => handleTrimAndReplace(e, "email", form)}
              classNames={{
                root: StepCss.inputRoot,
                input: StepCss.textInput,
                error: StepCss.errorMsg,
                label: StepCss.mlabelCss,
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
                label: StepCss.mlabelCss,
              }}
              size="lg"
              mt={"xs"}
              label="Password"
              placeholder="Create Your Password"
              {...form.getInputProps("password")}
              visibilityToggleIcon={({ reveal }) =>
                reveal ? <EyeOpen /> : <EyeClosed />
              }
              onBlurCapture={(e) => handleTrimAndReplace(e, "password", form)}
            />
            <NumberInput
              leftSection={
                <span className="text-[#212c33] font-medium">+91</span>
              }
              required
              hideControls
              size="lg"
              mt={"xs"}
              className={clsx(
                "w-[100%] mb-[3%] ",
                status === "error" && "!mb-[2px]"
              )}
              label="Contact Number"
              placeholder="Enter your contact number"
              {...form.getInputProps("mobile")}
              error={form.errors.mobile || status === "error"}
              onChange={(e) => {
                form.setFieldValue("mobile", e as any);
                if (status === "error") {
                  setStatus("idle");
                }
              }}
              allowNegative={false}
              classNames={{
                root: StepCss.inputRoot,
                input: N.classForContact,
                error: StepCss.errorMsg,
                label: StepCss.mlabelCss,
              }}
              maxLength={10}
              allowDecimal={false}
              onPaste={(event) => {
                if (status === "error") {
                  setStatus("idle");
                }
                const pastedText = event.clipboardData.getData("text/plain");
                const trimmedText = pastedText.replace(/\s/g, "");
                const first10Digits = trimmedText
                  .replace(/\D/g, "")
                  .slice(0, 10);
                form.setFieldValue("mobile", Number(first10Digits) as any);
              }}
            />
            {status === "error" && (
              <p className=" text-right text-[color:var(--Mandatory,#F00)] text-[12px] xl:text-[15px] italic font-medium leading-[normal]">
                Account already exists. Kindly use{" "}
                <Link
                  href={{ pathname: "/login", search: queryParam.query }}
                  className="text-[#0073C6] text-[15px] italic font-bold leading-[normal] underline"
                >
                  Login
                </Link>{" "}
                below
              </p>
            )}
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
              stepLabel:
                active > 1 ? StepCss.stepLabelActive : StepCss.stepLabel,
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
                label: StepCss.mlabelCss,
              }}
              onBlurCapture={(e) => handleTrimAndReplace(e, "address", form)}
              data-autofocus
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
                label: StepCss.mlabelCss,
              }}
              onBlurCapture={(e) =>
                handleTrimAndReplace(e, "companyName", form)
              }
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
                className="!rounded-[6px] !border-solid  !w-[46%] !border-1 !border-blue-600 !bg-[#FFF] !text-[#0073C6] md:!w-[100%] md:!max-w-[178px] "
              >
                <BackSvg />
                Back
              </Button>

              <Button
                loading={status === "pending"}
                mt="sm"
                className="!rounded-[6px] !w-[52%] md:!w-[100%]  md:!max-w-[225px] !bg-[#0c7aca]"
                // onClick={nextStep}
                type="submit"
              >
                {form.values.otp &&
                form.values.mobile === form.values.prevMobile &&
                form.values.email === form.values.prevEmail
                  ? "Save & Continue"
                  : "Save & Verify"}

                {/* {active === 0 ? "Save & Verify" : "Save & Continue"} */}
              </Button>
            </div>
          )}
        </Group>
      </form>
      {active === 0 && (
        <>
          <Link
            href={{ pathname: "/login", search: queryParam.query }}
            className="text-[#002749] font-semibold  sm:text-[14px] flex justify-center items-center gap-1 rounded border p-2 border-solid border-[#B2B2B2] mb-3 mt-[5%] text-nowrap max-w-fit m-auto"
          >
            Already have an Account?
            <span className="sm:text-[14px]  text-[#0C7ACA]  not-italic font-semibold text-nowrap">
              LogIn
            </span>
          </Link>
          {status === "error" && (
            <p className="text-center text-[#556477] font-semibold md:text-xl not-italic xl:font-medium leading-[normal] mt-2 xl:mt-3 mb-[16px]">
              Forgot Password?{" "}
              <Link
                href={{ pathname: "/forgot", search: queryParam.query }}
                className="text-[color:var(--Brand-green-primary,#148B16)] md:text-xl not-italic font-medium leading-[normal] underline"
              >
                Reset
              </Link>
            </p>
          )}
          <Link
            href={{ pathname: queryParam.redirectPath }}
            className=" not-italic text-[#148B16] text-[14px]  font-semibold   leading-[normal]  sm:font-[400] border rounded-sm p-2 border-solid border-[#148B16] text-center max-w-fit m-auto"
          >
            Continue without Register
          </Link>
        </>
      )}
    </div>
  );
}

export default Agent;
