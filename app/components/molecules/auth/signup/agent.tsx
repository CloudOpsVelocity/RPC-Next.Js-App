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
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { styles } from "@/app/styles/Stepper";
import { DropZone } from "./dropzone";
import { useDisclosure } from "@mantine/hooks";
import AuthPopup from "../authPopup";
import useAuth from "@/app/hooks/useAuth";

function Agent() {
  const [active, setActive] = useState(0);
  const router = useRouter();
  const { registerOtherDetails, register } = useAuth();

  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      contact: 0,
      address: "",
      companyName: "",
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
          companyName:
            values.companyName.trim().length < 2
              ? "Company name is required"
              : null,
        };
      }

      return {};
    },
  });

  const nextStep = async () => {
    let values = form.values;
    let data =
      active == 0
        ? await register({ ...values, usertype: "A" })
        : await registerOtherDetails(values);

    if (!form.validate().hasErrors) {
      if (active == 0) {
        console.log(data);
        if (data.success) {
          open();
        }
      } else {
        console.log(data);
      }
    }

    if (data.success) {
      setActive((current) => {
        if (form.validate().hasErrors) {
          return current;
        }

        return current < 3 ? current + 1 : current;
      });
    }
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <div className="w-full max-w-[423px] flex justify-center items-center flex-col m-[5%]">
      <AuthPopup
        opened={opened}
        open={open}
        close={close}
        userName={form.values.email}
      />
      <Stepper
        color="green"
        iconSize={24}
        active={active}
        className="w-full"
        // @ts-ignore
        styles={styles}
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

        <Stepper.Step label="Company details">
          <TextInput
            size="md"
            label="Address"
            placeholder="Address"
            {...form.getInputProps("address")}
          />
          <TextInput
            size="md"
            mt="md"
            label="Company Name"
            placeholder="Company Name"
            {...form.getInputProps("companyName")}
          />
          <DropZone />
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

export default Agent;
