import React from "react";

type Props = {
  title: string;
  content: string;
};

export default function MainHeading({ title, content }: Props) {
  return (
    <div>
      <h1 className="text-[#148B16] text-2xl not-italic font-bold">{title}</h1>
      <h4 className="text-black text-xl not-italic font-medium">{content}</h4>
    </div>
  );
}
