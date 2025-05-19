import DrawerBox from '@/app/components/property/pricingbreakup/DrawerBox'
import PropertyHighlights from '@/app/test/newui/components/modals/overly_items/PropertyHightilights';
import React from 'react';
import AmenitiesPopupBox from './AmenitiesPopupBox';
import SearchCardNearbyBlock from './SearchCardNearbyBlock';
import { useMediaQuery } from '@mantine/hooks';
import OtherChargesPopupBox from './OtherChargesPopupBox';
import Link from 'next/link';
import { createProjectLinkUrl } from '@/app/utils/linkRouters/ProjectLink';
import { generateListingLinkUrl } from '@/app/utils/linkRouters/ListingLink';

type Props = {
    popupState: any;
    closePopup: () => void
}

function PopupOverlay({popupState, closePopup}: Props) {
    const { content, data, title } = popupState;
    const { 
      location, propIdEnc, projIdEnc, propTypeId, propTypeName, propName, projName, bhkName, 
      category, localityName, city, locality, cityName, phaseName, type
    } = data;

    const id = `${projIdEnc ?? ""}+${propIdEnc ?? ""}${propTypeId ?? propTypeName ?? ""}`
    const isProj = projIdEnc !== undefined;

    const lat = location.split(",")[0];
    const lang = location.split(",")[1];
    const isDesktop = useMediaQuery("(max-width: 1500px)");
    const renderContent = () => {
        switch (popupState.type) {
          case "amenities":
            return <AmenitiesPopupBox id={id} type={isProj ? "proj" : "prop"} projId={projIdEnc} propId={propIdEnc} />;
          case "nearby":
            return(
                <SearchCardNearbyBlock 
                    key={`search card new near by map`}
                    lat={lat}
                    lang={lang}
                    projName={projName ? projName : propName}
                    type={isProj ? "proj" : "prop"}
                    // mapData={{}}
                    projId={projIdEnc ? projIdEnc : ""}
                    propId={propIdEnc ? propIdEnc : ""}
                    id={id}
                />
            )            
          case "readmore":
            return (
              <p
                className="prose-p:py-1 prose-no-break"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            );
          case "bhk":
            return (
              <div className="flex flex-wrap gap-2">
                {Array.isArray(content) ? (
                  content.map((item) => (
                    <span
                      key={`bhk_${item}`}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium"
                    >
                      {item}
                    </span>
                  )) 
                ) : (
                  <div>No BHK data available</div>
                )}
              </div>
            );
          case "otherCharges":
            return <OtherChargesPopupBox data={data} />
          case "hightlights":
            return <PropertyHighlights />;
          case "none":
          default:
            return <div>{content}</div>;
        }
    };

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

    console.log(url, data)
          
    const projOrPropName = type === "proj" ? projName : `${bhkName} ${propTypeName} for ${category} in ${localityName}`;

    return (
        <DrawerBox
            key="search page Drawer"
            isOpen={popupState.isOpen}
            handleChange={closePopup}
            HeadingElemnt={
              <Link
                href={url}
                className="block cursor-pointer"
                rel="noopener noreferrer"
                title={`${title} of ${projOrPropName}`}
                aria-label={`${title} of ${projOrPropName}`}
              >
                <h2 className="sm:text-[20px] xl:text-[24px] capitalize break-words text-wrap font-[600]">
                  <span className="text-[#001F35]">
                    {title} <span className="lowercase">of </span>
                  </span>
                  <span className="text-green-800 underline">
                    {projOrPropName}
                  </span>
                </h2>
              </Link>
            }
            containerClassStyle={!isDesktop ? `!w-[50%]` : `!w-full`}
            childrenContainerClass="p-[10px] md:p-[20px] pt-[10px] max-h-[calc(100vh-120px)] overflow-y-auto overflow-x-hidden   "
        >
            {renderContent()}
        </DrawerBox>
    )
}

export default PopupOverlay;