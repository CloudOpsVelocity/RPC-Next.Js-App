"use client";
import { Title, Container, Accordion, ThemeIcon, rem } from "@mantine/core";
import classes from "@/app/styles/FaqWithBg.module.css";

import { FaPlus } from "react-icons/fa6";
const placeholder =
  "It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.";

export function FaqWithBg() {
  return (
    <div className={classes.wrapper}>
      <div className="flex justify-center items-center w-full ">
        <div className="relative mr-[-70px] bottom-[20px] w-[168px] h-[74px] rounded-[50%] blur-[29.5px] bg-[#0093ff4d] "></div>

        <h1 className="text-[24px] lg:text-[32px] font-[600] text-[#001F35] mb-16">
          Frequently Asked Questions of
          <span className="text-[#148B16] font-[700] uppercase ml-4">
            SARANG
          </span>{" "}
        </h1>
      </div>

      <Accordion
        chevronPosition="right"
        defaultValue="reset-password"
        chevronSize={22}
        variant="separated"
        //// disableChevronRotation
        classNames={{ chevron: classes.chevron }}
        styles={{
          label: { color: "var(--mantine-color-black)" },
          item: { border: 0 },
        }}
        chevron={
          <ThemeIcon
            radius="xl"
            className={"!text-black !bg-transparent"}
            size={26}
          >
            <FaPlus style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ThemeIcon>
        }
      >
        <Accordion.Item className={classes.item} value="reset-password">
          <Accordion.Control className={classes.title}>
            How can I reset my password?
          </Accordion.Control>
          <Accordion.Panel className={classes.content}>
            {placeholder}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="another-account">
          <Accordion.Control className={classes.title}>
            Can I create more that one account?
          </Accordion.Control>
          <Accordion.Panel className={classes.content}>
            {placeholder}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="newsletter">
          <Accordion.Control className={classes.title}>
            How can I subscribe to monthly newsletter?
          </Accordion.Control>
          <Accordion.Panel className={classes.content}>
            {placeholder}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="credit-card">
          <Accordion.Control className={classes.title}>
            Do you store credit card information securely?
          </Accordion.Control>
          <Accordion.Panel className={classes.content}>
            {placeholder}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="payment">
          <Accordion.Control className={classes.title}>
            What payment systems to you work with?
          </Accordion.Control>
          <Accordion.Panel className={classes.content}>
            {placeholder}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <>
        <div className="max-w-[100%] mt-[2%] mx-auto my-8   rounded-lg space-y-2">
          <h2 className="font-[700] text-[#233333] text-[20px]  ">
            Ask your question related to
            <span className="!text-green-600">
              {" "}
              Sarang by Sumadhura Project!
            </span>
          </h2>

          <div className=" gap-4">
            <div className="flex-1">
              {/* <label htmlFor="question" className="sr-only">
                Type your question here
              </label> */}
              <textarea
                id="question"
                className="font-[500] text-[#4D6677] text-[20px] w-full p-2 border border-gray-300 rounded-md focus:outline-none h-[160px] mb-[1%] "
                placeholder="Type your question here"
                defaultValue={""}
                rows={3}
              />
            </div>
            <button className="inline-flex items-center justify-center rounded-md text-[20px] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#0073C6] text-white">
              Send
            </button>
          </div>
        </div>
      </>
    </div>
  );
}
