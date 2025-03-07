import React from "react";
import ResidentialPage from "./_components/ResidentialDetailPage";
import axios from "axios";
import { redirect } from "next/navigation";

type Props = {};

export default async function page({}: Props) {
  return redirect("/");
  // let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/home/page/project?city=9`;
  // try {
  //   const data = await axios.get(url);
  //   return <ResidentialPage data={data?.data} />;
  // } catch (error) {
  //   console.log(error);
  //   return <div>Error</div>;
  // }
}
