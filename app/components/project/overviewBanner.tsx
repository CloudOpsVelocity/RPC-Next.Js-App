"use client";
import PriceBag, { Phone, WhatsAppButton } from "@/app/images/commonSvgs";
import N from "@/app/styles/Numinput.module.css";
import React from "react";
import Button from "../../elements/button";
import { NumberInput, TextInput } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useForm, yupResolver } from "@mantine/form";
import { reqSchema } from "@/app/validations/project";
import { Button as B } from "@mantine/core";
import ReqOtpForm from "./forms/otpform";
import { addContact, sendContact } from "@/app/utils/api/actions/contact";
import { useParams } from "next/navigation";
import CountryInput from "../atoms/CountryInput";
import { formatCurrency } from "@/app/utils/numbers";
import { popupStateAtom, useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { useAtomValue } from "jotai";
import RequestCallBackModal from "../molecules/popups/req";
export default function OverviewBanner({
  minPrice,
  maxPrice,
  name,
  builderId,
}: {
  minPrice: number;
  maxPrice: number;
  name: string;
  builderId: number;
}) {
  const [opened, { open, close }] = useReqCallPopup();
  const { slug } = useParams<{ slug: string }>();

  return (
    <>
      <div className="flex justify-start items-center w-full flex-col md:flex-row bg-gradient-to-r from-[#EFF5FF] /50 to-[#F2FAFF ]/50 ">
        <PriceBag className="w-[150px] h-[170px] md:w-[237px] md:h-[263px] " />

        <div className="flex justify-between items-center w-[100%] flex-row ml-[3%] p-[2%] flex-wrap">
          <div className="">
            <p className="text-[#212C33] text-[24px] lg:text-[32px] font-[600] mb-4">
              PRICE RANGE{" "}
              <span className="text-[#00487C] text-[24px] md:text-[32px] lg:text-[40px] whitespace-nowrap font-[700]">
                {formatCurrency(minPrice)} - {formatCurrency(maxPrice)}
              </span>
            </p>
            <Button
              icon={<Phone />}
              title="Request a Callback"
              buttonClass=" text-[#FFF] text-[16px] font-[600] bg-[#0073C6]  rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[6px]  "
              onChange={() => open("banner", slug)}
            />
          </div>

          <WhatsAppButton className="cursor-pointer" name={name} />
        </div>

        <RequestCallBackModal
          close={close}
          opened={opened}
          builderId={builderId}
        />
      </div>
    </>
  );
}

const Content = ({ close, status, setStatus, name }: any) => {
  const { data: session } = useSession();
  return session ? (
    <LoggedInUserForm
      close={close}
      status={status}
      setStatus={setStatus}
      name={name}
    />
  ) : (
    <ReqForm close={close} status={status} setStatus={setStatus} name={name} />
  );
};
const LoggedInUserForm = ({ close, status, setStatus, name }: any) => {
  const { slug } = useParams<{ slug: string }>();
  const { pushToRequestCallbacks, isCallbackSubmitted } =
    useShortlistAndCompare();
  const popupState = useAtomValue(popupStateAtom);

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
      projIdEnc: popupState.projectID ?? "",
      isProjContact: "Y",
      src: "searchCard",
    };

    await pushToRequestCallbacks(popupState.projectID ?? "", async () => {
      const res = await sendContact(data);
    });
    setStatus("success");
    // res.status ? setStatus("success") : setStatus("error");
    // console.log(res);
  };
  const onSuccess = async () => {
    setStatus("success");
  };
  const handleClose = () => {
    setStatus("idle");
    close();
  };
  return status === "success" ||
    isCallbackSubmitted(popupState.projectID || "") ? (
    <Success close={handleClose} />
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
        Builder: {name}
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
  name,
}: {
  close: any;
  status: string;
  setStatus: any;
  name: string;
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
        Builder: {name}
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
