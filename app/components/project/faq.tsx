"use client";
import React, { useState } from "react";
import { Accordion, Textarea, Button, Modal, ScrollArea } from "@mantine/core";
import classes from "@/app/styles/FaqWithBg.module.css";
import { FAQ } from "@/app/validations/types/project";
import { addQna } from "@/app/utils/api/actions/Qna";
import { useParams } from "next/navigation";
import { useForm, yupResolver } from "@mantine/form";
import { qnaSchema } from "@/app/validations/project";
import { useSession } from "next-auth/react";
import { MinusIcon, PlusIcon } from "@/app/images/commonSvgs";
import toast from "react-hot-toast";
import handleTrimAndReplace from "@/app/utils/input/validations";
import clsx from "clsx";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import FaqReadMore from "../atoms/faq/FaqReadmore";
import StepCscs from "@/app/styles/Stepper.module.css";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import S from "@/app/styles/Rating.module.css";
import { getRandomValues } from "crypto";
import Close from "./button/close";
type FaqWithBgProps = {
  data: FAQ[];
  projName: string;
};

let ind = 0;

export default function FaqWithBg({ data, projName }: FaqWithBgProps) {
  const [value, setValue] = useState<string[]>(
    data?.map((_, index) => `faq-${index}`)
  );
  return (
    <div className={classes.wrapper} id="faq">
      <div className="flex justify-center items-center w-full ">
        <div className="relative mr-[-70px] bottom-[20px] w-[168px] h-[74px] rounded-[50%] blur-[29.5px] bg-[#0093ff4d] "></div>

        <h1 className="text-[24px] lg:text-[32px] font-[600] text-[#001F35] mb-16">
          Frequently Asked Questions of
          <span className="text-[#148B16] font-[700] uppercase ml-4">
            {projName}
          </span>{" "}
        </h1>
      </div>
      <div>
        {data?.map((faq, index) => {
          return (
            <FaqCard
              faqQuestion={faq.faqQuestion}
              faqAnswer={faq.faqAnswer}
              key={index}
              last={index === data.length - 1}
            />
          );
        })}
      </div>
      {/* <Accordion
        value={value}
        onChange={setValue}
        chevronPosition="right"
        defaultValue="reset-password"
        chevronSize={22}
        variant="separated"
        classNames={{
          chevron: classes.chevron,
          panel: classes.panel,
          item: classes.item,
          control: classes.control,
        }}
        styles={{
          label: { color: "var(--mantine-color-black)" },
          item: { border: 0 },
        }}
        chevron={false}
        transitionDuration={0}
      >
        {data?.map((faq, index) => {
          return (
            <Accordion.Item
              key={index}
              value={`faq-${index}`}
              className=" !border-0 !border-b-[1px] !border-[#c4c4c4] mb-[3%] !rounded-0 !border-solid "
            >
              <Accordion.Control
                classNames={{ label: classes.title, icon: classes.icon }}
                icon={
                  value.includes(`faq-${index}`) ? <MinusIcon /> : <PlusIcon />
                }
              >
                <span
                  className={`${
                    value.includes(`faq-${index}`)
                      ? "!text-[#046DBA]"
                      : "!text-[#303A42]"
                  }`}
                >
                  {faq.faqQuestion} ?
                </span>
              </Accordion.Control>
              <Accordion.Panel classNames={{ content: classes.content }}>
                {faq.faqAnswer}
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion> */}
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
  const [opened, { close, open: openSuccesPopup }] = useDisclosure(false);
  const formSubmit = async (values: any) => {
    if (session) {
      setStatus("pending");
      try {
        await addQna({ question: values.question, projIdEnc: slug });
        openSuccesPopup();
        setStatus("success");
      } catch (error: any) {
        setErrors({ question: error.message });
        setStatus("error");
      }
    } else {
      open();
    }
  };
  const onClose = () => {
    close();
    reset();
  };
  return (
    <form
      className="max-w-[100%] mx-auto my-8 mt-[5%] rounded-lg space-y-2"
      onSubmit={onSubmit(formSubmit)}
    >
      <h2 className="font-[700] text-[#233333] text-[20px] md:text-[28px]  ">
        Ask your question related to
        <span className="!text-green-600"> {projName} Project!</span>
      </h2>

      <div className=" gap-4">
        <div className="flex-1">
          <Textarea
            id="question"
            name="question"
            placeholder="Type your question here"
            rows={4}
            mb={"sm"}
            {...getInputProps("question")}
            className={clsx(
              "placeholder:!text-[#4D6677] placeholder:!text-[28px] italic font-medium leading-[23.784px]  rounded-[10px] ",
              !errors.question && "!border !border-solid !border-[#737579]"
            )}
            size="lg"
            radius={"10px"}
            onBlur={(e) =>
              handleTrimAndReplace(e, "question", setFieldValue, "dis")
            }
            classNames={{
              input: StepCscs.textInput,
            }}
          />
        </div>
        <Button
          type="submit"
          loading={status === "pending"}
          className="inline-flex items-center justify-center rounded-md text-[20px] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#0073C6] text-white"
        >
          Send
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
      <h4 className=" text-[#046DBA] text-[28px] not-italic font-bold leading-[normal] mb-4">
        {faqQuestion}
      </h4>
      <FaqReadMore text={faqAnswer} title={faqQuestion} />
      {!last && <hr className="bg-[#00000080] my-[59px] h-[2px]" />}
    </div>
  );
};

const Success = ({ text, opened, onClose, projName }: any) => {
  const isMobile = useMediaQuery(`(max-width: 750px)`);
  console.log(text);
  return (
    <Modal
      classNames={{
        title: S.title,
        root: S.root,
        close: S.close,
        content: S.content,
        overlay: S.overlay,
        header: S.disabled,
      }}
      opened={opened}
      onClose={onClose}
      centered
      title="Add Rating"
      size={isMobile ? "100%" : "45%"}
    >
      <Close close={onClose} className="absolute top-8 right-6" />
      <div className="px-5 py-8">
        <h1 className="text-[#001F35] text-4xl not-italic font-semibold leading-[normal] mb-[20px]">
          Congratulations 🎉
        </h1>
        <p className="text-[#202020] text-2xl not-italic font-medium leading-[normal] mb-5">
          Your Question has been submitted successfully!
        </p>
        <p className="text-[#202020] text-2xl not-italic font-medium leading-[normal] mb-[30px]">
          Project:{" "}
          <span className="text-[#148B16] text-2xl not-italic font-bold leading-[normal] capitalize">
            {projName}
          </span>
        </p>
        <div className="inline-flex flex-col justify-center items-start gap-[19px] px-4 py-[15px] rounded bg-[#cae9ff4d] w-full">
          <ScrollArea
            mah={200}
            className="text-black text-xl not-italic font-medium leading-8 tracking-[0.8px] ml-2 "
          >
            {text}
          </ScrollArea>
        </div>
      </div>
    </Modal>
  );
};
