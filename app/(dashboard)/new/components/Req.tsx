"use client";
import RequestCallBackModal from "@/app/components/molecules/popups/req";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import React from "react";

type Props = {};

export default function Req({}: Props) {
  const [opned, { close, source }] = useReqCallPopup();
  return (
    <RequestCallBackModal
      close={close}
      opened={opned}
      builderName=""
      source={source}
    />
  );
}
