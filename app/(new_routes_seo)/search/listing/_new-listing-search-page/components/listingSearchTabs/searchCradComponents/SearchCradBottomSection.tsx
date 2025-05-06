import React from 'react';
import Styles from "@/app/styles/seach/searchCrad.module.css";
import ButtonElement from '@/common/components/CustomButton';
import { ApprovedNamesSectionData } from './searchData';

type ButtonProps = {
    value?: number;
    type?: "Agent" | "Owner" | "Builder";
    projIdEnc?: string;
    projName?: string;
}

function SearchCradListingCountBtn({type, value=0, projIdEnc, projName}: ButtonProps) {
    const handleAgentOwner = (type: "A" | "I" | "B") => {
        window.open(
          `/search/listing?sf=projIdEnc=${projIdEnc}-listedBy=${type}-projName=${projName}`,
          "_self"
        );
      };

  return (
    <ButtonElement 
        title={`${type} Listing : ${value}`}
        onChange={(e) => {
          e.stopPropagation();
          handleAgentOwner(
            type === "Owner" ? "I" : type === "Builder" ? "B" : "A"
          );
        }}
        buttonConClass={`${
            Styles.listingTypeButton} ${
            type === "Owner" ? Styles.listingTypeButtonForOwner : Styles.listingTypeButtonForOthers} ${
            value > 0 ? Styles.ifValueMoreThanZero : Styles.ifValueLessThanZero
        }`}
        toolTip={`Click to view ${type} Listing`}
    />
  )
}

type Props = {
  data?:any;
}

function SearchCradBottomSection({data}: Props) {
  return (
    <div className={Styles.searchCradBottomSection}>
        <div className={Styles.searchCradBottomLeftSection}>
            <SearchCradListingCountBtn />
        </div>
        <div className={Styles.searchCradBottomRightSection}>
            <ButtonElement
                title="Add to Compare" 
                buttonClass={Styles.searchCardCompareBtn}
            />

            <ButtonElement
                title="Request Callback" 
                buttonClass={Styles.searchCardCompareBtn}
            />
        </div>
    </div>
  )
}

export default SearchCradBottomSection;