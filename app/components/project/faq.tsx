"use client";
import React, { useEffect, useState } from "react";
import { Textarea, Button, Modal } from "@mantine/core";
import classes from "@/app/styles/FaqWithBg.module.css";
import { FAQ } from "@/app/validations/types/project";
import { addQna } from "@/app/utils/api/actions/Qna";
import { useParams } from "next/navigation";
import { useForm, yupResolver } from "@mantine/form";
import { qnaSchema } from "@/app/validations/project";
import { useSession } from "next-auth/react";
import handleTrimAndReplace from "@/app/utils/input/validations";
import clsx from "clsx";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import FaqReadMore from "../atoms/faq/FaqReadmore";
import StepCscs from "@/app/styles/Stepper.module.css";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import S from "@/app/styles/Qna.module.css";
import Close from "./button/close";
import {
  CompareMessage,
  QnaSuccesssMessage,
  RentListingNotFoundMessage,
  SellListingNotFoundMessage,
} from "./success";
import { useMessagePopup } from "@/app/hooks/project/useMessagePopup";
type FaqWithBgProps = {
  data: FAQ[];
  projName: string;
};

export default function FaqWithBg({ data, projName }: FaqWithBgProps) {
  const isMobile = useMediaQuery(`(max-width: 601px)`);
  return (
    <div
      className={data?.length > 0 ? classes.wrapper : "w-[90%] m-auto"}
      id="faq"
    >
      <div className="flex sm:justify-center items-center w-full ">
        {data?.length > 0 && (
          <>
            <div className="relative mr-[-140px]  sm:mr-[-70px] bottom-[20px] w-[168px] h-[74px] rounded-[50%] blur-[29.5px] bg-[#0093ff4d] "></div>
            <h2 className="text-h2 lg:text-[32px] font-[600] text-[#001F35] mb-1 sm:mb-16 text-center sm:text-start">
              Frequently Asked Questions of{" "}
              <span className="text-[#148B16] font-[700]  ">{projName}</span>{" "}
            </h2>
          </>
        )}
      </div>
      <div className="mb-4">
        {data?.map((faq, index) => {
          return (
            faq.faqAnswer &&
            faq.faqQuestion &&
            (isMobile ? (
              <MobileFaqCard
                faqQuestion={faq.faqQuestion}
                faqAnswer={faq.faqAnswer}
                last={index === data.length - 1}
              />
            ) : (
              <FaqCard
                faqQuestion={faq.faqQuestion}
                faqAnswer={faq.faqAnswer}
                key={index}
                last={index === data.length - 1}
              />
            ))
          );
        })}
      </div>
      <AddQnaForm projName={projName} />
    </div>
  );
}

