import DrawerBox from '@/app/components/property/pricingbreakup/DrawerBox'
import PropertyHighlights from '@/app/test/newui/components/modals/overly_items/PropertyHightilights';
import React from 'react';
import AmenitiesPopupBox from './AmenitiesPopupBox';
import SearchCardNearbyBlock from './SearchCardNearbyBlock';
import { useMediaQuery } from '@mantine/hooks';
import OtherChargesPopupBox from './OtherChargesPopupBox';

type Props = {
    popupState: any;
    closePopup: () => void
}

function PopupOverlay({popupState, closePopup}: Props) {
    const { location, propIdEnc, projIdEnc, propTypeId, propTypeName, propName, projName} = popupState.data
    const { content, data } = popupState;
    // const [{ selectedNearbyItem }, setNearby] = useAtom(selectedNearByAtom);

    
    const id = `${projIdEnc ?? ""}+${propIdEnc ?? ""}${propTypeId ?? propTypeName ?? ""}`
    const isProj = projIdEnc !== undefined;

    const lat = location.split(",")[0];
    const lang = location.split(",")[1];
    const isDesktop = useMediaQuery("(max-width: 1600px)");
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
                    projName={projName ?? propName}
                    type={isProj ? "proj" : "prop"}
                    // mapData={{}}
                    projId={projIdEnc}
                    propId={propIdEnc}
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
    return (
        <DrawerBox
            key="search page Drawer"
            isOpen={popupState.isOpen}
            title={popupState.title}
            handleChange={closePopup}
            containerClassStyle={!isDesktop ? `!w-[50%]` : `!w-full`}
            childrenContainerClass="p-[10px] md:p-[20px] pt-[10px] max-h-[calc(100vh-120px)] overflow-y-auto overflow-x-hidden "
        >
            {renderContent()}
        </DrawerBox>
    )
}

export default PopupOverlay;