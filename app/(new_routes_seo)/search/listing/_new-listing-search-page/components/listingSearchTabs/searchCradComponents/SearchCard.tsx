import React from 'react';
import Styles from "@/app/styles/seach/searchCrad.module.css";
import { ImageBlock, RightSideBlock } from './SearchCradTopSection';
import SearchCradBottomSection from './SearchCradBottomSection';
import { sanitizeTopLeftSectionData, 
  // sanitizeTopRightSectionData, sanitizeApprovedNamesSectionData,
} from './searchData';
import { createProjectLinkUrl } from '@/app/utils/linkRouters/ProjectLink';
import { generateListingLinkUrl } from '@/app/utils/linkRouters/ListingLink';

type Props = {
  data?:any; 
  refetch?:any; 
  index: string;
  mutate?:any;
  register: (id: string, fn: () => void) => void;
}

function SearchCard({
  data, 
  index,
  refetch, 
  // mutate
  register,
}: Props) {
  const { 
      propIdEnc, projIdEnc, propTypeName, propName, projName, bhkName, 
      category, localityName, type, city, locality, cityName, phaseName
  } = data;
    
  const topSectionLeftData = sanitizeTopLeftSectionData(data);
  // const topSectionRightData = sanitizeTopRightSectionData(data);

    let url =
      type == "proj"
        ? createProjectLinkUrl({
            city: city,
            locality: locality,
            slug: projName,
            projIdEnc: projIdEnc,
          })
        : generateListingLinkUrl({
            city: cityName,
            locality: localityName,
            projName: projIdEnc ? propName : null,
            category: category === "Sale" ? "for-sale" : "for-rent",
            phase: phaseName,
            propIdEnc: propIdEnc,
            bhkUnitType: bhkName
              ? `${bhkName + " " + propTypeName}`
              : "" + " " + propTypeName,
          });

  const projOrPropName = type === "proj" ? projName : `${bhkName} ${propTypeName} for ${category} in ${localityName}`;
  console.log(projOrPropName);

  return (
    <div className={Styles.searchCradMainCon} data-id={`searchCard_${index.toString()}`} data-type="card">
      {/* Top sectiom */}
      <div className={Styles.searchCradTopSection}>
        <ImageBlock data={{ ...topSectionLeftData, pageUrl: url, projOrPropName: projOrPropName }} index={index.toString()} />
        <RightSideBlock 
          // data={topSectionRightData} 
          data={{ ...data, pageUrl: url, projOrPropName: projOrPropName }}
          refetch={refetch}
          register={register}
          index={index}
        />
      </div>

      {/* Bottom section */}
      <SearchCradBottomSection data={{...data, pageUrl: url, projOrPropName: projOrPropName }} index={index.toString()}  />
    </div>
  )
}

export default SearchCard; 