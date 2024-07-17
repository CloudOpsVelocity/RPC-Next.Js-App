"use client";
import Button from "@/app/components/atoms/buttons/variansts";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { NearByDataAtom } from "@/app/store/nearby";
import { useSetAtom } from "jotai";
import React from "react";

type Props = {
  builderName: string;
  projName: string;
  reqId: string;
};

export default function ReqBtn({ builderName, projName, reqId }: Props) {
  const setPopReqData = useSetAtom(NearByDataAtom);
  const [, { open }] = useReqCallPopup();
  const handleOpen = () => {
    setPopReqData({
      builderName: builderName,
      projName: projName,
      type: "proj",
    });
    open("proj", reqId, "projCard");
  };
  return (
    <Button className="!text-[12px] sm:!text-xl" onClick={handleOpen}>
      Request Callback
    </Button>
  );
}
