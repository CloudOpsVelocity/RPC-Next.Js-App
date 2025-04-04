import ProjectCard from "@/app/test/newui/components/Card";
import React from "react";

type Props = {
  data: any;
  refetch: any;
  mutate: any;
};

export default function ServerDataSection({ data, refetch, mutate }: Props) {
  return data.map((eachOne: any, index: number) => {
    return (
      <ProjectCard
        key={eachOne.projIdEnc + eachOne.propType}
        refetch={refetch}
        data={{ ...eachOne, type: "proj" }}
        index={index}
        mutate={mutate}
      />
    );
  });
}
