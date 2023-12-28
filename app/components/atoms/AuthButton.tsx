import Button from "@/app/elements/button";
import ButtonLink from "@/app/elements/link";
import React from "react";

export default function AuthButton() {
  return (
    <ButtonLink
      key={"loginBtn"}
      href="/login"
      buttonClass="login-btn text-[20px] font-semibold px-5 py-2 rounded-full text-[#0073C6] border-none underline bg-gradient-to-r from-[#EFF8FF] to-[#FFF] shadow-md"
      title="Login/ Sign up"
    />
  );
}
