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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
function Builder() {
  const [active, setActive] = useState(0);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      contact: 0,
      address: "",
      companyName: "",
      state: "",
      city: "",
      pincode: 0,
      startDate: new Date(),
      branch: "",
      ceo: "",
      fd: "",
      bd: "",
      cv: "",
    },
    // @ts-ignore
    validate: (values) => {
      if (active === 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return {
          fullname:
            values.fullname.trim().length < 2 ? "Full name is required" : null,
          email: !values.email.match(emailRegex)
            ? "Valid email is required"
            : null,
          password:
            values.password.trim().length < 1 ? "Password is required" : null,
          contact:
            isNaN(values.contact) || values.contact <= 0
              ? "Valid contact number is required"
              : null,
        };
      }

      if (active === 1) {
        return {
          address:
            values.address.trim().length < 2 ? "Address is required" : null,
          state: values.state.trim().length === 0 ? "State is required" : null,
          city: values.city.trim().length === 0 ? "City is required" : null,
          pincode:
            isNaN(values.pincode) || values.pincode <= 0
              ? "Valid pincode is required"
              : null,
        };
      }

      if (active === 2) {
        return {
          companyName:
            values.companyName.trim().length < 2
              ? "Company name is required"
              : null,
        };
      }

      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <div className="w-full max-w-[423px] flex justify-center items-center flex-col">
      <Stepper active={active} className="w-full">
        <Stepper.Step label="First step" description="Personal Details">
          <TextInput
            size="md"
            label="Full Name"
            placeholder="Full Name"
            {...form.getInputProps("fullname")}
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
            label="Contact Number"
            placeholder="Contact Number"
            {...form.getInputProps("contact")}
          />
        </Stepper.Step>

        <Stepper.Step label="Second step" description="Address & Other">
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
            data={["React", "Angular", "Vue", "Svelte"]}
            searchable
            {...form.getInputProps("state")}
          />
          <SimpleGrid cols={2}>
            <Select
              size="md"
              mt="md"
              label="City"
              placeholder="Pick value"
              data={["React", "Angular", "Vue", "Svelte"]}
              searchable
              {...form.getInputProps("city")}
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
        </Stepper.Step>

        <Stepper.Step label="Third step" description="Company details">
          <TextInput
            size="md"
            mt="md"
            label="Builder Owned By"
            placeholder="Company Name"
            {...form.getInputProps("companyName")}
          />
          <Select
            size="md"
            mt="md"
            label="Branch"
            placeholder="Pick value"
            data={["React", "Angular", "Vue", "Svelte"]}
            searchable
          />
          <TextInput
            size="md"
            mt="md"
            label="Founded By"
            placeholder="Company Name"
            {...form.getInputProps("fd")}
          />
          <DateInput
            mt="md"
            label="Date input"
            placeholder="Date input"
            {...form.getInputProps("startDate")}
          />
          <TextInput
            size="md"
            mt="md"
            label="Ceo Name"
            placeholder="Company Name"
            {...form.getInputProps("ceo")}
          />
        </Stepper.Step>
        <Stepper.Step label="Forth step" description="Description">
          <Textarea
            placeholder="Enter your company vision you are going to provide buyers."
            label="Companies Vision"
            autosize
            minRows={5}
            required
            {...form.getInputProps("cv")}
          />
          <Textarea
            mt={"md"}
            placeholder="Enter your company vision you are going to provide buyers."
            label="Builders Description"
            autosize
            minRows={5}
            required
            {...form.getInputProps("bd")}
          />
        </Stepper.Step>

        <Stepper.Completed>
          Completed! Form values:
          <Code block mt="xl">
            {JSON.stringify(form.values, null, 2)}
          </Code>
        </Stepper.Completed>
      </Stepper>

      <Group justify="flex-end" mt="xl" className="w-full">
        {active !== 3 && (
          <div className="w-[100%] flex justify-between items-center flex-wrap">
            <Button
              type="submit"
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
              className="!rounded-[6px] !w-[100%] !max-w-[225px]"
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
