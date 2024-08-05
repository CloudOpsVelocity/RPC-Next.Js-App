import { HeartIcon, ShareIcon } from "@/app/images/HomePageIcons";
import { formatCurrency } from "@/app/utils/numbers";
import { calculatePerSqPrice } from "@/app/utils/price";
import { Divider } from "@mantine/core";
import Image from "next/image";
import React from "react";
import ShareBtn from "../newly-added-projects/ShareBtn";
import { formatDate } from "@/app/utils/date";
import { Carousel } from "@mantine/carousel";
import { getImageUrls } from "@/app/utils/image";
import styles from "./Carouse.module.css";
import { useMediaQuery } from "@mantine/hooks";
type Props = {
  item: any;
};

export default function ListingCard({ item }: Props) {
  const images = getImageUrls(item.media);
  const isMobile = useMediaQuery("(max-width: 601px)");
  return (
    <div className="w-full sm:w-[490px]">
      <div className="h-[137px] sm:h-[228px] mb-[6px] shrink-0 shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] relative">
        <div className="flex sm:hidden justify-start items-start gap-[8px] absolute top:0 right-0 p-[8px] ">
            <HeartIcon className="cursor-pointer w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] " />
            <ShareBtn
              url={`${process.env.NEXT_PUBLIC_BACKEND_URL}/listing/banglore/${item.propIdEnc}`}
            />
        </div>

        <a
          className="inline-flex justify-center items-center gap-2.5 rounded border p-1 sm:p-2 border-solid border-[#0073C6] bg-[#0073c6] text-white text-[10px] sm:text-sm not-italic font-bold leading-[normal] capitalize absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-[1000]"
          href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/listing/banglore/${item.propIdEnc}`}
          target="_blank"
        >
          View Detail
        </a>
        {/* <Carousel mah={276} classNames={styles}>
          {images.map((image, index) => (
            <Carousel.Slide mah={276} key={index}> */}
        <Image
          alt="test"
          src={images[0]}
          width={490}
          height={276}
          className="object-cover w-full h-full"
        />
        {/* </Carousel.Slide>
          ))} */}
        {/* </Carousel> */}
        <div className="absolute bottom-2 left-2 space-y-2">
          <p className="flex justify-center items-center gap-1 rounded p-1 bg-[#000000b0] text-white text-[10px] sm:text-base not-italic font-semibold leading-[normal] capitalize">
            {item.propStatus}
          </p>
        </div>
      </div>

      <div className="sm:min-h-[204px] self-stretch rounded shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] border-[0.8px] border-solid border-[#A4B8B5] bg-[#FFF]">
        <div className="p-[10px] flex justify-between">
          <div className="space-y-1">
            <p className="text-[#242424] text-[12px] sm:text-lg not-italic font-semibold leading-[normal] capitalize">
              {item.propTypeName === "Plot" && `${item.pa} sq.ft`}{" "}
              {item.bhkName} {item.propTypeName} for {item.category} in{" "}
              {item.localityName}
            </p>

            <p className="text-[#148B16] text-[11px] sm:text-[20px] not-italic font-bold leading-[normal] capitalize">
              {formatCurrency(item.price)},{" "}
              {item.category !== "Rent" && (
                <span className="text-[#616D75] text-[11px] sm:text-[14px] sm:text-base not-italic font-bold leading-[normal] capitalize">
                  ₹{" "}
                  {calculatePerSqPrice(
                    item.price,
                    item.propTypeName === "Plot" ? item.pa : item.sba
                  )}
                  /- sq.ft
                </span>
              )}
            </p>

            <p className="text-[#001F35] text-[12px] sm:text-[14px] not-italic font-semibold leading-[normal] capitalize">
              {item.propName}
            </p>

           
            <p className="text-[#242424] text-[9px] sm:text-[12px] not-italic font-semibold leading-[normal] capitalize">
              {item.cityName ?? "Banglore"}, {item.localityName}
            </p>
          </div>
          <div className="hidden sm:flex justify-start items-start gap-[8px] ">
            <HeartIcon className="cursor-pointer w-[22px] h-[22px] sm:w-[26px] sm:h-[26px]" />
            <ShareBtn
              url={`${process.env.NEXT_PUBLIC_BACKEND_URL}/listing/banglore/${item.propIdEnc}`}
            />
          </div>
        </div>
        {/* by default new sortBy */}
        <div className="pl-3 mr-[14px] sm:mr-0">
          <div className="inline-flex flex-wrap items-center gap-1 self-stretch rounded border-[0.5px] border-solid border-[#616D75] bg-[#F5F5F5] p-1">
            {item.propTypeName === "Plot" ? (
              <>
                <DownSectionCard label="Plot Area" value={`${item.pa} sq.ft`} />
                <Divider orientation="vertical" color="#7BA0BB" />
                <DownSectionCard
                  label={"Possesion Date"}
                  value={formatDate(item.possassionDate, true)}
                />
                <Divider
                  orientation="vertical"
                  color="#7BA0BB"
                  className="!hidden sm:!block"
                />
                <DownSectionCard
                  label={"Available From"}
                  value={formatDate(item.availableFrom, true)}
                />
              </>
            ) : item.propStatus === "Under Cunstruction" ? (
              <>
                <DownSectionCard
                  label="Super Builtup Area"
                  value={`${item.sba} sq.ft`}
                />
                <Divider orientation="vertical" color="#7BA0BB" />
                <DownSectionCard
                  label="Carpet Area"
                  value={`${item.ca} sq.ft`}
                />
                <Divider
                  orientation="vertical"
                  color="#7BA0BB"
                  className="!hidden sm:!block"
                />
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
                  value={`${item.sba} sq.ft`}
                />
                <Divider orientation="vertical" color="#7BA0BB" />
                <DownSectionCard
                  label="Carpet Area"
                  value={`${item.ca} sq.ft`}
                />
                <Divider
                  orientation="vertical"
                  color="#7BA0BB"
                  className="!hidden sm:!block"
                />
                <DownSectionCard label="Property Age" value="0-2 Years" />
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
          <p className="text-[#242424] text-[10px] sm:text-sm not-italic font-semibold leading-[normal] capitalize mt-[6px] mb-[6px]">
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
      <p className="text-[#001F35] text-[10px] not-italic font-medium">
        {label}:
      </p>
      <p className="text-[#242424] text-[10px]  sm:text-[12px] not-italic font-semibold">{value}</p>
    </div>
  );
};
