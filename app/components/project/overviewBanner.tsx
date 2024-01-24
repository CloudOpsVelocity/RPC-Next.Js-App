"use client";
import PriceBag, {
  Phone,
  ShearIcon,
  WhatsAppButton,
} from "@/app/images/commonSvgs";
import N from "@/app/styles/Numinput.module.css";
import React, { useState } from "react";
import Button from "../../elements/button";
import { useDisclosure, useMediaQuery, useSetState } from "@mantine/hooks";
import { Collapse, Modal, NumberInput, TextInput, em } from "@mantine/core";
import Image from "next/image";
import { useSession } from "next-auth/react";
import S from "@/app/styles/Req.module.css";
import { projectprops } from "@/app/data/projectDetails";
import { useForm, yupResolver } from "@mantine/form";
import { reqSchema } from "@/app/validations/project";
import { Button as B } from "@mantine/core";
import ReqOtpForm from "./forms/otpform";
import { addContact, sendContact } from "@/app/utils/api/actions/contact";
import { useParams } from "next/navigation";
import CountryInput from "../atoms/CountryInput";
export default function OverviewBanner({
  minPrice,
  maxPrice,
  name,
}: {
  minPrice: number;
  maxPrice: number;
  name: string;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div className="flex justify-start items-center w-full flex-col md:flex-row bg-gradient-to-r from-[#EFF5FF] /50 to-[#F2FAFF ]/50 ">
        <PriceBag className="w-[150px] h-[170px] md:w-[237px] md:h-[263px] " />

        <div className="flex justify-between items-center w-[100%] flex-row ml-[3%] p-[2%] flex-wrap">
          <div className="">
            <p className="text-[#212C33] text-[24px] lg:text-[32px] font-[600]">
              PRICE RANGE{" "}
              <span className="text-[#00487C] text-[24px] md:text-[32px] lg:text-[40px] whitespace-nowrap font-[700]">
                ₹ {minPrice} Cr - ₹ {maxPrice} Cr
              </span>
            </p>
            <Button
              icon={<Phone />}
              title="Request a Callback"
              buttonClass=" text-[#FFF] text-[16px] font-[600] bg-[#0073C6]  rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[6px]  "
              onChange={open}
            />
          </div>

          <WhatsAppButton className="cursor-pointer" name={name} />
        </div>

        <RequestCallBackModal close={close} opened={opened} />
      </div>
    </>
  );
}
const RequestCallBackModal = ({
  opened,
  close,
}: {
  opened: any;
  close: any;
}) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        size={isMobile ? "90%" : "60%"}
        className="!rounded-full w-[90%] md:w-[70%] lg:w-[60%] "
        classNames={{
          close: S.close,
          content: S.content,
        }}
      >
        <>
          <div className="bg-white rounded-lg  overflow-hidden flex ">
            <div className="w-full p-8">
              <h2 className="text-2xl font-semibold text-gray-700">
                Request A Callback
              </h2>

              <Content />
            </div>
            <div className="hidden md:block w-1/2 relative">
              <Image
                className="absolute inset-0 !h-full !w-[100%] object-cover"
                src="/requestcallback.png"
                alt="Customer Support"
                width={600}
                height={534}
              />
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

const Content = () => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-[#00487C]">Your Details</h3>
          <p className="mt-2 text-gray-600">Name: Ankit Soni</p>
          <p className="mt-2 text-gray-600">Contact: 8888855555</p>
          <p className="mt-2 text-gray-600">Email: ankitsoni12@gmail.com</p>
          <B
            type="submit"
            leftSection={<Phone />}
            mt={"md"}
            className="!text-[#0073C6]"
          >
            Request a Callback
          </B>
        </div>
      ) : (
        <ReqForm close={close} />
      )}
    </>
  );
};

const ReqForm = ({ close }: { close: any }) => {
  const { slug } = useParams<{ slug: string }>();
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error" | "otp"
  >("idle");
  const { getInputProps, onSubmit, errors, values } = useForm({
    initialValues: {
      name: "",
      email: "",
      mobile: 0,
    },
    validate: yupResolver(reqSchema),
  });
  const displayCountryCode = (value: any) => {
    console.log(value);
  };
  const formSubmit = async (values: any) => {
    setStatus("pending");
    const data = await addContact({
      ...values,
      isProjContact: "Y",
      projIdEnc: slug,
      src: "searchcard",
    });
    console.log(data);
    setStatus("otp");
  };
  const onSuccess = async () => {
    setStatus("success");
  };
  return status === "success" ? (
    <Success close={close} />
  ) : status === "otp" ? (
    <ReqOtpForm
      callback={onSuccess}
      values={{
        ...values,
        projIdEnc: slug,
        isProjContact: "Y",
        src: "searchCard",
      }}
    />
  ) : (
    <form className="w-full max-w-sm" onSubmit={onSubmit(formSubmit)}>
      <p className="text-[#EA7A00] text-[16px] font-[600] ">
        Looks like you are not registered with us.
      </p>
      <p className="text-[#4D6677] text-[14px] font-[600] ">
        No worries add your details to get callback from builder
      </p>
      <p className="mt-2 text-green-600 font-semibold">
        Builder: Sarang By Sumadhura
      </p>
      <h2 className="text-lg font-semibold mb-4">Your Details</h2>
      <div className="flex flex-col ">
        <TextInput
          size="lg"
          label="Enter your name here"
          {...getInputProps("name")}
          placeholder="Enter your name here"
        />
        <NumberInput
          mt={"xs"}
          classNames={{
            input: N.input,
          }}
          hideControls
          size="lg"
          className="w-[100%]"
          label="Contact Number"
          placeholder="Enter your contact number here"
          {...getInputProps("mobile")}
          maxLength={10}
        />

        <CountryInput
          onSelect={displayCountryCode}
          className={`focus:outline-none min-w-[30px] max-w-[70px] self-start relative mt-[3%] ${
            (errors.mobile != undefined && errors.mobile != null) ||
            status === "error"
              ? "bottom-[65px]"
              : "bottom-[45px]"
          }  ml-[2px]`}
        />
        <TextInput
          size="lg"
          label="Enter Your Email Here"
          {...getInputProps("email")}
          placeholder="Enter your email here"
          type="email"
        />
      </div>
      <B
        className="!text-[#0073C6]"
        type="submit"
        color="#0073C6"
        leftSection={<Phone />}
        mt={"md"}
        loading={status === "pending"}
      >
        Request a Callback
      </B>
    </form>
  );
};

const Success = ({ close }: { close: any }) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[#00487C] text-2xl not-italic font-semibold leading-8 tracking-[0.96px] mt-2">
        Your call request has been sent to builder😇
      </p>
      <p className="text-[#202020] text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px]">
        Please wait for callback !
      </p>
      <B maw={150} onClick={close} className="!text-[#0073C6]">
        Go To Project
      </B>
    </div>
  );
};
