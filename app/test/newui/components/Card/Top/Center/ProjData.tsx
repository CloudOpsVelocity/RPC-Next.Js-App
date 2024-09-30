import { formatCurrency } from "@/app/utils/numbers";
import React from "react";
import { NewMapIcon } from "@/app/images/commongsSvgs2";
import { sortUnits } from "@/app/utils/unitparser";
import { useSetAtom } from "jotai";
import { overlayAtom } from "@/app/test/newui/store/overlay";
import selectedSearchAtom, {
  mobileSearchPageMapModalReducerAtom,
} from "@/app/store/search/map";

type Props = any;

export default function ProjData({
  minPrice,
  maxPrice,
  projName,
  city,
  locality,
  builderName,
  type,
  price,
  propName,
  localityName,
  propTypeName,
  bhkName,
  category,
  cityName,
  postedBy,
  propType,
  bhkNames,
  address,
  phaseName,
  projIdEnc,
  propTypeId,
  agentListing,
  ownerListing,
  projOrPropName,
  lat,
  lang,
  propIdEnc,
  otherCharges,
  phaseCount
}: Props) {
  const sortedBhks = sortUnits(bhkNames);
  const dispatch = useSetAtom(overlayAtom);
  const mobileMapDispatch = useSetAtom(mobileSearchPageMapModalReducerAtom);
  return type === "proj" ? (
    <div className="flex flex-col">
      <p className="text-[#001F35] text-[15px] sm:text-[16px] xl:text-[18px] font-bold break-words whitespace-normal min-w-0 inline-flex gap-1 items-center flex-wrap">
        {projName}{" "}
        {phaseName && phaseCount !== undefined && phaseCount > 1 && <span className="text-[12px] sm:text-[14px] ">({phaseName})</span>}
        {/* <button className="w-6 h-6 p-1.5 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 xl:hidden"> */}
        <NewMapIcon
          className="w-5 h-5 sm:hidden"
          onClick={() => {
            // handleClick();
            // setSelected({max-w-fit px-[1px] py-[1px] rounded text-[#242424] text-xs not-italic font-semibold my-2 md:mb-1 gradient
            //   agentListing,
            //   ownerListing,
            //   projOrPropName: type === "proj" ? projName : propName,
            //   lat,
            //   lang,
            //   type,
            //   reqId: type === "proj" ? projIdEnc : propIdEnc,
            // });
            mobileMapDispatch({
              type: "open",
              payload: {
                title: type === "proj" ? projName : propName,
                id: type === "proj" ? `${projIdEnc}` : propIdEnc,
                opened: true,
                type: "nearby",
                content: {
                  lat: lat,
                  lang: lang,
                },
              },
            });
          }}
        />
        {/* </button> */}
      </p>

      <p className="text-[#148B16] text-[14px] sm:text-[18px] xl:text-xl not-italic font-bold relative">
        {formatCurrency(Number(minPrice))} - {formatCurrency(Number(maxPrice))}
      </p>

      <p className="text-black text-[12px] sm:text-[14px] xl:text-[14px] font-bold max-w-[550px]">
        <span>
          {sortedBhks && sortedBhks.length > 5
            ? sortedBhks
                .filter(
                  (bhk) => !bhk.includes(".5") && !bhk.includes("Servant")
                )
                .slice(0, 5)
                .join(", ")
            : sortedBhks && sortedBhks.join(", ")}
        </span>
        {sortedBhks && sortedBhks.length > 5 && (
          <span
            className="text-btnPrimary text-[12px] sm:text-[14px] underline ml-1 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              dispatch({
                type: "OPEN",
                content: sortedBhks,
                title: "Unit Types",
                id: `${projIdEnc}+${propTypeId}`,
                conType: "bhk",
                pType: type
              });
              // Add your logic here to show all BHK types (e.g., open a modal)
            }}
          >
            +{sortedBhks.length - 5} more
          </span>
        )}
        {` ${propType} For Sale in ${locality}, ${city}`}
      </p>

      <p className="text-black text-[12px] sm:text-[16px] xl:text-[14px] capitalize font-medium line-clamp-1 max-w-[510px]">
        Address: {address}
      </p>
      <p className="text-black text-[12px] sm:text-[14px] xl:text-[14px] font-normal">
        Posted By:{" "}
        <span className="font-bold underline cursor-pointer">
          {builderName}
        </span>
      </p>
    </div>
  ) : (
    <div>
      <p className="text-[#242424] text-[14px] sm:text-[16px] xl:text-[18px] capitalize not-italic font-bold">
        {bhkName} {propTypeName} for {category} in {localityName}
      </p>
      <p className="text-[#148B16] text-[14px] sm:text-[18px] xl:text-xl not-italic font-bold relative">
        {formatCurrency(Number(price))}{" "}
        <span
          className="  text-btnPrimary cursor-pointer text-[12px] xl:text-sm"
          onClick={(e) => {
            e.stopPropagation();
            dispatch({
              conType: "otherCharges",
              content: {
                charges: otherCharges,
              },
              id: `${projIdEnc}+${propTypeId}`,
              title: "Other Charges",
              type: "OPEN",
              pType: type
            });
          }}
        >
          View Other Charges
        </span>
      </p>

      <p className="text-[#001F35] text-[12px] sm:text-[16px]   not-italic font-bold">
        {propName}{" "}
      </p>
      <p className="text-black text-[12px] sm:text-[16px] xl:text-[14px] capitalize font-medium line-clamp-1 max-w-[510px]">
        Address: {address}
      </p>
      <p className="text-[#242424]  text-[12px] sm:text-[12px]  xl:text-[14px] not-italic font-normal">
        Posted By:{" "}
        <span className="font-bold">
          {/* {getTypeText(type)} */}
          {postedBy}
        </span>
      </p>
    </div>
  );
}

export const projectprops = {
  villa: 31,
  plot: 32,
  rowHouse: 33,
  villament: 34,
  apartment: 35,
  independent: 36,
};
