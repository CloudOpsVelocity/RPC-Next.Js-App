import { Title, Container, Accordion, ThemeIcon, rem } from "@mantine/core";
import classes from "@/app/styles/FaqWithBg.module.css";

import { FaPlus } from "react-icons/fa6";
const placeholder =
  "It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.";

export function FaqWithBg() {
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <h1 className="text-[32px] font-[600] text-[#001F35] mb-16 text-center">
          Frequently Asked Questions of
          <span className="text-[#148B16] font-[700] uppercase ml-5">
            SARANG
          </span>{" "}
        </h1>

        <Accordion
          chevronPosition="right"
          defaultValue="reset-password"
          chevronSize={26}
          variant="separated"
          disableChevronRotation
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
              <FaPlus
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ThemeIcon>
          }
        >
          <Accordion.Item className={classes.item} value="reset-password">
            <Accordion.Control>How can I reset my password?</Accordion.Control>
            <Accordion.Panel>{placeholder}</Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className={classes.item} value="another-account">
            <Accordion.Control>
              Can I create more that one account?
            </Accordion.Control>
            <Accordion.Panel>{placeholder}</Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className={classes.item} value="newsletter">
            <Accordion.Control>
              How can I subscribe to monthly newsletter?
            </Accordion.Control>
            <Accordion.Panel>{placeholder}</Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className={classes.item} value="credit-card">
            <Accordion.Control>
              Do you store credit card information securely?
            </Accordion.Control>
            <Accordion.Panel>{placeholder}</Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className={classes.item} value="payment">
            <Accordion.Control>
              What payment systems to you work with?
            </Accordion.Control>
            <Accordion.Panel>{placeholder}</Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Container>
    </div>
  );
}
