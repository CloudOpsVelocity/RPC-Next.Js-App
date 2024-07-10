import React from "react";

type Props = {};

export default function Box({}: Props) {
  return (
    <div className="inline-flex justify-center items-center gap-1 rounded px-1.5 py-1 border-[0.8px] border-solid border-[#C3C3C3] bg-[#fcfcfcfc] text-[#5B84C0] text-sm not-italic font-medium cursor-pointer">
      Whitefield, Bangalore {config.icon}
    </div>
  );
}

const config = {
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
    >
      <path
        d="M9.5 4H13.5V8"
        stroke="#515151"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.5 4L7.85 9.65C7.75654 9.74161 7.63088 9.79293 7.5 9.79293C7.36912 9.79293 7.24346 9.74161 7.15 9.65L4.85 7.35C4.75654 7.25839 4.63088 7.20707 4.5 7.20707C4.36912 7.20707 4.24346 7.25839 4.15 7.35L0.5 11"
        stroke="#515151"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
};
