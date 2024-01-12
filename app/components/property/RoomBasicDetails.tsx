import React from "react";

type props = {
  icon: any;
  title: string;
  value: string | number;
  className?: string;
};

export default function RoomBasicDetails({
  icon,
  title,
  value,
  className,
}: props) {
  return (
    <div className={className}>
      <div className="flex justify-start items-center space-x-3">
        {icon}
        <p className="text-[#00487C] text-2xl not-italic font-medium leading-[normal]">
          {title}
        </p>
      </div>

      <p className="text-[#202020] text-2xl not-italic font-semibold leading-[normal] mt-2">
        {value}
      </p>
    </div>
  );
}
