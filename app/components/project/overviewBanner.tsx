"use client";
import PriceBag, { Phone, WhatsAppButton } from "@/app/images/commonSvgs";
import N from "@/app/styles/Numinput.module.css";
import React from "react";
import Button from "../../elements/button";
import { NumberInput, TextInput } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useForm, yupResolver } from "@mantine/form";
import { reqSchema } from "@/app/validations/project";
import { Button as B } from "@mantine/core";
import ReqOtpForm from "./forms/otpform";
import { addContact, sendContact } from "@/app/utils/api/actions/contact";
import { useParams } from "next/navigation";
import CountryInput from "../atoms/CountryInput";
import { formatCurrency } from "@/app/utils/numbers";
import { popupStateAtom, useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { useAtomValue } from "jotai";
import RequestCallBackModal from "../molecules/popups/req";
export default function OverviewBanner({
  minPrice,
  maxPrice,
  name,
  builderId,
}: {
  minPrice: number;
  maxPrice: number;
  name: string;
  builderId: number;
}) {
  const [opened, { open, close }] = useReqCallPopup();
  const { slug } = useParams<{ slug: string }>();

  return (
    <>
      <div className="flex justify-start items-center w-full flex-col md:flex-row bg-gradient-to-r from-[#EFF5FF] /50 to-[#F2FAFF ]/50 ">
        <PriceBag className="w-[150px] h-[170px] md:w-[237px] md:h-[263px] " />

        <div className="flex justify-center sm:justify-between items-center w-[100%] flex-row ml-[3%] p-[2%] flex-wrap">
          <div className=" grid place-items-center md:block">
            <p className="text-[#212C33] text-[24px] lg:text-[34px] font-[600] mb-4 md:text-start text-center">
              <span className="mr-4">PRICE RANGE</span>{" "}
              <span className="text-[#00487C] text-[24px] md:text-[32px] lg:text-[40px] whitespace-nowrap font-[700] mt-1">
                {formatCurrency(minPrice)} - {formatCurrency(maxPrice)}
              </span>
            </p>
            <Button
              icon={<Phone />}
              title="Request a Callback"
              buttonClass=" text-[#FFF] text-[16px] font-[600] bg-[#0073C6]  rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[6px]  "
              onChange={() => open("banner", slug)}
            />
          </div>

          <WhatsAppButton className="cursor-pointer" name={name} />
        </div>

        <RequestCallBackModal
          close={close}
          opened={opened}
          builderId={builderId}
        />
      </div>
    </>
  );
}
