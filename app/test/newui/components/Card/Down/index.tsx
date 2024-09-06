import Button from "@/app/elements/button";
import { useMediaQuery } from "@mantine/hooks";
import clsx from "clsx";
import React from "react";

export default function CardDownSection({
  a,
  o,
  B,
  type,
  projName,
  projIdEnc,
  onAddingCompare,
  isCompared,
  handleOpen,
}: any) {
  const isMobile = useMediaQuery("(max-width: 1600px)");
  // const name =
  //   type === "proj"
  //     ? projName
  //     : `${bhkName ?? ""} ${propTypeName} for
  //   ${cg === "R" ? "Rent" : "Sell"} in ${ltName}`;
  // const [, { open }] = useReqCallPopup();
  // const setPopReqData = useSetAtom(NearByDataAtom);
  // const handleOpen = () => {
  //   open({
  //     modal_type:
  //       type === "proj" ? "PROJECT_REQ_CALLBACK" : "PROPERTY_REQ_CALLBACK",
  //     postedByName: type === "proj" ? builderName : postedBy,
  //     postedId: builderId,
  //     reqId: reqId,
  //     source: type === "proj" ? "projCard" : "propCard",
  //     title:
  //       type === "proj"
  //         ? projName
  //         : `${bhkName ?? ""} ${propTypeName} for
  //     ${cg === "R" ? "Rent" : "Sell"} in ${localityName}`,
  //   });
  // };

  return (
    <div className="bg-white flex items-start gap-1 xl:gap-auto xl:px-[17px] xl:py-[9px] w-full p-2 justify-between flex-wrap sm:flex-nowrap">
      <div className="flex gap-[9px]">
        {type === "proj" ? (
          <>
            <CountListing
              type="Agent"
              value={a}
              projIdEnc={projIdEnc}
              projName={projName}
            />
            <CountListing
              type="Owner"
              value={o}
              projIdEnc={projIdEnc}
              projName={projName}
            />
            <CountListing
              type="Builder"
              value={B}
              projIdEnc={projIdEnc}
              projName={projName}
            />
          </>
        ) : (
          <button className="bg-cyan-500 text-white text-[12px] sm:text-sm py-0 font-bold px-1 sm:py-1 xl:px-2  rounded shadow-md hover:bg-cyan-600 transition duration-300 ease-in-out">
            Highlights
          </button>
        )}
      </div>

      {/* right section */}
      {!isMobile && (
        <div className=" right-1 inline-flex">
          <button
            className="bg-btnPrimary rounded-[4px]  bottom-2 left-1 text-white text-[12px] px-1 font-bold"
            onClick={() => onAddingCompare()}
          >
            {isCompared ? "Remove  Compare" : "Add to Compare"}
          </button>
          <Button
            onChange={handleOpen}
            title={`${
              type === "proj"
                ? isMobile
                  ? "Contact"
                  : "Request Callback"
                : "Request Callback"
            }`}
            buttonClass="flex justify-end right-1  self-end text-[#FFF] ml-1 p-[3px] md:p-[5px] bg-[#0073C6] rounded-[5px] shadow-md text-[12px] xl:text-[12px] md:text-[12px] font-[700] text-nowrap"
          />
        </div>
      )}
    </div>
  );
}
type CountListProps = {
  value: number;
  type: "Agent" | "Owner" | "Builder";
  projIdEnc: string;
  projName: string;
};
const CountListing = ({ type, value, projIdEnc, projName }: CountListProps) => {
  const handleAgentOwner = (type: "A" | "I" | "B") => {
    window.open(
      `/search/listing?projIdEnc=${projIdEnc}&listedBy=${type}&projName=${projName}`,
      "_blank"
    );
  };

  return (
    value > 0 && (
      <button
        onClick={() =>
          handleAgentOwner(
            type === "Owner" ? "I" : type === "Builder" ? "B" : "A"
          )
        }
        className={clsx(
          "flex flex-col justify-start  items-start gap-2 p-1 rounded border-[0.4px] border-solid",
          type === "Owner"
            ? "bg-[#FFF6ED] text-[#D66700] border-[#FF7A00]"
            : "bg-[#f0fff0]",
          value > 0
            ? "text-[#148B16] border-[#148B16] cursor-pointer"
            : "text-gray-400 border-[#5e5f5e] opacity-50 cursor-none"
        )}
      >
        <p
          className={`text-[12px] text-nowrap  xl:text-xs not-italic font-bold leading-[normal] ${
            value > 0 ? "underline" : ""
          }`}
        >
          {type} Listing : {value}
        </p>
      </button>
    )
  );
};
