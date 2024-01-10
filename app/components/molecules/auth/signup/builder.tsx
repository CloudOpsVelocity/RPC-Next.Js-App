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
} from "@mantine/core";
import { useForm } from "@mantine/form";
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

function Builder() {
  const [active, setActive] = useState(0);
  const router = useRouter();

  const [opened, { open, close }] = useDisclosure(false);

  const { registerOtherDetails, register, login } = useAuth();

  // const [value, setValue] = useState<number | ComboboxItem | null>(null);

  const form = useForm({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      mobile: 0,
      address: "",
      companyName: "",
      state: "",
      city: "",
      pincode: 0,
      companyStartDate: new Date(),
      branchName: [],
      ceoName: "",
      foundedBy: "",
      mission: "",
      vission: "",
      officeContact: 0,
      managingDirectorName: "",
    },
    validate: (values) => {
      if (active === 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return {
          userName:
            values.userName.trim().length < 2 ? "Full name is required" : null,
          email: !values.email.match(emailRegex)
            ? "Valid email is required"
            : null,
          password:
            values.password.trim().length < 1 ? "Password is required" : null,
          mobile:
            isNaN(values.mobile) ||
            values.mobile <= 0 ||
            values.mobile.toString().length !== 10
              ? "Valid 10-digit contact number is required"
              : null,
        };
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
        return {
          companyName:
            values.companyName.trim().length < 2
              ? "Company name is required"
              : null,
          branchName:
            values.branchName.length === 0
              ? "At least one branch must be selected"
              : null,
          ceoName:
            values.ceoName.trim().length === 0 ? "CEO name is required" : null,
          foundedBy:
            values.foundedBy.trim().length === 0
              ? "Founded By name is required"
              : null,

          managingDirectorName:
            values.managingDirectorName.trim().length === 0
              ? "Managing Director name is required"
              : null,

          officeContact:
            isNaN(values.officeContact) ||
            values.officeContact <= 0 ||
            values.officeContact.toString().length !== 10
              ? "Valid 10-digit contact number is required"
              : null,
        };
      }

      if (active === 3) {
        return {
          mission:
            values.mission.trim().length === 0
              ? "Mission name is required"
              : null,
          vission:
            values.vission.trim().length === 0
              ? "Vission name is required"
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
          //@ts-ignore
          let data = await register({ ...values, usertype: "B" });
          console.log(data);
          if (data?.status) {
            open();
          }
          break;
        case 1:
          setActive((current) => (current < 3 ? current + 1 : current));
          break;
        case 2:
          setActive((current) => (current < 3 ? current + 1 : current));
          break;
        case 3:
          // API call for the third step
          const otherDetailsData = await registerOtherDetails({ ...values });
          await login({
            password: form.values.password,
            username: form.values.email,
          });
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

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  console.log(citiesData);
  return (
    <div className="w-full max-w-[423px] flex justify-center items-center flex-col  m-[5%]">
      <AuthPopup
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
            size="md"
            label="Full Name"
            placeholder="Full Name"
            {...form.getInputProps("userName")}
          />
          <TextInput
            size="md"
            mt="sm"
            label="Email"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            size="md"
            mt="sm"
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
          <NumberInput
            hideControls
            size="md"
            mt="sm"
            label="Contact"
            placeholder="Enter Contact Number"
            {...form.getInputProps("mobile")}
          />
        </Stepper.Step>

        <Stepper.Step label="Address & Other">
          <TextInput
            size="md"
            label="Address"
            placeholder="Address"
            {...form.getInputProps("address")}
          />
          <Select
            size="md"
            mt="md"
            label="State"
            placeholder="Pick value"
            data={isLoadingStates ? [] : stateParser(statesData) || []}
            searchable
            {...form.getInputProps("state")}
            maxDropdownHeight={200}
          />
          <SimpleGrid cols={2}>
            <Select
              size="md"
              mt="md"
              label="City"
              placeholder="Pick value"
              data={isLoadingCities ? [] : cityParser(citiesData) || []}
              searchable
              {...form.getInputProps("city")}
              maxDropdownHeight={200}
            />
            <NumberInput
              size="md"
              mt="md"
              hideControls
              label="Pincode"
              placeholder="Pincode"
              {...form.getInputProps("pincode")}
            />
          </SimpleGrid>
          <DropZone />
        </Stepper.Step>

        <Stepper.Step label="Company details">
          <TextInput
            size="md"
            mt="md"
            label="Builder Owned By"
            placeholder="Company Name"
            {...form.getInputProps("companyName")}
          />
          <MultiSelect
            size="md"
            mt="md"
            checkIconPosition="right"
            label="Branch"
            placeholder=" --Select Branch--"
            data={["React", "Angular", "Vue", "Svelte"]}
            {...form.getInputProps("branchName")}
          />
          <DateInput
            mt="md"
            label="Company Start Date"
            placeholder="DD/MM/YYYY"
            {...form.getInputProps("companyStartDate")}
          />

          <TextInput
            size="md"
            mt="md"
            label="Founded By"
            placeholder="Founded By"
            {...form.getInputProps("foundedBy")}
          />

          <TextInput
            size="md"
            mt="md"
            label="Ceo Name"
            placeholder="Ceo Name"
            {...form.getInputProps("ceoName")}
          />

          <TextInput
            size="md"
            mt="md"
            label="Managing Director"
            placeholder="Enter Managing Director Name"
            {...form.getInputProps("managingDirectorName")}
          />

          <NumberInput
            hideControls
            size="md"
            mt="sm"
            className="w-[100%] mb-[3%] "
            label="Office Contact"
            placeholder="Enter Office Contact"
            {...form.getInputProps("officeContact")}
          />
        </Stepper.Step>
        <Stepper.Step label="Description">
          <Textarea
            placeholder="Enter your company vision you are going to provide buyers."
            label="Companies Vision"
            autosize
            minRows={5}
            required
            {...form.getInputProps("vission")}
          />
          <Textarea
            description="maximum  5000 characters"
            mt={"md"}
            placeholder="Enter your company vision you are going to provide buyers."
            label="Builders Description"
            autosize
            minRows={5}
            required
            {...form.getInputProps("mission")}
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
              Back
            </Button>

            <Button
              mt="sm"
              className="!rounded-[6px] !w-[100%] !max-w-[225px] !bg-[#0c7aca]"
              onClick={nextStep}
            >
              SAVE & VERIFY
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
