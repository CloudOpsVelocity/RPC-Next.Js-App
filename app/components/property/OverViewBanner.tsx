"use client";
import PriceBag, {
  Phone,
  SVGBackground,
  WhatsAppButton,
} from "@/app/images/commonSvgs";
import React from "react";
import Button from "../../elements/button";
import { useDisclosure } from "@mantine/hooks";
import { Collapse, Modal } from "@mantine/core";
import RequestCallBackModal from "../molecules/popups/req";
import { formatCurrency } from "@/app/utils/numbers";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { useParams } from "next/navigation";
import { Main } from "@/app/validations/property";
import { calculatePerSqPrice } from "@/app/utils/price";
import ListItem from "./pricingbreakup";
export default function PropertyOverviewBanner({
  price,
  otherPrice,
  propTypeName,
  plotArea,
  sba,
  propName,
  bhkName,
  cg,
}: Main) {
  const [opened, { open, close }] = useReqCallPopup();
  const [collapsed, { toggle }] = useDisclosure(false);
  const { slug } = useParams<{ slug: string }>();
  const pricePerSq = calculatePerSqPrice(
    price,
    propTypeName === "Plot" ? plotArea : sba
  );
  return (
    <>
      <div className="flex justify-start items-center w-full flex-col md:flex-row bg-gradient-to-r from-[#EFF5FF] /50 to-[#F2FAFF ]/50 ">
        <PriceBag className="w-[150px] h-[170px] md:w-[237px] md:h-[263px] " />

        <div className="flex justify-center sm:justify-between items-center w-[100%] flex-row ml-[3%] p-[2%] flex-wrap">
          <div className="">
            <p className="text-[#212C33] text-[24px] lg:text-[40px] font-[600]">
              PRICE{"  "}
              <span className="text-[#00487C] text-[24px] md:text-[32px] lg:text-[40px] whitespace-nowrap font-[700]">
                {formatCurrency(price)},{" "}
                <span className="text-[#545353] text-lg md:text-[32px] not-italic font-medium leading-[normal]">
                  ₹ {pricePerSq} / price sq.ft
                </span>
              </span>
            </p>
            <Button
              icon={<Phone />}
              title="Request a Callback"
              buttonClass=" text-[#FFF] text-[16px] font-[600] bg-[#0073C6]  rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[6px]  "
              onChange={() => open("prop", slug)}
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
              name={`${bhkName} ${propTypeName} FOR
              ${cg === "S" ? " Sell" : " Rent"} In ${propName}`}
            />
          </div>
        </div>

        <RequestCallBackModal close={close} opened={opened} builderId={1112} />
      </div>
      <Collapse in={collapsed}>
        <PriceBreakUp otherPrice={otherPrice} price={pricePerSq} />
      </Collapse>
    </>
  );
}

