import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  content: string;
  link: string;
  image: string;
};

export default function Box({ content, image, link, title }: Props) {
  return (
    <div className="flex flex-col p-[6px] sm:h-[126px] sm:m-[20px] justify-center items-start gap-[4px] rounded border border-[color:var(--stroke-blue-gradient,#41D1D4)] shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] sm:pl-[88px] sm:pr-5 sm:pt-[19px] sm:pb-[18px] border-solid bg-[#f2f7ff] relative max-w-[103px] sm:max-w-[296px] sm:p-2 sm:mt-0 ">
      <Image
        src={`${process.env.NEXT_PUBLIC_IMG_BASE}${image}`}
        alt="box"
        width={126}
        height={126}
        className="absolute h-[64px] w-[64px] sm:h-[126px] sm:w-[126px] left-0 sm:left-[-60px] bottom-[85px] sm:bottom-0"
      />
      <p className="text-[#148B16] text-[10px] sm:text-[16px] not-italic font-bold">{title}</p>
      <p className="text-black text-[8px] sm:text-[14px] not-italic font-medium">
        {content}
      </p>
      <div className="flex items-center gap-1.5 text-[#0073C6] text-[10px] sm:text-[16px] not-italic font-medium leading-[normal] cursor-pointer justify-center">
        <a href={link} target="_blank">
          <div className="flex justify-center items-center gap-2">
            View Listing {config.icon}
          </div>
          <hr className="bg-[#0073C6] h-[2px]" />
        </a>
      </div>
    </div>
  );
}
const config = {
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="6"
      viewBox="0 0 15 6"
      fill="none"
    >
      <path
        d="M15 3L10 0.113249V5.88675L15 3ZM0 3.5H10.5V2.5H0V3.5Z"
        fill="#0073C6"
      />
    </svg>
  ),
};
