import React from 'react';
import Styles from "@/app/styles/seach/searchCrad.module.css";
import { ImageBlock, RightSideBlock } from './SearchCradTopSection';
import SearchCradBottomSection from './SearchCradBottomSection';
import { sanitizeTopLeftSectionData, sanitizeTopRightSectionData, sanitizeApprovedNamesSectionData } from './searchData';

type Props = {
  data?:any; 
  refetch?:any; 
  index?: number;
  mutate?:any;
}

function SearchCard({
  data, index = 0,
  // refetch, index, mutate
}: Props) {
  const topSectionLeftData = sanitizeTopLeftSectionData(data);
  const topSectionRightData = sanitizeTopRightSectionData(data);
  const approvedNamesSectionData = sanitizeApprovedNamesSectionData(data);
  console.log(data);
  return (
    <div className={Styles.searchCradMainCon} data-id={`searchCard_${index.toString()}`} data-type="card">
      {/* Top sectiom */}
      <div className={Styles.searchCradTopSection}>
        <ImageBlock data={topSectionLeftData} />
        <RightSideBlock data={topSectionRightData} approvedNamesData={approvedNamesSectionData} />
      </div>

      {/* Bottom section */}
      <SearchCradBottomSection data={data}  />
    </div>
  )
}

export default SearchCard; 