const PriceBreakUp = ({
  otherPrice,
  price,
}: {
  otherPrice: Main["otherPrice"];
  price: string;
}) => {
  const filterOtherDetails =
    otherPrice &&
    Object?.keys(otherPrice).filter(
      (item) =>
        ![
          "otherCharge",
          "price",
          "securetyType",
          "clubHouseTill",
          "securityMonth",
        ].includes(item) && otherPrice[item] !== "NA"
    );

  const sum = filterOtherDetails?.reduce((a, b) => {
    if (b !== "price") {
      console.log(b);
      if (b === "security" && otherPrice.securetyType === "M") {
        // If securityType is "M", multiply security with securityMonth
        return (
          Number(a) +
          Number(otherPrice["security"]) * Number(otherPrice["securityMonth"])
        );
      } else {
        // Otherwise, proceed with normal addition
        return (
          Number(a) +
          (b === "otherCharge"
            ? parseOtherCharge(otherPrice[b])
            : Number(otherPrice[b] || "0"))
        );
      }
    } else {
      return Number(a);
    }
  }, 0);
  function parseOtherCharge(otherChargeString: string): number {
    let sum = 0;

    if (otherChargeString) {
      const charges: string[] = otherChargeString.split(",");
      charges.forEach((charge: string) => {
        const parts: string[] = charge.split("|");
        if (parts.length === 2) {
          const value: number = parseFloat(parts[1].trim());
          if (!isNaN(value)) {
            sum += value;
          }
        }
      });
    }

    return sum;
  }
  const otherChangeTotal = parseOtherCharge(otherPrice?.otherCharge);
  const chargesArray = otherPrice?.otherCharge?.split(",");
  return (
    <>
      <div className="max-w-[90%] mx-auto p-6 bg-white rounded-lg shadow my-10">
        <h2 className="text-[#202020] text-[32px] not-italic font-semibold leading-[normal] uppercase;">
          PRICE BREAKUP
        </h2>
        <div className=" border-t border-gray-400 mt-4 space-y-4 py-5 ">
          <h3 className="text-[#034AB6] text-[28px] not-italic font-bold leading-[normal] underline uppercase mb-[30px]">
            PRICE / SQ.FT
          </h3>
          <ListItem
            label="Price/SQ.FT"
            value={price}
            className="max-w-[747px] border-none"
          />
        </div>

        {sum > 0 && (
          <>
            <SVGBackground width={"100%"} className="my-8" />
            <div className="w-full grid md:grid-cols-2 justify-between items-center">
              <div className=" space-y-4 py-8 ">
                <h3 className="text-[#034AB6] text-[28px] not-italic font-bold leading-[normal] underline uppercase mb-[30px]">
                  applicable charges
                </h3>
                {filterOtherDetails?.map((key, i) => {
                  return (
                    <ListItem
                      key={i}
                      value={
                        key === "security"
                          ? Number(otherPrice[key]) *
                            Number(otherPrice.securityMonth)
                          : (otherPrice[key] as string)
                      }
                      label={
                        key === "clubHouseCharge"
                          ? `${displayNameMap[key]} (${otherPrice?.clubHouseTill} year)`
                          : key === "security"
                          ? `Security Deposit ${
                              otherPrice.securetyType === "F"
                                ? "Fixed"
                                : otherPrice.securetyType === "M"
                                ? "Multiple Of Rent"
                                : "NA"
                            }`
                          : displayNameMap[key]
                      }
                      className={
                        filterOtherDetails?.length - 1 === i
                          ? "border-none"
                          : ""
                      }
                    />
                  );
                })}
              </div>
              <SideCard price={sum + otherChangeTotal} />
            </div>
          </>
        )}

        {otherPrice?.otherCharge && (
          <>
            <SVGBackground width={"100%"} className="my-8" />
            <div className="w-full grid md:grid-cols-2 justify-between ">
              <div className="   space-y-4 py-8 ">
                <h3 className="text-[#034AB6] text-[28px] not-italic font-bold leading-[normal] underline uppercase mb-[30px]">
                  Other charges
                </h3>
                {chargesArray.map((charge, index) => {
                  const [chargeName, chargeValue] = charge.split("|");
                  return (
                    <ListItem
                      key={index}
                      label={chargeName.trim()}
                      value={chargeValue.trim()}
                    />
                  );
                })}
              </div>
              <OtherSideCard price={sum + otherChangeTotal + Number(price)} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

const SideCard = ({ price }: { price: number }) => {
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
        <span className="text-3xl font-bold">₹ {price}</span>
      </div>
    </div>
  );
};

const OtherSideCard = ({ price }: { price: number }) => {
  return (
    <div
      className=" text-[#4D6677] flex w-96 h-[197px] justify-center items-center shrink-0 pt-7 pb-[27px] px-[27px] border-[color:var(--White-1,#F1F1F1)] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[20px] border-[0.6px] border-solid;
  background: var(--White-2, #fafafa) flex-col text-center ml-auto mt-4"
    >
      <p className="text-[#343A44] text-center text-[20px] not-italic font-medium leading-[normal]">
        The sum of total of your other charges you included in the &rdquo;Other
        Charges Applicable&rdquo; is
      </p>
      <div className="text-[#148B16] text-[32px] not-italic font-semibold leading-[normal]">
        <span className="text-3xl font-bold mt-1">₹ {price}</span>
      </div>
    </div>
  );
};
type DisplayNameMap = {
  [key: string]: string;
};
const displayNameMap: DisplayNameMap = {
  clubHouseCharge: "Club House Subscription",
  mncCharge: "Maintenance & Corpus Fund",
  taxGovtCharge: "Tax & Government Charges",
  ownershipCharge: "Ownership Transfer Fees",
  legalCharge: "Legal Charges",
  otherCharge: "otherCharge",
  elctCharge: "Electricity Charges",
  waterCharge: "Water Charges",
  maintananceChargess: "Maintenance Charges",
  securetyType: "securetyType",
  security: "Security Deposit",
  securityMonth: "securityMonth",
};
