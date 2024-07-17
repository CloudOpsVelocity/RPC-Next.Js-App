import React from "react";

type Props = {};

export default function Alert({}: Props) {
  return (
    <div className="sm:inline-flex text-[10px] sm:text-base justify-center items-center gap-2.5 rounded text-[#242424]  not-italic font-medium leading-[normal] p-1.5 sm:p-2.5 bg-[#ffefd7] absolute top-5 right-5">
      Showcasing exclusive projects and listings from Bangalore
    </div>
  );
}
