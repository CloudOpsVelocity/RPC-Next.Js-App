/* eslint-disable no-unused-vars */
"use client";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import { useSetAtom } from "jotai";
import { usePathname } from "next/navigation";
import { ReraIcon } from "@/app/images/commonSvgs";
import { getImageUrls } from "@/app/utils/image";
import { galleryStateAtom } from "@/app/store/project/gallery";

type Props = {
  projectDetails: any | null;
  companyName: string;
  builderId: number;
  hasReraStatus: boolean;
  scrollId?: string;
};

const FirstBlock: React.FC<Props> = ({
  projectDetails,
  builderId,
  hasReraStatus,
}) => {
  const images = getImageUrls(projectDetails?.media as any);
  const dispatch = useSetAtom(galleryStateAtom);
  const path = usePathname();

  const onSelect = () => {
    dispatch({
      type: "OPEN",
      payload: {
        items: images,
        mediaType: "image",
        title: "Project Gallery",
        activeIndex: images.indexOf(images[0]),
      },
    });
  };

  return (
    <div className="relative rounded-[10px] w-[60%] m-auto bg-gray-50 bg-cover flex justify-between items-start flex-col shadow-md break-words p-[10px]">
      {images?.[0] && (
        <Head>
          <link rel="preconnect" href="https://media.getrightproperty.com" />
          <link
            rel="preload"
            as="image"
            href={images[0].split(",")[3]}
            // @ts-ignore to skip type error
            imagesrcset={`
              ${images[0].split(",")[1]} 460w,
              ${images[0].split(",")[2]} 768w,
              ${images[0].split(",")[3]} 1200w
            `}
            imagesizes="100vw"
          />
        </Head>
      )}

      {projectDetails && (
        <>
          {hasReraStatus && (
            <p className="flex items-center pl-[8px] text-center text-[12px] sm:text-[16px] xl:text-[24px] font-[600] text-[#FFF] bg-gradient-to-r w-[122px] from-[#148B16] z-10 left-0 absolute">
              <ReraIcon className="h-[14px] w-[14px] sm:h-[16px] sm:w-[16px] xl:h-[24px] xl:w-[24px]" />
              RERA
            </p>
          )}

          <div className="relative w-[100%] aspect-auto mx-auto sm:!rounded-[10px] h-[400px] max-h-full flex justify-center items-center">
            <picture>
              <source
                media="(max-width: 460px)"
                srcSet={images[0].split(",")[1]}
              />
              <source
                media="(max-width: 768px)"
                srcSet={images[0].split(",")[2]}
              />
              <source
                media="(min-width: 1200px)"
                srcSet={images[0].split(",")[3]}
              />
              <Image
                alt={projectDetails?.projectName}
                title={projectDetails?.projectName}
                src={images[0].split(",")[3]}
                fill
                priority
                className="bg-gray-100"
                unoptimized
              />
            </picture>
          </div>
        </>
      )}
    </div>
  );
};

export default FirstBlock;
