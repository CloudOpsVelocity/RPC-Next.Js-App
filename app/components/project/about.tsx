import React from "react";
import ReadMore from "../atoms/readmore";

type Props = {
  heading: string;
  projName: string;
  content: string;
  id?: string;
};

export default function About({ heading, projName, content, id }: Props) {
  console.log(content)
  return (
    <div className="w-[90%] mb-[5%]" id={id ?? ""}>
      <h1 className="uppercase text-[24px] lg:text-[32px] font-[600] text-[#001F35]">
        {heading}{" "}
        <span className="text-[#148B16] font-[700] uppercase">{projName}</span>{" "}
      </h1>
      <ReadMore text={content} maxLines={10} />
    </div>
  );
}
