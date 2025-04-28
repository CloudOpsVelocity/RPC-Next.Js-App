import React, { memo } from "react";
import ProjectFilters from "./ProjectHeaderFilter";

type Props = {
  isListing?: boolean;
};

function ProjSearchMainFilterSection({ isListing }: Props) {
  return (
    <div className="flex flex-row items-start gap-2">
      <ProjectFilters isListing={isListing} />
    </div>
  );
}

export default memo(ProjSearchMainFilterSection);
