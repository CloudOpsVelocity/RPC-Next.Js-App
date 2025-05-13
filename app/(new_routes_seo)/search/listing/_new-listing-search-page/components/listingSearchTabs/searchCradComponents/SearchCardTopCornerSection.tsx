import React from 'react';
import Styles from "@/app/styles/seach/searchCrad.module.css";
import { formatNumberWithSuffix } from '@/app/utils/numbers';
import { useMediaQuery } from '@mantine/hooks';
import { topCornerRightSectionData } from './searchData';
import Link from 'next/link';
import { DownLoadIcon } from '@/app/images/commongsSvgs2';
import HeartButton from '@/app/test/newui/components/Card/Top/Center/HeartButton';


type Props = {
  topCornerRightData: topCornerRightSectionData;
  onAddingShortList: any;
}

const ListingDownSectionCard = ({
  label,
  value,
  Icon,
}: {
  label: string;
  value: any;
  Icon?: React.JSX.Element;
}) => {
  return (
    value && (
      <p className="text-[#001F35] text-[12px]   xl:text-sm not-italic font-medium text-wrap  inline-flex max-w-fit ml-auto">
        {Icon} {label}:{" "}
        <span className="text-[#242424] text-[12px] xl:text-[14px]  not-italic  font-bold text-nowrap ml-1 ">
          {" "}
          {value}
        </span>
      </p>
      // <p className="text-[#242424] text-[12px] xl:text-[14px]  not-italic mt-[1px] font-bold text-nowrap ml-1 mt-0.5">
      //   {" "}

      // </p>
    )
  );
};

