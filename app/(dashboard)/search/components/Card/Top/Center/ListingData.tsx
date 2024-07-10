import { formatDate, formatDateDDMMYYYY } from "@/app/utils/date";
import { Divider } from "@mantine/core";
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
}: Props) {
  console.log(type);
  return (
    <div className="flex w-[400px] gap-1 flex-col items-start  pl-[11px]  py-[2px] rounded border-[0.5px] border-solid border-[#616D75] bg-[#F5F5F5]">
      {type === "proj" && (
        <div className="mt-[2px]">
          <h5 className="text-[#001F35] text-sm font-medium">
            Listing Available
          </h5>
          <p className="text-[#242424]  text-base not-italic font-semibold">
            {propTypes && propTypes?.length > 0 ? propTypes?.join(", ") : ""}
          </p>
        </div>
      )}

      {/* down section start here */}
      {type === "proj" ? (
        <div className="flex items-center gap-4 self-stretch">
          <DownSectionCard
            label="Start Date"
            value={formatDate(launchDate, true)}
          />
          <Divider orientation="vertical" color="#7BA0BB" />
          <DownSectionCard
            label="End Date"
            value={formatDate(possassionDate, true)}
          />
          <Divider orientation="vertical" color="#7BA0BB" />
          <DownSectionCard
            label="Project Land Area"
            value={`${landArea ?? 0} Acres`}
          />
        </div>
      ) : (
        <div className="flex items-center gap-4 self-stretch">
          <DownSectionCard label="Super Builtup Area" value={sba} />
          <Divider orientation="vertical" color="#7BA0BB" />
          <DownSectionCard label="Carpet Area" value={ca} />
          <Divider orientation="vertical" color="#7BA0BB" />
          <DownSectionCard
            label="Property Age"
            value={`${landArea ?? 0} Acres`}
          />
          <Divider orientation="vertical" color="#7BA0BB" />
          <DownSectionCard
            label="Avaialble From"
            value={formatDate(availableFrom, true)}
          />
        </div>
      )}
    </div>
  );
}

const DownSectionCard = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex flex-col justify-center items-start ">
      <p className="text-[#001F35] text-sm not-italic font-medium">{label}:</p>
      <p className="text-[#242424] text-base not-italic font-semibold">
        {value}
      </p>
    </div>
  );
};
