import clsx from "clsx";
import React from "react";

type Props = {
  className?: string;
  text: string;
};

export default function SubHeading({ className, text }: Props) {
  return (
    <h4
      className={clsx(
        "text-[#4D6677] text-[16px] md:text-2xl italic font-medium leading-[normal]",
        className
      )}
    >
      {text}
    </h4>
  );
}
