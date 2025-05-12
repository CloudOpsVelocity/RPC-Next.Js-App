// import React, { useEffect, useState } from 'react';
import React, { useState, useEffect } from 'react';

import Styles from "@/app/styles/seach/searchCrad.module.css";
import Image from 'next/image';
import { formatDateDDMMYYYY } from '@/app/utils/date';
import { formatCurrency } from '@/app/utils/numbers';
import { 
  sanitizeApprovedNamesSectionData, sanitizetopCornerRightSectionData,  TopLeftSectionData, 
  // TopRightSectionData, topCornerRightSectionData,

} from './searchData';
import Link from 'next/link';
import { generateBuilderUrl } from '@/app/utils/linkRouters/Builder';
import { createProjectLinkUrl } from '@/app/utils/linkRouters/ProjectLink';
import SearchCardApprovedNames from './SearchCardApprovedNames';
import SearchCardTopCornerSection from './SearchCardTopCornerSection';
import { isReraverified } from '@/app/utils/dyanamic/projects';
import { useShortlistAndCompare } from '@/app/hooks/storage';

interface SearchCardTopSectionLProps {
  data: TopLeftSectionData;
}

interface SearchCardTopSectionRProps {
  // data: TopRightSectionData;
  data:any;
  refetch:any;
  register: (id: string, fn: () => void) => void;
  index:string;
}

const Rera = () => {
  return (
    <Image 
      className={Styles.searchCradReraImage} 
      src={"/r.svg"} alt="rera" width={100} height={100} 
    />
  );
};

export const ImageBlock: React.FC<SearchCardTopSectionLProps> = ({ data }) => {
  const {src, projName, projstatus, type, availableFrom, possassionDate, propStatus, propTypeName, pageUrl, rerastatus} = data
  const verified = isReraverified(rerastatus);

  return(
    <div className={Styles.searchCradTopImageBox}>
        <Link prefetch={false} href={pageUrl}>
          <Image
            src={src.includes("+") ? src.replace(/\+/g, "%2B") : src}
            width={300}
            height={300}
            alt={projName}
            title={projName}
            className={Styles.searchCradImage}  
          />
        </Link>

        {verified && <Rera />}
        
        {((projstatus || propTypeName)) && (
          <p style={{ bottom: "32px" }} className={Styles.projStatusonImage}>
            {projstatus ?? propStatus}
          </p>
        )}

        <p className={Styles.projStatusonImage}>
          {type !== "proj" ? "Available From: " : "Possession Date: "}{" "}
          {formatDateDDMMYYYY(type !== "proj" ? availableFrom : possassionDate)}
        </p>
    </div>
  )
}

