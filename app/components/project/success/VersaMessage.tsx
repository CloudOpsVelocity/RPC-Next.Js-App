import clsx from "clsx";
import React from "react";
interface VersaMessageProps {
  border: string;
  bgColor: string;
  title: string;
  content: string;
  icon: JSX.Element;
}

export default function VersaMessage({
  bgColor,
  title,
  content,
  icon,
  border,
}: VersaMessageProps): JSX.Element {
  return (
    <div className="flex w-[576px] h-[467px] flex-col items-center gap-28 shrink-0 pb-[33px] rounded-[20px] bg-[#fff] border  overflow-hidden">
      <div className={`top w-[576px] h-[178px] shrink-0   relative ${bgColor}`}>
        <CenterFace border={border} icon={icon} />
      </div>
      <div className="down flex  h-[467px] flex-col items-center  shrink-0 pb-[33px] w-[448px]">
        <p className="text-[#242424] text-center text-2xl not-italic font-bold leading-[normal]">
          {title}
        </p>
        <p className="text-[#242424] text-center text-xl not-italic font-medium leading-8 mt-[19px]">
          {content}
        </p>
      </div>
    </div>
  );
}

const CenterFace: React.FC<Pick<VersaMessageProps, "border" | "icon">> = ({
  icon,
  border,
}) => {
  return (
    <div
      className={clsx(
        "absolute top-1/2 left-1/2 transform -translate-x-1/2 right-0 w-[175px] h-[175px] border  bg-white rounded-full flex justify-center items-center",
        border
      )}
    >
      {icon}
    </div>
  );
};
