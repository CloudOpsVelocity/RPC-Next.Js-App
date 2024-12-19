import React from "react";
import LeftSection from "./components/LeftSection";
import RightSection from "./components/RightSection";
type Props = {};

export default function Page({}: Props) {
  return (
    <div className=" w-[100%] mx-2  xl:m-0 flex justify-center flex-wrap-reverse sm:flex-nowrap pt-[6%]">
      <LeftSection />
      <RightSection />
    </div>
  );
}
