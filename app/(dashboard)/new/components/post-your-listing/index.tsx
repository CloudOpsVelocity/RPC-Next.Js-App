import Image from "next/image";
import React from "react";
import Btn from "./Btn";

type Props = {};

export default function PostYourListing({}: Props) {
  return (
    <div className="sm:max-w-[1188px] sm:min-h-[341px] shrink-0 rounded shadow-[0px_4px_20px_0px_rgba(194,194,194,0.76)] border-[0.8px]  border-solid border-[#D9E4EE] m-auto mt-[40px] sm:mt-[80px] mb:[40px] sm:mb-[80px] bg-[#dae6f1] flex justify-center items-center px-5 py-4 sm:px-10 ">
      <div className="flex justify-center items-center text-center sm:text-start flex-col sm:block">
        <h3 className="text-lg text-[#202020] sm:text-[26px] not-italic font-semibold leading-[normal] tracking-[1.28px]">
          Post Your Listing Today!
        </h3>
        <Image
          src={"/home/postlisting.svg"}
          alt=""
          width={387}
          height={257}
          className="block sm:hidden min-w-[387px] min-h-[257px] "
        />
        <p className="text-[16px] text-[#242424] sm:text-[24px] not-italic mt-[18px] mb-[18px] font-medium sm:leading-[30px] tracking-[0.96px] sm:mb-[18px]">
          Your listings deserves the spotlight. Add it to our platform today!
        </p>
        <Btn text="Property" />
      </div>
      <div>
        <Image
          src={"/home/postlisting.svg"}
          alt=""
          width={387}
          height={257}
          className="hidden sm:block min-w-[387px] min-h-[257px] "
        />
      </div>
    </div>
  );
}
