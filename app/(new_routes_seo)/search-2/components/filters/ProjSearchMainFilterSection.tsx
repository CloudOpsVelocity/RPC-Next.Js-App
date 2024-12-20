import SearchCitySelectDropdown from "@/app/(dashboard)/search/components/_ui/CityDropDown/SearchCitySelectDropdown";
import React, { memo } from "react";
import ProjectFilters from "./ProjectHeaderFilter";

type Props = {};

function ProjSearchMainFilterSection({}: Props) {
  return (
    <div className="flex flex-row items-start gap-2">
      <SearchCitySelectDropdown />
      <ProjectFilters />
    </div>
  );
}

export default memo(ProjSearchMainFilterSection);
