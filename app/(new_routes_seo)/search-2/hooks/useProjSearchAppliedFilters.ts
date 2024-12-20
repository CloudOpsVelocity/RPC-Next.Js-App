import { useAtom, useSetAtom } from "jotai";
import { ProjSearchAppliedFiltersStore } from "../store/projSearchStore";
import { useQueryState } from "nuqs";

type Props = {};

export default function useProjSearchAppliedFilters() {
  const setAppliedFilters = useSetAtom(ProjSearchAppliedFiltersStore);
  const [name, setName] = useQueryState("sf");
  const handleApplyFilters = () => {
    setAppliedFilters((params: any) => {
      setName(params);
    });
  };
  return { handleApplyFilters };
}
