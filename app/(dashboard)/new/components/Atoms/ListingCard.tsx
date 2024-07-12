import { HeartIcon, ShareIcon } from "@/app/images/HomePageIcons";
import { formatCurrency } from "@/app/utils/numbers";
import { calculatePerSqPrice } from "@/app/utils/price";
import { Divider } from "@mantine/core";
import Image from "next/image";
import React from "react";

type Props = {
  item: any;
};

export default function ListingCard({ item }: Props) {
  return (
    <div className="w-[490px]">
      <div className="h-[276px] shrink-0 shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] relative">
        <a
          className="inline-flex justify-center items-center gap-2.5 rounded border p-2 border-solid border-[#0073C6] bg-[#0073c6] text-white text-sm not-italic font-bold leading-[normal] capitalize absolute bottom-3 right-3"
          href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/listing/banglore/${item.propIdEnc}`}
          target="_blank"
        >
          View Detail
        </a>
        <Image
          alt="test"
          src={item.media.coverImageUrl}
          width={490}
          height={276}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-2 left-2 space-y-2">
          <p className="flex justify-center items-center gap-1 rounded p-1 bg-[#000000b0] text-white text-base not-italic font-semibold leading-[normal] capitalize">
            {item.propStatus}
          </p>
        </div>
      </div>
      <div className="h-[183px] self-stretch rounded shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] border-[0.8px] border-solid border-[#A4B8B5]bg-white">
        <div className="p-3 flex justify-between">
          <div className="space-y-1">
            <p className="text-[#148B16] text-[22px] not-italic font-bold leading-[normal] capitalize">
              {formatCurrency(item.price)},{" "}
              {item.category !== "Rent" && (
                <span className="text-[#616D75] text-base not-italic font-bold leading-[normal] capitalize">
                  ₹ {calculatePerSqPrice(item.price, item.sba)}/- sq.ft
                </span>
              )}
            </p>

            <p className="text-[#242424] text-lg not-italic font-semibold leading-[normal] capitalize">
              {item.bhkName} {item.propTypeName} for {item.category} in{" "}
              {item.localityName}
            </p>
            <p className="text-[#242424] text-sm not-italic font-semibold leading-[normal] capitalize">
              {item.cityName ?? "Banglore"}, {item.localityName}
            </p>
          </div>
          <div className="flex gap-2">
            <ShareIcon className="cursor-pointer" />
          </div>
        </div>
        <div className="pl-3">
          <div className="inline-flex items-center gap-1 self-stretch rounded border-[0.5px] border-solid border-[#616D75] bg-[#F5F5F5] p-1">
            <DownSectionCard label="Super Builtup Area" value="2,617 sq.ft" />
            <Divider orientation="vertical" color="#7BA0BB" />
            <DownSectionCard label="Carpet Area" value="2,617 sq.ft" />
            <Divider orientation="vertical" color="#7BA0BB" />
            <DownSectionCard label="Property Age" value="0-2 Years" />
            <Divider orientation="vertical" color="#7BA0BB" />
            <DownSectionCard label="Available For" value="Bachelor’s" />
          </div>
          <p className="text-[#242424] text-sm not-italic font-semibold leading-[normal] capitalize mt-2">
            Posted by: {item.postedBy}
          </p>
        </div>
      </div>
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
      <p className="text-[#001F35] text-[13px] not-italic font-medium">
        {label}:
      </p>
      <p className="text-[#242424] text-sm not-italic font-semibold">{value}</p>
    </div>
  );
};
