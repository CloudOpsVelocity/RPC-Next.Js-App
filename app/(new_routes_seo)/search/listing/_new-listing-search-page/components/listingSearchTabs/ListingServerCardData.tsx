import { SearchFilter } from "@/app/types/search";
import React, { useCallback, useMemo, useRef, useState } from "react";
// import ProjectCard from "@/app/test/newui/components/Card";
import SearchCard from "./searchCradComponents/SearchCard";
// import { createProjectLinkUrl } from "@/app/utils/linkRouters/ProjectLink";
// import { generateListingLinkUrl } from "@/app/utils/linkRouters/ListingLink";
// import { useSetAtom } from "jotai";
// import selectedSearchAtom, { selectedNearByAtom } from "@/app/store/search/map";
import { useSession } from "next-auth/react";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import { preventBackButton } from "@/app/components/molecules/popups/req";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import PopupOverlay from "./searchCradComponents/PopupOverlay";
import { sortUnits } from "@/app/utils/unitparser";
import {
  // handleAgentOwner,
  shearPropOrProj,
} from "./searchCradComponents/searchData";
import { useAtom, useSetAtom } from "jotai";
import selectedSearchAtom from "@/app/store/search/map";
import useProjSearchAppliedFilters from "../../hooks/useProjSearchAppliedFilters";

import {
  diffToProjFromListing,
  initialState,
  projSearchStore,
} from "@/app/(new_routes_seo)/search/store/newListingStore"; // serach/listing
import { useRouter } from "next/navigation";

