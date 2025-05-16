import React from 'react';
import Styles from "@/app/styles/seach/searchCrad.module.css";
import ButtonElement from '@/common/components/CustomButton';
import { useMediaQuery } from "@mantine/hooks";
import { WhitePetFreindly } from "@/app/images/commonSvgs";
import Tag from '@/app/components/atoms/Tag';

type BottomSectionProps = {
    index:string;
    data: any;
}

export default function SearchCradBottomSection({
  data,
  index
}: BottomSectionProps) {
  const {
    type, agentListing, ownerListing, builderListing, isPetFriendly, propTypeName, amenCount, bhkName, phaseName,
    category, localityName, projName, propName, pageUrl, locality, projIdEnc, sortedBhks, propType, cg, city, projOrPropName
  } = data;
  const isMobile = useMediaQuery("(max-width: 1600px)"); 


  const textSlice = (word:string = "", url?:string) => {
    if(word === "") return;
    const finalUrl = url ?? pageUrl;
    word = word.toLowerCase().replaceAll(" ", "-").replaceAll("+", "with");
    const index = finalUrl.indexOf(word);
    const slicedText = index !== -1 ? finalUrl.slice(0, index + word.length) : finalUrl;
    return slicedText;
  }

  const finalProjName = (bhkName !== undefined && propTypeName !== undefined) ? `${bhkName} ${propTypeName}` : ""

  const links = [
    {title: finalProjName, url: textSlice(finalProjName)},
    {title: category ? `for ${category}` : "", url: textSlice(category)},
    {title: localityName ?? "", url: textSlice(localityName)},
    {title: projName ?? propName, url: type !== "proj" ? textSlice(projName ?? propName) : textSlice(projIdEnc)},
    {title: locality ?? "", url: textSlice(locality)},
  ]

  const getlListingUrl = (bhk:string) => {
    const url = `/residential-listings/${cg === "R" ? "for-rent" : "for-sale"}/${city}/${locality}/${projName}${phaseName ? `/${phaseName}` : ""}/${bhk}-${propType}`;
    return url.toLowerCase().replaceAll(" ", "-").replaceAll("+", "with");
  }

  const bhkLinks = sortedBhks && sortedBhks.length > 0 
    ? sortedBhks.map((eachBhk: any) => (
      { title: `${eachBhk} ${propType}`, url: textSlice(`${eachBhk} ${propType}`, getlListingUrl(`${eachBhk} ${propType}`))}
    )) 
    : [];

  return (
    <div className="bg-white flex items-start gap-1 xl:gap-auto xl:px-[17px] xl:py-[9px] w-full p-2 justify-between flex-wrap sm:flex-nowrap">
      <div className="flex gap-[9px]">
        {type === "proj" ? (
          <>
            <CountListing
              type="Agent"
              value={agentListing}
              projOrPropName={projOrPropName}
            />
            <CountListing
              type="Owner"
              value={ownerListing}
              projOrPropName={projOrPropName}
            />
            <CountListing
              type="Builder"
              value={builderListing}
              projOrPropName={projOrPropName}
            />
          </>
        ) : (
          <>
            {isPetFriendly && propTypeName !== "Plot" ? (
              <div className="flex items-center space-x-1 bg-green-500 text-white font-bold py-1 px-3 text-xs rounded-full shadow-md">
                <WhitePetFreindly className="w-[20px] h-[20px] " />
                <span>Pet Friendly</span>
              </div>
            ) : null}

            {amenCount > 0 && (
              <button
                className="bg-orange-600 text-white text-[12px] sm:text-sm py-0 font-bold px-1 sm:py-1 xl:px-2  rounded shadow-md hover:bg-orange-800  transition duration-300 ease-in-out"
                data-action="amenities"
                title={`Click to view ${amenCount === 1 ? "the" : "all"} ${amenCount} ${amenCount === 1 ? "Amenity" : "Amenities"} for ${projOrPropName}`}
                aria-label={`Click to view ${amenCount === 1 ? "the" : "all"} ${amenCount} ${amenCount === 1 ? "Amenity" : "Amenities"} for ${projOrPropName}`}
              >
                <span className="bg-white rounded-full text-black px-2">
                  {amenCount}
                </span>{" "}
                Amenities
              </button>
            )}

            {/* <button
              className="bg-teal-500 text-white text-right max-w-fit px-1 font-bold sm:py-1 sm:px-2 text-xs rounded shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out min-h-[28px] "
              title="Click to view Near by Locations"
              data-action="nearby"
            >
              Nearby
            </button> */}
          </>
        )}
      </div>

        <div className='flex flex-wrap gap-[4px]  '>
          {links.map((each:any)=>{
            if(each.title !== ""){
            return(
              <Tag key={each.title} title={each.title} url={each.url} className='!text-[8px] !px-2 !py-[2px] text-nowrap ' />
            )}
          })}

          {bhkLinks.length > 0 && bhkLinks.map((each:any)=>{
            if(each.title !== ""){
            return(
              <Tag key={each.title} title={each.title} url={each.url} className='!text-[8px] !px-2 !py-[2px] text-nowrap ' />
            )}
          })}

          {phaseName && 
            <Tag 
              key={phaseName} 
              title={phaseName} 
              url={`/residential-listings/${cg === "R" ? "for-rent" : "for-sale"}/${city}/${locality}/${projName}/${phaseName}`} 
              className='!text-[8px] !px-2 !py-[2px] text-nowrap ' 
            />
          }
        </div>

      {/* right section */}
      {!isMobile && (
        <div className={Styles.searchCradBottomRightSection}>
          <ButtonElement
              key={`searchCard_requestCall_${index}`}
              dataAction="requestCall"
              title={`${
                type === "proj"
                  ? isMobile
                    ? "Contact"
                    : "Request Callback" 
                  : "Request Callback"
              }`} 
              toolTip={`Click to Request a Callback for ${type === "proj" ? "Project" : "Property Listing"} – ${projOrPropName}`} 
              buttonClass={Styles.searchCardCompareBtn}
          />
        </div>
      )}
    </div>
  );
}

