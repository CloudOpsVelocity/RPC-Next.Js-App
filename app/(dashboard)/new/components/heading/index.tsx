import data from "@/app/data/auth";
import clsx from "clsx";
import React from "react";

type Props = {
  title: string;
  content: string;
  className?: {
    title?: string;
    content?: string;
  };
  url?:string
};

export default function MainHeading({ title, content, className,url }: Props) {


  return (
    <div className="flex flex-row  items-center justify-between">
      <div className=" flex flex-col  max-w-[80%] sm:max-w-full items-start justify-start gap-1">
        <h1
          className={clsx(
            "text-[#148B16] text-[16px] sm:text-xl xl:text-[24px] not-italic font-bold",
            className?.title
          )}
        >
          {title}
        </h1>
        <h4
          className={clsx(
            "text-black text-[12px] sm:text-[14px] xl:text-xl not-italic font-medium sm:mt-1",
            className?.content
          )}
        >
          {content}
        </h4>
      </div>
      {title != "Handpicked Projects" &&
        title != "Top Localities" &&
        title != "Listings Posted By" &&
        title != "Latest Blogs" && (
          <a
            className="text-[#0073C6]  text-[14px] sm:text-[18px] xl:text-[20px]  not-italic font-bold leading-[normal]"
            href={url}
            target="_blank"
          >
            View all
          </a>
        )}
    </div>
  );
}
