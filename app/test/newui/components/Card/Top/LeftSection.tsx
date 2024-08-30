import Button from "@/app/elements/button";
import { CallIcon } from "@/app/images/commongsSvgs2";
import { isReraverified } from "@/app/utils/dyanamic/projects";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import React from "react";

type Props = { src: string; rera: string };

export default function LeftSection({ src, rera }: Props) {
  const verified = isReraverified(rera);
  const isMobile = useMediaQuery("(max-width: 601px)");
  return (
    <div className="relative">
      <Image
        src={src}
        width={304}
        height={214}
        alt="projectCard"
        className="h-[162px] w-full  xl:h-full xl:w-[304px] object-cover"
        quality={100}
      />
      {/* <div>
        
      </div> */}
      <p className="bg-gray-700 rounded-full absolute top-1 right-1 text-white text-[12px] px-1">
        Ready To Move
      </p>
      <p className="bg-gray-700 rounded-full absolute top-7 right-1 text-white text-[12px] px-1">
        Posesstion Date: 12/12/2022
      </p>

      {verified && <Rera />}
      {isMobile && (
        <>
          <button className="bg-btnPrimary rounded-full absolute bottom-2 left-1 text-white text-[12px] px-1">
            Add To Compare
          </button>
          <div className="absolute right-1 bottom-1">
            <Button
              // onChange={handleOpen}
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
      <Image src={"/r.svg"} alt="rera" width={100} height={100} />
    </p>
  );
};
