import useBuilder from "@/app/hooks/useBuilder";
import { Phone } from "@/app/images/commonSvgs";
import N from "@/app/styles/Numinput.module.css";
import React, { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { Modal, NumberInput, TextInput, em } from "@mantine/core";
import { useSession } from "next-auth/react";
import S from "@/app/styles/Req.module.css";
import { useForm, yupResolver } from "@mantine/form";
import { reqSchema } from "@/app/validations/project";
import { Button as B } from "@mantine/core";
import { addContact, sendContact } from "@/app/utils/api/actions/contact";
import { useParams } from "next/navigation";
import { popupStateAtom } from "@/app/hooks/useReqCallPop";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { useAtomValue } from "jotai";
import Image from "next/image";
import ReqOtpForm from "../../project/forms/otpform";
import CountryInput from "../../atoms/CountryInput";
import handleTrimAndReplace from "@/app/utils/input/validations";
import { ReqcallbackMessage } from "../../project/success";
import Styles from "@/app/styles/Qna.module.css";
import clsx from "clsx";
import { NearByDataAtom } from "@/app/store/nearby";
import reqStyles from "@/app/styles/Req.module.css";
const RequestCallBackModal = ({
  opened,
  close,
  builderName,
  name,
  source,
}: {
  opened: any;
  close: any;
  builderName: string;
  name?: string;
  source: string;
}) => {
  const isMobile = useMediaQuery("(max-width: 750px)");
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error" | "otp"
  >("idle");
  const handleClose = () => {
    close();
    setTimeout(() => {
      setStatus("idle");
    }, 500);
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
        centered
        size={isMobile ? "100%" : status !== "success" ? "65%" : "auto"}
        className="!rounded-full w-[90%]  md:w-[70%] lg:w-[65%] !p-0 "
        classNames={
          status === "success"
            ? {
                title: Styles.title,
                root: Styles.root,
                close: Styles.close,
                content: Styles.content,
                overlay: Styles.overlay,
                header: Styles.disabled,
                body: Styles.body,
              }
            : {
                close: S.close,
                content: S.content,
                body: S.body,
                overlay: S.overlay,
              }
        }
        withCloseButton={false}
      >
        {
          <div
            className={clsx(
              "bg-white relative rounded-lg  w-full overflow-hidden flex ",
              status !== "success" && "min-h-[534px]"
            )}
          >
            <svg
              className="absolute right-0 z-10 m-[2%] cursor-pointer "
              onClick={handleClose}
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
            {status === "success" ? (
              <ReqcallbackMessage close={handleClose} />
            ) : (
              <>
                <div className={`w-[100%] md:w-[50%] p-[5%] pr-[1%] `}>
                  {status === "idle" && (
                    <h2 className="text-[20px] lg:text-[24px] font-[600] text-[#202020] ">
                      Request Callback
                    </h2>
                  )}

                  <Content
                    close={close}
                    status={status}
                    setStatus={setStatus}
                    name={builderName}
                    projName={name}
                    builderName={builderName}
                    source={source}
                  />
                </div>
                {(status === "idle" || status === "otp") && (
                  <div className="hidden md:block w-[50%] relative">
                    <Image
                      className="absolute inset-0 !h-full !w-[100%] object-cover"
                      src="/requestcallback.png"
                      alt="Customer Support"
                      width={600}
                      height={534}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        }
      </Modal>
    </>
  );
};
export default RequestCallBackModal;
const Content = ({
  close,
  status,
  setStatus,
  name,
  projName,
  source,
  builderName,
}: any) => {
  const { data: session } = useSession();
  return session ? (
    <LoggedInUserForm
      close={close}
      status={status}
      setStatus={setStatus}
      projName={projName}
      source={source}
      name={name}
      builderName={builderName}
    />
  ) : (
    <ReqForm
      close={close}
      status={status}
      setStatus={setStatus}
      projName={projName}
      source={source}
      builderName={builderName}
      name={builderName}
    />
  );
};
const LoggedInUserForm = ({
  close,
  status,
  setStatus,
  name,
  projName,
  source,
  builderName,
}: any) => {
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
  const propName = popupState.type === "prop" ? "propIdEnc" : "projIdEnc";
  const onSubmit = async () => {
    setStatus("pending");
    const data = {
      name: session?.user?.name,
      email: session?.user?.email,
      mobile: session?.user?.userName,
      [propName]: popupState.projectID ?? "",
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
  const reqData = useAtomValue(NearByDataAtom);
  return status === "otp" ? (
    <ReqOtpForm
      callback={onSuccess}
      values={{
        name: session?.user?.name,
        email: session?.user?.email,
        mobile: session?.user?.userName,
        [propName]: popupState.projectID ?? "",
        isProjContact: "Y",
        src: "searchCard",
      }}
    />
  ) : (
    <div className="mt-6 w-full">
      <p className=" mb-[8px] text-[14px] lg:text-[16px] text-[#00487C] text-xl italic font-bold leading-[normal] tracking-[0.8px]">
        <span className="text-[#4D6677] text-xl italic font-medium leading-[normal] tracking-[0.8px]">
          {" "}
          Call For:
        </span>{" "}
        {source === "projCard" ? reqData?.projName : projName}
      </p>
      <p className="text-[#148B16] mb-[6%] text-[14px] lg:text-[16px] italic font-bold leading-[normal] tracking-[0.64px]">
        <span className="text-[#4D6677] text-xl italic font-medium leading-[normal] tracking-[0.8px]">
          Builder:
        </span>{" "}
        {source === "projCard" ? reqData?.builderName : builderName}
      </p>
      {/* Notifcation */}
      <div className=" flex justify-center items-center gap-2.5 border p-2.5 rounded-xl border-solid border-[#FFD600] bg-[#fff4bb] text-[#242424] text-[17px] not-italic font-semibold leading-[normal] mb-6">
        You will receive about your inquiries on below contact number
      </div>
      {/* NOTIFICATION END */}
      <h3 className="text-[#00487C] mb-[2%] text-xl not-italic font-semibold leading-[normal] tracking-[0.8px]">
        Your Details
      </h3>

      <p className="text-[#202020] text-base not-italic font-semibold leading-[normal] tracking-[0.64px] mb-2">
        Name: {session?.user.name}
      </p>
      <p className="text-[#202020] text-base not-italic font-semibold leading-[normal] tracking-[0.64px] mb-2">
        Contact: {session?.user.userName}
      </p>
      <p className="text-[#202020] text-base not-italic font-semibold leading-[normal] tracking-[0.64px] mb-2">
        Email: {session?.user.email}
      </p>
      <B
        onClick={onSubmit}
        type="submit"
        mt={"md"}
        className="!bg-[#0073C6] text-xl p-2"
        size="md"
      >
        Request Callback
      </B>
    </div>
  );
};
const ReqForm = ({
  close,
  status,
  setStatus,
  name,
  source,
  builderName,
}: {
  close: any;
  status: string;
  setStatus: any;
  name: string;
  projName: string;
  source: string;
  builderName: string;
}) => {
  const { slug } = useParams<{ slug: string }>();
  const popupState = useAtomValue(popupStateAtom);
  const reqData = useAtomValue(NearByDataAtom);
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      mobile: null,
    },
    validate: yupResolver(reqSchema),
  });

  const displayCountryCode = (value: any) => {
    console.log(value);
  };
  const propName = popupState.type === "prop" ? "propIdEnc" : "projIdEnc";
  const formSubmit = async (values: any) => {
    setStatus("pending");
    const data = await addContact({
      ...values,
      isProjContact: "Y",
      [propName]: popupState.projectID,
      src: "searchcard",
    });
    console.log(data);
    setStatus("otp");
  };
  const onSuccess = async () => {
    setStatus("success");
  };
  const bn = source === "projCard" ? reqData.builderName : name;

  return status === "success" ? (
    <Success close={close} />
  ) : status === "otp" ? (
    <ReqOtpForm
      callback={onSuccess}
      values={{
        ...form.values,
        [propName]: popupState.projectID,
        isProjContact: "Y",
        src: "searchCard",
      }}
      builderName={bn}
    />
  ) : (
    <form className="w-full max-w-md" onSubmit={form.onSubmit(formSubmit)}>
      <p className="text-[#EA7A00] text-base not-italic font-semibold leading-[normal] tracking-[0.64px] mb-[1%] ">
        Looks like you are not registered with us.
      </p>
      <p className="text-[#4D6677] text-sm not-italic font-semibold leading-[normal] tracking-[0.56px] mb-[2%] ">
        No worries add your details to get callback from builder
      </p>
      <p className="text-[#148B16] text-base italic font-bold leading-[normal] tracking-[0.64px] mb-[2%]">
        Builder: {bn}
      </p>
      <h2 className="text-[#00487C] text-lg not-italic font-semibold leading-[normal] tracking-[0.72px] mb-[2%]">
        Your Details
      </h2>
      <div className="flex flex-col max-w-sm">
        <TextInput
          size="lg"
          label="Enter Your Name Here"
          {...form.getInputProps("name")}
          placeholder="Enter Your Name Here"
          classNames={{
            input: reqStyles.input,
            label: N.label,
            error: reqStyles.error,
            wrapper: reqStyles.wrapper,
          }}
          onBlur={(e) => handleTrimAndReplace(e, "name", form)}
        />
        <NumberInput
          mt={"lg"}
          classNames={{
            input: reqStyles.numInput,
            label: N.label,
            error: reqStyles.error,
            wrapper: reqStyles.wrapper,
          }}
          hideControls
          size="lg"
          className="w-[100%]  "
          label="Contact Number"
          placeholder="Enter Your Contact Number"
          {...form.getInputProps("mobile")}
          maxLength={10}
          onPaste={(event) => {
            const pastedText = event.clipboardData.getData("text/plain");
            const trimmedText = pastedText.replace(/\s/g, "");
            const first10Digits = trimmedText.replace(/\D/g, "").slice(0, 10);
            form.setFieldValue("mobile", first10Digits as any);
          }}
        />
        <p
          className={`focus:outline-none min-w-[30px] max-w-[70px] border-t-0 border-l-0 h-[27px] border-b-0 border-r-[#4D6677] border-[2px] border-solid self-start relative mt-[2%] pl-2 pr-3 ${
            (form.errors.mobile != undefined && form.errors.mobile != null) ||
            status === "error"
              ? "bottom-[65px]"
              : "bottom-[45px]"
          }  ml-[2px]`}
        >
          + 91
        </p>
        {/* <CountryInput
          onSelect={displayCountryCode}
          className={`focus:outline-none min-w-[30px] max-w-[70px] border-t-0 border-l-0 h-[27px] border-b-0 border-r-[#4D6677] border-[2px] border-solid self-start relative mt-[2%] ${
            (form.errors.mobile != undefined && form.errors.mobile != null) ||
            status === "error"
              ? "bottom-[65px]"
              : "bottom-[45px]"
          }  ml-[2px]`}
        /> */}
        <TextInput
          size="lg"
          label="Enter Your Email Here"
          {...form.getInputProps("email")}
          placeholder="Enter Your Email Here"
          type="email"
          style={{ marginTop: "-10px" }}
          classNames={{
            input: reqStyles.input,
            label: N.label,
            error: reqStyles.error,
            wrapper: reqStyles.wrapper,
          }}
          onBlur={(e) => handleTrimAndReplace(e, "email", form)}
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
