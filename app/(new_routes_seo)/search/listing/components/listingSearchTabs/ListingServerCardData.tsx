import { SearchFilter } from "@/app/types/search";
import React, { useMemo, useCallback, useState, useRef } from "react";
// import ProjectCard from "@/app/test/newui/components/Card";
import SearchCard from "../../_new-listing-search-page/components/listingSearchTabs/searchCradComponents/SearchCard";
import { sortUnits } from "@/app/utils/unitparser";
import PopupOverlay from "../../_new-listing-search-page/components/listingSearchTabs/searchCradComponents/PopupOverlay";
import { useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { searchPageMapToggle } from "../../../store/newSearchProjectStore";
import selectedSearchAtom, { selectedNearByAtom } from "@/app/store/search/map";
import { preventBackButton } from "@/app/components/molecules/popups/req";
import { handleAgentOwner, shearPropOrProj } from "../../_new-listing-search-page/components/listingSearchTabs/searchCradComponents/searchData";

type Props = {
  data: any;
  refetch: any;
  mutate: any;
  state: SearchFilter;
  frontendFilters: Record<string, any>;
};

export default function ListingServerCardData({
  data,
  mutate,
  refetch,
  state,
  frontendFilters,
}: Props) {
  const cg = useMemo(() => {
    if (state.cg === undefined) {
      return frontendFilters?.cg;
    }
    return state.cg === frontendFilters.cg ? frontendFilters.cg : state.cg;
  }, [state, frontendFilters]);

  const listedBy = useCallback(() => {
    if (state.listedBy === undefined) {
      return frontendFilters?.listedBy;
    }
    return state.listedBy === frontendFilters.listedBy
      ? frontendFilters.listedBy
      : state.listedBy;
  }, [state, frontendFilters]);

  const type = listedBy() ?? "proj";


    // methods for new search card with event delegation
  const [popupState, setPopupState] = useState({ isOpen: false, type: "", title:"", data: {}, content:"" });
  const setIsMapLoaded = useSetAtom(searchPageMapToggle);
  const setNearby = useSetAtom(selectedNearByAtom);
  const setSelected = useSetAtom(selectedSearchAtom);
  const { data: session } = useSession();
  const [, { open: openLogin }] = usePopShortList();
  const [,{ open }] = useReqCallPopup();

  
  const cardFnsRef = useRef<Record<string, () => void>>({});

  const registerCard = (id: string, fn: () => void) => {
    cardFnsRef.current[id] = fn;
  };

  const onViewMap = (data:any) => {
    const {
        agentListing, ownerListing, projName, propName,
        projIdEnc, propIdEnc, propType, propTypeName, phaseId, location
    } = data;

    const projOrPropName:string = type === "proj" ? projName : propName;

    const lat = location.split(",")[0];
    const lang = location.split(",")[1];

    setIsMapLoaded(true);
    setNearby((prev: any) => ({
      ...prev,
      category: "",
      selectedNearbyItem: {},
      data: {},
      id: "",
      isOpen: false,
    }));
    setSelected({
      agentListing,
      ownerListing,
      projOrPropName,
      lat,
      lang,
      type,
      reqId: type === "proj" ? projIdEnc : propIdEnc,
      propType: type === "proj" ? propType : propTypeName,
      phaseId: phaseId,
    });
  };

  const handleDownload = (data:any) => {
    const {brochureUrl} = data;
    if (session) {
      brochureUrl &&
        window.open(
          `/pdf/${encodeURIComponent(brochureUrl.split(".net")[1])}`,
          "_self"
        );
    } else {
      openLogin(() => {
        brochureUrl &&
          window.open(
            `/pdf/${encodeURIComponent(brochureUrl.split(".net")[1])}`,
            "_self"
          );
      });
    }
  };  

  const handleOpen = (data:any) => {
        const {
          propTypeName, postedByName, builderId, postedById, 
          projName, bhkName, localityName, category, projIdEnc, propIdEnc,
        } = data;
          preventBackButton();
          open({
            modal_type:
              type === "proj" ? "PROJECT_REQ_CALLBACK" : "PROPERTY_REQ_CALLBACK",
            // postedByName: type === "proj" ? builderName : postedByName,
            postedByName: postedByName,
            postedId: type === "proj" ? builderId : postedById,
            reqId: type === "proj" ? projIdEnc : propIdEnc,
            source: type === "proj" ? "projCard" : "propCard",
            title:
              type === "proj"
                ? projName
                : `${bhkName ?? ""} ${propTypeName} for ${category === "Rent" ? "Rent" : "Sale"} in ${localityName}`,
          });
  };

  const handleClick = (e: any) => {
      const cardEl = e.target.closest('[data-type="card"]');
      if (!cardEl) return;
    
      const cardId = cardEl.dataset.id;
      const actionButton = e.target.closest('[data-action]');
      const index = cardId ? cardId.split("_")[1] : 0;
      const selectedItem:any = data[index];
      const action = actionButton?.dataset.action;
    
      switch(action){
        case 'readmore':
          document.body.style.overflow = "hidden";
          setPopupState(prev => ({...prev, isOpen: true, type: 'readmore', title:"Read More", data: selectedItem, content: selectedItem.projectAbout ?? selectedItem.usp}));
          break; 
        // case 'like':
        //   handleParentAction(index.toString());
        //   break;
        case 'share':
          shearPropOrProj(selectedItem);
          break;
        case 'viewMap':
          onViewMap(selectedItem)
          break;
        case 'requestCall':
          handleOpen(selectedItem)
          break;
        case 'otherCharges':
          setPopupState(prev => ({...prev, isOpen: true, type: 'otherCharges', title:"Other Charges", data: selectedItem}));
          break;
        case 'brochure':
          handleDownload(selectedItem);
          break;
        case 'nearby':
          document.body.style.overflow = "hidden";
          setPopupState(prev => ({...prev, isOpen: true, type: 'nearby', title:"Near By Locations", data: selectedItem})); 
          // onSetNearBy(selectedItem);
          break;
        case 'amenities':
          document.body.style.overflow = "hidden";
          setPopupState(prev => ({...prev, isOpen: true, type: 'amenities', title:"Amenities", data: selectedItem}));
          break;
        case 'listingType_B':
          handleAgentOwner(selectedItem.projIdEnc, selectedItem.projName, "B");
          break;
        case 'listingType_A':
          handleAgentOwner(selectedItem.projIdEnc, selectedItem.projName, "A");
          break; 
        case 'listingType_O':
          handleAgentOwner(selectedItem.projIdEnc, selectedItem.projName, "I");
          break;
        case 'bhk':
          const sortedBhks:any = sortUnits(selectedItem.bhkNames);
          document.body.style.overflow = "hidden";
          setPopupState(prev => ({...prev, isOpen: true, type: 'bhk', title:"Unit Types", content: sortedBhks, data: selectedItem}));
          break;
        default:
          window.open(selectedItem.pageUrl, "_self", "noreferrer");
      }
  };

  const closePopup = () => {
    document.body.style.overflow = "unset"; 
    setPopupState(prev => ({...prev, isOpen: false, type: '', title:"", data: {}}));
  };

  return(
    <div onClick={handleClick}>
      {/* <SearchCard data={data[0]} index={0}  /> */}
      {popupState.isOpen &&
        <PopupOverlay popupState={popupState} closePopup={closePopup} />
      }

      {data.map((eachOne: any, index: number) => {
        const sortedBhks:any = sortUnits(eachOne.bhkNames);

        return(
          <SearchCard
            key={eachOne.projIdEnc + eachOne.propType + index.toString()}
            refetch={refetch}
            data={{
              ...eachOne,
              type: type,
              cg: cg,
              sortedBhks: sortedBhks,
            }}
            index={index.toString()}
            mutate={mutate}
            register={registerCard}
          />
      )})}
    </div>
)}
