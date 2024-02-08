"use client";
import React from "react";
import RequestCallBackModal from "../molecules/popups/req";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";

export default function Reqcallback({ builderId }: { builderId: number }) {
  const [opened, { close }] = useReqCallPopup();
  return (
    <RequestCallBackModal close={close} opened={opened} builderId={builderId} />
  );
}
