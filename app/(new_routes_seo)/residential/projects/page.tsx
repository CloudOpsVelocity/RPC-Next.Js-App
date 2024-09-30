import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export default async function Page({}: Props) {
  await redirect("/");
  return <div className="mt-36">Hello From Projects main</div>;
}
