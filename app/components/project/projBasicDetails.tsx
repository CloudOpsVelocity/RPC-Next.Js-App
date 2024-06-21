import React from "react";

type props = {
  icon: any;
  title: string;
  value?: string | number | null;
  className?: string;
};

export default function ProjBasicDetails({
  icon,
  title,
  value,
  className,
}: props) {
  return (
    value && (
      <div className={className}>
        {icon}
        <p className=" text-[#001F35] text-[22px] not-italic font-[500]  whitespace-nowrap">
          {title}
        </p>
        <p className="text-[#148B16] text-2xl not-italic font-semibold ">
          {value}
        </p>
      </div>
    )
  );
}
