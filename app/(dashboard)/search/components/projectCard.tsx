import React from "react";
import Button from "@/app/elements/button";
import S from "@/app/styles/seach/Index.module.css";
import {
  Phone,
  ReraIcon,
  Shorlisted,
  shortlistIconSvg,
} from "@/app/images/commonSvgs";
import { Search } from "@/app/validations/types/search";
import { formatDateDDMMYYYY } from "@/app/utils/date";
import Image from "next/image";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { useSession } from "next-auth/react";
import LoginPopup from "@/app/components/project/modals/LoginPop";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";

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
  builderId,
  coverUrl,
  lang,
  lat,
  postedDate,
  projIdEnc,
  propTypes,
}: Props) => {
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
  return (
    <div className=" flex w-full mb-[5%] flex-col shadow-md ">
      <div className=" flex justify-center items-center w-full  ">
        <div className="max-w-[210px] flex justify-start items-start w-full flex-col  ">
          {type == "proj" && (
            <p className="text-[#FFF] text-[12px] mb-[-26px] z-10 flex justify-center items-center p-[3px] font-[500] bg-gradient-to-r from-[#148B16] /0 to-[#E5F4FF]/100">
              {" "}
              <ReraIcon /> RERA
            </p>
          )}
          <div className=" w-full h-[147px] bg-gray-300 ">
            <Image
              src={coverUrl}
              width={147}
              height={147}
              alt="conver"
              className="w-full h-full"
            />
          </div>
          <p className="text-[#FFF] text-[12px] mt-[-40px] relative left-[4px] gap-[4px] z-10 flex justify-center rounded-[20px] items-center p-[7px] font-[500] bg-gradient-to-r from-[#000] /0 to-[#00000066]/100">
            {" "}
            <ReraIcon /> Ready to move
          </p>
        </div>
        <div className="w-full p-[2%]">
          {type == "proj" ? (
            <p className="text-[#001F35] text-[15px] not-italic font-semibold leading-[normal]">
              {projName}
            </p>
          ) : (
            <p className="text-[#001F35] text-[15px] font-[600]">
              3BHK Apartment for Sell in Kadugodi,{" "}
              <span className="text-[#148B16] text-[16px] font-[700]">
                {" "}
                ₹ 2.36 Cr
              </span>
            </p>
          )}
          <p className="text-[#768AA9] text-sm not-italic font-semibold leading-[normal]">
            {propTypes && propTypes?.length > 0 ? propTypes?.join(" ,") : "N/A"}
            {}
          </p>
          <div className=" flex justify-between items-start w-full ">
            <div className=" flex justify-start items-start flex-col">
              {type == "proj" && (
                <p className="text-[#148B16] text-[15px] not-italic font-extrabold leading-[normal]">
                  ₹ {minPrice} Cr - ₹ {maxPrice} Cr
                </p>
              )}
              {type == "proj" && (
                <p className="text-[#333] text-[13px] font-[500]">
                  Possession Date:{" "}
                  <span className=" font-[600]">
                    {formatDateDDMMYYYY(possassionDate)}
                  </span>
                </p>
              )}

              {type != "proj" && (
                <p className="text-[#333] text-[13px] font-[500]">
                  Super Builtup Area:{" "}
                  <span className=" font-[600]">2,617 sq.ft</span>
                </p>
              )}

              {type != "proj" && (
                <p className="text-[#333] text-[13px] font-[500]">
                  Carpet Area:{" "}
                  <span className=" font-[600]"> 2,617 sq.ft </span>₹ 9626/ sqft
                </p>
              )}
              <p className="text-[#333] text-[13px] font-[500]">
                Available From:{" "}
                <span className=" font-[600]">
                  {formatDateDDMMYYYY(launchDate)}
                </span>
              </p>
            </div>

            <div className=" flex justify-end items-end flex-col">
              <p className="text-[#F9D728] text-[12px] font-[600]">
                No Rating Yet
              </p>
              <p className="text-[#202020] text-[12px] font-[400]">
                Posted By: <span className=" font-[600]">Builder</span>
              </p>
              <p className="text-[#202020] text-[12px] font-[400]">
                Date:{" "}
                <span className=" font-[600]">
                  {formatDateDDMMYYYY(postedDate)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center p-[1%] w-full">
        {type == "proj" && (
          <div>
            <p className="text-[#0073C6] text-xs not-italic font-medium leading-[normal] underline">
              Agent Listing Available : {agentListing}{" "}
            </p>
            <p className="text-[#4D6677] text-xs not-italic font-medium leading-[normal] underline">
              Owner Listing Available : {ownerListing}{" "}
            </p>
          </div>
        )}

        <div className="flex justify-end items-end p-[1%] gap-[10px] ml-auto ">
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
    </div>
  );
};

export default ProjectDetailsCard;
