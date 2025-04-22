"use client";
import { createStore, Provider } from "jotai";

import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function JotaiProvider({ children }: Props) {
  return <Provider>{children}</Provider>;
}
