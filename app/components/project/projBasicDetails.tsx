import React from "react";

type props = {
  icon: any;
  title: string;
  value?: string | number | null;
  className?: string;
  Id?: string;
};

export default function ProjBasicDetails({
  icon,
  title,
  value,
  className,
  Id,
}: props) {
  return (
    value && (
      <div className={className} {...(Id && { id: Id })}>
        {icon}
        <p className=" text-[#001F35] text-[13.5px] sm:text-[16px]  xl:text-2xl not-italic   whitespace-nowrap font-semibold">
          {title}
        </p>
        <p className="text-[#148B16]  text-[13.5px] sm:text-[18px] xl:text-2xl not-italic font-semibold ">
          {value}
        </p>
      </div>
    )
  );
}
