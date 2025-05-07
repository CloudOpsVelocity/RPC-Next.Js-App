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

  const [stateData, setStateData] = useState({
      compareAdded: selectedCard.compareAdded === "Y" ? true : false,
      shortListed: selectedCard.shortListed === "Y" ? true : false,
  });

  const setIsMapLoaded = useSetAtom(searchPageMapToggle);
  const setNearby = useSetAtom(selectedNearByAtom);
  const setSelected = useSetAtom(selectedSearchAtom);
  const { data: session } = useSession();
  const { toggleShortlist, toggleCompare } = useShortlistAndCompare();
  const [, { open: openLogin }] = usePopShortList();

  const newData = {
    ...selectedCard,
    Com: stateData.compareAdded,
    Sh: stateData.shortListed,
  };

  console.log(newData)

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
    if (session) {
      setStateData({ ...stateData, shortListed: !stateData.shortListed });
      toggleShortlist({
        id: selectedItem.reqId,
        status: stateData.shortListed ? "N" : "Y",
        source: selectedItem.type,
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

    const [opened, { open, close }] = useReqCallPopup();
  

  const handleOpen = () => {
      preventBackButton();
      open({
        modal_type:
          type === "proj" ? "PROJECT_REQ_CALLBACK" : "PROPERTY_REQ_CALLBACK",
        postedByName: type === "proj" ? data.builderName : data.postedBy,
        postedId: type === "proj" ? data.builderId : data.postedById,
        reqId: reqId,
        source: type === "proj" ? "projCard" : "propCard",
        title:
          type === "proj"
            ? projName
            : `${bhkName ?? ""} ${propTypeName} for
        ${data.category === "Rent" ? "Rent" : "Sale"} in ${localityName}`,
      });
    };

  const handleClick = (e: any) => {
    const cardEl = e.target.closest('[data-type="card"]');
    if (!cardEl) return;
  
    const cardId = cardEl.dataset.id;
    const actionButton = e.target.closest('[data-action]');
    const index = cardId ? cardId.split("_")[1] : 0;
    const selectedItem = data[index];
    setSelectedCard(selectedItem);
    // if (cardId){ console.log('Clicked card ID:', cardId)}
  
    const action = actionButton?.dataset.action;

    console.log(selectedItem);

    switch(action){
      case 'readMore':
        console.log('Read More card: ', index);
        break;
      case 'like':
        onAddingShortList(selectedItem);
        console.log('like card: ', index);
        break;
      case 'share':
        shearPropOrProj(selectedItem);
        console.log('share card: ', index);
        break;
      case 'viewMap':
        onViewMap(selectedItem)
        console.log('view Map card: ', index);
        break;
      case 'requestCall':
        console.log('Read More card: ', index);
        handleOpen(selectedItem)
        break;



      default:
        console.log('Card clicked:', cardId);
    }
  }

  console.log(data)

  return(
    <div onClick={handleClick}>
      {/* <SearchCard data={data[0]} index={0}  /> */}

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
