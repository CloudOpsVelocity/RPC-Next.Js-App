"use client";
import dayjs from "dayjs";
import "@mantine/dates/styles.css";
import { useEffect, useRef, useState } from "react";
import {
  Stepper,
  Button,
  Group,
  TextInput,
  PasswordInput,
  Code,
  NumberInput,
  Select,
  SimpleGrid,
  Textarea,
  MultiSelect,
  Text,
  ScrollArea,
  FocusTrap,
  Checkbox,
  Anchor,
} from "@mantine/core";
import StepCss from "@/app/styles/Stepper.module.css";

import { useForm, yupResolver } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { styles } from "@/app/styles/Stepper";
import { DropZone } from "./dropzone";
import AuthPopup from "../authPopup";
import { randomId, useDisclosure } from "@mantine/hooks";
import useAuth from "@/app/hooks/useAuth";
import Success from "../success";
import { useQuery } from "react-query";
import {
  getAllCitiesDetails,
  getCitiesDetails,
  getStatesDetails,
} from "@/app/utils/stats_cities";
import {
  cityParser,
  registerOtherParser,
  stateParser,
} from "@/app/utils/parse";
import {
  agentSchema,
  builderFirstStepSchema,
  builderSchema,
  builderSchemaIndex1,
  textAreaScema,
} from "@/app/validations/auth";
import CountryInput from "@/app/components/atoms/CountryInput";
import N from "@/app/styles/Numinput.module.css";
import {
  BackSvg,
  DateIcons,
  DropdownArrowIcon,
  EyeClosed,
  EyeOpen,
  StepperDotGray,
  StepperDotGreen,
} from "@/app/images/commonSvgs";
import handleTrimAndReplace, {
  handleAllTrimAndReplace,
} from "@/app/utils/input/validations";
import clsx from "clsx";
import { getQueryParamClient } from "@/app/hooks/custom/useRedirect";
import LoginSignupTabs from "@/app/(auth)/Components/LoginSignup";
import AddmoreInput from "@/app/(auth)/Components/addmore";

