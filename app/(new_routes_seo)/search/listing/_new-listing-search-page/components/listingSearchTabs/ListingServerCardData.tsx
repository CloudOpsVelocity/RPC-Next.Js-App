import { SearchFilter } from "@/app/types/search";
import React, { useCallback, useMemo } from "react";
// import ProjectCard from "@/app/test/newui/components/Card";
import SearchCard from "./searchCradComponents/SearchCard";

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
      return frontendFilters.listedBy;
    }
    return state.listedBy === frontendFilters.listedBy
      ? frontendFilters.listedBy
      : state.listedBy;
  }, [state, frontendFilters]);

  const handleClick = (e: any) => {
    const cardEl = e.target.closest('[data-type="card"]');
    if (!cardEl) return;
  
    const cardId = cardEl.dataset.id;
    const actionButton = e.target.closest('[data-action]');
    const index = cardId ? cardId.split("_")[1] : 0;
    const selectedItem = data[index];
    console.log(index, selectedItem);
    // if (cardId){ console.log('Clicked card ID:', cardId)}
  
    const action = actionButton?.dataset.action;
  
    if (action === 'readMore') {
      // console.log('Read More card:', cardId);
      
    } else if (action === 'like') {
      console.log('Like card:', cardId);
    } else if (action === 'share') {
      console.log('Share card:', cardId);
    } 
    else {
      console.log('Card clicked:', cardId);
    }
  };

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
