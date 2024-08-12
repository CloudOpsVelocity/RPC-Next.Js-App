import { HeartIcon, ShareIcon } from "@/app/images/HomePageIcons";
import { formatCurrency, formatNumberWithSuffix } from "@/app/utils/numbers";
import { calculatePerSqPrice } from "@/app/utils/price";
import { Divider } from "@mantine/core";
import Image from "next/image";
import React from "react";
import ShareBtn from "../newly-added-projects/ShareBtn";
import { formatDate } from "@/app/utils/date";
import { getImageUrls } from "@/app/utils/image";
import Shortlist from "./Shortlist";
import ListingReqBtn from "./ListingReqCallbackBtn";
type Props = {
  item: any;
  sl: string;
};

export default function ListingCard({ item, sl }: Props) {
  const images = getImageUrls(item.media);
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/listing/banglore/${item.propIdEnc}`;
  const onRedirectOnProp = () => {
    window.open(url, "_blank");
  };

  const title = `${
    item.propTypeName === "Plot" ? `${item.pa} sq.ft` : item.bhkName
  } ${item.propTypeName} for ${item.category} in ${item.localityName}`;
  return (
    <div
      onClick={() => onRedirectOnProp()}
      className="w-full sm:w-[316px] xl:w-[490px] cursor-pointer"
    >
      <div className="h-[137px] sm:h-[145px] xl:h-[228px]   mb-[6px] shrink-0 shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] relative">
        <div className="flex  justify-start items-start gap-[8px] absolute top:0 right-0 p-[8px] ">
          <Shortlist reqId={item.propIdEnc} shortListed={sl} />
          <ShareBtn
            url={`${process.env.NEXT_PUBLIC_BACKEND_URL}/listing/banglore/${item.propIdEnc}`}
            type="prop"
          />
        </div>

        <a
          className="inline-flex justify-center items-center gap-2.5 rounded border p-1 xl:p-2 border-solid border-[#0073C6] bg-[#0073c6] text-white text-[10px] sm:text-[12px] xl:text-sm not-italic font-bold leading-[normal] capitalize absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-[1000]"
          href={url}
          target="_blank"
        >
          View Detail
        </a>

        <Image
          alt="test"
          src={images[0]}
          width={490}
          height={276}
          className="object-cover w-full h-full"
        />

        <div className="absolute bottom-2 left-2 space-y-2">
          <p className="flex justify-center items-center gap-1 rounded p-1 bg-[#000000b0] text-white text-[10px] sm:text-[12px] xl:text-base not-italic font-semibold leading-[normal] capitalize">
            {item.propStatus}
          </p>
        </div>
      </div>

      <div className="sm:min-h-[245px] /*  */ rounded shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] border-[0.8px] border-solid border-[#A4B8B5] bg-[#FFF]">
        <div className="p-[10px] sm:p-[7px] xl:p-[10px] flex justify-between">
          <div className="space-y-1  ">
            <p className="text-[#242424] text-[12px] sm:text-[14px] xl:text-lg not-italic font-semibold leading-[normal] capitalize">
              {item.propTypeName === "Plot" &&
                `${formatNumberWithSuffix(item.pa)} sq.ft`}{" "}
              {item.bhkName} {item.propTypeName} for {item.category} in{" "}
              {item.localityName}
            </p>

            <p className="text-[#148B16] text-[11px] sm:text-[12px] xl:text-base not-italic font-bold leading-[normal] capitalize">
              {formatCurrency(item.price)}
              {item.category === "Rent" ? "" : ","}{" "}
              {item.category !== "Rent" && (
                <span className="text-[#616D75] text-[11px] sm:text-[12px] xl:text-base not-italic font-bold leading-[normal] capitalize">
                  ₹{" "}
                  {formatNumberWithSuffix(
                    calculatePerSqPrice(
                      item.price,
                      item.propTypeName === "Plot" ? item.pa : item.sba
                    )
                  )}
                  /- sq.ft
                </span>
              )}
            </p>

            <p className="text-[#001F35] text-[12px] xl:text-[14px] not-italic font-semibold leading-[normal] capitalize">
              {item.propName}
            </p>

            <p className="text-[#242424] text-[9px] xl:text-[12px] not-italic font-semibold leading-[normal] capitalize">
              {item.cityName ?? "Banglore"}, {item.localityName}
            </p>
          </div>
          <div className="hidden  justify-start items-start gap-[8px] ">
            <Shortlist reqId={item.propIdEnc} shortListed={sl} />
            {/* <HeartIcon className="cursor-pointer w-[22px] h-[22px] sm:w-[20px] sm:h-[20px] xl:w-[26px] xl:h-[26px]" /> */}
            <ShareBtn
              url={`${process.env.NEXT_PUBLIC_BACKEND_URL}/listing/banglore/${item.propIdEnc}`}
              type="prop"
            />
          </div>
        </div>
        {/* by default new sortBy */}
        <div className="pl-3 mr-[14px] sm:mr-[4px] sm:ml-[0px] h-full gap-auto">
          <div className="inline-flex flex-wrap w-auto items-center gap-1 self-stretch rounded border-[0.5px] border-solid border-[#616D75] bg-[#F5F5F5] p-1">
            {item.propTypeName === "Plot" ? (
              <>
                <DownSectionCard
                  label="Plot Area"
                  value={`${formatNumberWithSuffix(item.pa)} sq.ft`}
                />
                <Divider orientation="vertical" color="#7BA0BB" />
                <DownSectionCard
                  label={"Possesion Date"}
                  value={formatDate(item.possassionDate, true)}
                />
                <Divider orientation="vertical" color="#7BA0BB" />
                <DownSectionCard
                  label={"Available From"}
                  value={formatDate(item.availableFrom, true)}
                />
              </>
            ) : item.propStatus === "Under Cunstruction" ? (
              <>
                <DownSectionCard
                  label="Super Builtup Area"
                  value={`${formatNumberWithSuffix(item.sba)} sq.ft`}
                />
                {}
                <Divider orientation="vertical" color="#7BA0BB" />
                <DownSectionCard
                  label="Carpet Area"
                  value={`${formatNumberWithSuffix(item.ca)} sq.ft`}
                />
                <Divider orientation="vertical" color="#7BA0BB" />
                <DownSectionCard
                  label={"Possesion Date"}
                  value={formatDate(item.possassionDate, true)}
                />
                <Divider orientation="vertical" color="#7BA0BB" />
                <DownSectionCard
                  label={"Available From"}
                  value={formatDate(item.availableFrom, true)}
                />
              </>
            ) : (
              <>
                <DownSectionCard
                  label="Super Builtup Area"
                  value={`${formatNumberWithSuffix(item.sba)} sq.ft`}
                />
                <Divider orientation="vertical" color="#7BA0BB" />
                <DownSectionCard
                  label="Carpet Area"
                  value={`${formatNumberWithSuffix(item.ca)} sq.ft`}
                />
                <Divider orientation="vertical" color="#7BA0BB" />
                {item.propertyAge != null ? (
                  <DownSectionCard
                    label="Property Age"
                    value={`${item.propertyAge}`}
                  />
                ) : (
                  <DownSectionCard
                    label={"Possesion Date"}
                    value={formatDate(item.possassionDate, true)}
                  />
                )}
                <Divider orientation="vertical" color="#7BA0BB" />
                <DownSectionCard
                  label={
                    item.category === "Rent"
                      ? "Available For"
                      : "Available From"
                  }
                  value={formatDate(item.availableFrom, true)}
                />
              </>
            )}
          </div>
          <div className="flex  mt-auto  justify-between   item-center w-[100%]">
            <p className="text-[#242424] text-[10px] xl:text-sm not-italic font-semibold leading-[normal] capitalize mt-[6px] mb-[6px]">
              Posted by: {item.postedBy}
            </p>
            <ListingReqBtn
              builderId={item.builderId}
              builderName={item.postedBy}
              projName={title}
              reqId={item.propIdEnc}
            />
          </div>
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
      <p className="text-[#001F35] text-[10px] sm:text-[12px] not-italic font-medium">
        {label}:
      </p>
      <p className="text-[#242424] text-[10px] xl:text-[12px] not-italic font-semibold">
        {value}
      </p>
    </div>
  );
};
