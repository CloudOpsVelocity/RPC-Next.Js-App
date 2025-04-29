import { SearchFilter } from "@/app/types/search";
import React from "react";
import ProjectCard from "@/app/test/newui/components/Card";
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
  return data.map((eachOne: any, index: number) => {
    return (
      <ProjectCard
        key={eachOne.projIdEnc + eachOne.propType + index}
        refetch={refetch}
        data={{
          ...eachOne,
          type:
            typeof window === "undefined"
              ? frontendFilters?.listedBy ?? "B"
              : state.listedBy ?? "B",
          cg: typeof window === "undefined" ? frontendFilters?.cg : state.cg,
        }}
        index={index}
        mutate={mutate}
      />
    );
  });
}
