import React from "react";
import Button from "@/app/elements/button";
import {
  GradientLocation,
  Phone,
  ReraIcon,
  Shorlisted,
  Wallet,
  shortlistIconSvg,
} from "@/app/images/commonSvgs";
import { Search } from "@/app/validations/types/search";
import { formatDateDDMMYYYY } from "@/app/utils/date";
import Image from "next/image";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { useSession } from "next-auth/react";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import { formatCurrency } from "@/app/utils/numbers";
import { useSetAtom } from "jotai";
import { listingSearchAtom } from "@/app/store/search/map";

type Props = {
  type: any;
} & Search;

const ProjectDetailsCard = ({
  type,
  projName,
  minPrice,
  maxPrice,
  launchDate,
  possassionDate,
  agentListing,
  ownerListing,
  coverUrl,
  postedDate,
  projIdEnc,
  propTypes,
  lat,
  lang,
}: any) => {
  const { data: session } = useSession();

  const [, { open }] = useReqCallPopup();
  const [, { open: openLogin }] = usePopShortList();
  const { toggleShortlist, shortlistedItems, compareItems, toggleCompare } =
    useShortlistAndCompare();

  const isItemInShortlist =
    shortlistedItems.length > 0 &&
    shortlistedItems.some(
      (item) => item.id === projIdEnc && item.status === "Y"
    );

  const onAddingShortList = () => {
    if (session) {
      toggleShortlist({
        id: projIdEnc,
        status: isItemInShortlist ? "N" : "Y",
      });
    } else {
      openLogin();
    }
  };
  const isItemCompared =
    compareItems.length > 0 &&
    compareItems.some((item) => item.id === projIdEnc && item.status === "Y");
  const onAddingCompare = () => {
    if (session) {
      toggleCompare({
        id: projIdEnc,
        status: isItemCompared ? "N" : "Y",
      });
    } else {
      openLogin();
    }
  };
  const setSelectedSearch = useSetAtom(listingSearchAtom);
  return (
    <div className=" flex w-full mb-[5%] flex-col shadow-md ">
      <div className=" flex justify-center items-center w-full h-full">
        <div className="md:max-w-[320px] max-w-[150px] flex justify-center items-center w-full flex-col h-fit md:h-full    relative">
          <div className="relative">
            <Image
              src={coverUrl}
              width={320}
              height={174}
              alt="conver"
              className="w-full h-[110px] md:h-[174px]  shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] object-cover relative"
            />
            <p className="absolute text-[#FFF] text-[8px] md:text-[12px] bottom-2 left-5 md:mt-[-60px]  md:left-[10px] gap-[4px] z-10 flex justify-center rounded-[20px] items-center p-[7px] font-[500] rtm ">
              {" "}
              Ready to move
            </p>
          </div>

          <div className="flex-col flex md:hidden min-w-[100px] mt-2">
            <p className="text-[#202020] text-[10px] md:text-[16px] font-[400]">
              Posted By: <span className=" font-[600]">Builder</span>
            </p>
            <p className="text-[#202020] text-[10px] md:text-[16px] font-[400]">
              Date:{" "}
              <span className=" font-[600]">
                {formatDateDDMMYYYY(postedDate)}
              </span>
            </p>
          </div>
        </div>
        <div className="w-full px-[2%]">
          <div>
            {type == "proj" ? (
              <p className="text-[#001F35] text-[15px] not-italic font-semibold leading-[normal]">
                {projName}
              </p>
            ) : (
              <p className="text-[#001F35] text-[12px]  md:text-[20px] font-[600]   md:mb-0">
                3BHK Apartment for Sell in Kadugodi,{" "}
              </p>
            )}
            <p className=" text-[#148B16] text-[12px] md:text-base not-italic font-semibold mb-[19px]">
              Marthapathi Grand Field
            </p>
          </div>
          <div className="  justify-between items-start  flex ">
            <div className=" flex  items-start flex-col  ">
              <div>
                {type == "proj" && (
                  <p className="text-[#148B16] text-[12px] md:text-[15px] not-italic font-extrabold leading-[normal]">
                    {formatCurrency(Number(minPrice))} -{" "}
                    {formatCurrency(Number(maxPrice))}
                  </p>
                )}
                {type == "proj" && (
                  <p className="text-[#333] text-[12px] md:text-[16px] font-[500]">
                    Possession Date:{" "}
                    <span className=" font-[600]">
                      {formatDateDDMMYYYY(possassionDate)}
                    </span>
                  </p>
                )}

                {type != "proj" && (
                  <p className="text-[#333] text-[12px] md:text-[16px] font-[500]">
                    Super Builtup Area:{" "}
                    <span className=" font-[600]">2,617 sq.ft</span>
                  </p>
                )}

                {type != "proj" && (
                  <p className="text-[#333] text-[12px] md:text-[16px] font-[500]">
                    Carpet Area:{" "}
                    <span className=" font-[600]"> 2,617 sq.ft </span>₹ 9626/
                    sqft
                  </p>
                )}
                <p className="text-[#333] text-[12px] md:text-[16px] font-[500]">
                  Available From:{" "}
                  <span className=" font-[600]">
                    {formatDateDDMMYYYY(launchDate)}
                  </span>
                </p>
              </div>
            </div>

            <div className="  justify-end items-end flex-col hidden md:flex mt-auto ">
              <p className="text-[#202020] text-[12px] md:text-[16px] font-[400]">
                Posted By: <span className=" font-[600]">Builder</span>
              </p>
              <p className="text-[#202020] text-[12px] md:text-[16px] font-[400]">
                Date:{" "}
                <span className=" font-[600]">
                  {formatDateDDMMYYYY(postedDate)}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="md:flex w-[197px] flex-col justify-center items-center gap-[6px] shrink-0 px-[22px] py-4 bg-[#E9F6FF] hidden">
          <div className="flex justify-center items-center gap-2 px-2.5 py-2 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.05)_inset] rounded-[5px] border-[0.5px] border-solid border-[#CAE9FF] bg-white">
            <Wallet />{" "}
            <span className="text-[#233333] text-xl not-italic font-semibold">
              ₹ 2.36 Cr
            </span>
          </div>
          <button
            className=" justify-center items-center gap-1 p-2 border rounded-[21px] border-solid border-[#0094FF] text-[#202020] text-[12px] not-italic font-semibold leading-[normal] mb-1 md:inline-flex hidden bg-white"
            onClick={() =>
              setSelectedSearch({
                agentListing,
                ownerListing,
                projName,
                lat,
                lang,
              })
            }
          >
            View on Map <GradientLocation />
          </button>

          <Button
            onChange={() => onAddingShortList()}
            title={isItemInShortlist ? "Shortlisted" : "Shortlist"}
            buttonClass="text-[#FF7A00] text-[12px] font-[700] underline"
          />
          <Button
            onChange={() => onAddingCompare()}
            title={isItemCompared ? "Remove Compare" : " Add to Compare"}
            buttonClass="text-[#148B16] text-[12px] font-[700] underline"
          />

          <Button
            onChange={() => open("card", projIdEnc)}
            title="Request Callback"
            icon={<Phone className="h-[16px] w-[16px] " />}
            buttonClass="flex justify-center items-center text-[#FFF] p-[5px] bg-[#0073C6] rounded-[5px] shadow-md text-[12px] font-[700]"
          />
        </div>
      </div>
      <MobileDetails
        projIdEnc={projIdEnc}
        agentListing={agentListing}
        ownerListing={ownerListing}
        projName={projName}
        lat={lat}
        lang={lang}
      />
    </div>
  );
};

