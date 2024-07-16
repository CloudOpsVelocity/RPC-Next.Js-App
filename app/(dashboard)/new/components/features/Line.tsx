import React from "react";

type Props = {
  text: string;
};

export default function Line({ text }: Props) {
  return (
    <div className="text-[#242424] text-2xl not-italic font-semibold leading-[normal] flex items-center gap-3.5 text-nowrap">
      {config.icon}
      {text}
    </div>
  );
}

const config = {
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
    >
      <path
        d="M4.375 24.2078L10.5 30.625L12.292 28.7473M28.875 11.375L18.2648 22.491M13.125 24.2078L19.25 30.625L37.625 11.375"
        stroke="#F5AC44"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
};
