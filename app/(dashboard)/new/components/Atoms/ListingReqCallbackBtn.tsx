"use client";
import Button from "@/app/components/atoms/buttons/variansts";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import React from "react";

type Props = {
  builderName: string;
  projName: string;
  reqId: string;
  builderId: number;
};

export default function ListingReqBtn({
  builderName,
  projName,
  reqId,
  builderId,
}: Props) {
  const [, { open }] = useReqCallPopup();
  const handleOpen = (e: any) => {
    e.preventDefault();
    open({
      modal_type: "PROPERTY_REQ_CALLBACK",
      postedByName: builderName,
      postedId: builderId,
      reqId: reqId,
      source: "propCard",
      title: projName,
    });
  };
  return (
    <Button
      className="inline-flex justify-center mt-2 items-center gap-2.5 rounded border p-1 xl:p-2 border-solid border-[#0073C6] bg-[#0073c6] text-white text-[12px] xl:text-sm not-italic font-bold leading-[normal] capitalize  "/* z-[1000] */
      onClick={handleOpen}
    >
      Request Callback
    </Button>
  );
}