type CountListProps = {
  value: number;
  type: "Agent" | "Owner" | "Builder";
  projOrPropName: string;
};

function CountListing({type, value, projOrPropName}: CountListProps) {
  return (
    value > 0 && (
    <ButtonElement
        title={`${type} Listing : ${value}`}
        dataAction={`listingType_${type[0]}`}
        buttonConClass={`${
            Styles.listingTypeButton } ${
            type === "Owner" ? Styles.listingTypeButtonForOwner : Styles.listingTypeButtonForOthers} ${
            value > 0 ? Styles.ifValueMoreThanZero : Styles.ifValueLessThanZero
        }`}
        toolTip={`Explore the ${type} Listing for ${projOrPropName}`}
    />)
  )
}


// const CountListing = ({ type, value, projIdEnc, projName }: CountListProps) => {
//   const handleAgentOwner = (type: "A" | "I" | "B") => {
//     window.open(
//       `/search/listing?sf=projIdEnc=${projIdEnc}-listedBy=${type}-projName=${projName}`,
//       "_self",
//       "noreferrer"
//     );
//   };

//   return (
//     value > 0 && (
//       <button
//         title={`Click to view ${type} Listing`}
//         // onClick={(e) => {
//         //   e.stopPropagation();
//         //   handleAgentOwner(
//         //     type === "Owner" ? "I" : type === "Builder" ? "B" : "A"
//         //   );
//         // }}
//         className={clsx(
//           "flex flex-col justify-start  items-start gap-2 p-1 rounded border-[0.4px] border-solid",
//           type === "Owner" ? "bg-[#FFF6ED] text-[#D66700] border-[#FF7A00]" : "bg-[#f0fff0]",
//           value > 0
//             ? "text-[#148B16] border-[#148B16] cursor-pointer"
//             : "text-gray-400 border-[#5e5f5e] opacity-50 cursor-none"
//         )}
//       >
//         <span
//           className={`text-[12px] text-nowrap  xl:text-xs not-italic font-bold leading-[normal] ${
//             value > 0 ? "underline" : ""
//           }`}
//         >
//           {type} Listing : {value}
//         </span>
//       </button>
//     )
//   );
// };
