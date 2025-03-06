/* eslint-disable react/no-array-index-key */
"use client";
import React from "react";
type Props = {};

export default function Page({}: Props) {
  return <div className="mt-[60%]">{process.env.NODE_ENV}</div>;
}
