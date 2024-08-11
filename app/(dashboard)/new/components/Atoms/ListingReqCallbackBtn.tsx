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
  const handleOpen = () => {
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
      className="!text-[8px] h-[20px] sm:h-[24px] xl:!text-[12px] !p-[4px] !sm:p-[1px] mt-[2px] sm:mt-[6px]"
      onClick={handleOpen}
    >
      Request Callback
    </Button>
  );
}
