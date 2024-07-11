import Image from "next/image";
import React from "react";

type Props = {};

export default function PostYourListing({}: Props) {
  return (
    <div className="w-[1188px] h-[341px] shrink-0 rounded shadow-[0px_4px_20px_0px_rgba(194,194,194,0.76)] border-[0.8px] border-solid border-[#D9E4EE] m-auto my-[40px] bg-[#dae6f1] flex justify-center items-center px-10">
      <div className="space-y-[40px]">
        <h3 className="text-[#202020] text-[32px] not-italic font-semibold leading-[normal] tracking-[1.28px]">
          Post Your Listing Today!
        </h3>
        <p className="text-[#242424] text-2xl not-italic font-medium leading-[30px] tracking-[0.96px]">
          Your listings deserves the spotlight. Add it to our platform today!
        </p>
        <button className="inline-flex justify-center items-center gap-1.5 rounded shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] text-white text-xl not-italic font-bold leading-[normal] px-2.5 py-1.5 bg-[#0073c6]">
          Post Property{" "}
          <span className="flex justify-center items-center gap-2.5 rounded px-[5px] py-0.5 bg-[#F0C811]">
            Free
          </span>
        </button>
      </div>
      <div>
        <Image src={"/home/postlisting.svg"} alt="" width={500} height={500} />
      </div>
    </div>
  );
}
