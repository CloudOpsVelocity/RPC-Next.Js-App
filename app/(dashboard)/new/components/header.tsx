import Image from "next/image";
import React from "react";

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="flex h-[70px] items-center justify-between shrink-0 pl-5 w-full py-3  shadow-[0px_4px_20px_0px_rgba(194,194,194,0.20)] bg-gradient-to-r from-[#f1f1f1] via-[#f1f1f1]  to-[#bde3ff]">
      <div>
        <Image src={config.logo} width={180} height={180} alt="logo" />
      </div>
      <div className="flex items-center justify-center gap-[30px] mr-[40px]">
        <p className="text-[#242424] text-xl not-italic font-medium">Blogs</p>
        <p className="text-[#242424] text-xl not-italic font-medium inline-flex gap-2 justify-center items-center">
          For Builders {config.chevron}
        </p>
        <button className="inline-flex justify-center items-center gap-1.5 rounded shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] text-white text-xl not-italic font-bold leading-[normal] px-2.5 py-1.5 bg-[#0073c6]">
          Post Property{" "}
          <span className="flex justify-center items-center gap-2.5 rounded px-[5px] py-0.5 bg-[#F0C811]">
            Free
          </span>
        </button>
        <AuthButton />
      </div>
    </div>
  );
}
const AuthButton = () => {
  return (
    <div className="flex justify-center items-center gap-1.5 rounded border shadow-[0px_4px_30px_0px_rgba(194,194,194,0.40)] text-[#0073C6] text-lg not-italic font-semibold leading-[normal] px-2.5 py-1.5 border-solid border-[#0073C6] bg-white">
      Login/ Sign up {config.blueChevron}
    </div>
  );
};
const config = {
  chevron: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
    >
      <path d="M0 0.5L5 5.5L10 0.5H0Z" fill="#33535F" />
    </svg>
  ),
  blueChevron: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
    >
      <path
        d="M0 0.5L4.29289 4.79289C4.68342 5.18342 5.31658 5.18342 5.70711 4.79289L10 0.5H0Z"
        fill="#0073C6"
      />
    </svg>
  ),
  logo: `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/grp-logo/logo.jpg`,
};
