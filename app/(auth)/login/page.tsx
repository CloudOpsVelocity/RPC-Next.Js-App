"use client";

import Login from "@/app/components/molecules/auth/login";
import Button from "@/app/elements/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full p-[2%]">
      <div className="w-full flex justify-center items-center gap-[5%] mb-[5%] ">
        <Button
          key="loginBtn"
          title="Log In"
          onChange={() => ""}
          buttonClass={` whitespace-nowrap text-[26px] font-[500] text-[#148B16] font-bold border-solid border-b-7 border-green-900`}
        />

        <Link href="/register">
          <Button
            key="loginBtn"
            title="Sign Up"
            onChange={() => ""}
            buttonClass={` whitespace-nowrap text-[26px] font-[500] text-[#666]`}
          />
        </Link>
      </div>

      <div>
        <Login />
      </div>
    </div>
  );
}