export default ProjectDetailsCard;

const MobileDetails = ({
  projIdEnc,
  agentListing,
  ownerListing,
  projName,
  lat,
  lang,
}: any) => {
  const [, { open }] = useReqCallPopup();
  const { data: session } = useSession();
  const { toggleShortlist, shortlistedItems, compareItems, toggleCompare } =
    useShortlistAndCompare();

  const isItemInShortlist =
    shortlistedItems.length > 0 &&
    shortlistedItems.some(
      (item) => item.id === projIdEnc && item.status === "Y"
    );
  const [, { open: openLogin }] = usePopShortList();
  const onAddingShortList = () => {
    if (session) {
      toggleShortlist({
        id: projIdEnc,
        status: isItemInShortlist ? "N" : "Y",
      });
    } else {
      openLogin();
    }
  };
  const isItemCompared =
    compareItems.length > 0 &&
    compareItems.some((item) => item.id === projIdEnc && item.status === "Y");
  const onAddingCompare = () => {
    if (session) {
      toggleCompare({
        id: projIdEnc,
        status: isItemCompared ? "N" : "Y",
      });
    } else {
      openLogin();
    }
  };
  const setSelectedSearch = useSetAtom(listingSearchAtom);
  return (
    <div className="flex md:hidden items-center justify-between gap-[10px] px-[12px] py-[11px] rounded-[10px] bg-[#E9F6FF] mt-5">
      <div className="flex flex-col justify-center items-start gap-2.5">
        <div className="flex justify-center items-center gap-2.5">
          <Button
            onChange={() => onAddingShortList()}
            title={isItemInShortlist ? "Shortlisted" : "Shortlist"}
            buttonClass="text-[#FF7A00] text-[12px] font-[700] underline"
          />
          <Button
            onChange={() => onAddingCompare()}
            title={isItemCompared ? "Remove Compare" : " Add to Compare"}
            buttonClass="text-[#148B16] text-[12px] font-[700] underline"
          />
        </div>
        <Button
          onChange={() => open("card", projIdEnc)}
          title="Request Callback"
          icon={<Phone className="h-[16px] w-[16px] " />}
          buttonClass="flex justify-center items-center text-[#FFF] p-[5px] bg-[#0073C6] rounded-[5px] shadow-md text-[12px] font-[700]"
        />
      </div>
      <div className=" justify-center items-center  gap-[5px]">
        <button
          className=" justify-center items-center gap-1 p-2 border rounded-[21px] border-solid border-[#0094FF] text-[#202020] text-[12px] not-italic font-semibold leading-[normal] mb-1 inline-flex  bg-white"
          onClick={() =>
            setSelectedSearch({
              agentListing,
              ownerListing,
              projName,
              lat,
              lang,
            })
          }
        >
          View on Map
        </button>{" "}
        <div className="flex justify-center items-center gap-2 px-2 py-2 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.05)_inset] rounded-[5px] border-[0.5px] border-solid border-[#CAE9FF] bg-white ">
          <span className="text-[#233333] text-xs not-italic font-semibold">
            ₹ 2.36 Cr
          </span>
        </div>
      </div>
    </div>
  );
};
