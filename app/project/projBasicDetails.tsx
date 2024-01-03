import React from "react";

type props = {
  icon: any;
  title: string;
  value: string;
  className?: string;
};

export default function ProjBasicDetails({
  icon,
  title,
  value,
  className,
}: props) {
  return (
    <div className={className}>
      {icon}
      <p className=" text-[#565D70] text-[16px] font-[500] mt-[8px] mb-[8px]  whitespace-nowrap ">
        {title}
      </p>
      <p className="text-[#233333] text-[20px] font-[500] whitespace-nowrap ">
        {value}
      </p>
    </div>
  );
}
