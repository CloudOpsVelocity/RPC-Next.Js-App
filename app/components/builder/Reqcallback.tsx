"use client";
import React from "react";
import RequestCallBackModal from "../molecules/popups/req";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";

export default function Reqcallback({ builderName }: { builderName: string }) {
  const [opened, { close, source }] = useReqCallPopup();
  return (
    <RequestCallBackModal
      close={close}
      opened={opened}
      builderName={builderName}
      source={source}
    />
  );
}
