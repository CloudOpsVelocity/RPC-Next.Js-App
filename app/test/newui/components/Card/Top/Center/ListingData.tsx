import { modalAtom } from "@/app/test/newui/store/jotai";
import { overlayAtom } from "@/app/test/newui/store/overlay";
import { getAuthorityNames } from "@/app/utils/api/project";
import { formatNumberWithSuffix } from "@/app/utils/numbers";
import { useMediaQuery } from "@mantine/hooks";
import clsx from "clsx";
import { useAtom, useSetAtom } from "jotai";
import React from "react";
import { useQuery } from "react-query";

type Props = any;

export default function ListingData({
  propTypes,
  landArea,
  type,
  ca,
  sba,
  propertyAge,
  propTypeName,
  pa,
  usp,
  projectAbout = usp,
  maxSba,
  minSba,
  minCa,
  maxCa,
  noOfUnits,
  noOfTowers,
  parking,
  balcony,
  bathroom,
  ownership,
  coverParking,
  propTypeId,
  minPa,
  maxPa,
  projIdEnc,
  propStatus,
  towerData,
  availableFor,
  propIdEnc,
  phaseId,
  projAuthority,
  approvedById,
}: Props) {
  const isMobile = useMediaQuery("(max-width: 1600px)");
  const isPlot = propTypeId == 32;
  const isRent = type === "Rent";
  const readMoreThreshold = 200;
  const isReadMoreNeeded = projectAbout?.length > readMoreThreshold;
  const dispatch = useSetAtom(overlayAtom);

  const { data: approvedData, isLoading } = useQuery({
    queryKey: ["projAuth"],
    enabled: false,
  });

  const getApproveNames = (stringIds: string) => {
    // ids.split(",").map((item:string)=>item.split(' – ')[0]).join(', ')

    // let authorityName = [];
    // approvedData.map(each=>{
    //   if(ids.includes(each.cid)){
    //     authorityName.push(each.constDesc);
    //   }
    // })

    // return authorityName;

    const authorityNames = [];
    for (const item of approvedData as any) {
      if (stringIds.includes(item.cid.toString())) {
        authorityNames.push(item.constDesc.split(" – ")[0]);
      }
    }

    return authorityNames.join(", ");
  };

  return (
    <>
      {" "}
      <div
        className={clsx(
          "flex mb-2 sm:max-w-[600px]   gap-1 flex-col items-start  pl-[0px]  py-[2px] rounded  border-solid border-[#616D75] bg-white",
          type !== "proj" && "m-w-full w-full"
        )}
      >
        {/* down section start here */}
        {type === "proj" ? (
          <div className="flex flex-wrap xl:flex items-center gap-2 xl:gap-x-4 xl:gap-y-0 self-stretch">
            <DownSectionCard
              label={isPlot ? "Plot Area" : "Super Builtup Area"}
              value={
                isPlot
                  ? minPa === maxPa
                    ? `${formatNumberWithSuffix(minPa, false)} sqft`
                    : `${formatNumberWithSuffix(
                        minPa,
                        false
                      )}-${formatNumberWithSuffix(maxPa, false)} sqft`
                  : minSba === maxSba
                  ? `${formatNumberWithSuffix(minSba, false)} sqft`
                  : `${formatNumberWithSuffix(
                      minSba,
                      false
                    )}-${formatNumberWithSuffix(maxSba, false)} sqft`
              }
            />

            {/* <Divider orientation="vertical" color="#7BA0BB" /> */}
            {/* <br /> */}
            {!isPlot && (
              <DownSectionCard
                label="Carpet Area"
                value={
                  minCa === maxCa
                    ? `${formatNumberWithSuffix(minCa, false)} sqft`
                    : `${formatNumberWithSuffix(
                        minCa,
                        false
                      )}-${formatNumberWithSuffix(maxCa, false)} sqft`
                }
              />
            )}

            {/* <Divider orientation="vertical" color="#7BA0BB" /> */}
            {!isPlot && (
              <DownSectionCard
                label={type == "proj" ? "Land Area" : "Property Age"}
                value={
                  type == "proj"
                    ? `${formatNumberWithSuffix(landArea, false) ?? 0} sqft`
                    : `${propertyAge ?? 0} Years`
                }
              />
            )}

            <DownSectionCard
              label={"No. of Units"}
              value={formatNumberWithSuffix(noOfUnits, false)}
            />
            <DownSectionCard
              label={"Approved By"}
              value={
                approvedById ? getApproveNames(approvedById.split(",")) : null
              }
            />

            {!isMobile && !isPlot && (
              <DownSectionCard label={"Elevation"} value={`${towerData}`} />
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 xl:gap-x-4 xl:gap-y-0 self-stretch flex-wrap">
            {propTypeName != "Plot" ? (
              <>
                <DownSectionCard
                  label="Super Builtup Area"
                  value={`${formatNumberWithSuffix(sba, false)} sq.ft`}
                />
                <DownSectionCard
                  label="Carpet Area"
                  value={`${formatNumberWithSuffix(ca, false)} sq.ft`}
                />

                {propStatus !== "Under Construction" && (
                  <DownSectionCard
                    label={"Property age"}
                    value={propertyAge ?? "N/A"}
                  />
                )}
              </>
            ) : (
              <DownSectionCard
                label="Total Area"
                value={`${formatNumberWithSuffix(pa, false)} sq.ft`}
              />
            )}
            <DownSectionCard label={"OwnerShip"} value={ownership} />
            {isRent && (
              <DownSectionCard label={"Available For"} value={availableFor} />
            )}

            <div className="flex flex-nowrap gap-2 xl:gap-x-4">
              {/* <DownSectionCard label={"Approved By"} value={approvedById ? approvedById.split(",").map((item:string)=>item.split(' – ')[0]).join(', ') : null} /> */}

              <DownSectionCard
                label={"Approved By"}
                value={
                  approvedById ? getApproveNames(approvedById.split(",")) : null
                }
              />

              <DownSectionCard
                label={"Bathrooms"}
                value={bathroom && `${bathroom} No's`}
              />
              <DownSectionCard
                label={"Balcony"}
                value={balcony && `${balcony} No's`}
              />
              <DownSectionCard
                label={"Parkings"}
                value={parking && `${parking} No's (${coverParking})`}
              />
              {isRent && (
                <DownSectionCard label={"Security Deposit"} value={`4,333`} />
              )}
            </div>
          </div>
        )}
      </div>
      <div
        className="text-[12px] sm:text-[14px] pr-2 line-clamp-2"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {projectAbout && (
          <div className="line-clamp-2 relative">
            <span
              dangerouslySetInnerHTML={{
                __html: projectAbout.slice(0, readMoreThreshold),
              }}
            />
            {isReadMoreNeeded && (
              <div className="absolute bottom-0 right-0 bg-white">
                <span className="text-black">...</span>{" "}
                <button
                  className="text-btnPrimary font-bold text-[12px] sm:text-[14px] underline  cursor-pointer   "
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents the modal from opening if clicking elsewhere
                    console.log("read more testing");
                    dispatch({
                      content: projectAbout,
                      // id: `${
                      //   type === "proj" ? projIdEnc : propIdEnc
                      // }+${propTypeId ?? propTypeName ?? ''}${
                      //   type === "proj" && phaseId ? "+" + phaseId : ""
                      // }`,
                      id: `${projIdEnc ?? ""}+${propIdEnc ?? ""}${
                        propTypeId ?? propTypeName ?? ""
                      }${type === "proj" && phaseId ? "+" + phaseId : ""}`,
                      title:
                        type === "proj" ? "About Project" : "About Property",
                      type: "OPEN",
                      conType: "readmore",
                      pType: type,
                    });
                  }}
                >
                  Read More
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
const DownSectionCard = ({
  label,
  value,
  Icon,
}: {
  label: string;
  value: any;
  Icon?: React.JSX.Element;
}) => {
  return value ? (
    <div className="flex flex-col justify-center items-start ">
      <p className="text-[#001F35] text-[12px] sm:text-[14px] xl:text-sm not-italic font-medium text-wrap underline inline-flex">
        {Icon} {label}:
      </p>
      <p className="text-[#242424] text-[12px] sm:text-[14px] xl:text-sm not-italic font-semibold">
        {value}
      </p>
    </div>
  ) : null;
};
