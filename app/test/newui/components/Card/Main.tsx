/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import { Search } from "@/app/validations/types/search";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { useSession } from "next-auth/react";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import LeftSection from "./Top/LeftSection";
import CenterTop from "./Top/Center";
import CardDownSection from "./Down";
import TopRightSection from "./Top/Right";
import { useMediaQuery } from "@mantine/hooks";

type Props = {
  type: any;
} & Search &
  any;

const MainBox = ({ data, refetch }: Props) => {
  const {
    type,
    projName,
    coverUrl,
    projIdEnc,
    coverImage,
    bhkName,
    propTypeName,
    localityName,
    propIdEnc,
    rerastatus,
    compareAdded,
    shortListed,
  } = data;
  const [state, setState] = useState({
    compareAdded: compareAdded === "Y" ? true : false,
    shortListed: shortListed === "Y" ? true : false,
  });
  const { data: session } = useSession();
  const [, { open: openLogin }] = usePopShortList();
  const { toggleShortlist, toggleCompare } = useShortlistAndCompare();
  const reqId = type === "proj" ? projIdEnc : propIdEnc;

  const onAddingShortList = () => {
    if (session) {
      setState({ ...state, shortListed: !state.shortListed });
      toggleShortlist({
        id: reqId,
        status: state.shortListed ? "N" : "Y",
        source: type,
      });
    } else {
      openLogin(() => refetch());
    }
  };

  const onAddingCompare = () => {
    if (session) {
      setState({ ...state, compareAdded: !state.compareAdded });
      toggleCompare({
        id: reqId,
        status: state.compareAdded ? "N" : "Y",
        source: type,
      });
    } else {
      openLogin(() => refetch());
    }
  };
  const newData = {
    ...data,
    Com: state.compareAdded,
    Sh: state.shortListed,
  };
  const onClickRedirect = (projEncId: string) => {
    if (data.type == "proj") {
      window.open(`/abc/karnataka/banglore/${projEncId}`, "_blank");
    } else {
      window.open(`/listing/banglore/${projEncId}`, "_blank");
    }
  };
  const [, { open }] = useReqCallPopup();
  const handleOpen = () => {
    open({
      modal_type:
        type === "proj" ? "PROJECT_REQ_CALLBACK" : "PROPERTY_REQ_CALLBACK",
      postedByName: type === "proj" ? data.builderName : data.postedBy,
      postedId: data.builderId,
      reqId: reqId,
      source: type === "proj" ? "projCard" : "propCard",
      title:
        type === "proj"
          ? projName
          : `${bhkName ?? ""} ${propTypeName} for
      ${data.cg === "R" ? "Rent" : "Sell"} in ${localityName}`,
    });
  };
  const isMobile = useMediaQuery("(max-width: 1600px)");

  return (
    <div className="h-auto max-w-full xl:w-[98%] m-[1%] self-stretch rounded border-2 shadow-[0px_4px_30px_0px_rgba(74,82,113,0.20)]  border-solid border-[#A4B8D4]">
      <div
        onClick={() => onClickRedirect(reqId)}
        className={
          "flex flex-col xl:flex-row justify-start w-full  xl:max-w-full relative"
        }
      >
        <LeftSection
          src={coverUrl ?? coverImage}
          rera={rerastatus}
          projstatus={data.projstatus}
          onAddingCompare={onAddingCompare}
          isCompared={state.compareAdded}
          openReqCallback={handleOpen}
          type={type}
          possassionDate={data.possassionDate}
          furnish={data.furnish}
        />
        {isMobile && (
          <div className="flex   flex-col  justify-between relative">
            <TopRightSection
              data={newData}
              type={type}
              {...newData}
              onAddingCompare={onAddingCompare}
              onAddingShortList={onAddingShortList}
            />
            <CenterTop data={newData} type={type} />
          </div>
        )}
        {!isMobile && (
          <>
            <CenterTop data={newData} type={type} />
            <TopRightSection
              data={newData}
              type={type}
              {...newData}
              onAddingCompare={onAddingCompare}
              onAddingShortList={onAddingShortList}
            />
          </>
        )}
      </div>
      <CardDownSection
        a={data.agentListing}
        o={data.ownerListing}
        B={data.builderListing}
        type={type}
        reqId={reqId}
        {...data}
        onAddingCompare={onAddingCompare}
        isCompared={state.compareAdded}
        handleOpen={handleOpen}
      />
    </div>
  );
};

export default MainBox;