function SearchCardTopCornerSection({topCornerRightData, onAddingShortList}: Props) {
    const {category, type, basePrice, sqftPrice, floorPlan, Sh, brochureUrl, amenCount, propTypeName, atFloor, facing, towerName} = topCornerRightData;
    const isMobile = useMediaQuery("(max-width: 1600px)");
    // console.log(Sh)
 
    return (
      <div className={Styles.searchCardTopCornerMainCon}>

          {category == "Sale" || type === "proj" ? (
            <div className={Styles.searchCardAvgPriceText}>
              Avg Price:{" "}
              <span>
                {" "}
                ₹{formatNumberWithSuffix(type === "proj" ? basePrice : sqftPrice)}
              </span>
            </div>
          ) : null}

          {isMobile && (
            <>
              {/* <ProjData type={type} {...data} /> */}
              <div className={Styles.mobileCornerCard}>
                <div className={Styles.likeAndShearCon}>
                  <div className={Styles.likeBtnCon}>
                    <button 
                      // data-action="like"
                      onClick={(e)=>{
                        e.stopPropagation(); 
                        onAddingShortList();
                      }}
                    >
                      {Sh ? <p> ❤️ </p>: <p className={Styles.unLikeBtn}> 🤍 </p> }
                    </button>
                    <button
                      name="share Project"
                      className={Styles.mobileShearBtn}
                      data-action="share"
                    >
                      🔗
                    </button>

                    {floorPlan && type !== "proj" && (
                      <Link
                        title="Click to view Floor Plan"
                        className="w-[18px] h-[18px] "
                        href={`/image?path=${
                          floorPlan.split(process.env.NEXT_PUBLIC_IMG_BASE)[1]
                        }&type=F`}
                      >
                        <svg width="18px" height="18px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 0.5H14.5V14.5H0.5V0.5H4.5L7.5 2.5M6.5 14.5V7.5M4 7.5H9M12 7.5H14.5" stroke="#000000"/>
                        </svg>
                      </Link>
                    )}
        
                    <button
                      // data-action="viewMap"
                      data-action="nearby"
                      title="Click to view on Map"
                      className={Styles.searchCardViewMapBtn}
                    >
                      <span 
                        className={Styles.searchCardViewMapBtnSpan}
                      >
                        Map & Nearby
                      </span>
                    </button>
        
                  </div>

        
                  {/* <button
                    // data-action="viewMap"
                    data-action="nearby"
                    className={`${Styles.searchCardViewMapBtn} ${Styles.searchCardViewMapBtnForMobile}`}
                    title="Click to view on Map"
                    // onClick={() => {
                          //   setIsMapLoaded(true);
                          //   setNearby((prev: any) => ({
                          //     ...prev,
                          //     category: "",
                          //     selectedNearbyItem: {},
                          //     data: {},
                          //     id: "",
                          //     isOpen: false,
                          //   }));
                          //   setSelected({
                          //     agentListing,
                          //     ownerListing,
                          //     projOrPropName,
                          //     lat,
                          //     lang,
                          //     type,
                          //     reqId: type === "proj" ? projIdEnc : propIdEnc,
                          //     propType: type === "proj" ? propType : propTypeName,
                          //     phaseId: phaseId,
                          //   });
                    // }}
                  >
                    <span 
                      // className="bg-white px-[6px] h-full w-full text-black group-hover:text-white transition-[300ms] rounded-md hover:bg-transparent"
                      className={Styles.searchCardViewMapBtnForMobileSpan}
                    >
                      Map & Nearby
                    </span>
                  </button> */}
                </div>

                {/* tab and laptop */}
                {type === "proj" && (
                  <div className={Styles.brochureAndNearbyCon}>
                    {" "}
                    {/* {brochureUrl && <DownloadBrocher brochureUrl={brochureUrl} />} */}
                    {brochureUrl && 
                    <button
                      data-action="brochure"
                      // onClick={handleDownload}
                      className={Styles.searchCardbroucherBtn}
                    >
                      <DownLoadIcon className={Styles.broucherIcon} />{" "}
                      Brochure
                    </button>
                    }
                    <button
                      data-action="amenities"
                      title={`Click to view ${
                        amenCount === 1 ? "" : "all"
                      } ${amenCount} ${amenCount === 1 ? "Amenity" : "Amenities"}`}
                      className={Styles.amenityBtn}
                        // onClick={() =>
                        //   dispatch({
                        //     type: "OPEN",
                        //     content: [],
                        //     id: `${projIdEnc}+${propTypeId}+${phaseId}`,
                        //     title: "Amenities",
                        //     conType: "amenities",
                        //     pType: type,
                        //   })
                        // }
                    >
                      {amenCount} {amenCount === 1 ? "Amenity" : "Amenities"}
                    </button>
                    {/* <button
                      data-action="nearby"
                      className={Styles.nearByBtn}
                      title="Click to view all Near by Locations"
                      // onClick={() => {
                            //   setIsMapLoaded(true);
                            //   setNearby((prev: any) => ({
                            //     ...prev,
                            //     category: "",
                            //     data: {},
                            //     selectedNearbyItem: {},
                            //     id: "",
                            //     isOpen: false,
                            //     isLoader: true,
                            //   }));
                            //   // setSelected(null);
                            //   setSelected({
                            //     lat: data.lat,
                            //     lang: data.lang,
                            //     type: data.type,
                            //     reqId: !propIdEnc ? projIdEnc : propIdEnc,
                            //     propType: !propIdEnc ? propType : propTypeName,
                            //     projOrPropName: propName ? propName : projName,
                            //     phaseId: phaseId,
                            //   });
                            //   if (isMobile)
                            //     setMapPopup((prev: any) => ({ ...prev, isOpen: true }));
                            //   dispatch({
                            //     type: "OPEN",
                            //     content: [],
                            //     id: `${projIdEnc}+${propTypeId}${
                            //       phaseId ? `+${phaseId}` : ""
                            //     }`,
                            //     title: `NearBy Locations of ${projName}`,
                            //     conType: "nearby",
                            //     pType: type,
                            //     lat,
                            //     lang,
                            //   });
                      // }}
                    >
                      Nearby
                    </button> */}
                  </div>
                )}
                {(type === "proj" || type === null || category == "Sale") && (
                  <div className={Styles.searchCardAvgPriceText2}>
                    <p className="text-right text-[12px] md:text-[14px] text-nowrap ">
                      Avg Price:
                      <span style={{color: "#148B16"}}>
                        ₹{" "}
                        {formatNumberWithSuffix(
                          type === "proj" ? basePrice : sqftPrice
                        )}
                      </span>
                    </p>
                    {/*  <p className="text-right text-[12px] text-nowrap">
                        {towerData ? towerData : "N/A"}
                      </p> */}
                  </div>
                )}
        
                {type !== "proj" && (
                  <>
                    <ListingDownSectionCard label={"Tower"} value={towerName} />
                    <ListingDownSectionCard label={"Facing"} value={facing} />
   
                    <ListingDownSectionCard
                      label={
                        propTypeName === "Row House" || propTypeName === "Villa"
                          ? "Elevation"
                          : "At Floor"
                      }
                      value={atFloor == 0 ? "G" : atFloor}
                    />
                  </>
                )}
              </div>
            </>
          )}

          {!isMobile && (
            <>
              <div className={Styles.cornerDetailsForDesktop}>
                <div className="space-x-2 flex flex-row justify-center">
                  <HeartButton
                    shortListed={Sh}
                    onAddingShortList={(e)=>{
                      e.stopPropagation(); 
                      onAddingShortList();
                    }}
                  />
                  {/* <button 
                    // data-action="like"
                  >
                    {config.heartIcon}
                  </button> */}
                  
                  <button
                    className="space-x-2 flex flex-row justify-center"
                    data-action="share"
                  >
                    {config.shareIcon}
                  </button>
                </div>
        
                <button
                  // data-action="viewMap"
                  data-action="nearby"
                  className={Styles.searchCardViewMapBtn}
                  title="Click to view on Map"
                >
                  <span className={Styles.searchCardViewMapBtnSpan}>
                    Map & Nearby
                  </span>
                </button>
        
                {type !== "proj" && (
                  <>
                    <ListingDownSectionCard label={"Tower"} value={towerName} />
                    <ListingDownSectionCard label={"Facing"} value={facing} />
                    {/* <ListingDownSectionCard
                      label={"Property Age"}
                      value={propertyAge}
                    /> */}
                    <ListingDownSectionCard
                      label={
                        propTypeName === "Row House" || propTypeName === "Villa"
                          ? "Elevation"
                          : "At Floor"
                      }
                      value={
                        propTypeName === "Row House" || propTypeName === "Villa"
                          ? `G+${atFloor}`
                          : atFloor == 0
                          ? "G"
                          : atFloor
                      }
                    />
                    {floorPlan && (
                      <Link
                        title="Click to view Floor Plan"
                        className="text-[14px]  text-btnPrimary  font-bold mt-2"
                        href={`/image?path=${
                          floorPlan.split(process.env.NEXT_PUBLIC_IMG_BASE)[1]
                        }&type=F`}
                      >
                        <span className="hidden sm:flex">View Floor Plan</span>
                      </Link>
                    )}
                  </>
                )}
              </div>
              {type === "proj" && (
                <div className={Styles.broucherAndAmenityButton}>
                  {/* {brochureUrl && <DownloadBrocher brochureUrl={brochureUrl} />} */}
                  {brochureUrl && 
                  <button
                    data-action="brochure"
                    // onClick={handleDownload}
                    className={Styles.searchCardbroucherBtn}
                  >
                    <DownLoadIcon className={Styles.broucherIcon} />{" "}
                    Brochure
                  </button>
                  }
                  {amenCount && (
                    <button
                      data-action="amenities"
                      className={Styles.amenityBtn}
                      title={`Click to view ${
                        amenCount === 1 ? "" : "all"
                      } ${amenCount} ${amenCount === 1 ? "Amenity" : "Amenities"}`}
                      // onClick={() =>
                      //   dispatch({
                      //     type: "OPEN",
                      //     content: [],
                      //     id: `${projIdEnc}+${propTypeId}${
                      //       phaseId ? `+${phaseId}` : ""
                      //     }`,
                      //     title: "Amenities",
                      //     conType: "amenities",
                      //     pType: type,
                      //   })
                      // }
                    >
                      {amenCount} {amenCount === 1 ? "Amenity" : "Amenities"}
                    </button>
                  )}
        
                  {/* <button
                    data-action="nearby"
                    className={Styles.nearByBtn}
                    title="Click to view all Near by Locations"
                    // onClick={() => {
                    //   setIsMapLoaded(true);
                    //   setNearby((prev: any) => ({
                    //     ...prev,
                    //     category: "",
                    //     data: {},
                    //     selectedNearbyItem: {},
                    //     id: "",
                    //     isOpen: false,
                    //     isLoader: true,
                    //   }));
                    //   // setSelected(null);
                    //   setSelected({
                    //     lat: data.lat,
                    //     lang: data.lang,
                    //     type: data.type,
                    //     reqId: !propIdEnc ? projIdEnc : propIdEnc,
                    //     propType: !propIdEnc ? propType : propTypeName,
                    //     projOrPropName: propName ? propName : projName,
                    //     phaseId: phaseId,
                    //   });
                    //   dispatch({
                    //     type: "OPEN",
                    //     content: [
                    //       "Orion Mall",
                    //       "Apollo Hospital",
                    //       "Greenwood High International School",
                    //       "MG Road Metro Station",
                    //       "Major Bus Stop",
                    //       "City Park",
                    //       "Central Library",
                    //       "Fitness Center",
                    //       "Local Market",
                    //       "Coffee Shop",
                    //       "Bank",
                    //       "Post Office",
                    //       "Restaurant",
                    //       "Pharmacy",
                    //       "Veterinary Clinic",
                    //     ],
                    //     id: `${projIdEnc}+${propTypeId ?? ""}${
                    //       phaseId ? `+${phaseId}` : ""
                    //     }`,
                    //     title: `NearBy Locations of ${projName}`,
                    //     conType: "nearby",
                    //     pType: type,
                    //     lat,
                    //     lang,
                    //   });
                    // }}
                  >
                    Nearby
                  </button> */}
                </div>
              )}
            </>
          )}
      </div>

      
)}

