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
          "text-[#148B16] text-2xl xl:text-[32px] not-italic font-bold",
          className?.title
        )}
      >
        {title}
      </h1>
      <h4
        className={clsx(
          "text-black text-xl not-italic font-medium mt-1",
          className?.content
        )}
      >
        {content}
      </h4>
    </div>
  );
}
