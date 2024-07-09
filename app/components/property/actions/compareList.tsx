"use client";
import { ComparingListIcon, comparingIcon } from "@/app/images/commonSvgs";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React from "react";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import clsx from "clsx";
import useDynamicProp from "@/app/hooks/property/useDyanamic";
import { listingProps } from "@/app/data/projectDetails";
import { useMessagePopup } from "@/app/hooks/project/useMessagePopup";
import { useErrorListing } from "@/app/hooks/property/useError";

export default function CompareList({ cg, propTypeName }: any) {
  const { data: session } = useSession();
  const { slug } = useParams<{ slug: string }>();
  const { toggleCompare, compareItems } = useShortlistAndCompare();
  const [, { open }] = usePopShortList();
  const [opened, { close, open: openSuccesPopup }] = useErrorListing();
  const { data, mutate } = useDynamicProp({
    cg,
    propId: listingProps[propTypeName.trim() as keyof typeof listingProps],
  });
  const onAddingCompare = () => {
    if (data?.compareCount >= 5 && !data?.compareAdded) {
      openSuccesPopup();
      return;
    }
    if (session) {
      mutate(3);
      toggleCompare({
        id: slug,
        status: data?.compareAdded ? "N" : "Y",
        source: "prop",
      });
    } else {
      open();
    }
  };

  return (
    <button
      onClick={() => onAddingCompare()}
      className={clsx(
        "flex justify-center items-center gap-1 p-2 rounded-lg border-[0.8px] mt-3 border-solid border-[#0073C6] bg-[#fafafa] text-[#0073C6] sm:text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px]  sm:mt-5 text-[12px] text-nowrap",
        data?.compareAdded &&
          "bg-[rgb(231,245,255)] text-[#148B16] text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px]"
      )}
    >
      <ComparingListIcon color={data?.compareAdded ? "#148B16" : "#0073C6"} />
      {data?.compareAdded ? "Added to" : "Add to"} Compare
    </button>
  );
}
