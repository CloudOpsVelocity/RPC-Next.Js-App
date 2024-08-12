import data from "@/app/data/auth";
import clsx from "clsx";
import React from "react";

type Props = {
  data: any;
  title: string;
  content: string;
  className?: {
    title?: string;
    content?: string;
  };
};

export default function MainHeading({ title, content, className }: Props) {
  console.log(data)
  return (
    <div className="flex flex-row items-center justify-between">
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
          "text-black text-[10px] sm:text-[14px] xl:text-xl not-italic font-medium sm:mt-1",
          className?.content
        )}
      >
        {content}
      </h4>
      </div>
        <a className="text-[#0073C6] font-[Montserrat] text-[20px] not-italic font-bold leading-[normal]" href="https://www.rpclan.com" target="_blank">View all</a>
    </div>
  );
}
