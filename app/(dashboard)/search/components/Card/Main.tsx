import React from "react";
import Button from "@/app/elements/button";
import { GradientLocation, Phone, ReraIcon } from "@/app/images/commonSvgs";
import { Search } from "@/app/validations/types/search";
import { formatDateDDMMYYYY } from "@/app/utils/date";
import Image from "next/image";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { useSession } from "next-auth/react";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import { formatCurrency } from "@/app/utils/numbers";
import { useSetAtom } from "jotai";
import selectedSearchAtom from "@/app/store/search/map";
import { calculatePerSqPrice } from "@/app/utils/price";
import LeftSection from "./Top/LeftSection";
import CenterTop from "./Top/Center";
import CardDownSection from "./Down";
import TopRightSection from "./Top/Right";

type Props = {
  type: any;
} & Search &
  any;

const MainBox = ({ data, refetch }: Props) => {
  const {
    type,
    projName,
    minPrice,
    maxPrice,
    launchDate,
    possassionDate,
    agentListing,
    ownerListing,
    coverUrl,
    postedDate,
    projIdEnc,
    propTypes,
    lat = 22.176912,
    lang = 75.66009,
    availableFrom,
    coverImage,
    ca,
    sba,
    propName,
    bhkName,
    propTypeName,
    category,
    localityName,
    price,
    propStatus,
    propIdEnc,
    pa,
    projstatus,
    rerastatus,
    compareAdded,
    shortListed,
  } = data;
  const { data: session } = useSession();
  const [, { open: openLogin }] = usePopShortList();
  const { toggleShortlist, shortlistedItems, compareItems, toggleCompare } =
    useShortlistAndCompare();
  const reqId = type === "proj" ? projIdEnc : propIdEnc;

  const onAddingShortList = () => {
    if (session) {
      toggleShortlist({
        id: reqId,
        status: compareAdded == "Y" ? "N" : "Y",
        source: type,
      });
    } else {
      openLogin(() => refetch());
    }
  };

  const onAddingCompare = () => {
    if (session) {
      toggleCompare({
        id: reqId,
        status: shortListed == "Y" ? "N" : "Y",
        source: type,
      });
    } else {
      openLogin(() => refetch());
    }
  };

  return (
    <div className="h-[259px] self-stretch rounded border shadow-[0px_4px_30px_0px_rgba(74,82,113,0.20)] border-solid border-[#A4B8D4]">
      <div className="flex justify-between">
        <LeftSection src={coverUrl ?? coverImage} rera={rerastatus} />
        <CenterTop data={data} onAddingShortList={onAddingShortList} />
        <TopRightSection {...data} onAddingCompare={onAddingCompare} />
      </div>
      <CardDownSection
        a={data.agentListing}
        o={data.ownerListing}
        type={type}
        reqId={reqId}
      />
    </div>
  );
};

export default MainBox;
function getTypeText(type: string) {
  let text;

  if (type === "proj") {
    text = "Builder";
  } else if (type === "I") {
    text = "Owner";
  } else if (type === "A") {
    text = "Agent";
  } else {
    text = "Unknown";
  }

  return text;
}
