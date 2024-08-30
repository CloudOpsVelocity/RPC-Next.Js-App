import { SuperBuildupAreaIcon } from "@/app/images/commonSvgs";
import { formatDate, formatDateDDMMYYYY } from "@/app/utils/date";
import { formatNumberWithSuffix } from "@/app/utils/numbers";
import { Divider } from "@mantine/core";
import clsx from "clsx";
import React from "react";

type Props = any;

export default function ListingData({
  propTypes,
  possassionDate,
  launchDate,
  landArea,
  type,
  availableFrom,
  ca,
  sba,
  propertyAge,
  propStatus,
  propTypeName,
  pa,
}: Props) {
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
            {/* {type === "proj" && (
              <div className="mt-[2px] hidden md:block max-w-fit">
                <h5 className="text-[#001F35] text-sm font-medium underline">
                  Property Available:
                </h5>
                <p className="text-[#242424]  text-base not-italic font-semibold">
                  {propTypes && propTypes?.length > 0
                    ? propTypes?.join(", ")
                    : ""}
                </p>
              </div>
            )} */}
            {type === "proj" && (
              <div className="mt-[2px] block md:hidden max-w-fit">
                <h5 className="text-[#001F35] text-wrap text-[12px] xl:text-sm font-medium underline">
                  Property Type
                </h5>
                <p className="text-[#242424]  text-wrap text-[12px] xl:text-base not-italic font-semibold">
                  {propTypes && propTypes?.length > 0
                    ? propTypes?.join(", ")
                    : ""}
                </p>
              </div>
            )}
            {/* <Divider
              orientation="vertical"
              color="#7BA0BB"
              className="flex md:hidden"
            /> */}
            <DownSectionCard
              label="Super Builtup Area"
              value={"1211-1111 sqft"}
            />
            {/* <Divider orientation="vertical" color="#7BA0BB" /> */}
            {/* <br /> */}
            <DownSectionCard label="Carpet Area" value={"1211-1111 sqft"} />
            {/* <Divider orientation="vertical" color="#7BA0BB" /> */}
            <DownSectionCard
              label={type == "proj" ? "Land Area" : "Property Age"}
              value={
                type == "proj"
                  ? `${landArea ?? 0} Acres`
                  : `${propertyAge ?? 0} Years`
              }
            />
            <DownSectionCard label={"No. of Units"} value={"2,000"} />
            <DownSectionCard label={"Elevation"} value={"G+20"} />
          </div>
        ) : (
          <div className="flex items-center gap-2 xl:gap-x-4 xl:gap-y-0 self-stretch flex-wrap">
            {propTypeName != "Plot" ? (
              <>
                <ListingDownSectionCard
                  label="Super Builtup Area"
                  value={`${formatNumberWithSuffix(sba)} sq.ft`}
                />
                <ListingDownSectionCard
                  label="Carpet Area"
                  value={`${formatNumberWithSuffix(ca)} sq.ft`}
                />
              </>
            ) : (
              <>
                <ListingDownSectionCard
                  label="Total Area"
                  value={`${formatNumberWithSuffix(pa)} sq.ft`}
                />
              </>
            )}

            {/* {propStatus == "Under Construction" ? null : (
              // <ListingDownSectionCard
              //   label="Possession Date"
              //   value={formatDate(possassionDate, true)}
              // />
              <ListingDownSectionCard
                label="Property Age"
                value={
                  type == "proj"
                    ? `${landArea ?? 0} Acres`
                    : `${propertyAge ?? `0 Years`} `
                }
              />
            )} */}
            {/* <ListingDownSectionCard
              label="Furnishing"
              value={"Fully Furnished"}
            /> */}

            <ListingDownSectionCard label={"Bathrooms"} value={"2"} />
            <ListingDownSectionCard label={"Balcony"} value={"6"} />
            <div className="flex flex-nowrap">
              <ListingDownSectionCard label={"Parkings"} value={"2"} />
              <ListingDownSectionCard
                label={"Converd Parkings"}
                value={"Converd 2"}
              />

              <ListingDownSectionCard label={"OwnerShip"} value={"FreeHold"} />
            </div>
          </div>
        )}
      </div>
      <div className="text-[12px] sm:text-[14px] pr-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
        expedita, deserunt...
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
  value: string;
  Icon?: React.JSX.Element;
}) => {
  return (
    <div className="flex flex-col justify-center items-start ">
      <p className="text-[#001F35] text-[12px] sm:text-[14px] xl:text-sm not-italic font-medium text-wrap underline inline-flex">
        {Icon} {label}:
      </p>
      <p className="text-[#242424] text-[12px] sm:text-[14px] xl:text-sm not-italic font-semibold">
        {value}
      </p>
    </div>
  );
};
const ListingDownSectionCard = ({
  label,
  value,
  Icon = <SuperBuildupAreaIcon className="w-4 h-4" />,
}: {
  label: string;
  value: string;
  Icon?: React.JSX.Element;
}) => {
  return (
    <div className="flex flex-col justify-center items-start ">
      <p className="text-[#001F35] text-[12px] sm:text-[14px] xl:text-sm not-italic font-medium text-wrap  inline-flex">
        {Icon} {value}:
      </p>
      <p className="text-[#242424] text-[12px]  not-italic ">{label}</p>
    </div>
  );
};
