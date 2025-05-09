import { SearchFilter } from "@/app/types/search";
import React, { useCallback, useMemo, useState } from "react";
// import ProjectCard from "@/app/test/newui/components/Card";
import SearchCard from "./searchCradComponents/SearchCard";
import { createProjectLinkUrl } from "@/app/utils/linkRouters/ProjectLink";
import { generateListingLinkUrl } from "@/app/utils/linkRouters/ListingLink";
import { useSetAtom } from "jotai";
import { searchPageMapToggle } from "@/app/(new_routes_seo)/search/store/newSearchProjectStore";
import selectedSearchAtom, { selectedNearByAtom } from "@/app/store/search/map";
import { useSession } from "next-auth/react";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import { preventBackButton } from "@/app/components/molecules/popups/req";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import PopupOverlay from "./searchCradComponents/PopupOverlay";

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

  const [selectedCard, setSelectedCard] = useState({compareAdded:"N", shortListed:"N"});
  const [popupState, setPopupState] = useState({ isOpen: false, type: "", title:"", data: {}, content:"" });

  const [stateData, setStateData] = useState({
      compareAdded: selectedCard.compareAdded === "Y" ? true : false,
      shortListed: selectedCard.shortListed === "Y" ? true : false,
  });

  const setIsMapLoaded = useSetAtom(searchPageMapToggle);
  const setNearby = useSetAtom(selectedNearByAtom);
  const setSelected = useSetAtom(selectedSearchAtom);
  const { data: session } = useSession();
  const { toggleShortlist } = useShortlistAndCompare();
  const [, { open: openLogin }] = usePopShortList();

  const newData = {
    ...selectedCard,
    Com: stateData.compareAdded,
    Sh: stateData.shortListed,
  };

  // console.log(newData)

  const cg = useMemo(() => {
    if (state.cg === undefined) {
      return frontendFilters?.cg;
    }
    return state.cg === frontendFilters.cg ? frontendFilters.cg : state.cg;
  }, [state, frontendFilters]);

  const listedBy = useCallback(() => {
    if (state.listedBy === undefined) {
      return frontendFilters.listedBy;
    }
    return state.listedBy === frontendFilters.listedBy
      ? frontendFilters.listedBy
      : state.listedBy;
  }, [state, frontendFilters]);

  const onAddingShortList = (selectedItem:any) => {
    const {projIdEnc, propIdEnc, type} = selectedItem;
    if (session) {
      setStateData({ ...stateData, shortListed: !stateData.shortListed });
      toggleShortlist({
        id: type === "proj" ? projIdEnc : propIdEnc,
        status: stateData.shortListed ? "N" : "Y",
        source: type,
      });
    } else {
      openLogin(() => refetch());
    }
  };

  const shearPropOrProj = (data:any) => {
    const {
      type, projName, propName, cityName, city, localityName, locality, 
      category, phaseName, propIdEnc, bhkName, propTypeName, projIdEnc, 
    } = data;

    const url =
    type === "proj"
      ? createProjectLinkUrl({
          city: cityName ? cityName : city ? city : "",
          locality: localityName ? localityName : locality ? locality : "",
          slug: projName ? projName : projName,
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

    navigator.share({
      title: type === "proj" ? projName : propName,
      text: `Check out this ${
        type === "proj" ? "project" : "property"
      }: ${type === "proj" ? projName : propName}`,
      url: url,
    });
  };

  const onViewMap = (data:any) => {
    const {
        agentListing, ownerListing, projOrPropName, lat, lang, type, 
        projIdEnc, propIdEnc, propType, propTypeName, phaseId
    } = data;

    console.log(projOrPropName);

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

  const [,{ open }] = useReqCallPopup();

  const handleOpen = (data:any) => {
    const {
      type, propTypeName, builderName, postedBy, builderId, postedById, 
      projName, bhkName, localityName, category, projIdEnc, propIdEnc,
    } = data;
      preventBackButton();
      open({
        modal_type:
          type === "proj" ? "PROJECT_REQ_CALLBACK" : "PROPERTY_REQ_CALLBACK",
        postedByName: type === "proj" ? builderName : postedBy,
        postedId: type === "proj" ? builderId : postedById,
        reqId: type === "proj" ? projIdEnc : propIdEnc,
        source: type === "proj" ? "projCard" : "propCard",
        title:
          type === "proj"
            ? projName
            : `${bhkName ?? ""} ${propTypeName} for
        ${category === "Rent" ? "Rent" : "Sale"} in ${localityName}`,
      });
  };

  const handleAgentOwner = (projIdEnc:string, projName:string, type: "A" | "I" | "B") => {
    window.open(
      `/search/listing?sf=projIdEnc=${projIdEnc}-listedBy=${type}-projName=${projName}`,
      "_self"
    );
  }

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

  const handleClick = (e: any) => {
    const cardEl = e.target.closest('[data-type="card"]');
    if (!cardEl) return;
  
    const cardId = cardEl.dataset.id;
    const actionButton = e.target.closest('[data-action]');
    const index = cardId ? cardId.split("_")[1] : 0;
    const selectedItem:any = data[index];
    setSelectedCard(selectedItem);  
    const action = actionButton?.dataset.action;

    console.log(selectedItem);

    switch(action){
      case 'readmore':
        document.body.style.overflow = "hidden";
        setPopupState(prev => ({...prev, isOpen: true, type: 'readmore', title:"Read More", data: selectedItem, content: selectedItem.projectAbout ?? selectedItem.usp}));
        break; 
      case 'like':
        onAddingShortList(selectedItem);
        break;
      case 'share':
        shearPropOrProj(selectedItem);
        break;
      case 'viewMap':
        onViewMap(selectedItem)
        break;
      case 'requestCall':
        handleOpen(selectedItem)
        break;
      case 'brochure':
        console.log('brochure card: ', index);
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
      case 'listingType':
        handleAgentOwner(selectedItem.projIdEnc, selectedItem.projName, selectedItem.type);
        break;

      default:
        console.log('Card clicked:', cardId);
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

      {data.map((eachOne: any, index: number) => (
      <SearchCard
        key={eachOne.projIdEnc + eachOne.propType + index.toString()}
        refetch={refetch}
        data={{
          ...eachOne,
          type: listedBy(),
          cg: cg,
        }}
        index={index}
        mutate={mutate}
      />
      ))}
    </div>
)}
