"use client";

import DrawerBox from '@/app/components/property/pricingbreakup/DrawerBox'
import OtherCharges from '@/app/test/newui/components/modals/overly_items/OtherChargesListOverlay';
import PropertyHighlights from '@/app/test/newui/components/modals/overly_items/PropertyHightilights';
import useProjectCardData from '@/app/test/newui/useProjectCardData';
import React, { useEffect } from 'react';
import SearchCardNearbyBlock from './SearchCardNearbyBlock';
import { useQuery } from 'react-query';
import AmenitiesPopupBox from './amenitiesPopupBox';

type Props = {
    popupState: any;
    closePopup: () => void
}

function PopupOverlay({popupState, closePopup}: Props) {
    const {pType, lat, lang, type, propIdEnc, projIdEnc, propTypeId, propTypeName, propName, projName} = popupState.data
    const {isOpen, type: popupType, content} = popupState;
    // const [{ selectedNearbyItem }, setNearby] = useAtom(selectedNearByAtom);
    
    const id = `${projIdEnc ?? ""}+${propIdEnc ?? ""}${propTypeId ?? propTypeName ?? ""}`
    const isProj = projIdEnc !== undefined;

    const reqId = isProj ? projIdEnc : propIdEnc;

    console.log(popupState.data)

    // const { data: amenitiesFromDB, isLoading } = useProjectCardData({
    //   id: id ?? "",
    //   isOpen,
    //   conType: popupType,
    //   pType: pType ?? "",
    //   lat, 
    //   lang,
    //   propId: propIdEnc,
    // });

    // console.log(amenitiesFromDB)

    async function getNearByLocations() {
        try {
          let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
          if (isProj) {
            url += `/api/project/get-nearby?projIdEnc=${reqId}&iden=P&lat=${lat}&lng=${lang}`;
          } else {
            url += `/api/v1/fetch/get-nearby?propIdEnc=${reqId}&iden=L&lat=${lat}&lng=${lang}`;
          }
          const res = await fetch(url);
          return await res.json();
        } catch (error) {
          console.error("Failed to fetch nearby locations:", error);
          throw error;
        }
    }

    // const { data, isLoading: apiLoading } = useQuery({
    //     queryKey: reqId,
    //     queryFn: getNearByLocations,
    //     // onSuccess: (data) => {
    //     //     console.log('Data fetched:', data);
    //     // },
    //     // enabled: isOpen,
    // });

    // const { data, isLoading: apiLoading, refetch } = useQuery({
    //     queryKey: reqId,
    //     queryFn: getNearByLocations,
    //     enabled: false, // prevent auto run
    //   });
    
    //   useEffect(() => {
    //     refetch(); // manually trigger fetch on first render
    //   }, [refetch]);

    // const renderAmenities = () => {
    //     if (isLoading) return <div>Loading...</div>;
    //     if (!amenitiesFromDB) return <div>No amenities available</div>;
    
    //     return amenitiesFromDB
    //       .toString()
    //       .split(",")
    //       .map(
    //         (item: string) =>
    //           item !== " " && (
    //             <span
    //               key={`amenity_${item}`}
    //               className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium"
    //             >
    //               {item}
    //             </span>
    //         )
    //     );
    // };

    const renderContent = () => {
        switch (popupState.type) {
          case "amenities":
            return <AmenitiesPopupBox id={id} type={isProj ? "proj" : "prop"} propId={propIdEnc} />;
          case "nearby":
            // const fetchData = async () => {
            //     const response = await getNearByLocations(reqId, type, lat, lang); // parsed data
            //     console.log(response);
            // };
            // fetchData();
            // console.log(data)

            // return(
            //     <SearchCardNearbyBlock 
            //         lat={lat}
            //         lang={lang}
            //         projName={projName ?? propName}
            //         type={isProj ? "proj" : "prop"}
            //         key={`search card new near by map`}
            //         mapData={{}}
            //     />
            // )
            break;
            
          case "readmore":
            return (
              <p
                className="prose-p:py-1 prose-no-break"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            );
        //   case "bhk":
        //     return (
        //       <div className="flex flex-wrap gap-2">
        //         {Array.isArray(content) ? (
        //           content.map((item) => (
        //             <span
        //               key={`bhk_${item}`}
        //               className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium"
        //             >
        //               {item}
        //             </span>
        //           ))
        //         ) : (
        //           <div>No BHK data available</div>
        //         )}
        //       </div>
        //     );
          case "otherCharges":
            return <OtherCharges />;
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
            childrenContainerClass="p-[20px] pt-[10px] max-h-[calc(100vh-120px)] overflow-y-auto overflow-x-hidden "
        >
            {renderContent()}
        </DrawerBox>
    )
}

export default PopupOverlay;