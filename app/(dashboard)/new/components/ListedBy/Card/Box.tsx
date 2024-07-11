import React from "react";

type Props = {};

export default function Box({}: Props) {
  return (
    <div className="inline-flex flex-col justify-center items-start gap-4 rounded border border-[color:var(--stroke-blue-gradient,#41D1D4)] shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] pl-[88px] pr-5 pt-[19px] pb-[18px] border-solid bg-[#f2f7ff]">
      <p className="text-[#148B16] text-xl not-italic font-bold">BUILDER</p>
    </div>
  );
}