// import { diffToProjFromListing as diffToProjFromListing_p, initialState as initialState_p, projSearchStore as projSearchStore_p } from "@/app/(new_routes_seo)/search/store/newSearchProjectStore"; // /search
// import { diffToProjFromListing as diffToProjFromListing_l, initialState as initialState_l, projSearchStore as projSearchStore_l } from "@/app/(new_routes_seo)/search/store/newListingStore"; // /search/listing
// import { diffToProjFromListing as diffToProjFromListing_rp, initialState as initialState_rp, projSearchStore as projSearchStore_rp } from "@/app/(new_routes_seo)/search/store/projSearchStore"; // /residential/projects
// import { diffToProjFromListing as diffToProjFromListing_rl, initialState as initialState_rl, projSearchStore as projSearchStore_rl } from "@/app/(new_routes_seo)/search/store/routeListingSore"; // /residential-listings

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
  const [popupState, setPopupState] = useState({
    isOpen: false,
    type: "",
    title: "",
    data: {},
    content: "",
  });

  // const setIsMapLoaded = useSetAtom(searchPageMapToggle);
  // const setNearby = useSetAtom(selectedNearByAtom);
  const setSelected = useSetAtom(selectedSearchAtom);
  const { data: session } = useSession();
  const [, { open: openLogin }] = usePopShortList();
  const [, dispath] = useAtom(projSearchStore);
  const { handleApplyFilters } = useProjSearchAppliedFilters();
  const router = useRouter();

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

  const type = listedBy() ?? "";

  // const onViewMap = (data: any) => {
  //   const {
  //     agentListing,
  //     ownerListing,
  //     projName,
  //     propName,
  //     projIdEnc,
  //     propIdEnc,
  //     propType,
  //     propTypeName,
  //     phaseId,
  //     location,
  //   } = data;

  //   const projOrPropName: string = type === "proj" ? projName : propName;

  //   const lat = location.split(",")[0];
  //   const lang = location.split(",")[1];

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
  // };

  const [, { open }] = useReqCallPopup();

  const handleOpen = (data: any) => {
    const {
      propTypeName,
      postedByName,
      builderId,
      postedById,
      projName,
      bhkName,
      localityName,
      category,
      projIdEnc,
      propIdEnc,
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
          : `${bhkName ?? ""} ${propTypeName} for ${
              category === "Rent" ? "Rent" : "Sale"
            } in ${localityName}`,
    });
  };

  const handleDownload = (data: any) => {
    const { brochureUrl } = data;
    if (session) {
      brochureUrl &&
        router.push(`/pdf/${encodeURIComponent(brochureUrl.split(".net")[1])}`);
    } else {
      openLogin(() => {
        brochureUrl &&
          router.push(
            `/pdf/${encodeURIComponent(brochureUrl.split(".net")[1])}`
          );
      });
    }
  };

  const cardFnsRef = useRef<Record<string, () => void>>({});

  const registerCard = (id: string, fn: () => void) => {
    cardFnsRef.current[id] = fn;
  };

  const handleTabsChange = (value: string | null) => {
    typeof window !== "undefined"
      ? window.scrollTo({ top: 0, behavior: "smooth" })
      : "";
    setSelected(null);

    const updatedFilters =
      value === null
        ? {
            ...state,
            listedBy: null,
            sortByfield: null,
            sortType: null,
            facings: null,
            ...(state.propStatus && {
              projStatus: state.propStatus === "R" ? 107 : 106,
              propStatus: null,
            }),
          }
        : {
            ...state,
            ...Object.fromEntries(
              (
                diffToProjFromListing[
                  value as keyof typeof diffToProjFromListing
                ] ?? []
              ).map((key: any) => [
                key,
                initialState[key as keyof SearchFilter] ?? null,
              ])
            ),
            listedBy: value,
            ...(state.projStatus && {
              propStatus:
                state.projStatus !== 108
                  ? state.projStatus == 106
                    ? "U"
                    : "R"
                  : null,
              projStatus: null,
            }),
          };

    dispath({
      type: "update",
      payload: updatedFilters,
    });

    handleApplyFilters();
  };

  console.log("tab-3");

  const handleClick = (e: any) => {
    const cardEl = e.target.closest('[data-type="card"]');
    if (!cardEl) return;

    const cardId = cardEl.dataset.id;
    const actionButton = e.target.closest("[data-action]");
    const index = cardId ? cardId.split("_")[1] : 0;
    const selectedItem: any = data[index];
    const action = actionButton?.dataset.action;

    switch (action) {
      case "readmore":
        document.body.style.overflow = "hidden";
        setPopupState((prev) => ({
          ...prev,
          isOpen: true,
          type: "readmore",
          title: "Read More",
          data: { ...selectedItem, type: type },
          content: selectedItem.projectAbout ?? selectedItem.usp,
        }));
        break;
      // case 'like':
      //   handleParentAction(index.toString());
      //   break;
      // case "viewMap":
      //   onViewMap(selectedItem);
      //   break;
      case "share":
        shearPropOrProj(selectedItem);
        break;
      case "requestCall":
        handleOpen(selectedItem);
        break;
      case "floorplan":
        document.body.style.overflow = "hidden";
        setPopupState((prev) => ({
          ...prev,
          isOpen: true,
          type: "floorplan",
          title: "Floorplan",
          data: { ...selectedItem, type: type },
          floorplanType: "F",
        }));
        break;
      case "otherCharges":
        setPopupState((prev) => ({
          ...prev,
          isOpen: true,
          type: "otherCharges",
          title: "Other Charges",
          data: { ...selectedItem, type: type },
        }));
        break;
      case "brochure":
        handleDownload(selectedItem);
        break;
      case "nearby":
        document.body.style.overflow = "hidden";
        setPopupState((prev) => ({
          ...prev,
          isOpen: true,
          type: "nearby",
          title: "Near By Locations",
          data: { ...selectedItem, type: type },
        }));
        // onSetNearBy(selectedItem);
        break;
      case "amenities":
        // const amenitiesList = selectedItem?.amenCount?.split(",") ?? [];
        // console.log(amenitiesList);

        document.body.style.overflow = "hidden";
        setPopupState((prev) => ({
          ...prev,
          isOpen: true,
          type: "amenities",
          title: "Amenities",
          data: { ...selectedItem, type: type },
          // content
        }));
        break;
      case "listingType_B":
        handleTabsChange("B");
        break;
      case "listingType_A":
        handleTabsChange("A");
        break;
      case "listingType_O":
        handleTabsChange("I");
        break;
      case "bhk":
        const sortedBhks: any = sortUnits(selectedItem.bhkNames);
        document.body.style.overflow = "hidden";
        setPopupState((prev) => ({
          ...prev,
          isOpen: true,
          type: "bhk",
          title: "Unit Types",
          content: sortedBhks,
          data: { ...selectedItem, type: type },
        }));
        break;
      default:
        {
          router.push(selectedItem.pageUrl);
        }
        break;
    }
  };

  const closePopup = () => {
    document.body.style.overflow = "unset";
    setPopupState((prev) => ({
      ...prev,
      isOpen: false,
      type: "",
      title: "",
      data: {},
    }));
  };

  return (
    <div onClick={handleClick}>
      {/* <SearchCard data={data[0]} index={0}  /> */}
      {popupState.isOpen && (
        <PopupOverlay popupState={popupState} closePopup={closePopup} />
      )}

      {data.map((eachOne: any, index: number) => {
        const sortedBhks: any = sortUnits(eachOne.bhkNames);

        return (
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
        );
      })}
    </div>
  );
}
