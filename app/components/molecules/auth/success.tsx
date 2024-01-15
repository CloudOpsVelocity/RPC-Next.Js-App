"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function Success({ params }: any) {
  const P = useParams();
  return (
    <div className="flex  max-w-3xl flex-col items-center justify-center  p-4 ">
      <div className="w-full  rounded-lg bg-white p-8 text-center ">
        <h1 className="text-[color:var(--Brand-green-primary,#148B16)] text-[28px] not-italic font-bold leading-[normal]">
          Congratulations!
        </h1>
        <p className="text-[color:var(--Grey-1,#666)] text-center text-[26px] not-italic font-medium leading-[normal] mt-10">
          Your account for {P.slug} has been created successfully
        </p>
        <p className="text-[color:var(--Grey-2,#767270)] text-center text-[26px] not-italic font-medium leading-[normal] mt-64">
          You will be redirected to homepage in 5 sec
        </p>
      </div>
    </div>
  );
}
