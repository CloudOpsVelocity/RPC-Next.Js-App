"use client";
import { comparingIcon, infoIcon } from "@/app/images/commonSvgs";
import { addShortList } from "@/app/utils/api/actions/shortlist";
import { useToggle } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function CompareList() {
  const { data: session } = useSession();
  const { slug } = useParams<{ slug: string }>();
  const [value, toggle] = useToggle(["Add to", "Remove From"]);

  const onAddingCompare = () => {
    if(session){
      toggle()
      addShortList({ projIdEnc: slug, type: 3, isactive: value == "Add to" ? "Y" : "N" });
    }else{
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } ml-auto w-full pointer-events-auto flex justify-end items-end ring-1 ring-transparent ring-opacity-5`}
        >
          <p className=" text-[#565D70] p-[8px] pr-[16px] pl-[16px] bg-white shadow-lg flex items-center rounded-lg gap-[10px] text-[20px] whitespace-nowrap font-[600] ">
            {infoIcon}  Please 
            <Link rel="shortcut icon" href="/login" >
              <span className=" cursor-pointer text-[#0073C6] ">
                login/ Signup
              </span>
            </Link> 
            to add project to Compare
          </p>
        </div>
      ))
    }
  };

  return (
    <button
      onClick={() =>onAddingCompare()}
      className="text-[20px] flex justify-center items-center gap-[8px] cursor-pointer lg:text-[24px] text-[#0073C6] font-[600] underline whitespace-nowrap decoration-dashed "
    >
      {comparingIcon}
      {value} Compare
    </button>
  )
}
