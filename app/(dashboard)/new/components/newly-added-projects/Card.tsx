import React from "react";
import { formatCurrency } from "@/app/utils/numbers";
import { formatDate } from "@/app/utils/date";
import Image from "next/image";
import ViewAllButton from "./ViewButton";
import ShareBtn from "./ShareBtn";
import ReqBtn from "./ReqBtn";
import Shortlist from "./Shortlist";
import ProjectLink, {
  createProjectLinkUrl,
} from "@/app/utils/linkRouters/ProjectLink";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";

type Props = { item: any };

export default function Card({ item }: Props) {
  let url = createProjectLinkUrl({
    city: item.city,
    locality: item.locality,
    slug: item.projName,
    projIdEnc: item.projIdEnc,
  });
  // let urlBuilder=`${process.env.NEXT_PUBLIC_BACKEND_URL}/builder/${item.builderId}`;

  let builderName = item?.postedByName?.toLowerCase().split(" ").join("%2D");
  let builderCity = item?.builderCity?.toLowerCase().split(" ").join("%2D");
  let urlBuilder = `${process.env.NEXT_PUBLIC_BACKEND_URL}/builders/${builderCity}/${builderName}`;

  // const builderiRedirect = (e: any) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   window.open(urlBuilder, "_blank", "noreferrer"); 
  // };

  return (
    <div className="relative w-[316px] sm:w-[503px] xl:w-[631px] h-[326px] sm:h-[294px] xl:h-[368px] shrink-0">
      <Link prefetch={false} href={url}><div className=" absolute top-0 left-0 h-full w-[170px] md:w-[40%] z-[2] ">{`${``}`}</div></Link>
      <div>
        <div>
          <div className="z-[100]">
            <Image
              src={item.coverUrl}
              alt={item.projName}
              fill
              className=" absolute top-0 left-0  z-0 "
            />
          </div>
          {/*  {item.builderLogo && (
          <img
            src={item.builderLogo}
            alt=""
            className="w-[45px] h-[45px] sm:w-[54px] sm:h-[54px] xl:w-[67px] xl:h-[67px] object-cover top-[12px] left-[12px] relative"
          />
        )} */}
          {(item.rerastatus === "Recieved" ||
            item.rerastatus === "Applied") && (
            <Image
              src={"/r.svg"}
              alt="rera"
              width={100}
              height={100}
              className="absolute top-0 left-0 z-[10]"
            />
          )}

          {/*  <p className="text-green-600">{item.rerastatus}</p> */}

          <div className="absolute right-0 top-0 w-full sm:w-[503xpx] h-full p-[12px] shrink-0 bg-gradient-to-t sm:bg-gradient-to-l from-[#00121F] via-[rgba(59,70,98,0.86)] to-[#565d700a] text-right flex flex-col justify-end sm:justify-between">
            <div>
              <div className="text-white text-[16px] xl:text-[18px] not-italic font-extrabold leading-[normal] tracking-[0.64px] flex justify-end items-center">
                <div className="absolute  sm:static top-[10px] sm:top-5 right-1  inline-flex  gap-3 mr-2 sm:mr-6 z-[3] ">
                  <Shortlist
                    reqId={item.projIdEnc}
                    shortListed={item.shortListed}
                  />

                  <ShareBtn url={url} type="proj" />
                </div>{" "}
                <Link aria-label={`View details for ${item.projName}`} prefetch={false} href={url}>{item.projName}</Link>
              </div>
              <Link  aria-label={`View details for ${item.projName}`} prefetch={false} href={url}>
                <span className=" block text-white text-[16px] xl:text-[18px] not-italic font-bold leading-[normal] tracking-[0.52px] mt-[8px] text-nowrap">
                  {formatCurrency(item.minPrice)} -{" "}
                  {formatCurrency(item.maxPrice)}
                </span>
                <span className=" block text-white text-[12px] xl:text-[18px] not-italic font-bold leading-[normal] tracking-[0.4px] mt-[8px] sm:mt-[8px]">
                  {item.propTypes?.join(", ")}
                </span>

                <span className=" flex text-white space-x-2 justify-end items-center  text-[12px] xl:text-[15px] not-italic font-bold leading-[normal] tracking-[0.4px] mt-[8px] sm:mt-[8px]">
                  <FaLocationDot className="mr-1 " size={12} />
                  {item.city} - {item.locality}
                </span>
              </Link>
            </div>
            <div className="flex flex-col items-end gap-[9px] xl:gap-[19px]">
              <div className="space-y-2">
                <span className=" no-underline text-[#ffff]">Builder: </span>
                <Link
                 aria-label={`View details for ${item.postedByName}`}
                  href={urlBuilder}
                  prefetch={false}
                  // onClick={(e) => builderiRedirect(e)}
                  className="text-[#E3AC00] text-[12px] sm:text-[14px] xl:text-[16px] not-italic font-bold leading-[normal] tracking-[0.44px] underline"
                >
                  {" "}
                  {item.postedByName}
                </Link>
                <p className="text-white text-[12px] sm:text-[14px] not-italic font-bold leading-[normal] tracking-[0.44px]">
                  Project Land Area:{" "}
                  {Number(parseFloat(item.landArea).toFixed(2))} Acres
                </p>
              </div>
              <div>
                <p className="text-white text-[12px] sm:text-[14px] not-italic font-bold leading-[normal] tracking-[0.44px]">
                  Start Date: {formatDate(item.launchDate)}
                </p>
                <p className="text-white text-[12px] sm:text-[14px] not-italic font-bold leading-[normal] tracking-[0.44px] mt-1">
                  End Date: {formatDate(item.possassionDate)}
                </p>
              </div>
              <div className="sm:flex flex-col items-end space-x-2 sm:space-x-0 gap-3">
                <ViewAllButton name={item.name} url={url} />
                <ReqBtn
                  builderName={item.postedByName}
                  projName={item.projName}
                  reqId={item.projIdEnc}
                  builderId={item.builderId as number}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
