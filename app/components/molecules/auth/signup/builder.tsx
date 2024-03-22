"use client";
import dayjs from "dayjs";
import "@mantine/dates/styles.css";
import { useRef, useState } from "react";
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
  ComboboxItem,
  Text,
  ScrollArea,
} from "@mantine/core";
import StepCss from "@/app/styles/Stepper.module.css";

import { useForm, yupResolver } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { styles } from "@/app/styles/Stepper";
import { DropZone } from "./dropzone";
import AuthPopup from "../authPopup";
import { useDisclosure } from "@mantine/hooks";
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
  builderSchema,
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

function Builder() {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error" | "otp"
  >("idle");
  const [active, setActive] = useState(0);
  const router = useRouter();

  const [opened, { open, close }] = useDisclosure(false);

  const { registerOtherDetails, register, login } = useAuth({
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
      ceoName: "",
      foundedBy: "",
      mission: "",
      vission: "",
      officeContact: null,
      managingDirectorName: "",
      companyLogo: undefined,
      otp: false,
      prevMobile: 0,
      prevEmail: "",
    },
    validate: (values) => {
      if (active === 0) {
        const data = yupResolver(agentSchema)(values);
        return data;
      }

      if (active === 1) {
        return {
          address:
            values.address.trim().length < 2 ? "Address is required" : null,
          state: values.state.trim().length === 0 ? "State is required" : null,
          city:
            // @ts-ignore
            values.city === null || values?.city.trim().length === 0
              ? "City is required"
              : null,
          pincode: !values.pincode
            ? "PIN code is required"
            : !/^[1-9][0-9]{5}$/.test(String(values.pincode))
            ? "Valid 6-digit PIN code is required"
            : null,
        };
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
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });
  const { data: statesData, isLoading: isLoadingStates } = useQuery(
    ["states"],
    getStatesDetails
  );
  const { data: brachData, isLoading: isLoadingBrach } = useQuery(
    ["brach"],
    getAllCitiesDetails
  );
  const { data: citiesData, isLoading: isLoadingCities } = useQuery(
    ["cities" + form.values.state],
    () => getCitiesDetails(parseInt(form.values.state)),
    {
      // The query will not execute until the userId exists
      enabled: !!form.values.state,
    }
  );

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
            form.values.mobile === form.values.prevMobile &&
            form.values.email === form.values.prevEmail
          ) {
            // If OTP is already verified and mobile number is the same, move to the next step
            setActive(1);
          } else {
            // API call for the first step
            setStatus("pending");
            //@ts-ignore
            let data = await register({ ...values, usertype: "B" });
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
          break;
        case 1:
          setActive((current) => (current < 3 ? current + 1 : current));
          break;
        case 2:
          setActive((current) => (current < 3 ? current + 1 : current));
          break;
        case 3:
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
          );

          await login({
            password: form.values.password,
            username: form.values.mobile as unknown as string,
          });
          setStatus("success");
          // Proceed to the next step after the API call
          setActive((current) => (current < 4 ? current + 1 : current));
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

  return (
    <div className="w-full max-w-[423px] flex justify-center items-center flex-col mt-[2%]">
      {active !== 4 && (
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
            Builder Sign Up
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
        }}
      >
        <Stepper.Step
          label="Personal Details"
          icon={<StepperDotGreen />}
          classNames={{
            stepIcon: active === 0 ? StepCss.stepIcon : "",
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
            size="lg"
            mt="sm"
            classNames={{
              innerInput: StepCss.textInput,
              input: StepCss.textInput,
              error: StepCss.errorMsg,
            }}
            label="Password"
            placeholder="Enter your password here"
            {...form.getInputProps("password")}
            visibilityToggleIcon={({ reveal }) =>
              reveal ? <EyeOpen /> : <EyeClosed />
            }
            onBlur={(e) => handleTrimAndReplace(e, "password", form)}
          />
          <NumberInput
            required
            classNames={{
              input: N.classForContact,
              error: StepCss.errorMsg,
            }}
            hideControls
            size="lg"
            mt="sm"
            className="w-[100%] mb-[3%] "
            label="Contact Number"
            placeholder="Enter your contact number here"
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
            maxLength={10}
            withErrorStyles={true}
            allowDecimal={false}
            onPaste={(event) => {
              const pastedText = event.clipboardData.getData("text/plain");
              const trimmedText = pastedText.replace(/\s/g, "");
              const first10Digits = trimmedText.replace(/\D/g, "").slice(0, 10);
              form.setFieldValue("mobile", first10Digits as any);
            }}
          />

          <div className="min-w-[30px] !max-w-[75px] flex justify-center items-center ">
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
          </div>
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
            stepIcon: active > 1 ? StepCss.stepIconActive : StepCss.stepIcon,
          }}
        >
          <TextInput
            required
            size="lg"
            label="Office Address"
            placeholder="Enter your office address here"
            {...form.getInputProps("address")}
            onBlur={(e) => handleTrimAndReplace(e, "address", form)}
            classNames={{
              root: StepCss.inputRoot,
              input: StepCss.textInput,
              error: StepCss.errorMsg,
            }}
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
            }}
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
              }}
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
              }}
              maxLength={6}
              onPaste={(event) => {
                const pastedText = event.clipboardData.getData("text/plain");
                const trimmedText = pastedText.replace(/\s/g, "");
                const first10Digits = trimmedText
                  .replace(/\D/g, "")
                  .slice(0, 6);
                form.setFieldValue("mobile", first10Digits as any);
              }}
            />
          </SimpleGrid>
          <DropZone
            onLogoSelect={handleLogoSelect}
            logo={form.values.companyLogo}
          />
        </Stepper.Step>

        <Stepper.Step
          label="Company details"
          icon={active >= 2 ? <StepperDotGreen /> : <StepperDotGray />}
          classNames={{
            stepLabel:
              active === 2
                ? StepCss.stepLabelActive
                : active > 2
                ? StepCss.stepLabelDone
                : StepCss.stepLabel,
            stepIcon: active > 2 ? StepCss.stepIconActive : StepCss.stepIcon,
          }}
        >
          <ScrollArea h={420} pr={10} viewportRef={viewport} offsetScrollbars>
            <TextInput
              id="companyName"
              required
              size="lg"
              mt="md"
              label="Builder Owned By"
              placeholder="Enter your builder name"
              {...form.getInputProps("companyName")}
              onBlur={(e) => handleTrimAndReplace(e, "companyName", form)}
              classNames={{
                root: StepCss.inputRoot,
                input: StepCss.textInput,
                error: StepCss.errorMsg,
              }}
            />
            <MultiSelect
              id="branch"
              rightSection={<DropdownArrowIcon />}
              required
              size="lg"
              mt="md"
              checkIconPosition="right"
              label="Branch"
              searchable
              placeholder={`${
                form.values.branch.length === 0 ? "-- Select Brach--" : ""
              }`}
              classNames={{
                pill: StepCss.pill,
                inputField: StepCss.textInput,
                error: StepCss.errorMsg,
              }}
              data={isLoadingBrach ? [] : cityParser(brachData) || []}
              {...form.getInputProps("branch")}
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
              }}
            />
            <TextInput
              id="foundedBy"
              required
              size="lg"
              mt="md"
              label="Founded By"
              placeholder="Founder name"
              {...form.getInputProps("foundedBy")}
              onBlur={(e) => {
                handleTrimAndReplace(e, "foundedBy", form);
                e.target.value !== "" && scrollToBottom();
              }}
              classNames={{
                root: StepCss.inputRoot,
                input: StepCss.textInput,
                error: StepCss.errorMsg,
              }}
            />
            <TextInput
              id="ceoName"
              required
              size="lg"
              mt="md"
              label="Ceo Name"
              placeholder="Enter Ceo Name"
              {...form.getInputProps("ceoName")}
              onBlur={(e) => handleTrimAndReplace(e, "ceoName", form)}
              classNames={{
                root: StepCss.inputRoot,
                input: StepCss.textInput,
                error: StepCss.errorMsg,
              }}
            />
            <TextInput
              id="managingDirectorName"
              required
              size="lg"
              mt="md"
              label="Managing Director"
              placeholder="Enter Managing Director Name"
              {...form.getInputProps("managingDirectorName")}
              onBlur={(e) =>
                handleTrimAndReplace(e, "managingDirectorName", form)
              }
              classNames={{
                root: StepCss.inputRoot,
                input: StepCss.textInput,
                error: StepCss.errorMsg,
              }}
            />
            <TextInput
              id="officeContact"
              required
              size="lg"
              mt="md"
              label="Office Contact"
              placeholder="Enter Office Contact"
              {...form.getInputProps("officeContact")}
              classNames={{
                root: StepCss.inputRoot,
                input: StepCss.textInput,
                error: StepCss.errorMsg,
              }}
              {...form.getInputProps("officeContact")}
              onBlur={(e) => handleAllTrimAndReplace(e, "officeContact", form)}
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
            stepIcon: active > 3 ? StepCss.stepIconActive : StepCss.stepIcon,
          }}
        >
          <Textarea
            size="lg"
            required
            placeholder="Enter your company vision that you are going to provide buyers."
            label="Company Vision"
            autosize
            minRows={5}
            maxRows={5}
            {...form.getInputProps("vission")}
            onBlur={(e) => handleTrimAndReplace(e, "vission", form)}
            classNames={{
              root: StepCss.inputRoot,
              input: StepCss.textInput,
              error: StepCss.errorMsg,
            }}
          />
          <Text size="sm" ta={"right"}>
            maximum 5000 characters
          </Text>
          <Textarea
            size="lg"
            required
            mt={"md"}
            placeholder="Enter your bulder's description that you are going to provide buyers."
            label="Builder's Description"
            autosize
            minRows={5}
            maxRows={5}
            {...form.getInputProps("mission")}
            onBlur={(e) => handleTrimAndReplace(e, "mission", form)}
            classNames={{
              root: StepCss.inputRoot,
              input: StepCss.textInput,
              error: StepCss.errorMsg,
            }}
          />{" "}
          <Text size="sm" ta={"right"} mb={"lg"}>
            maximum 5000 characters
          </Text>
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
        {active !== 4 && (
          <div className="w-full lg:w-full flex justify-between items-center flex-wrap md:flex-nowrap">
            <Button
              mt="sm"
              onClick={() => {
                active !== 0 ? prevStep() : router.back();
              }}
              className="!rounded-[6px] !border-solid  !w-[49%] !border-1 !border-blue-600 !bg-[#FFF] !text-[#0073C6] md:!w-[100%] md:!max-w-[178px]"
            >
              <BackSvg /> Back
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
          <p className="md:text-xl] font-[400] text-[#202020] mt-[5%]">
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

export default Builder;
