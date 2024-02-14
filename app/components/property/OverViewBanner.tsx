"use client";
import PriceBag, {
  Phone,
  ShearIcon,
  WhatsAppButton,
} from "@/app/images/commonSvgs";
import React from "react";
import Button from "../../elements/button";
import { useDisclosure } from "@mantine/hooks";
import { Collapse, Modal } from "@mantine/core";
import Image from "next/image";
import { useSession } from "next-auth/react";
import S from "@/app/styles/Req.module.css";
import RequestCallBackModal from "../molecules/popups/req";
import { formatCurrency } from "@/app/utils/numbers";
export default function PropertyOverviewBanner({
  minPrice,
  maxPrice,
}: {
  minPrice: number;
  maxPrice: number;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [collapsed, { toggle }] = useDisclosure(false);

  return (
    <>
      <div className="flex justify-start items-center w-full flex-col md:flex-row bg-gradient-to-r from-[#EFF5FF] /50 to-[#F2FAFF ]/50 ">
        <PriceBag className="w-[150px] h-[170px] md:w-[237px] md:h-[263px] " />

        <div className="flex justify-between items-center w-[100%] flex-row ml-[3%] p-[2%] flex-wrap">
          <div className="">
            <p className="text-[#212C33] text-[24px] lg:text-[40px] font-[600]">
              PRICE{"  "}
              <span className="text-[#00487C] text-[24px] md:text-[32px] lg:text-[40px] whitespace-nowrap font-[700]">
                {formatCurrency(minPrice)},{" "}
                <span className="text-[#545353] text-[32px] not-italic font-medium leading-[normal]">
                  ₹ 1824 / price sq.ft
                </span>
              </span>
            </p>
            <Button
              icon={<Phone />}
              title="Request a Callback"
              buttonClass=" text-[#FFF] text-[16px] font-[600] bg-[#0073C6]  rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[6px]  "
              onChange={open}
            />
          </div>
          <div className="flex justify-center items-center flex-col">
            <button
              onClick={toggle}
              className="inline-flex items-start gap-2.5 p-5 mt-[13px]  shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[42px] text-[#0073C6] text-xl not-italic font-bold leading-[normal]"
            >
              {collapsed ? "Hide Price Break Up" : "Show Price Break Up"}
            </button>
            <WhatsAppButton
              className="cursor-pointer"
              onClick={""}
              name="Sagar Samundra"
            />
          </div>
        </div>

        <RequestCallBackModal close={close} opened={opened} builderId={1112} />
      </div>
      <Collapse in={collapsed}>
        <PriceBreakUp />
      </Collapse>
    </>
  );
}

const PriceBreakUp = () => {
  return (
    <>
      <div className="max-w-[90%] mx-auto p-6 bg-white rounded-lg shadow my-10">
        <h2 className="text-[#202020] text-[32px] not-italic font-semibold leading-[normal] uppercase;">
          PRICE BREAKUP
        </h2>
        <div className=" border-t border-gray-400 mt-4 space-y-4 py-8">
          <h3 className="text-[#034AB6] text-[28px] not-italic font-bold leading-[normal] underline uppercase">
            PRICE / SQ.FT
          </h3>
          <li className="flex w-[771px]  items-start gap-[26px] text-[#4D6677] text-2xl not-italic font-bold leading-[23.784px] border-dashed border-b pb-5">
            <div>Price/SQ.FT</div>{" "}
            <div className="font-semibold">₹ 72,52,050</div>
          </li>
        </div>
        <div className="w-full grid grid-cols-2 justify-between items-center">
          <div className=" border-t border-gray-400 mt-4 space-y-4 py-8 ">
            <h3 className="text-[#034AB6] text-[28px] not-italic font-bold leading-[normal] underline uppercase">
              applicable charges
            </h3>
            <li className="flex max-w-[771px]  items-start gap-[26px] text-[#4D6677]  text-2xl  font-bold leading-[23.784px]  border-b border-[#00000080] pb-5">
              <div>Price/SQ.FT</div>{" "}
              <div className="font-semibold">₹ 72,52,050</div>
            </li>
            <li className="flex max-w-[771px]  items-start gap-[26px] text-[#4D6677]  text-2xl  font-bold leading-[23.784px]  border-b border-[#00000080] pb-5">
              <div>Price/SQ.FT</div>{" "}
              <div className="font-semibold">₹ 72,52,050</div>
            </li>
            <li className="flex max-w-[771px]  items-start gap-[26px] text-[#4D6677]  text-2xl  font-bold leading-[23.784px]  border-b border-[#00000080] pb-5">
              <div>Price/SQ.FT</div>{" "}
              <div className="font-semibold">₹ 72,52,050</div>
            </li>
            <li className="flex max-w-[771px]  items-start gap-[26px] text-[#4D6677]  text-2xl  font-bold leading-[23.784px]  border-b border-[#00000080] pb-5">
              <div>Price/SQ.FT</div>{" "}
              <div className="font-semibold">₹ 72,52,050</div>
            </li>
            <li className="flex max-w-[771px]  items-start gap-[26px] text-[#4D6677]  text-2xl  font-bold leading-[23.784px]  border-b border-[#00000080] pb-5">
              <div>Price/SQ.FT</div>{" "}
              <div className="font-semibold">₹ 72,52,050</div>
            </li>
          </div>
          <SideCard />
        </div>
        <div className="w-full grid grid-cols-2 justify-between items-center">
          <div className=" border-t border-gray-400 mt-4 space-y-4 py-8 ">
            <h3 className="text-[#034AB6] text-[28px] not-italic font-bold leading-[normal] underline uppercase">
              Other charges
            </h3>
            <li className="flex max-w-[771px]  items-start gap-[26px] text-[#4D6677]  text-2xl  font-bold leading-[23.784px]  border-b-2 border-black pb-5">
              <div>Price/SQ.FT</div>{" "}
              <div className="font-semibold">₹ 72,52,050</div>
            </li>
            <li className="flex max-w-[771px]  items-start gap-[26px] text-[#4D6677]  text-2xl  font-bold leading-[23.784px]  border-b-2 border-black pb-5">
              <div>Price/SQ.FT</div>{" "}
              <div className="font-semibold">₹ 72,52,050</div>
            </li>
            <li className="flex max-w-[771px]  items-start gap-[26px] text-[#4D6677]  text-2xl  font-bold leading-[23.784px]  border-b-2 border-black pb-5">
              <div>Price/SQ.FT</div>{" "}
              <div className="font-semibold">₹ 72,52,050</div>
            </li>
            <li className="flex max-w-[771px]  items-start gap-[26px] text-[#4D6677]  text-2xl  font-bold leading-[23.784px]  border-b-2 border-black pb-5">
              <div>Price/SQ.FT</div>{" "}
              <div className="font-semibold">₹ 72,52,050</div>
            </li>
            <li className="flex max-w-[771px]  items-start gap-[26px] text-[#4D6677]  text-2xl  font-bold leading-[23.784px]  border-b-2 border-black pb-5">
              <div>Price/SQ.FT</div>{" "}
              <div className="font-semibold">₹ 72,52,050</div>
            </li>
          </div>
          <OtherSideCard />
        </div>
      </div>
    </>
  );
};

const SideCard = () => {
  return (
    <div
      className=" text-[#4D6677] flex w-96 h-[197px] justify-center items-center shrink-0 pt-7 pb-[27px] px-[27px] border-[color:var(--White-1,#F1F1F1)] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[20px] border-[0.6px] border-solid;
  background: var(--White-2, #fafafa) flex-col text-center ml-auto"
    >
      <p className="text-[color:var(--Pending,#F3A700)] text-center text-[22px] not-italic font-medium leading-[normal]">
        The sum of total of your other charges you included in the &rdquo;Other
        Charges Applicable&rdquo; is
      </p>
      <div className="mt-2 flex justify-center items-baseline text-[color:var(--newly-Added,#00ADE3)] text-[26px] not-italic font-bold leading-[normal] underline">
        <span className="text-lg font-semibold">₹</span>
        <span className="text-3xl font-bold">2&ldquo;05&ldquo;600</span>
      </div>
    </div>
  );
};

const OtherSideCard = () => {
  return (
    <div
      className=" text-[#4D6677] flex w-96 h-[197px] justify-center items-center shrink-0 pt-7 pb-[27px] px-[27px] border-[color:var(--White-1,#F1F1F1)] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[20px] border-[0.6px] border-solid;
  background: var(--White-2, #fafafa) flex-col text-center ml-auto"
    >
      <p className="text-[#343A44] text-center text-[20px] not-italic font-medium leading-[normal]">
        The sum of total of your other charges you included in the &rdquo;Other
        Charges Applicable&rdquo; is
      </p>
      <div className="text-[#148B16] text-[32px] not-italic font-semibold leading-[normal]">
        <span className="text-3xl font-bold mt-1">₹ 8,85,6000</span>
      </div>
    </div>
  );
};