const AddQnaForm = ({ projName }: { projName: string }) => {
  const { slug } = useParams<{ slug: string }>();
  const [, { open }] = usePopShortList();
  const { data: session } = useSession();
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >();
  const {
    getInputProps,
    onSubmit,
    setErrors,
    reset,
    setFieldValue,
    errors,
    values,
  } = useForm({
    initialValues: {
      question: "",
    },
    validate: yupResolver(qnaSchema),
  });
  const [opened, { close, open: openSuccesPopup }] = useMessagePopup("qna");
  const handleQna = async () => {
    try {
      await addQna({ question: values.question, projIdEnc: slug });
      openSuccesPopup();
      setStatus("success");
    } catch (error: any) {
      setErrors({ question: error.message });
      setStatus("error");
    }
  };
  const formSubmit = async (values: any) => {
    if (session) {
      setStatus("pending");
      handleQna();
    } else {
      open(handleQna);
    }
  };
  const onClose = () => {
    close();
    opened.type === "qna" && reset();
  };
  const isMobile = useMediaQuery(`(max-width: 601px)`);
  return (
    <form
      className="max-w-[100%] mx-auto sm:my-8 sm:mt-[5%] rounded-lg space-y-2"
      onSubmit={onSubmit(formSubmit)}
    >
      <h2 className="inline-flex items-center gap-3 p-2 rounded-2xl bg-[#ecf7ff] sm:mb-7">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          className="sm:h-[52px] sm:w-[52px] h-[30px] w-[30px]"
        >
          <path
            d="M13.9865 41.1667L4.33398 48.75V8.66667C4.33398 8.09203 4.56226 7.54093 4.96859 7.1346C5.37492 6.72827 5.92602 6.5 6.50065 6.5H45.5006C46.0753 6.5 46.6264 6.72827 47.0327 7.1346C47.439 7.54093 47.6673 8.09203 47.6673 8.66667V39C47.6673 39.5746 47.439 40.1257 47.0327 40.5321C46.6264 40.9384 46.0753 41.1667 45.5006 41.1667H13.9865ZM23.834 30.3333V34.6667H28.1673V30.3333H23.834ZM18.5625 19.0948L22.8135 19.9463C22.9341 19.3428 23.2237 18.7859 23.6484 18.3404C24.0732 17.895 24.6157 17.5793 25.2129 17.4302C25.8101 17.281 26.4373 17.3045 27.0216 17.4979C27.606 17.6913 28.1234 18.0467 28.5136 18.5226C28.9039 18.9986 29.151 19.5756 29.2261 20.1865C29.3013 20.7974 29.2014 21.4171 28.9382 21.9734C28.6749 22.5298 28.2591 23 27.739 23.3292C27.219 23.6585 26.6162 23.8333 26.0006 23.8333H23.834V28.1667H26.0006C27.4366 28.1662 28.843 27.7581 30.0561 26.9897C31.2692 26.2213 32.2393 25.1242 32.8533 23.8261C33.4674 22.528 33.7002 21.0823 33.5248 19.657C33.3494 18.2318 32.773 16.8856 31.8625 15.7752C30.952 14.6647 29.7449 13.8356 28.3817 13.3843C27.0185 12.933 25.5551 12.878 24.1618 13.2257C22.7686 13.5735 21.5027 14.3097 20.5115 15.3487C19.5202 16.3877 18.8444 17.6868 18.5625 19.0948Z"
            fill="#18B8F2"
          />
        </svg>{" "}
        <span className="text-[#242424] text-h2 sm:text-[32px] not-italic font-bold leading-[normal]">
          Have any Question? Ask Here 👇
        </span>
      </h2>
      <h2 className="font-[700] text-[#233333] text-[14px] md:text-[28px]  ">
        Ask your question related to
        <span className="!text-green-600"> {projName} Project!</span>
      </h2>

      <div className=" gap-4">
        <div className="flex-1">
          <Textarea
            id="question"
            name="question"
            placeholder="Type your question here . . . ."
            rows={isMobile ? 2 : 4}
            mb={"sm"}
            {...getInputProps("question")}
            className={clsx(
              "placeholder:!text-[#4D6677] placeholder:!text-[18px]  font-medium leading-[23.784px]  rounded-[10px] ",
              !errors.question && "!border !border-solid !border-[#737579]"
            )}
            size="lg"
            radius={"10px"}
            onBlur={(e) =>
              handleTrimAndReplace(e, "question", setFieldValue, "dis")
            }
            classNames={{
              input: StepCscs.textAreaInput,
            }}
          />
        </div>
        <Button
          type="submit"
          loading={status === "pending"}
          size={isMobile ? "xs" : "md"}
          className="bg-btnPrimary"
        >
          Submit
        </Button>
      </div>
      <Success
        text={values.question}
        opened={opened}
        onClose={onClose}
        projName={projName}
      />
    </form>
  );
};

const FaqCard = ({
  faqQuestion,
  faqAnswer,
  last,
}: {
  faqQuestion: string;
  faqAnswer: string;
  last: boolean;
}) => {
  return (
    <div>
      <h4 className=" text-[#242424] sm:text-[28px] not-italic font-medium sm:font-bold leading-[normal] mb-4 capitalize">
        {faqQuestion}
      </h4>
      <FaqReadMore text={faqAnswer} title={faqQuestion} />
      {!last && <hr className="bg-[#00000080] my-4 sm:my-[59px] h-[2px]" />}
    </div>
  );
};
const MobileFaqCard = ({
  faqQuestion,
  faqAnswer,
  last,
}: {
  faqQuestion: string;
  faqAnswer: string;
  last: boolean;
}) => {
  return (
    <div className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50 mt-2 rounded-md">
      <button
        type="button"
        className="flex items-center justify-between w-full px-4 pt-1 pb-1 sm:p-6"
      >
        <span className="flex  font-semibold text-black text-left">
          {" "}
          {faqQuestion}{" "}
        </span>
      </button>
      <div className="px-4 pb-2 sm:px-6 sm:pb-6">
        <p>
          {/* {faqAnswer} */}
          <FaqReadMore text={faqAnswer} title={faqQuestion} maxLines={1} />
        </p>
      </div>
    </div>
  );
};

const Success = ({ text, opened, onClose, projName }: any) => {
  const renderComponent = {
    qna: <QnaSuccesssMessage />,
    Rlisting: <RentListingNotFoundMessage />,
    Slisting: <SellListingNotFoundMessage />,
    compare: <CompareMessage />,
  };
  type RenderComponentKeys = keyof typeof renderComponent;

  const ComponentTorender =
    renderComponent[opened.type as RenderComponentKeys] || null;
  const isMobile = useMediaQuery(`(max-width: 750px)`);
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <Modal
      classNames={{
        title: S.title,
        root: S.root,
        close: S.close,
        content: S.content,
        overlay: S.overlay,
        header: S.disabled,
        body: S.body,
      }}
      opened={opened.status}
      onClose={onClose}
      centered
      title="Add Rating"
      size={isMobile ? "100%" : "auto"}
    >
      <Close close={onClose} className="absolute top-2 right-2 z-50" />

      {ComponentTorender}
    </Modal>
  );
};
