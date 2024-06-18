"use client";
import PriceBag, {
  DocIcon,
  Phone,
  WhatsAppButton,
} from "@/app/images/commonSvgs";
import React from "react";

import Button from "../../elements/button";
import { useParams } from "next/navigation";
import { formatCurrency } from "@/app/utils/numbers";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import RequestCallBackModal from "../molecules/popups/req";
import DownloadBroucher from "@/app/components/project/downloadBroucher";
export default function OverviewBanner({
  minPrice,
  maxPrice,
  name,
  buiderName,
  basePrice,
  brocherUrl,
}: {
  minPrice: number;
  maxPrice: number;
  name: string;
  buiderName: string;
  basePrice: number;
  brocherUrl?: string;
}) {
  const [opened, { open, close, source }] = useReqCallPopup();
  const { slug } = useParams<{ slug: string }>();

  return (
    <>
      <div
        className="flex justify-start items-center w-full flex-col md:flex-row bg-[#f0f9ff] scroll-mt-40"
        id="brochure"
      >
        <PriceBag className="w-[150px] h-[170px] md:w-[237px] md:h-[263px] " />

        <div className="flex justify-center sm:justify-between items-center w-[100%] flex-row ml-[3%] p-[2%] flex-wrap">
          <div className=" grid place-items-center md:block">
            <p className="text-[#212C33] text-[24px] lg:text-[34px] font-[600]  md:text-start text-center">
              PRICE RANGE
            </p>
            <p className="text-[#001F35] text-[24px] md:text-[32px] lg:text-[40px] whitespace-nowrap font-[700] mt-1">
              {formatCurrency(minPrice)} - {formatCurrency(maxPrice)}
              {", "}
              <span className="text-[#545353] text-lg md:text-[32px] not-italic font-medium leading-[normal]">
                ₹ {basePrice} / price sq.ft
              </span>
            </p>
            <Button
              title="Request  Callback"
              buttonClass=" text-[#FFF] text-[28px] font-[600] bg-[#0073C6]  rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[8px]  mt-3"
              onChange={() => open("banner", slug, "projBanner")}
            />
          </div>
          <div className="">
            <DownloadBroucher url={brocherUrl} />
            <WhatsAppButton className="cursor-pointer mt-4" name={name} />
          </div>
        </div>

        <RequestCallBackModal
          close={close}
          opened={opened}
          builderName={buiderName}
          name={name}
          source={source}
        />
      </div>
    </>
  );
}
