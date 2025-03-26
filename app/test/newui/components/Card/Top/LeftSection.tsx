// import { projectprops } from "@/app/(dashboard)/searchOldPage/components/Card/Top/Center/ProjData";
import Button from "@/app/elements/button";
import { CallIcon } from "@/app/images/commongsSvgs2";
import { formatDateDDMMYYYY } from "@/app/utils/date";
import { isReraverified } from "@/app/utils/dyanamic/projects";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import React from "react";

type Props = {
  src: string;
  rera: string;
  onAddingCompare: () => void;
  isCompared: boolean;
  openReqCallback: () => void;
  type: string;
  projstatus: string;
  possassionDate: string;
  furnish: string;
  propStatus: string;
  isUsed: string;
  availableFrom: string;
  data: any;
};

export default function LeftSection({
  src,
  rera,
  onAddingCompare,
  isCompared,
  openReqCallback,
  type,
  projstatus,
  possassionDate,
  furnish,
  propStatus,
  isUsed,
  availableFrom,
  data,
}: Props) {
  const verified = isReraverified(rera);
  const isMobile = useMediaQuery("(max-width: 1600px)");
  // console.log(src)
  return (
    <div className="relative xl:min-w-[257px] max-h-[250px]">
      {type !== "proj" && (
        <>
          {isUsed === "N" && (
            <p className="absolute text-base bg-yellow-400 rounded-full px-1 text-black top-0 left-[0.8px] font-semibold">
              Unused
            </p>
          )}

          <p className="bg-gray-700 rounded-full absolute top-1 xl:top-1 right-1 text-white text-[12px] xl:text-sm  px-1 xl:bg-gray-900">
            {furnish}
          </p>
        </>
      )}

      <picture>
        <source
          media="(max-width: 460px)"
          srcSet={src ? src.split(",")[1] : ""}
        />
        <source
          media="(max-width: 800px)"
          srcSet={src ? src.split(",")[2] : ""}
        />
        <Image
          src={src ? src.includes("+")? src.replace(/\+/g, "%2B") : src : src }
          width={304}
          height={214}
          alt="projectCard"
          className="h-[162px] w-full  xl:h-full xl:max-w-[257px] object-cover"
          quality={100}
          unoptimized
          priority
          // layout="intrinsic"
        />
      </picture>
      {/* <div>
        
      </div> */}
      {(projstatus || data.propTypeName) && (
        <p className="bg-gray-700 rounded-full absolute top-1 xl:top-auto xl:bottom-7 right-1 text-white text-[12px] xl:text-sm  px-1 xl:bg-gray-900">
          {projstatus ?? propStatus}
        </p>
      )}

      <p className="bg-gray-700 rounded-full absolute top-7 xl:top-auto xl:bottom-1 right-1 text-white text-[12px]  xl:text-sm px-1 xl:bg-gray-900">
        {type !== "proj" ? "Available From: " : "Possession Date: "}{" "}
        {formatDateDDMMYYYY(type !== "proj" ? availableFrom : possassionDate)}
      </p>

      {verified && <Rera />}
      {isMobile && (
        <>
          <button
            className="bg-btnPrimary rounded-full absolute bottom-2 left-1 text-white text-[12px] px-1"
            onClick={(e) => {
              e.stopPropagation();
              onAddingCompare();
            }}
          >
            {isCompared ? "Remove From Compare" : "Add To Compare"}
          </button>
          <div className="absolute right-1 bottom-1">
            <Button
              onChange={(e) => {
                e.stopPropagation();
                openReqCallback();
              }}
              icon={<CallIcon className="w-[16px] h-[16px]" />}
              title={`${"Contact"}`}
              buttonClass="flex justify-center right-1  items-center text-[#FFF] ml-1 p-[3px] md:p-[5px] bg-[#0073C6] rounded-[5px] shadow-md text-[12px] xl:text-[12px] md:text-[12px] font-[700] text-nowrap"
            />
          </div>
        </>
      )}
    </div>
  );
}

const Rera = () => {
  return (
    <p className="absolute top-0 left-[0.8px]">
      <Image src={"/r.svg"} alt="rera" width={100} height={100} priority />
    </p>
  );
};
