import React from "react";
import ReadMore from "../atoms/readmore";
import clsx from "clsx";
import PropertyHeading from "../property/heading";

type Props = {
  heading: string;
  projName?: string;
  content: string;
  id?: string;
  type?: "prop" | "proj";
  className?: string;
  showProjName?: boolean;
  builderName?: string;
};

export default function About({
  heading,
  projName,
  content,
  id,
  type,
  className,
  showProjName,
  builderName,
}: Props) {
  return (
    <div
      className={clsx("w-[90%] mb-[5%] scroll-mt-[180px]", className)}
      id={id ?? ""}
    >
      {type === "prop" ? (
        <PropertyHeading
          title={heading}
          desc={
            "About listing get summarized perspective for the incredible listing"
          }
          className="mb-[30px]"
        />
      ) : (
        <h1 className="uppercase text-[20px] lg:text-[32px] font-[600] text-[#001F35] mb-[24px]">
          {heading}{" "}
          <span className={clsx(" font-[700] uppercase text-[#148B16]")}>
            {projName}
          </span>{" "}
        </h1>
      )}

      <ReadMore
        text={content}
        maxLines={6}
        title={heading}
        showProjName={showProjName}
        builderName={builderName}
      />
    </div>
  );
}
