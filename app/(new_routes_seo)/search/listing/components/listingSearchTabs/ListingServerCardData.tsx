import { SearchFilter } from "@/app/types/search";
import React from "react";
import ProjectCard from "@/app/test/newui/components/Card";
type Props = {
  data: any;
  refetch: any;
  mutate: any;
  state: SearchFilter;
};

export default function ListingServerCardData({
  data,
  mutate,
  refetch,
  state,
}: Props) {
  return data.map((eachOne: any, index: number) => {
    return (
      <ProjectCard
        key={eachOne.projIdEnc + eachOne.propType}
        refetch={refetch}
        data={{ ...eachOne, type: state.listedBy ?? "B" }}
        index={index}
        mutate={mutate}
      />
    );
  });
}
