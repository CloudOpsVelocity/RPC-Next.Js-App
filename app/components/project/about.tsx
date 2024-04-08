import React from "react";
import ReadMore from "../atoms/readmore";
import clsx from "clsx";

type Props = {
  heading: string;
  projName: string;
  content: string;
  id?: string;
  type?: "prop" | "proj";
};

export default function About({ heading, projName, content, id, type }: Props) {
  return (
    <div className="w-[90%] mb-[5%] scroll-mt-[150px]" id={id ?? ""}>
      <h1 className="uppercase text-[24px] lg:text-[32px] font-[600] text-[#001F35] mb-[24px]">
        {heading}{" "}
        <span
          className={clsx(
            " font-[700] uppercase",
            type === "prop" ? "text-[#001F35]" : "text-[#148B16]"
          )}
        >
          {projName}
        </span>{" "}
      </h1>
      <ReadMore text={content} maxLines={4} title={heading} />
    </div>
  );
}
