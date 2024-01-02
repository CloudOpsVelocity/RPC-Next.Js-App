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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { styles } from "@/app/styles/Stepper";
import { DropZone } from "./dropzone";
import AuthPopup from "../authPopup";
import { useDisclosure } from "@mantine/hooks";

function Builder() {
  const [active, setActive] = useState(0);
  const router = useRouter();

  const [opened, { open, close }] = useDisclosure(false);

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
      branch: [],
      ceo: "",
      fd: "",
      bd: "",
      cv: "",
    },
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
            isNaN(values.contact) ||
            values.contact <= 0 ||
            values.contact.toString().length !== 10
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
          branch:
            values.branch.length === 0
              ? "At least one branch must be selected"
              : null,
          ceo: values.ceo.trim().length === 0 ? "CEO name is required" : null,
          fd: values.fd.trim().length === 0 ? "FD name is required" : null,
        };
      }

      if (active === 3) {
        return {
          bd: values.bd.trim().length === 0 ? "BD name is required" : null,
          cv: values.cv.trim().length === 0 ? "CV name is required" : null,
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

      let values = form.values;
      console.log(values);
      //const data = register({ ...values, usertype: "A" });
      //console.log(data);

      if (current == 0) {
        open();
      }

      return current < 4 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <div className="w-full max-w-[423px] flex justify-center items-center flex-col  m-[5%]">
      <AuthPopup
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
            {...form.getInputProps("branch")}
          />
          <DateInput
            mt="md"
            label="Company Start Date"
            placeholder="DD/MM/YYYY"
            {...form.getInputProps("startDate")}
          />

          <TextInput
            size="md"
            mt="md"
            label="Founded By"
            placeholder="Company Name"
            {...form.getInputProps("fd")}
          />

          <TextInput
            size="md"
            mt="md"
            label="Ceo Name"
            placeholder="Company Name"
            {...form.getInputProps("ceo")}
          />
        </Stepper.Step>
        <Stepper.Step label="Description">
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
