import SearchCitySelectDropdown from "@/app/(dashboard)/search/components/_ui/CityDropDown/SearchCitySelectDropdown";
import React, { memo } from "react";
import ProjectFilters from "./ProjectHeaderFilter";

type Props = {};

function ProjSearchMainFilterSection({}: Props) {
  return (
    <div>
      <SearchCitySelectDropdown />
      <ProjectFilters />
    </div>
  );
}

export default memo(ProjSearchMainFilterSection);
