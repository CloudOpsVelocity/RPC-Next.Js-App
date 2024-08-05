import Button from "@/app/elements/button";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { NearByDataAtom } from "@/app/store/nearby";
import clsx from "clsx";
import { useSetAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  a: number;
  o: number;
  type: "proj" | "prop";
  reqId: string;
};

export default function CardDownSection({
  a,
  o,
  type,
  reqId,
  projName,
  builderName,
  bhkName,
  propTypeName,
  ltName,
  cg,
  builderId,
  postedByName,
  postedBy,
}: any) {
  const name =
    type === "proj"
      ? projName
      : `${bhkName ?? ""} ${propTypeName} for
    ${cg === "R" ? "Rent" : "Sale"} in ${ltName}`;
  const [, { open }] = useReqCallPopup();
  const setPopReqData = useSetAtom(NearByDataAtom);
  const handleOpen = () => {
   
/* 
         open({
      modal_type: type === "proj" ? "PROJECT_REQ_CALLBACK" : "PROPERTY_REQ_CALLBACK" ,
      postedByName: builderName,
      postedId: builderId,
      reqId: reqId,
      source:type === "proj" ? "propCard" : "propCard",
      title:type === "proj" ? projName  : propTypeName,
    });
    */
  };
  return (
    <div className="bg-[#DDF0FD] flex items-start gap-1 xl:gap-[372px] xl:px-[17px] xl:py-[9px] w-full p-2 justify-between ">
      {/* left section */}
      <div className="flex gap-[9px]">
        {type === "proj" && (
          <>
            <CountListing type="Agent" value={a} />
            <CountListing type="Owner" value={o} />
          </>
        )}
      </div>

      {/* right section */}
      <div className=" right-1">
        <Button
          onChange={handleOpen}
          title="Request Callback"
          buttonClass="flex justify-end right-1  self-end text-[#FFF] ml-1 p-[3px] md:p-[5px] bg-[#0073C6] rounded-[5px] shadow-md text-[5px] xl:text-[10px] md:text-[12px] font-[700]"
        />
      </div>
    </div>
  );
}
type CountListProps = {
  value: number;
  type: "Agent" | "Owner";
};
const CountListing = ({ type, value }: CountListProps) => {
  return (
    value > 0 && (
      <button
        className={clsx(
          "flex flex-col justify-start  items-start gap-2 p-1 rounded border-[0.4px] border-solid",
          type === "Owner" ? "bg-[#FFF6ED] text-[#D66700] border-[#FF7A00]" : "bg-[#f0fff0]",
          value > 0
            ? "text-[#148B16] border-[#148B16] cursor-pointer"
            : "text-gray-400 border-[#5e5f5e] opacity-50 cursor-none"
        )}
      >
        <p
          className={`text-[9px] text-nowrap xl:text-wrap xl:text-xs not-italic font-bold leading-[normal] ${
            value > 0 ? "underline" : ""
          }`}
        >
          {type} Listing Available : {value}
        </p>
      </button>
    )
  );
};