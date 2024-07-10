import React from "react";
import CardSection from "./CardSection";

type Props = {};

export default function HomeFeatures({}: Props) {
  return (
    <div className=" shrink-0 m-auto flex justify-center items-center max-w-[1200px] gap-10 pt-16">
      <div className="w-[500px] h-[300px] bg-gray-500"></div>
      <div>
        <div className="text-[#242424] text-2xl not-italic font-medium">
          Choose us for real estate because we offer expert guidance, a vast
          property selection and commitment to your dreams.
          <br />
          <span className=" text-[#148B16] text-xl not-italic font-semibold">
            Trust in our experience to find your perfect home!
          </span>
        </div>
        <CardSection />
      </div>
    </div>
  );
}
