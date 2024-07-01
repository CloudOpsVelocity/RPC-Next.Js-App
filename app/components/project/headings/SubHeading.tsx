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
        "text-[13px] md:text-2xl  text-[#344273]  italic font-semibold leading-[normal]",
        className
      )}
    >
      {text}
    </h4>
  );
}
