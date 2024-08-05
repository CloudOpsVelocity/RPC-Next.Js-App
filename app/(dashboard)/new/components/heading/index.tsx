import clsx from "clsx";
import React from "react";

type Props = {
  title: string;
  content: string;
  className?: {
    title?: string;
    content?: string;
  };
};

export default function MainHeading({ title, content, className }: Props) {
  return (
    <div>
      <h1
        className={clsx(
          "text-[#148B16] text-[14px] sm:text-xl xl:text-[24px] not-italic font-bold",
          className?.title
        )}
      >
        {title}
      </h1>
      <h4
        className={clsx(
          "text-black text-[10px] sm:text-xl not-italic font-medium sm:mt-1",
          className?.content
        )}
      >
        {content}
      </h4>
    </div>
  );
}
