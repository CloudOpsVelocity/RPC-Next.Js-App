import { useAtom, useSetAtom } from "jotai";
import { ProjSearchAppliedFiltersStore } from "../store/projSearchStore";
import { useQueryState } from "nuqs";
import parseProjectSearchQueryParams from "../utils/parse-project-searchqueryParams";

type Props = {};

export default function useProjSearchAppliedFilters() {
  const setAppliedFilters = useSetAtom(ProjSearchAppliedFiltersStore);
  const [name, setName] = useQueryState("sf");
  const handleApplyFilters = () => {
    setAppliedFilters(setName, "add");
  };
  const handleClearFilters = (
    type: "clearAll" | "bhk" | "area" | "budget" | "unitType"
  ) => {
    switch (type) {
      case "clearAll":
        setAppliedFilters(null, "clear");
        break;
      case "bhk":
        setAppliedFilters(null, "clear");
        break;
    }
  };
  return { handleApplyFilters, handleClearFilters };
}
