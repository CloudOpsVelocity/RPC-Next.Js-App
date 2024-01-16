"use client";
import "@mantine/dates/styles.css";
import { useState } from "react";
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
} from "@mantine/core";
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
import { cityParser, stateParser } from "@/app/utils/parse";
import { agentSchema, builderSchema } from "@/app/validations/auth";
import CountryInput from "@/app/components/atoms/CountryInput";
import N from "@/app/styles/Numinput.module.css";
import {
  BackSvg,
  DateIcons,
  EyeClosed,
  EyeOpen,
} from "@/app/images/commonSvgs";

function Builder() {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error" | "otp"
  >("idle");
  const [active, setActive] = useState(3);
  const router = useRouter();

  const [opened, { open, close }] = useDisclosure(false);

  const { registerOtherDetails, register, login } = useAuth();

  // const [value, setValue] = useState<number | ComboboxItem | null>(null);

  const form = useForm({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      mobile: null,
      address: "",
      companyName: "",
      state: "",
      city: "",
      pincode: null,
      companyStartDate: null,
      branchName: [],
      ceoName: "",
      foundedBy: "",
      mission: "",
      vission: "",
      officeContact: null,
      managingDirectorName: "",
      companyLogo: undefined,
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
          city: values.city.trim().length === 0 ? "City is required" : null,
          pincode: !/^[1-9][0-9]{5}$/.test(String(values.pincode))
            ? "Valid 6-digit PIN code is required"
            : null,
        };
      }

      if (active === 2) {
        const data = yupResolver(builderSchema)(values);
        return data;
      }

      if (active === 3) {
        return {
          mission:
            values.mission.trim().length === 0
              ? "Builder's Description  is required"
              : null,
          vission:
            values.vission.trim().length === 0
              ? "Company Vision  is required"
              : null,
        };
      }

      return {};
    },
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
    setActive((current) => (current < 3 ? current + 1 : current));
  };
  const nextStep = async () => {
    // Validate the form
    if (form.validate().hasErrors) {
      return;
    }

    // Handle API call based on the current step
    let values = form.values;

    try {
      switch (active) {
        case 0:
          // API call for the first step
          setStatus("pending");
          //@ts-ignore
          let data = await register({ ...values, usertype: "B" });
          console.log(data);
          if (data?.status) {
            setStatus("otp");
            open();
          } else {
            setStatus("error");
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
          const otherDetailsData = await registerOtherDetails({
            ...values,
            branchName: values.branchName.map((item) => parseInt(item)),
            companyStartDate: formattedDate,
          });

          await login({
            password: form.values.password,
            username: form.values.email,
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
  return (
    <div className="w-full max-w-[423px] flex justify-center items-center flex-col  m-[5%]">
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
      >
        <Stepper.Step label="Personal Details">
          <TextInput
            required
            size="md"
            label="Full Name"
            placeholder="Enter your name here"
            {...form.getInputProps("userName")}
          />
          <TextInput
            required
            size="md"
            mt="sm"
            label="Email"
            placeholder="Enter your email here"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            required
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
          />

          <CountryInput
            onSelect={displayCountryCode}
            className={`focus:outline-none min-w-[30px] max-w-[70px] self-start relative ${
              form.errors.mobile != undefined && form.errors.mobile != null
                ? "bottom-[65px]"
                : "bottom-[45px]"
            }  ml-[2px]`}
          />
        </Stepper.Step>

        <Stepper.Step label="Address & Other">
          <TextInput
            required
            size="md"
            label="Address"
            placeholder="Enter your address here"
            {...form.getInputProps("address")}
          />
          <Select
            required
            size="md"
            mt="md"
            label="State"
            placeholder="Select state"
            data={isLoadingStates ? [] : stateParser(statesData) || []}
            searchable
            {...form.getInputProps("state")}
            maxDropdownHeight={200}
          />
          <SimpleGrid cols={2}>
            <Select
              required
              size="md"
              mt="md"
              label="City"
              placeholder="Select city"
              data={isLoadingCities ? [] : cityParser(citiesData) || []}
              searchable
              {...form.getInputProps("city")}
              maxDropdownHeight={200}
            />
            <NumberInput
              required
              size="md"
              mt="md"
              hideControls
              label="Pincode"
              placeholder="Enter your pincode here"
              {...form.getInputProps("pincode")}
              maxLength={6}
            />
          </SimpleGrid>
          <DropZone
            onLogoSelect={handleLogoSelect}
            logo={form.values.companyLogo}
          />
        </Stepper.Step>

        <Stepper.Step label="Company details">
          <TextInput
            required
            size="md"
            mt="md"
            label="Builder Owned By"
            placeholder="Enter your builder name"
            {...form.getInputProps("companyName")}
          />
          <MultiSelect
            required
            size="md"
            mt="md"
            checkIconPosition="right"
            label="Branch"
            placeholder={`${
              form.values.branchName.length === 0 ? "-- Select Brach--" : ""
            }`}
            data={isLoadingBrach ? [] : cityParser(brachData) || []}
            {...form.getInputProps("branchName")}
          />
          <DateInput
            required
            mt="md"
            label="Company Start Date"
            rightSection={<DateIcons />}
            rightSectionPointerEvents="none"
            placeholder="DD//MM//YYYY"
            {...form.getInputProps("companyStartDate")}
          />

          <TextInput
            required
            size="md"
            mt="md"
            label="Founded By"
            placeholder="Founder name"
            {...form.getInputProps("foundedBy")}
          />

          <TextInput
            required
            size="md"
            mt="md"
            label="Ceo Name"
            placeholder="Enter Ceo Name"
            {...form.getInputProps("ceoName")}
          />

          <TextInput
            required
            size="md"
            mt="md"
            label="Managing Director"
            placeholder="Enter Managing Director Name"
            {...form.getInputProps("managingDirectorName")}
          />

          <NumberInput
            required
            hideControls
            size="md"
            mt="sm"
            className="w-[100%] mb-[3%] "
            label="Office Contact"
            placeholder="Enter Office Contact"
            {...form.getInputProps("officeContact")}
            maxLength={17}
          />
        </Stepper.Step>
        <Stepper.Step label="Description">
          <Textarea
            required
            placeholder="Enter your company vision that you are going to provide buyers."
            label="Company Vision"
            autosize
            minRows={5}
            {...form.getInputProps("vission")}
          />
          <Text size="sm" ta={"right"}>
            maximum 5000 characters
          </Text>
          <Textarea
            required
            mt={"md"}
            placeholder="Enter your bulder's description that you are going to provide buyers."
            label="Builder's Description"
            autosize
            minRows={5}
            {...form.getInputProps("mission")}
          />{" "}
          <Text size="sm" ta={"right"}>
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

      <Group justify="flex-end" mt="xl" className="w-full">
        {active !== 4 && (
          <div className="w-[100%] flex justify-between items-center flex-wrap">
            <Button
              mt="sm"
              onClick={() => {
                active !== 0 ? prevStep() : router.back();
              }}
              className="!rounded-[6px] !border-solid !border-1 !border-blue-600 !bg-[#FFF] !text-[#0073C6] !w-[100%] !max-w-[178px]  "
            >
              <BackSvg /> Back
            </Button>

            <Button
              loading={status === "pending"}
              mt="sm"
              className="!rounded-[6px] !w-[100%] !max-w-[225px] !bg-[#0c7aca]"
              onClick={nextStep}
            >
              {active === 0 ? "SAVE & VERIFY" : "SAVE & CONTINUE"}
            </Button>
          </div>
        )}
      </Group>

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
    </div>
  );
}

export default Builder;
