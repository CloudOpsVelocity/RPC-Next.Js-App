"use client";

import Login from "@/app/components/molecules/auth/login";
import { data } from "@/app/data/userTypeDetails";
import Button from "@/app/elements/button";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className="w-full p-[10%] md:p-[2%] flex justify-center items-center flex-col">
      <div className="w-full max-w-[459px] md:max-w-[597px] flex justify-center items-center gap-[5%] mb-[5%] ">
        <Link
          href="/login"
          className="whitespace-nowrap text-[26px] font-[500] text-[#666]"
        >
          Log In
        </Link>

        <Link
          href="/register"
          className="whitespace-nowrap text-[26px] text-[#148B16] font-bold border-solid border-b-2 border-green-600"
        >
          Sign Up
        </Link>
      </div>

      <div>
        <h1 className="md:text-[32px] text-[24px] font-[600] font-Playball text-[#333]">
          Welcome !
        </h1>
        <p className="text-[20px] font-[400] font-Playball text-[#282828]">
          New user, Select how you want to sign up as
        </p>
        <div className="w-full flex justify-between items-center mt-[4%]">
          {data.map((each, ind) => {
            return (
              <Link
                href={each.href}
                key={ind}
                className={`group cursor-pointer flex justify-center items-center flex-col rounded-[8px] bg-[#FAFAFA] w-[30%] h-[130px] md:h-[174px] shadow-lg hover:shadow-green-300/30`}
              >
                <Image
                  className="w-[60px]  md:w-[83px]  "
                  alt="User"
                  src={each.src}
                  width={83}
                  height={83}
                />

                <p
                  className={`text-xs md:text-[20px] font-[500] font-Playball text-[#7D7D7D] mt-[8%] group-hover:text-[#65BB67] `}
                >
                  {each.name}
                </p>
              </Link>
            );
          })}
        </div>

        <p className=" md:text-[20px] font-[400] font-Ledger text-[#282828] mt-[5%] text-center ">
          “ Your journey to{" "}
          <span className="cursive "> Get Right Property</span> starts here ”
        </p>
      </div>
    </div>
  );
}
