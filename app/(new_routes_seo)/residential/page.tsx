import React, { memo } from "react";
import ResidentialPage from "./_components/ResidentialDetailPage";
import axios from "axios";
import { redirect } from "next/navigation";
import { ResidentialProjectSchama } from "@/app/seo/search/ResidentialProject.shcema";

type Props = {};

export default async function page({}: Props) {
  const LoadingSpinner = memo(function LoadingSpinner() {
    return (
      <div className="flex items-center gap-2">
        <div className="w-[20px] h-[20px] md:w-[26px] md:h-[26px] xl:w-[30px] xl:h-[30px] border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
        <span className="font-bold">Loading results...</span>
      </div>
    );
  });
let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/margdataurl/marg-project-details`;
/* let url = `https://www.getrightproperty.com/common/marg-project-details`; */



  const { data } = await axios.get(url);
  return (
    <>
      <ResidentialProjectSchama
        pageUrl="/residential"
        properties={data?.data}
      />
      {data ? <ResidentialPage data={data} /> : <LoadingSpinner />}
    </>
  );
}

// export const dynamic = "force-dynamic";
