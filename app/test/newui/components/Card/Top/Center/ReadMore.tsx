"use client";
import { OverlayAction } from "@/app/test/newui/store/overlay";
import React from "react";

type Props = {
  projectAbout: string;
  readMoreThreshold: number;
};

export default function SearchReadMoreContent({
  projectAbout,
  readMoreThreshold,
}: Props) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: projectAbout.slice(0, readMoreThreshold),
      }}
    />
  );
}