export default SearchCardTopCornerSection;

const config = {
  shareIcon: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="13"
        cy="13"
        r="12.75"
        fill="#ECF0F3"
        stroke="#A7C4DA"
        strokeWidth="0.5"
      />
      <path
        d="M11.2391 13.5434C11.2391 14.0522 11.037 14.5401 10.6773 14.8999C10.3175 15.2597 9.82954 15.4618 9.32075 15.4618C8.81195 15.4618 8.324 15.2597 7.96423 14.8999C7.60446 14.5401 7.40234 14.0522 7.40234 13.5434C7.40234 13.0346 7.60446 12.5467 7.96423 12.1869C8.324 11.8271 8.81195 11.625 9.32075 11.625C9.82954 11.625 10.3175 11.8271 10.6773 12.1869C11.037 12.5467 11.2391 13.0346 11.2391 13.5434Z"
        stroke="#616D75"
        strokeWidth="1.5"
      />
      <path
        d="M15.0751 9.32227L11.2383 12.008M15.0751 17.7632L11.2383 15.0775"
        stroke="#616D75"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18.911 18.5308C18.911 19.0396 18.7089 19.5276 18.3491 19.8873C17.9894 20.2471 17.5014 20.4492 16.9926 20.4492C16.4838 20.4492 15.9959 20.2471 15.6361 19.8873C15.2763 19.5276 15.0742 19.0396 15.0742 18.5308C15.0742 18.022 15.2763 17.5341 15.6361 17.1743C15.9959 16.8145 16.4838 16.6124 16.9926 16.6124C17.5014 16.6124 17.9894 16.8145 18.3491 17.1743C18.7089 17.5341 18.911 18.022 18.911 18.5308ZM18.911 8.55512C18.911 9.06391 18.7089 9.55187 18.3491 9.91164C17.9894 10.2714 17.5014 10.4735 16.9926 10.4735C16.4838 10.4735 15.9959 10.2714 15.6361 9.91164C15.2763 9.55187 15.0742 9.06391 15.0742 8.55512C15.0742 8.04633 15.2763 7.55838 15.6361 7.19861C15.9959 6.83884 16.4838 6.63672 16.9926 6.63672C17.5014 6.63672 17.9894 6.83884 18.3491 7.19861C18.7089 7.55838 18.911 8.04633 18.911 8.55512Z"
        stroke="#616D75"
        strokeWidth="1.5"
      />
    </svg>
  ),
  heartIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      className="max-w-fit px-[1px] py-[1px]  rounded  text-[#242424] text-sm not-italic font-semibold  md:mb-1  "
    >
      <circle
        cx="12"
        cy="12"
        r="11.75"
        fill="#ECF0F3"
        stroke="#A7C4DA"
        strokeWidth="0.5"
      />
      <path
        d="M15.5334 6C13.1666 6 12 8.36363 12 8.36363C12 8.36363 10.8334 6 8.46665 6C6.54321 6 5.02006 7.63016 5.00037 9.57536C4.96027 13.6131 8.16224 16.4845 11.6719 18.8977C11.7687 18.9643 11.883 19 12 19C12.117 19 12.2314 18.9643 12.3281 18.8977C15.8374 16.4845 19.0394 13.6131 18.9996 9.57536C18.9799 7.63016 17.4568 6 15.5334 6Z"
        stroke="#4D6677"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  isTrueIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="28"
      viewBox="0 0 24 28"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="11.75"
        fill="#ECF0F3"
        stroke="#A7C4DA"
        strokeWidth="0.5"
      />
      <g filter="url(#filter0_d_31_1046)">
        <path
          d="M15.5334 6C13.1666 6 12 8.36363 12 8.36363C12 8.36363 10.8334 6 8.46665 6C6.54321 6 5.02006 7.63016 5.00037 9.57536C4.96027 13.6131 8.16224 16.4845 11.6719 18.8977C11.7687 18.9643 11.883 19 12 19C12.117 19 12.2314 18.9643 12.3281 18.8977C15.8374 16.4845 19.0394 13.6131 18.9996 9.57536C18.9799 7.63016 17.4568 6 15.5334 6Z"
          fill="#EF5A5A"
        />
        <path
          d="M15.5334 6C13.1666 6 12 8.36363 12 8.36363C12 8.36363 10.8334 6 8.46665 6C6.54321 6 5.02006 7.63016 5.00037 9.57536C4.96027 13.6131 8.16224 16.4845 11.6719 18.8977C11.7687 18.9643 11.883 19 12 19C12.117 19 12.2314 18.9643 12.3281 18.8977C15.8374 16.4845 19.0394 13.6131 18.9996 9.57536C18.9799 7.63016 17.4568 6 15.5334 6Z"
          stroke="#FFA6A6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_31_1046"
          x="0.25"
          y="5.25"
          width="23.5"
          height="22.5"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_31_1046"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_31_1046"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  ),
};



