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
    setPopReqData({
      builderName: type === "proj" ? builderName : postedByName,
      projName: name,
      type: type === "proj" ? type : "prop",
    });
    open(
      type === "proj" ? type : "prop",
      reqId,
      "projCard",
      postedBy === "Agent" ? "A" : "I"
    );
  };
  return (
    <div className="bg-[#DDF0FD] flex items-center gap-[372px] px-[17px] py-[9px] w-full">
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
      <div>
        <Button
          onChange={handleOpen}
          title="Request Callback"
          buttonClass="flex justify-center items-center text-[#FFF] p-[2px] md:p-[5px] bg-[#0073C6] rounded-[5px] shadow-md text-[10px] md:text-[12px] font-[700]"
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
    <button
      className={clsx(
        "flex flex-col text-[#148B16] justify-center items-center gap-2 p-1 rounded border-[0.4px] border-solid border-[#148B16] bg-[#f0fff0] cursor-pointer",
        type === "Owner" && "bg-[#FFF6ED] text-[#D66700] border-[#FF7A00]"
      )}
    >
      <p className=" text-xs not-italic font-bold leading-[normal] underline">
        {type} Listing Available : {value}
      </p>
    </button>
  );
};
