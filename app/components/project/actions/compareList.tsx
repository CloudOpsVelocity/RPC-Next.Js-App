"use client";
import { ComparingListIcon, comparingIcon } from "@/app/images/commonSvgs";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React from "react";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import clsx from "clsx";
import useDynamicProj from "@/app/hooks/project/useDynamic";
import { useMessagePopup } from "@/app/hooks/project/useMessagePopup";

export default function CompareList() {
  const { data: session } = useSession();
  const { slug } = useParams<{ slug: string }>();
  const { toggleCompare, compareItems } = useShortlistAndCompare();
  const [, { open }] = usePopShortList();
  const { data, mutate } = useDynamicProj();
  const [opened, { close, open: openSuccesPopup }] = useMessagePopup("compare");

  const onAddingCompare = () => {
    if (data?.compareCount >= 5 && !data?.compareAdded) {
      openSuccesPopup();
      return;
    }

    if (session) {
      mutate(3);
      toggleCompare({ id: slug, status: data?.compareAdded ? "N" : "Y" });
    } else {
      open();
    }
  };
  return (
    <button
      onClick={() => onAddingCompare()}
      className={clsx(
        "flex justify-center items-center gap-1 p-2 rounded-lg border-[0.8px] border-solid border-[#0073C6] bg-[#fafafa] text-[#0073C6] text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px] mt-5",
        data?.compareAdded &&
          "bg-[#E4F4FF] text-[#148B16] text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px]"
      )}
    >
      <ComparingListIcon color={data?.compareAdded ? "#148B16" : "#0073C6"} />
      {data?.compareAdded ? "Added to" : "Add to"} Compare
    </button>
  );
}
