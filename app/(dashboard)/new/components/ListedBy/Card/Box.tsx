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
    <div className="inline-flex flex-col justify-center items-start gap-4 rounded border border-[color:var(--stroke-blue-gradient,#41D1D4)] shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] pl-[88px] pr-5 pt-[19px] pb-[18px] border-solid bg-[#f2f7ff] relative">
      <Image
        src={`${process.env.NEXT_PUBLIC_IMG_BASE}${image}`}
        alt="box"
        width={150}
        height={150}
        className="absolute -left-[16%] top-0"
      />
      <p className="text-[#148B16] text-xl not-italic font-bold">{title}</p>
      <p className="text-black text-[17px] not-italic font-medium">{content}</p>
      <div className="flex items-center gap-1.5 text-[#0073C6] text-base not-italic font-medium leading-[normal] cursor-pointer justify-center">
        <div>
          <div className="flex justify-center items-center gap-2">
            View Listing {config.icon}
          </div>
          <hr className="bg-[#0073C6] h-[2px]" />
        </div>
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
