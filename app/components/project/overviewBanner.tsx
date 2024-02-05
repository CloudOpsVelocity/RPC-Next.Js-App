"use client";
import PriceBag, {
  Phone,
  PopupCrossIcon,
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
import { useForm, yupResolver } from "@mantine/form";
import { reqSchema } from "@/app/validations/project";
import { Button as B } from "@mantine/core";
import ReqOtpForm from "./forms/otpform";
import { addContact, sendContact } from "@/app/utils/api/actions/contact";
import { useParams } from "next/navigation";
import CountryInput from "../atoms/CountryInput";
import { formatCurrency } from "@/app/utils/numbers";
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
                {formatCurrency(minPrice)} - {formatCurrency(maxPrice)}
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
  const isTab = useMediaQuery(`(max-width: ${em(1280)})`);

  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error" | "otp"
  >("idle");

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        size={isTab ? "70%" : isMobile ? "90%" : "52%"}
        className="!rounded-full w-[90%]  md:w-[70%] lg:w-[65%] !p-0 "
        classNames={{
          close: S.close,
          content: S.content,
          body: S.body,
          overlay: S.overlay,
        }}
        withCloseButton={false}
        //h="534px"
      >
        <div className="bg-white relative rounded-lg min-h-[534px] w-full overflow-hidden flex ">
          <svg
            className="absolute right-0 z-10 m-[2%] cursor-pointer "
            onClick={() => close()}
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
          >
            <rect width="36" height="36" rx="18" fill="#FF0000" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M26.6588 11.7662C26.7669 11.6703 26.8526 11.5563 26.9112 11.4309C26.9697 11.3055 26.9999 11.171 27 11.0353C27.0001 10.8995 26.9701 10.765 26.9117 10.6395C26.8534 10.514 26.7678 10.4 26.6598 10.3039C26.5519 10.2079 26.4237 10.1316 26.2826 10.0796C26.1415 10.0275 25.9903 10.0007 25.8375 10.0006C25.6847 10.0006 25.5335 10.0272 25.3923 10.0791C25.2511 10.131 25.1228 10.2071 25.0148 10.303L17.9999 16.5386L10.987 10.303C10.7687 10.109 10.4726 10 10.1639 10C9.85524 10 9.55919 10.109 9.34091 10.303C9.12263 10.4971 9 10.7602 9 11.0346C9 11.309 9.12263 11.5722 9.34091 11.7662L16.3558 18L9.34091 24.2338C9.23283 24.3299 9.14709 24.4439 9.0886 24.5694C9.03011 24.695 9 24.8295 9 24.9654C9 25.1012 9.03011 25.2358 9.0886 25.3613C9.14709 25.4868 9.23283 25.6009 9.34091 25.697C9.55919 25.891 9.85524 26 10.1639 26C10.3168 26 10.4681 25.9732 10.6093 25.9212C10.7506 25.8692 10.8789 25.793 10.987 25.697L17.9999 19.4614L25.0148 25.697C25.233 25.8908 25.529 25.9995 25.8375 25.9994C26.146 25.9992 26.4418 25.8901 26.6598 25.6961C26.8778 25.502 27.0002 25.239 27 24.9647C26.9998 24.6905 26.8771 24.4276 26.6588 24.2338L19.6439 18L26.6588 11.7662Z"
              fill="white"
            />
          </svg>
          <div className={`w-[100%] md:w-[50%] p-[5%] pr-[1%] `}>
            {status !== "success" && (
              <h2 className="text-[20px] lg:text-[24px] font-[600] text-[#202020] ">
                Request A Callback
              </h2>
            )}

            <Content close={close} status={status} setStatus={setStatus} />
          </div>
          <div className="hidden md:block w-[50%] relative">
            <Image
              className="absolute inset-0 !h-full !w-[100%] object-cover"
              src="/requestcallback.png"
              alt="Customer Support"
              width={600}
              height={534}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

const Content = ({ close, status, setStatus }: any) => {
  const { data: session } = useSession();
  return session ? (
    <LoggedInUserForm close={close} status={status} setStatus={setStatus} />
  ) : (
    <ReqForm close={close} status={status} setStatus={setStatus} />
  );
};
const LoggedInUserForm = ({ close, status, setStatus }: any) => {
  const { slug } = useParams<{ slug: string }>();
  // const [status, setStatus] = useState<
  //   "idle" | "pending" | "success" | "error" | "otp"
  // >("idle");
  const { data: session } = useSession();
  const {} = useForm({
    initialValues: {
      name: session?.user.name,
      email: session?.user.email,
      mobile: session?.user.userName,
    },
    validate: yupResolver(reqSchema),
  });
  const onSubmit = async () => {
    setStatus("pending");
    const data = {
      name: session?.user?.name,
      email: session?.user?.email,
      mobile: session?.user?.userName,
      projIdEnc: slug,
      isProjContact: "Y",
      src: "searchCard",
    };
    console.log(data);
    const res = await sendContact(data);
    setStatus("success");
    // res.status ? setStatus("success") : setStatus("error");
    console.log(res);
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
        name: session?.user?.name,
        email: session?.user?.email,
        mobile: session?.user?.userName,
        projIdEnc: slug,
        isProjContact: "Y",
        src: "searchCard",
      }}
    />
  ) : (
    <div className="mt-8 w-full">
      <p className="text-[#148B16] mb-[6%] text-[14px] lg:text-[16px] italic font-bold leading-[normal] tracking-[0.64px]">
        Builder: Sarang By Sumadhura
      </p>

      <h3 className="text-[#00487C] mb-[2%] text-xl not-italic font-semibold leading-[normal] tracking-[0.8px]">
        Your Details
      </h3>

      <p className="mb-[5%] text-[#202020] text-base not-italic font-medium leading-[normal] tracking-[0.64px]">
        Name: {session?.user.name}
      </p>
      <p className="mb-[5%] text-[#202020] text-base not-italic font-medium leading-[normal] tracking-[0.64px]">
        Contact: {session?.user.userName}
      </p>
      <p className="mb-[5%] text-[#202020] text-base not-italic font-medium leading-[normal] tracking-[0.64px]">
        Email: {session?.user.email}
      </p>
      <B
        onClick={onSubmit}
        type="submit"
        leftSection={<Phone />}
        mt={"md"}
        className="!bg-[#0073C6]"
      >
        Request a Callback
      </B>
    </div>
  );
};
const ReqForm = ({
  close,
  status,
  setStatus,
}: {
  close: any;
  status: string;
  setStatus: any;
}) => {
  const { slug } = useParams<{ slug: string }>();
  // const [status, setStatus] = useState<
  //   "idle" | "pending" | "success" | "error" | "otp"
  // >("idle");
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
      <p className="text-[#EA7A00] text-base not-italic font-semibold leading-[normal] tracking-[0.64px] mb-[1%] ">
        Looks like you are not registered with us.
      </p>
      <p className="text-[#4D6677] text-sm not-italic font-semibold leading-[normal] tracking-[0.56px] mb-[2%] ">
        No worries add your details to get callback from builder
      </p>
      <p className="text-[#148B16] text-base italic font-bold leading-[normal] tracking-[0.64px] mb-[2%]">
        Builder: Sarang By Sumadhura
      </p>
      <h2 className="text-[#00487C] text-lg not-italic font-semibold leading-[normal] tracking-[0.72px] mb-[2%]">
        Your Details
      </h2>
      <div className="flex flex-col ">
        <TextInput
          size="lg"
          label="Enter your name here"
          {...getInputProps("name")}
          placeholder="Enter your name here"
          classNames={{
            input: N.input,
            description: N.description,
            wrapper: N.wrapper,
            label: N.label,
          }}
        />
        <NumberInput
          mt={"lg"}
          classNames={{
            input: N.contectInput,
            description: N.description,
            wrapper: N.wrapper,
            label: N.label,
          }}
          hideControls
          size="lg"
          className="w-[100%]  "
          label="Contact Number"
          placeholder=""
          {...getInputProps("mobile")}
          maxLength={10}
        />

        <CountryInput
          onSelect={displayCountryCode}
          className={`focus:outline-none min-w-[30px] max-w-[70px] border-t-0 border-l-0 h-[27px] border-b-0 border-r-[#4D6677] border-[2px] border-solid self-start relative mt-[2%] ${
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
          style={{ marginTop: "-10px" }}
          classNames={{
            input: N.input,
            description: N.description,
            wrapper: N.wrapper,
            label: N.label,
          }}
        />
      </div>
      <B
        className="!bg-[#0073C6]"
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
    <div className="flex flex-col gap-4 justify-center items-start h-full ">
      <p className="text-[#00487C] text-2xl not-italic font-semibold leading-8 tracking-[0.96px] mt-2">
        Your call request has been sent to builder😇
      </p>
      <p className="text-[#202020] text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px]">
        Please wait for callback !
      </p>
      <B maw={150} onClick={close} className="!bg-[#0073C6] mt-[5%] ">
        Go To Project
      </B>
    </div>
  );
};
