import React from 'react';
import Styles from "@/app/styles/seach/searchCrad.module.css";
import Image from 'next/image';
import { formatDateDDMMYYYY } from '@/app/utils/date';
import { formatCurrency } from '@/app/utils/numbers';
import { ApprovedNamesSectionData, TopLeftSectionData, TopRightSectionData } from './searchData';
import Link from 'next/link';
import { generateBuilderUrl } from '@/app/utils/linkRouters/Builder';
import { createProjectLinkUrl } from '@/app/utils/linkRouters/ProjectLink';
import SearchCardApprovedNames from './SearchCardApprovedNames';

interface SearchCardTopSectionLProps {
  data: TopLeftSectionData;
}

interface SearchCardTopSectionRProps {
  data: TopRightSectionData;
  approvedNamesData: ApprovedNamesSectionData;
}

export const ImageBlock: React.FC<SearchCardTopSectionLProps> = ({ data }) => {
  const {src, projName, projstatus, type, availableFrom, possassionDate, propStatus, propTypeName} = data
    
  return(
    <div className={Styles.searchCradTopImageBox}>
        <Image
          src={src.includes("+") ? src.replace(/\+/g, "%2B") : src}
          width={300}
          height={300}
          alt={projName}
          title={projName}
          className={Styles.searchCradImage} 
        />

        <Image 
          className={Styles.searchCradReraImage} 
          src={"/r.svg"} alt="rera" width={100} height={100} 
        />
        
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

export const RightSideBlock: React.FC<SearchCardTopSectionRProps> = ({ data, approvedNamesData }) => {
  const {
    projName, phaseName, phaseCount, minPrice, maxPrice, sortedBhks, propType, cg, 
    city, locality, postedByName, builderCity, cityName, projIdEnc, localityName, 
    propName, address, postedBy, type, otherCharges, category, propTypeName, bhkName,
    price, usp, projectAbout,
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
  console.log(aboutText)
  const readMoreThreshold = 200;
  const isReadMoreNeeded = aboutText?.length > readMoreThreshold;
  return( 
    <div className={Styles.searchCradTopRightBox}>
      {type === "proj" ? 
        <>
          <h2>
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
          
              <span
                className={Styles.searchCardProjNameType}
              >
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
                  <span
                    className={Styles.searchCardSortedBhks}
                    // onClick={(e) => {
                    //   e.stopPropagation();
                    //   dispatch({
                    //     type: "OPEN",
                    //     content: sortedBhks,
                    //     title: "Unit Types",
                    //     id: `${
                    //       type === "proj" ? projIdEnc : propIdEnc
                    //     }+${propTypeId}+${phaseId}`,
                    //     conType: "bhk",
                    //     pType: type,
                    //   });
                    //   // Add your logic here to show all BHK types (e.g., open a modal)
                    // }}
                  >
                    +{sortedBhks.length - 5} more
                  </span>
                )}
                {` ${propType} For ${
                  cg === "R" ? "Rent" : "Sale"
                } in ${locality}, ${city}`}
              </span>
          </h2>
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
            onClick={(e) => {
              e.stopPropagation();
              window.open(urlBuilder, "_self", "noreferrer");
            }}
          >
            {postedByName}
          </Link>
        </p>
        </>
      :
      <>
        {/* <Link href={pageUrl} prefetch={false}> */}
          <h2 className={Styles.searchCardPromName}>
            {bhkName} {propTypeName} for {category} in {localityName}
          </h2>
          {/* </Link> */}
          <p className={Styles.searchCardPromNameSpan}>
            {formatCurrency(Number(price))}{" "}
            {(otherCharges?.otherCharge ||
              (otherCharges && Object.keys(otherCharges).length > 2)) && (
              <span
                className="  text-btnPrimary cursor-pointer text-[12px] xl:text-sm"
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
              </span>
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
                  ? (e) => {
                      e.stopPropagation();
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
        onClick={(e) => {
          e.stopPropagation();
        }}
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
              <div className="absolute bottom-0 right-0 bg-white">
                <span className="text-black">...</span>{" "}
                <button
                  className="text-btnPrimary font-bold text-[12px] sm:text-[14px] underline  cursor-pointer   "
                  title="Click to Read More"
                  // onClick={(e) => {
                  //   e.stopPropagation(); // Prevents the modal from opening if clicking elsewhere
                  //   // console.log("read more testing");
                  //   dispatch({
                  //     content: aboutText,
                  //     // id: `${
                  //     //   type === "proj" ? projIdEnc : propIdEnc
                  //     // }+${propTypeId ?? propTypeName ?? ''}${
                  //     //   type === "proj" && phaseId ? "+" + phaseId : ""
                  //     // }`,
                  //     id: `${projIdEnc ?? ""}+${propIdEnc ?? ""}${
                  //       propTypeId ?? propTypeName ?? ""
                  //     }${type === "proj" && phaseId ? "+" + phaseId : ""}`,
                  //     title:
                  //       type === "proj" ? "About Project" : "About Property",
                  //     type: "OPEN",
                  //     conType: "readmore",
                  //     pType: type,
                  //   });
                  // }}
                >
                  Read More
                </button>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  )
}