function Builder() {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error" | "otp"
  >("idle");
  const [active, setActive] = useState(0);
  const router = useRouter();

  const [opened, { open, close }] = useDisclosure(false);

  const { registerOtherDetails, register, login, saveStep } = useAuth({
    type: "register",
  });

  const form = useForm({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      mobile: null,
      address: "",
      companyName: "",
      state: "",
      city: null,
      pincode: null,
      companyStartDate: null,
      branch: [],
      ceoName: [{ name: "", active: false, key: randomId() }],
      /*   foundedBy: "", */
      mission: "",
      vission: "",
      officeContact: null,
      managingDirectorName: [{ name: "", active: false, key: randomId() }],
      companyLogo: undefined,
      otp: false,
      prevMobile: 0,
      prevEmail: "",
      foundedBy: [{ name: "", active: false, key: randomId() }],
    },
    validateInputOnBlur: true,
    name: "builder" + active,
    validate: (values) => {
      if (active === 0) {
        const data = yupResolver(builderFirstStepSchema)(values);
        return data;
      }

      if (active === 1) {
        const data = yupResolver(builderSchemaIndex1)(values);
        return data;
      }

      if (active === 2) {
        const data = yupResolver(builderSchema)(values);
        return data;
      }

      if (active === 3) {
        const data = yupResolver(textAreaScema)(values);
        return data;
      }

      return {};
    },
  });
  const { data: statesData, isLoading: isLoadingStates } = useQuery(
    ["states"],
    getStatesDetails,
    {
      staleTime: 30000,
      refetchOnWindowFocus: false,
      cacheTime: 30000,
      refetchIntervalInBackground: false,
    }
  );
  const { data: brachData, isLoading: isLoadingBrach } = useQuery(
    ["brach"],
    getAllCitiesDetails,
    {
      staleTime: 30000,
      refetchOnWindowFocus: false,
      cacheTime: 30000,
      refetchIntervalInBackground: false,
    }
  );
  const { data: citiesData, isLoading: isLoadingCities } = useQuery(
    ["cities" + form.values.state],
    () => getCitiesDetails(parseInt(form.values.state)),
    {
      enabled: !!form.values.state,
      staleTime: 30000,
      refetchOnWindowFocus: false,
      cacheTime: 30000,
      refetchIntervalInBackground: false,
    }
  );

  const OtpCallback = () => {
    close();
    form.setValues({
      otp: true,
      prevMobile: form.values.mobile as unknown as number,
      prevEmail: form.values.email as unknown as string,
    });
    saveStep(2);
    setActive(1);
  };
  const nextStep = async () => {
    // Validate the form
    if (form.validate().hasErrors) {
      const errorsKeys = Object.keys(form.errors);
      if (active === 2 && errorsKeys[0]) {
        scrollWhereIsSelected(errorsKeys[0]);
        return;
      }

      return;
    }

    // Handle API call based on the current step
    let values = form.values;

    try {
      switch (active) {
        case 0:
          if (
            form.values.otp &&
            form.values.mobile === form.values.prevMobile /*  &&
            form.values.email === form.values.prevEmail */
          ) {
            // If OTP is already verified and mobile number is the same, move to the next step
            setActive(1);
          } else {
            // API call for the first step
            setStatus("pending");
            //@ts-ignore
            let data = await register({ ...values, usertype: "B" });
            if (data?.status) {
              setStatus("otp");
              open();
            } else {
              if (data.flag === "m") {
                setStatus("error");
              } else if (data.flag === "e") {
                form.setFieldError(
                  "email",
                  "Email already registered with us."
                );
                setStatus("idle");
              } else {
                setStatus("idle");
              }
            }
          }
          break;
        case 1:
          setActive((current) => (current < 3 ? current + 1 : current));
          saveStep(3);
          break;
        case 2:
          setActive((current) => (current < 3 ? current + 1 : current));
          saveStep(4);
          break;
        case 3:
          {
            setStatus("pending");
            if (!values.companyStartDate) return;
            const date = new Date(values.companyStartDate);

            const day = date.getDate();
            const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
            const year = date.getFullYear();

            const formattedDate = `${day}/${month}/${year}`;

            // API call for the third step
            const otherDetailsData = await registerOtherDetails(
              // @ts-ignore
              registerOtherParser({
                ...values,
                branch: values.branch.map((item) => parseInt(item)),
                companyStartDate: formattedDate,
              })
            ).then(async (res) => {
              await saveStep(5);
              await login({
                password: form.values.password,
                username: form.values.mobile as unknown as string,
              });
            });

            setStatus("success");
            // Proceed to the next step after the API call
            setActive((current) => (current < 4 ? current + 1 : current));
          }
          break;

        // Add more cases if needed for other steps

        default:
          break;
      }
    } catch (error) {
      console.error(error);
      // Handle error (e.g., display an error message)
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
  const handleStateChange = (state: string) => {
    form.setFieldValue("state", state);
    // Clear the city field when the state changes
    form.setFieldValue("city", null);
  };
  const viewport = useRef<HTMLDivElement>(null);
  const scrollToBottom = () =>
    viewport.current!.scrollTo({
      top: viewport.current!.scrollHeight,
      behavior: "smooth",
    });
  const scrollWhereIsSelected = (item: string) => {
    const data = [
      "companyName",
      "branch",
      "ceoName",
      "foundedBy",
      "managingDirectorName",
      "officeContact",
      "companyStartDate",
    ];
    const errorPosition = data.findIndex((element) => element === item) * 60;
    const selectedElement = document.getElementById(item);
    if (selectedElement && viewport.current) {
      viewport.current.scrollTo({
        top: errorPosition,
        behavior: "smooth",
      });
    }
  };
  const queryParam = getQueryParamClient();
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div
      className={clsx(
        "w-full max-w-[423px] flex justify-center items-center flex-col mt-[2%]",
        active === 4 && "max-w-full"
      )}
    >
      {active !== 4 && (
        <div className=" sm:max-w-[459px] md:max-w-[597px] flex justify-center items-center gap-[15%] mb-[5%] ">
          <LoginSignupTabs
            searchParams={queryParam.query}
            state="signup"
            singupText="Builder Sign Up"
            className="!px-[14px]"
          />
          {/* <Link
            href={{
              pathname: "/login",
              search: queryParam.query,
            }}
            className="whitespace-nowrap  text-xl md:text-[26px] font-[500] text-[#666]"
          >
            Log In
          </Link>

          <Link
            href={{
              pathname: "/register",
              search: queryParam.query,
            }}
            className="whitespace-nowrap text-xl md:text-[26px] text-[#148B16] font-bold border-solid border-b-2 border-green-600"
          >
            Builder Sign Up
          </Link> */}
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
      <form onSubmit={form.onSubmit(nextStep)} className="w-full">
        <Stepper
          //@ts-ignore
          styles={styles}
          size="xs"
          active={active}
          className="w-full"
          color="green"
          iconSize={24}
          mt={"xs"}
          classNames={{
            root: StepCss.root,
            steps: active === 4 ? StepCss.rootSuccess : StepCss.steps,
            step: StepCss.step,
            separator: StepCss.separator,
            stepLabel: StepCss.steplabelCommonForAll,
            content: StepCss.content,
            stepCompletedIcon: StepCss.icon,
          }}
          // completedIcon
        >
          <Stepper.Step
            label="Personal Details"
            icon={<StepperDotGreen />}
            classNames={{
              stepIcon: active === 0 ? StepCss.stepIcon : StepCss.compltedIcon,
              stepLabel:
                active === 0
                  ? StepCss.stepLabelActive
                  : active > 0
                  ? StepCss.stepLabelDone
                  : StepCss.stepLabel,
            }}
          >
            <TextInput
              required
              size="lg"
              label="Builder Name"
              placeholder="Enter builder name here"
              {...form.getInputProps("userName")}
              onBlurCapture={(e) => handleTrimAndReplace(e, "userName", form)}
              classNames={{
                root: StepCss.inputRoot,
                input: StepCss.textInput,
                error: StepCss.errorMsg,
                label: StepCss.mlabelCss,
              }}
              mt={"md"}
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
              size="lg"
              mt="sm"
              classNames={{
                innerInput: StepCss.textInput,
                input: StepCss.textInput,
                error: StepCss.errorMsg,
                label: StepCss.mlabelCss,
              }}
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
              classNames={{
                input: N.classForContact,
                error: StepCss.errorMsg,
                label: StepCss.mlabelCss,
              }}
              hideControls
              size="lg"
              mt="sm"
              className={clsx(
                "w-[100%] mb-[3%] ",
                status === "error" && "!mb-[2px]"
              )}
              label="Mobile Number"
              placeholder="Enter Your Mobile Number"
              {...form.getInputProps("mobile")}
              error={form.errors.mobile || status === "error"}
              onChange={(e) => {
                form.setFieldValue("mobile", e as any);
                if (status === "error") {
                  setStatus("idle");
                }
              }}
              allowNegative={false}
              maxLength={10}
              withErrorStyles
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
            label="Address & Other"
            icon={active >= 1 ? <StepperDotGreen /> : <StepperDotGray />}
            classNames={{
              stepLabel:
                active === 1
                  ? StepCss.stepLabelActive
                  : active > 1
                  ? StepCss.stepLabelDone
                  : StepCss.stepLabel,
              stepIcon: active > 1 ? StepCss.compltedIcon : StepCss.stepIcon,
            }}
          >
            <TextInput
              required
              size="lg"
              label="Office Address"
              placeholder="Enter your office address"
              {...form.getInputProps("address")}
              classNames={{
                root: StepCss.inputRoot,
                input: StepCss.textInput,
                error: StepCss.errorMsg,
                label: StepCss.mlabelCss,
              }}
              onBlurCapture={(e) => handleTrimAndReplace(e, "address", form)}
            />

            <Select
              rightSection={<DropdownArrowIcon />}
              required
              size="lg"
              mt="md"
              label="State"
              placeholder="Select state"
              data={isLoadingStates ? [] : stateParser(statesData) || []}
              searchable
              {...form.getInputProps("state")}
              maxDropdownHeight={200}
              onChange={(e) => handleStateChange(e as string)}
              classNames={{
                root: StepCss.inputRoot,
                input: StepCss.textInput,
                error: StepCss.errorMsg,
                dropdown: StepCss.dropdown,
                label: StepCss.mlabelCss,
                option: StepCss.optionCss,
              }}
              withScrollArea={false}
            />
            <SimpleGrid cols={2}>
              <Select
                rightSection={<DropdownArrowIcon />}
                required
                size="lg"
                mt="md"
                label="City"
                placeholder="Select city"
                data={isLoadingCities ? [] : cityParser(citiesData) || []}
                searchable
                {...form.getInputProps("city")}
                maxDropdownHeight={200}
                classNames={{
                  root: StepCss.inputRoot,
                  input: StepCss.textInput,
                  error: StepCss.errorMsg,
                  dropdown: StepCss.dropdown,
                  label: StepCss.mlabelCss,
                  option: StepCss.optionCss,
                }}
                withScrollArea={false}
              />
              <NumberInput
                required
                size="lg"
                mt="md"
                hideControls
                label="Pincode"
                placeholder="Enter pincode"
                {...form.getInputProps("pincode")}
                classNames={{
                  root: StepCss.inputRoot,
                  input: StepCss.textInput,
                  error: StepCss.errorMsg,
                  label: StepCss.mlabelCss,
                }}
                maxLength={6}
                onPaste={(event) => {
                  const pastedText = event.clipboardData.getData("text/plain");
                  const trimmedText = pastedText.replace(/\s/g, "");
                  const first10Digits = trimmedText
                    .replace(/\D/g, "")
                    .slice(0, 6);
                  form.setFieldValue("pincode", first10Digits as any);
                }}
              />
            </SimpleGrid>
            <DropZone
              onLogoSelect={handleLogoSelect}
              logo={form.values.companyLogo}
            />
          </Stepper.Step>

          <Stepper.Step
            label="Company Details"
            icon={active >= 2 ? <StepperDotGreen /> : <StepperDotGray />}
            classNames={{
              stepLabel:
                active === 2
                  ? StepCss.stepLabelActive
                  : active > 2
                  ? StepCss.stepLabelDone
                  : StepCss.stepLabel,
              stepIcon: active > 2 ? StepCss.compltedIcon : StepCss.stepIcon,
            }}
          >
            <ScrollArea h={420} viewportRef={viewport} offsetScrollbars>
              <TextInput
                id="companyName"
                required
                size="lg"
                mt="md"
                label="Builder Company Name"
                placeholder="Enter Legal Name"
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    ref?.current?.focus();
                  }
                }}
              />
              <MultiSelect
                ref={ref}
                id="branch"
                rightSection={<DropdownArrowIcon />}
                required
                size="lg"
                mt="md"
                checkIconPosition="right"
                label="Branch"
                searchable
                placeholder={`${
                  form.values.branch.length === 0 ? "-- Select Branch--" : ""
                }`}
                classNames={{
                  pill: StepCss.pill,
                  inputField: StepCss.textInput,
                  error: StepCss.errorMsg,
                  dropdown: StepCss.dropdown,
                  label: StepCss.mlabelCss,
                  option: StepCss.optionCss,
                }}
                data={isLoadingBrach ? [] : cityParser(brachData) || []}
                {...form.getInputProps("branch")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    form.values.branch.length === 0 && e.preventDefault();
                  }
                }}
                hidePickedOptions
                withScrollArea={false}
              />
              <DateInput
                id="companyStartDate"
                required
                size="lg"
                mt="md"
                label="Company Start Date"
                rightSection={<DateIcons />}
                rightSectionPointerEvents="none"
                placeholder="DD/MM/YYYY"
                {...form.getInputProps("companyStartDate")}
                maxDate={dayjs(new Date()).toDate()}
                classNames={{
                  root: StepCss.inputRoot,
                  input: StepCss.textInput,
                  error: StepCss.errorMsg,
                  label: StepCss.mlabelCss,
                  calendarHeader: StepCss.calendComStDt,
                }}
              />
              {/* <TextInput
                id="foundedBy"
                required
                size="lg"
                mt="md"
                label="Founded By"
                placeholder="Founder name"
                {...form.getInputProps("foundedBy")}
                classNames={{
                  root: StepCss.inputRoot,
                  input: StepCss.textInput,
                  error: StepCss.errorMsg,
                  label: StepCss.mlabelCss,
                }}
                onBlurCapture={(e) => {
                  handleTrimAndReplace(e, "foundedBy", form);
                  e.target.value !== "" && scrollToBottom();
                }}
              /> */}
              <AddmoreInput
                form={form}
                id={"foundedBy"}
                label={"Founded By"}
                placeholder={"Enter Founder name"}
                scrollToBottom={scrollToBottom}
              />
              <AddmoreInput
                form={form}
                id={"ceoName"}
                label={"CEO Name"}
                placeholder={"Enter CEO Name"}
                scrollToBottom={scrollToBottom}
              />
              <AddmoreInput
                form={form}
                id={"managingDirectorName"}
                label={"Managing Director"}
                placeholder={"Enter Managing Director Name"}
                scrollToBottom={scrollToBottom}
              />
              {/* <TextInput
                id="ceoName"
                required
                size="lg"
                mt="md"
                label="CEO Name"
                placeholder="Enter CEO Name"
                {...form.getInputProps("ceoName")}
                classNames={{
                  root: StepCss.inputRoot,
                  input: StepCss.textInput,
                  error: StepCss.errorMsg,
                  label: StepCss.mlabelCss,
                }}
                onBlurCapture={(e) => {
                  handleTrimAndReplace(e, "ceoName", form);
                }}
              /> */}
              {/*  <TextInput
                id="managingDirectorName"
                required
                size="lg"
                mt="md"
                label="Managing Director"
                placeholder="Enter Managing Director Name"
                {...form.getInputProps("managingDirectorName")}
                classNames={{
                  root: StepCss.inputRoot,
                  input: StepCss.mangingDrCust,
                  error: StepCss.errorMsg,
                  label: StepCss.mlabelCss,
                }}
                onBlurCapture={(e) => {
                  handleTrimAndReplace(e, "managingDirectorName", form);
                }}
              /> */}
              <TextInput
                id="officeContact"
                required
                size="lg"
                mt="md"
                label="Office Contact Number"
                placeholder="Enter Office Contact Number"
                {...form.getInputProps("officeContact")}
                classNames={{
                  root: StepCss.inputRoot,
                  input: StepCss.textInput,
                  error: StepCss.errorMsg,
                  label: StepCss.mlabelCss,
                }}
                onBlurCapture={(e) => {
                  handleAllTrimAndReplace(e, "officeContact", form);
                }}
              />
            </ScrollArea>
          </Stepper.Step>

          <Stepper.Step
            label="Description"
            icon={active >= 3 ? <StepperDotGreen /> : <StepperDotGray />}
            classNames={{
              stepLabel:
                active === 3
                  ? StepCss.stepLabelActive
                  : active > 3
                  ? StepCss.stepLabelDone
                  : StepCss.stepLabel,
              stepIcon: active > 3 ? StepCss.compltedIcon : StepCss.stepIcon,
            }}
          >
            <Textarea
              size="lg"
              required
              placeholder="Enter your company vision that you are going to provide buyers."
              label="Company Vision"
              autosize
              mt="md"
              minRows={5}
              maxRows={5}
              {...form.getInputProps("vission")}
              classNames={{
                root: StepCss.inputRoot,
                input: StepCss.textInput,
                error: StepCss.errorMsg,
                label: StepCss.mlabelCss,
              }}
              onBlurCapture={(e) => {
                handleTrimAndReplace(e, "vission", form);
              }}
              maxLength={5001}
            />
            <Text size="sm" mt="xs" ta={"right"}>
              Maximum 5000 Characters
            </Text>
            <Textarea
              size="lg"
              required
              mt={"md"}
              placeholder="Enter your bulder's description that you are going to provide buyers."
              label="Builder's Descriptions"
              autosize
              minRows={5}
              maxRows={5}
              classNames={{
                root: StepCss.inputRoot,
                input: StepCss.textInput,
                error: StepCss.errorMsg,
                label: StepCss.mlabelCss,
              }}
              onBlurCapture={(e) => {
                handleTrimAndReplace(e, "mission", form);
              }}
              {...form.getInputProps("mission")}
              maxLength={5001}
            />{" "}
            <Text size="sm" mt="xs" ta={"right"} mb={"lg"}>
              Maximum 5000 Characters
            </Text>
            {/*  <Checkbox
            label={
            <>
            I accept{' '}
          <Anchor href="https://Rpclan.com" target="_blank" inherit>
            terms and conditions
          </Anchor>
        </>
         }
       /> */}
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
        <Group justify="flex-end" className="w-full mt">
          {active !== 4 && (
            <div className="w-full lg:w-full flex justify-between items-center flex-wrap md:flex-nowrap">
              <Button
                mt="sm"
                onClick={() => {
                  active !== 0 ? prevStep() : router.back();
                }}
                className="!rounded-[6px] !border-solid  !w-[46%] !border-1 !border-blue-600 !bg-[#FFF] !text-[#0073C6] md:!w-[100%] md:!max-w-[178px]"
              >
                <BackSvg /> Back
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
                {/* {active === 0 ? "SAVE & VERIFY" : "SAVE & CONTINUE"} */}
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
            <p className="text-center text-[#556477] text-[16px] font-[600]  xl:text-xl not-italic xl:font-medium leading-[normal] mt-2 xl:mt-3 mb-[15px]">
              Forgot Password?{" "}
              <Link
                href={{ pathname: "/forgot", search: queryParam.query }}
                className="text-[color:var(--Brand-green-primary,#148B16)] text-[16px] font-[600]  xl:text-xl not-italic xl:font-medium leading-[normal] underline"
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

export default Builder;
