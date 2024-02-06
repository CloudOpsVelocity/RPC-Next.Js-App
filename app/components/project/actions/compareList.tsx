"use client";
import { comparingIcon, infoIcon } from "@/app/images/commonSvgs";
import { addShortList } from "@/app/utils/api/actions/shortlist";
import { useToggle } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import LoginPopup from "../modals/LoginPop";
import { useShortlistAndCompare } from "@/app/hooks/storage";

export default function CompareList() {
  const { data: session } = useSession();
  const { slug } = useParams<{ slug: string }>();
  const { toggleCompare, compareItems } = useShortlistAndCompare();
  const isItemCompared =
    compareItems.length > 0 && compareItems.some((item) => item.status === "Y");

  const onAddingCompare = () => {
    if (session) {
      toggleCompare({
        id: slug,
        type: 3,
        status: isItemCompared ? "Y" : "N",
      });
    } else {
      open();
      // toast.custom((t) => (
      //   <div
      //     className={`${
      //       t.visible ? "animate-enter" : "animate-leave"
      //     } ml-auto w-full pointer-events-auto flex justify-end items-end ring-1 ring-transparent ring-opacity-5`}
      //   >
      //     <p className=" text-[#565D70] border-[#148B16] border-[1px] border-solid p-[8px] pr-[16px] pl-[16px] bg-white shadow-lg flex items-center rounded-lg gap-[10px] text-[20px] whitespace-nowrap font-[600] ">
      //       {infoIcon} Please
      //       <Link rel="shortcut icon" href="/login">
      //         <span className=" cursor-pointer text-[#0073C6] ">
      //           login/ Signup
      //         </span>
      //       </Link>
      //       to add project to Compare
      //     </p>
      //   </div>
      // ));
    }
  };

  return !session ? (
    <LoginPopup type="Compare" />
  ) : (
    <button
      onClick={() => onAddingCompare()}
      className="text-[20px] flex justify-center items-center gap-[8px] cursor-pointer lg:text-[24px] text-[#0073C6] font-[600] underline whitespace-nowrap decoration-dashed "
    >
      {comparingIcon}
      {isItemCompared ? "Remove from" : "Add to"} Compare
    </button>
  );
}