export const RightSideBlock: React.FC<SearchCardTopSectionRProps> = ({ data, refetch, register, index }) => {  
  const {
    projName, phaseName, phaseCount, minPrice, maxPrice, sortedBhks, propType, cg, 
    city, locality, postedByName, builderCity, cityName, projIdEnc, propIdEnc, localityName, 
    propName, address, postedBy, type, otherCharges, category, propTypeName, bhkName, pageUrl,
    price, usp, projectAbout, shortListed
  } = data;
  

  let urlBuilder = generateBuilderUrl({
    slug: postedByName,
    city: builderCity ? builderCity : cityName,
  });
 
  let projectUrl =
    projIdEnc &&
    createProjectLinkUrl({
      city: cityName,
      slug: propName,
      locality: localityName,
      projIdEnc: projIdEnc,
  });

  const aboutText = projectAbout && projectAbout.length !== 0 ? projectAbout : usp;
  const readMoreThreshold = 200;
  const isReadMoreNeeded = aboutText?.length > readMoreThreshold;

  const approvedNamesData = sanitizeApprovedNamesSectionData(data);

  const { toggleShortlist } = useShortlistAndCompare();

  const [stateData, setStateData] = useState({
      shortListed: shortListed === "Y" ? true : false,
  });

  const newData = {
    ...data,
    Sh: stateData.shortListed, 
  };

  const topCornerRightData = sanitizetopCornerRightSectionData(newData); 

  const onAddingShortList = () => {
    console.log("working...")
    // if (session) {
      setStateData({ ...stateData, shortListed: !stateData.shortListed });
      toggleShortlist({
        id: type === "proj" ? projIdEnc : propIdEnc,
        status: stateData.shortListed ? "N" : "Y",
        source: type,
      });
    // } 
    // else {
    //   openLogin(() => refetch());
    // }
  };

  useEffect(() => {
    register(index, onAddingShortList);
  }, [index]);

  return( 
    <div className={Styles.searchCradTopRightBox}>
      <SearchCardTopCornerSection topCornerRightData={topCornerRightData}/>

      {type === "proj" ? 
        <>
          <Link href={pageUrl} prefetch={false}>
            <h2 style={{ width: "100%" }}>
                <span className={Styles.searchCardPromName}>
                  {projName}{" "}
                  {phaseName && phaseCount !== undefined && phaseCount > 1 && ( 
                    <span className={Styles.searchCardPhaseName}>({phaseName})</span> 
                  )}
                </span>
            
                <span className={Styles.searchCardPromNameSpan}>
                  Price Range: {formatCurrency(Number(minPrice))} -{" "}
                  {formatCurrency(Number(maxPrice))} 
                </span>
            
                <span className={Styles.searchCardProjNameType}>
                  <span>
                    {sortedBhks && sortedBhks.length > 5
                      ? sortedBhks
                          .filter(
                            (bhk:any) => !bhk.includes(".5") && !bhk.includes("Servant")
                          )
                          .slice(0, 5)
                          .join(", ")
                      : sortedBhks && sortedBhks.join(", ")}
                  </span>
                  {sortedBhks && sortedBhks.length > 5 && (
                    <button
                      data-action="bhk"
                      className={Styles.searchCardSortedBhks}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      +{sortedBhks.length - 5} more
                    </button>
                  )}
                  {` ${propType} For ${
                    cg === "R" ? "Rent" : "Sale"
                  } in ${locality}, ${city}`}
                </span>
            </h2>
          </Link>
          <p className={Styles.searchCardAddress}>
            Address: {address}
          </p>

          <p className={Styles.searchCardPostedBy}>
          {postedBy ?? "Builder"}:{" "}
          <Link
            prefetch={false}
            href={urlBuilder}
            title="Click to view Builder"
            className={Styles.searchCardLink}
            onClick={() => {
              // e.stopPropagation();
              window.open(urlBuilder, "_self", "noreferrer");
            }}
          >
            {postedByName}
          </Link>
        </p>
        </>
      :
      <>
          <Link href={pageUrl} prefetch={false}>
            <h2 className={Styles.searchCardPromName}>
              {bhkName} {propTypeName} for {category} in {localityName}
            </h2>
          </Link>
          <p className={Styles.searchCardPromNameSpan}>
            {formatCurrency(Number(price))}{" "}
            {(otherCharges?.otherCharge ||
              (otherCharges && Object.keys(otherCharges).length > 2)) && (
              <button
                data-action="otherCharges"
                className="text-btnPrimary cursor-pointer text-[12px] xl:text-sm"
                // onClick={(e) => {
                //   e.stopPropagation();
                //   dispatch({
                //     conType: "otherCharges",
                //     content: {
                //       charges: otherCharges,
                //     },
                //     // id: `${type === "proj" ? projIdEnc : propIdEnc}+${propTypeId ?? ''}${phaseId ? '+' + phaseId : ''}`,
                //     id: `${projIdEnc ?? ""}+${propIdEnc ?? ""}${
                //       propTypeId ?? propTypeName ?? ""
                //     }${type === "proj" && phaseId ? "+" + phaseId : ""}`,
                //     title: "Other Charges",
                //     type: "OPEN",
                //     pType: type,
                //   })
                // }}
              >
                View Other Charges
              </button>
            )}
          </p>

          <h3 className="text-[#001F35] text-[12px] sm:text-[16px]   not-italic font-bold">
            {projIdEnc != undefined ? (
              <Link
                prefetch={false}
                className={`font-bold underline cursor-pointer`}
                href={projectUrl}
              >
                {propName}{" "}
              </Link>
            ) : (
              <span>{propName}</span>
            )}
          </h3>
          <p className={Styles.searchCardAddress}>
            Address: {address}
          </p>
          <p className={Styles.searchCardPostedBy}>
            {postedBy ?? "Builder"}:{" "}
            <span
              className={`font-bold text-[#242424] ${
                postedBy === "Builder" ? "underline cursor-pointer" : ""
              }`}
              onClick={
                postedBy === "Builder"
                  ? () => {
                      // e.stopPropagation();
                      window.open(urlBuilder, "_self", "noreferrer");
                    }
                  : undefined
              }
            >
              {postedByName}
            </span>
          </p>
      </>
      }

      <SearchCardApprovedNames approvedNamesData={approvedNamesData} />

      <div
        className="text-[12px] sm:text-[14px] pr-2 line-clamp-2"
        // onClick={(e) => {
        //   e.stopPropagation();
        // }}
      >
        {aboutText && (
          <div className="line-clamp-2 relative">
            <div
              className="line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: aboutText,
              }}
            />
            {isReadMoreNeeded && (
                <button
                  className="text-btnPrimary font-bold text-[12px] sm:text-[14px] underline  cursor-pointer absolute bottom-0 right-0 bg-white "
                  title="Click to Read More"
                  data-action="readmore"
                >
                  <span className="text-black">...</span>Read More
                </button>
            )}
          </div>
        )}
      </div>

    </div>
  )
}

