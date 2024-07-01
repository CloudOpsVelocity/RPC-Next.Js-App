"use client";
import clsx from "clsx";
import React from "react";

type Props = {
  Icon: React.ReactNode;
  title: string;
  content: string;
  type: "email" | "mobile" | "text";
  textClassName?: string;
};

export default function Card({
  Icon,
  title,
  content,
  type,
  textClassName,
}: Props) {
  const renderContent = () => {
    return (
      <p className="text-[#242424] text-[12px] sm:text-2xl not-italic font-semibold underline">
        {content}
      </p>
    );
  };
  const scheme = type === "email" ? "mailto:" : type === "mobile" ? "tel:" : "";
  const handleOpen = () => {
    type !== "text" && window.open(`${scheme}${content}`, "_blank");
  };
  return (
    <div onClick={handleOpen} className={clsx("cursor-pointer")}>
      <div className={clsx(styles.container, styles.text)}>
        {Icon} {title}
      </div>
      <div className="sm:mt-2">
        {" "}
        {type !== "text" ? (
          renderContent()
        ) : (
          <p className={clsx(styles.content, textClassName)}>{content}</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container:
    "inline-flex justify-center items-center gap-0.5 p-1 rounded-md bg-gradient-to-tr from-[#EFF5FF] to-[#F2FAFF] border border-blue-100",
  text: "text-[#00487C] text-[12px] sm:text-[28px] not-italic font-semibold ",
  content: "text-[#242424] text-[12px] sm:text-2xl not-italic font-semibold",
};
