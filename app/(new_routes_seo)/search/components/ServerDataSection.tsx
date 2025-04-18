import dynamic from "next/dynamic";

const ProjectCard = dynamic(() => import("@/app/test/newui/components/Card"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});
import { SearchFilter } from "@/app/types/search";
import React from "react";

type Props = {
  data: any;
  refetch: any;
  mutate: any;
  state: SearchFilter;
};

export default function ServerDataSection({
  data,
  refetch,
  mutate,
  state,
}: Props) {
  return data.map((eachOne: any, index: number) => {
    return (
      <ProjectCard
        key={eachOne.projIdEnc + eachOne.propType + index}
        refetch={refetch}
        data={{ ...eachOne, type: state.listedBy ?? "proj" }}
        index={index}
        mutate={mutate}
      />
    );
  });
}
