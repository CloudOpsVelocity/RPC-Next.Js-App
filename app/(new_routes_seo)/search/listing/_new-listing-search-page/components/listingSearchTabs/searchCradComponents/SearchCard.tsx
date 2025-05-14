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
  const topSectionLeftData = sanitizeTopLeftSectionData(data);
  // const topSectionRightData = sanitizeTopRightSectionData(data);

    let url =
      data.type == "proj"
        ? createProjectLinkUrl({
            city: data.city,
            locality: data.locality,
            slug: data.projName,
            projIdEnc: data.projIdEnc,
          })
        : generateListingLinkUrl({
            city: data.cityName,
            locality: data.localityName,
            projName: data.projIdEnc ? data.propName : null,
            category: data.category === "Sale" ? "for-sale" : "for-rent",
            phase: data.phaseName,
            propIdEnc: data.propIdEnc,
            bhkUnitType: data.bhkName
              ? `${data.bhkName + " " + data.propTypeName}`
              : "" + " " + data.propTypeName,
          });

  // console.log(data);
  return (
    <div className={Styles.searchCradMainCon} data-id={`searchCard_${index.toString()}`} data-type="card">
      {/* Top sectiom */}
      <div className={Styles.searchCradTopSection}>
        <ImageBlock data={{ ...topSectionLeftData, pageUrl: url }} index={index.toString()} />
        <RightSideBlock 
          // data={topSectionRightData} 
          data={{ ...data, pageUrl: url }}
          refetch={refetch}
          register={register}
          index={index}
        />
      </div>

      {/* Bottom section */}
      <SearchCradBottomSection data={{...data, pageUrl: url }} index={index.toString()}  />
    </div>
  )
}

export default SearchCard; 