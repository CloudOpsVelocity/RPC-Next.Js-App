import { SearchFilter } from "@/app/types/search";
import React, { useMemo } from "react";
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
  const listedBy = useMemo(() => {
    return typeof window === "undefined"
      ? frontendFilters?.listedBy ?? "B"
      : state.listedBy ?? "B";
  }, [frontendFilters?.listedBy, state.listedBy]);

  const cg = useMemo(() => {
    return typeof window === "undefined" ? frontendFilters?.cg : state.cg;
  }, [frontendFilters?.cg, state.cg]);

  return data.map((eachOne: any, index: number) => (
    <ProjectCard
      key={eachOne.projIdEnc + eachOne.propType + index}
      refetch={refetch}
      data={{
        ...eachOne,
        type: listedBy,
        cg: cg,
      }}
      index={index}
      mutate={mutate}
    />
  ));
}
