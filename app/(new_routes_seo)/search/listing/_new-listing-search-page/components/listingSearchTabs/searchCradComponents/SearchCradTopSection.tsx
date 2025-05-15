"use client";
// import React, { useEffect, useState } from 'react';
import React, { useState } from 'react';

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
import ButtonElement from '@/common/components/CustomButton';
import { useMediaQuery } from '@mantine/hooks';
import { useSession } from 'next-auth/react';
import { usePopShortList } from '@/app/hooks/popups/useShortListCompare';

interface SearchCardTopSectionLProps {
  data: TopLeftSectionData;
  index: string;
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

export const ImageBlock: React.FC<SearchCardTopSectionLProps> = ({ data, index }) => {
  const {src, projName, projstatus, type, availableFrom, possassionDate, propStatus, propTypeName, pageUrl, rerastatus, projOrPropName} = data
  const verified = isReraverified(rerastatus);
  const isDesktop = useMediaQuery("(max-width: 1600px)");

  return(
    <div className={Styles.searchCradTopImageBox}>
        <Link 
          prefetch={false} 
          href={pageUrl}  
          title={projOrPropName}
          aria-label={projOrPropName} 
        >
          <Image
            src={src.includes("+") ? src.replace(/\+/g, "%2B") : src}
            width={300}
            height={300}
            alt={projOrPropName}
            title={projOrPropName}
            aria-label={projOrPropName}
            className={Styles.searchCradImage}  
          />
        </Link>

        {verified && <Rera />}
        
        {(((projstatus !== undefined && projstatus !== "") || (propTypeName !== undefined && propTypeName !== ""))) && (
          <p className={Styles.projStatusonImage}>
            {projstatus ? projstatus : propStatus}
          </p>
        )}

        {(((availableFrom !== undefined && availableFrom !== "") || (possassionDate !== undefined && possassionDate !== ""))) && (
          <p className={`${Styles.projStatusonImage} ${Styles.possessionDateOnImage}`}>
            {type !== "proj" ? "Available From: " : "Possession Date: "}{" "}
            {formatDateDDMMYYYY(type !== "proj" ? availableFrom : possassionDate)}
          </p>
        )}

        {isDesktop &&
        <ButtonElement
          key={`searchCard_requestCall_${index}`}
          dataAction="requestCall"
          title="Contact"
          buttonClass={Styles.searchCardContactBtn}
          toolTip={`Click to Request a Callback for ${type === "proj" ? "Project" : "Property Listing"} – ${projOrPropName}`} 
        /> 
        }
    </div>
  )
}

export const RightSideBlock: React.FC<SearchCardTopSectionRProps> = ({ data, refetch, register, index }) => {  
  const {
    projName, phaseName, phaseCount, minPrice, maxPrice, sortedBhks, propType, cg, 
    city, locality, postedByName, builderCity, cityName, projIdEnc, propIdEnc, localityName, 
    propName, address, postedBy, type, otherCharges, category, propTypeName, bhkName, pageUrl,
    price, usp, projectAbout, shortListed, projOrPropName
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

  const [stateData, setStateData] = useState(shortListed === "Y" ? true : false );

  const { data: session } = useSession();
  const [, { open: openLogin }] = usePopShortList();
  

  // const handleParentAction = (index: string) => {
  //   if (session) {
  //     const fn = cardFnsRef.current[index];
  //     if (fn) {
  //       fn();
  //     } else {
  //       console.warn(`No function registered for card: ${index}`);
  //     }
  //   } else {
  //     openLogin(() => refetch());
  //   }
  // };
  

  const onAddingShortList = () => {
    if (session) {
      setStateData(prev => (!prev));
      toggleShortlist({
        id: type === "proj" ? projIdEnc : propIdEnc,
        status: stateData ? "N" : "Y",
        source: type,
      });
    } else {
      openLogin(() => refetch());
    }
  };

  // useEffect(() => {
  //   register(index, onAddingShortList);
  // }, [index]);

  const newData = {
    ...data,
    Sh: stateData, 
  };

  const topCornerRightData = sanitizetopCornerRightSectionData(newData);  

  return( 
    <div className={Styles.searchCradTopRightBox}>
      <SearchCardTopCornerSection topCornerRightData={topCornerRightData} onAddingShortList={onAddingShortList}/>

      {type === "proj" ? 
        <>
          <Link
            href={pageUrl}
            prefetch={false}
            className={Styles.searchCardLink}
            title={`${projName} in ${locality}, ${city}`}
            aria-label={`${projName} in ${locality}, ${city}`}
          >
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
                          (bhk: any) => !bhk.includes(".5") && !bhk.includes("Servant")
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
                      e.preventDefault(); // Prevent navigation when clicking this button
                    }}
                  >
                    +{sortedBhks.length - 5} more
                  </button>
                )}
                {` ${propType} For ${cg === "R" ? "Rent" : "Sale"} in ${locality}, ${city}`}
              </span>
            </h2>
          </Link>



          <p className={Styles.searchCardAddress}>
            Address: {address}
          </p>

          <p className={Styles.searchCardPostedBy}>
          {postedBy ?? "Builder"}:{" "}
          <Link
            prefetch={true}  // Enable prefetching unless you specifically need to disable it
            href={urlBuilder}
            title={postedByName}
            className={`${Styles.searchCardLink} underline `}
            rel="noreferrer"
          >
            {postedByName}
          </Link>
        </p>
        </>
      :
      <>
          <Link
            href={pageUrl}
            prefetch={false}
            className={Styles.searchCardLink}
            title={`View ${bhkName} ${propTypeName} for ${category} in ${localityName}`}
          >
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
              >
                View Other Charges
              </button>
            )}
          </p>

          <h3 className={Styles.propNameHeading}>
            {projIdEnc != undefined ? (

              <Link
                href={projectUrl}
                prefetch={true} // Let Next.js handle prefetching unless you specifically need to disable it
                className="font-bold underline cursor-pointer"
                title={`View project: ${propName}`} // Added title for extra context
                rel="noopener noreferrer" // Use this for external links; remove if it's internal
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
        className={Styles.readMoreTextCon}
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
                  className={Styles.readMoreText}
                  title={`Click to Read More about this ${type === "proj" ? "Project" : "Property Listing"} – ${projOrPropName}`}
                  aria-label={`Click to Read More about this ${type === "proj" ? "Project" : "Property Listing"} – ${projOrPropName}`}
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

