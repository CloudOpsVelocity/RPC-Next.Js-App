// Import necessary libraries/components
"use client";
import React, { useState } from "react";
import {
  Title,
  Container,
  Accordion,
  ThemeIcon,
  rem,
  Textarea,
  Button,
} from "@mantine/core";
import classes from "@/app/styles/FaqWithBg.module.css";
import { FaPlus } from "react-icons/fa6";
import { FAQ } from "@/app/validations/types/project";

import { addQna } from "@/app/utils/api/actions/Qna";
import { useParams } from "next/navigation";
import { useForm, yupResolver } from "@mantine/form";
import { qnaSchema } from "@/app/validations/project";
import { useSession } from "next-auth/react";
import { MinusIcon, PlusIcon, infoIcon } from "@/app/images/commonSvgs";
import Link from "next/link";
import toast from "react-hot-toast";

type FaqWithBgProps = {
  data: FAQ[];
  projName: string;
};

let ind = 0;

export function FaqWithBg({ data, projName }: FaqWithBgProps) {
  const [value, setValue] = useState<string | null>(null);
  console.log(value);

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
      <Accordion
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
                icon={value == `faq-${index}` ? <MinusIcon /> : <PlusIcon />}
              >
                <span
                  className={`${
                    value == `faq-${index}`
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
      </Accordion>
      <AddQnaForm projName={projName} />
    </div>
  );
}

const AddQnaForm = ({ projName }: { projName: string }) => {
  const { slug } = useParams<{ slug: string }>();
  const { data: session } = useSession();
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >();
  const { getInputProps, onSubmit, setErrors, reset } = useForm({
    initialValues: {
      question: "",
    },
    validate: yupResolver(qnaSchema),
  });
  const formSubmit = async (values: any) => {
    if (session) {
      setStatus("pending");
      try {
        await addQna({ question: values.question, projIdEnc: slug });
        reset();
        toast.success("QnA added successfully", {
          position: "bottom-center",
        });
        setStatus("success");
      } catch (error: any) {
        setErrors({ question: error.message });
        setStatus("error");
      }
    } else {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } ml-auto w-full pointer-events-auto flex justify-end items-end ring-1 ring-transparent ring-opacity-5`}
        >
          <p className=" text-[#565D70] p-[8px] pr-[16px] pl-[16px] border-[#148B16] border-[1px] border-solid bg-white shadow-lg flex items-center rounded-lg gap-[10px] text-[20px] whitespace-nowrap font-[600] ">
            {infoIcon} Please
            <Link rel="shortcut icon" href="/login">
              <span className=" cursor-pointer text-[#0073C6] ">
                login/ Signup
              </span>
            </Link>
            to ask QNAs
          </p>
        </div>
      ));
    }
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
            className="placeholder:!text-[#4D6677] placeholder:!text-[28px] italic font-medium leading-[23.784px] !border !border-solid !border-[#737579] rounded-[10px]"
            size="lg"
            radius={"10px"}
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
    </form>
  );
};
