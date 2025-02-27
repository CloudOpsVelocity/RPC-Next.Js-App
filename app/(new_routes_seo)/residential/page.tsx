import React from "react";
import ResidentialPage from "./_components/ResidentialDetailPage";
import axios from "axios";

type Props = {};

export default async function Page({}: Props) {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/home/page/project?city=9`;
  const data = await axios.get(url);

  return <ResidentialPage data={data?.data} />;
}
