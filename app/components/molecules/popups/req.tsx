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
import { get_posted_by } from "@/app/utils/dyanamic/projects";
import Close from "../../project/button/close";
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
  cg?: string;
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
        className="rounded-lg w-[90%]  md:w-[70%] lg:w-[65%] !p-0 "
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
              status !== "success" && "min-h-[]"
            )}
          >
            <Close
              close={handleClose}
              className="absolute h-[28px] w-[28px] right-0 z-10 m-[2%] cursor-pointer "
            />

            {status === "success" ? (
              <ReqcallbackMessage close={handleClose} />
            ) : (
              <>
                <div className={`w-[100%] md:w-[50%] px-[3%] py-[3%]`}>
                  {status === "idle" && (
                    <h2 className="text-[18px]  lg:text-[24px] font-[600] text-[#202020]  ">
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
                {
                  <div className="hidden md:block w-[50%] relative">
                    <Image
                      className="absolute inset-0 !h-full !w-[100%] object-cover"
                      src="/requestcallback.png"
                      alt="Customer Support"
                      width={600}
                      height={534}
                    />
                  </div>
                }
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
  const { pushToRequestCallbacks } = useShortlistAndCompare();
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
  const isProjContact = popupState.type === "prop" ? "N" : "Y";

  let Posted_BY = get_posted_by(popupState.cg);
  const onSubmit = async () => {
    setStatus("pending");
    const data = {
      name: session?.user?.name,
      email: session?.user?.email,
      mobile: session?.user?.userName,
      [propName]: popupState.projectID ?? "",
      isProjContact: isProjContact,
      src: "searchCard",
    };

    await pushToRequestCallbacks(popupState.projectID ?? "", async () => {
      const res = await sendContact(data);
    });
    setStatus("success");
  };
  const onSuccess = async () => {
    setStatus("success");
  };

  const reqData = useAtomValue(NearByDataAtom);
  let builder = source === "projCard" ? reqData?.builderName : builderName;
  let title = source === "projCard" ? reqData?.projName : projName;
  return status === "otp" ? (
    <ReqOtpForm
      callback={onSuccess}
      values={{
        name: session?.user?.name,
        email: session?.user?.email,
        mobile: session?.user?.userName,
        [propName]: popupState.projectID ?? "",
        isProjContact: isProjContact,
        src: "searchCard",
      }}
      builderName={builder}
      title={title}
      Posted_BY={Posted_BY}
    />
  ) : (
    <div className="mt-6 w-full">
      <p className=" mb-[8px]  lg:text-[20px] text-[#00487c] text-[14px] xl:text-xl italic font-bold leading-[normal] tracking-[0.8px]">
        <span className="text-[#4D6677] text-[18px] xl:text-xl italic font-medium leading-[normal] tracking-[0.8px]">
          {" "}
          Call For:
        </span>{" "}
        <span className="text-[14px] xl:text-[24px]">{title}</span>
      </p>
      <p className="text-[#148B16] mb-[6%] text-[14px] xl:text-xl lg:text-[20px] italic font-bold leading-[normal] tracking-[0.64px]">
        <span className="text-[#4D6677] text-[18px] xl:text-xl italic font-medium leading-[normal] tracking-[0.8px]">
          {Posted_BY}:
        </span>{" "}
        <span className="text-[14px] xl:text-[24px]">{builder}</span>
      </p>
      {/* Notifcation */}
      <div className=" flex justify-center items-center gap-2.5 border p-2.5 rounded-xl border-solid border-[#FFD600] bg-[#fff4bb] text-[#242424] text-[15px] xl:text-[17px] not-italic font-semibold leading-[normal] mb-6">
        You will receive about your inquiries on below contact number
      </div>
      {/* NOTIFICATION END */}
      <h3 className="mb-[2%]  text-[#001F35] text-[18px] xl:text-xl not-italic font-bold">
        Your Details
      </h3>

      <p className="text-[#202020] text-[14px] xl:text-base not-italic font-semibold leading-[normal] tracking-[0.64px] mb-2">
        Name: {session?.user.name}
      </p>
      <p className="text-[#202020] text-[14px] xl:text-base not-italic font-semibold leading-[normal] tracking-[0.64px] mb-2">
        Contact: {session?.user.userName}
      </p>
      <p className="text-[#202020] text-[14px] xl:text-base not-italic font-semibold leading-[normal] tracking-[0.64px] mb-2">
        Email: {session?.user.email}
      </p>
      <B
        onClick={onSubmit}
        type="submit"
        mt={"md"}
        className="!bg-[#0073C6]  text-xl p-2"
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
  projName,
}: {
  close: any;
  status: string;
  setStatus: any;
  name: string;
  projName: string;
  source: string;
  builderName: string;
}) => {
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
  const propName = popupState.type === "prop" ? "propIdEnc" : "projIdEnc";
  let Posted_BY = get_posted_by(popupState.cg);
  const isProjContact = popupState.type === "prop" ? "N" : "Y";
  const formSubmit = async (values: any) => {
    setStatus("pending");
    const data = await addContact({
      ...values,
      isProjContact: isProjContact,
      [propName]: popupState.projectID,
      src: "searchcard",
    });
    setStatus("otp");
  };
  const onSuccess = async () => {
    setStatus("success");
  };
  console.log(reqData);
  const bn = source === "projCard" ? reqData.builderName : name;
  const title = source === "projCard" ? reqData?.projName : projName;
  return status === "success" ? (
    <Success close={close} />
  ) : status === "otp" ? (
    <ReqOtpForm
      callback={onSuccess}
      values={{
        ...form.values,
        [propName]: popupState.projectID,
        isProjContact: isProjContact,
        src: "searchCard",
      }}
      builderName={bn}
      title={title}
      Posted_BY={Posted_BY}
    />
  ) : (
    <form
      className="w-full max-w-[500px] "
      onSubmit={form.onSubmit(formSubmit)}
    >
      <p className=" text-[#00487c] text-[13px]  xl:text-lg italic font-bold leading-[normal] tracking-[0.36px] capitalize mb-[2%] mt-1">
        <span className="text-[#4D6677] text-sm xl:text-lg italic font-medium leading-[normal] tracking-[0.36px] ">
          Call For
        </span>{" "}
        : {title}
      </p>
      <p className="text-[#148B16] text-[13px] italic font-bold leading-[normal] tracking-[0.64px] mb-[2%] ">
        <span className="text-[#4D6677] text-sm  xl:text-lg italic font-medium leading-[normal] tracking-[0.36px]">
          {Posted_BY}
        </span>{" "}
        : {bn}
      </p>
      <p className="text-[#EA7A00] text-[14px] xl:text-base not-italic font-semibold leading-[normal] tracking-[0.64px] mb-[1%] ">
        Looks like you are not registered with us.
      </p>
      <p className="text-[#4D6677] text-[14px] xl:text-sm not-italic font-semibold leading-[normal] tracking-[0.56px] mb-[2%] ">
        No worries add your details to get callback from builder
      </p>

      <h2 className="text-[#00487C] text-[18px] font-semibold xl:text-xl not-italic xl:font-bold mb-[1.5%]">
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
        /* leftSection={<Phone />} */
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
      <p className="text-[#00487C] text-[18px] xl:text-2xl not-italic font-semibold leading-8 tracking-[0.96px] mt-2">
        Your call request has been sent to builder😇
      </p>
      <p className="text-[#202020]  xl:text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px]">
        Please wait for callback !
      </p>
      <B maw={150} onClick={close} className="!bg-[#0073C6] mt-[5%] ">
        Go To Project
      </B>
    </div>
  );
};
