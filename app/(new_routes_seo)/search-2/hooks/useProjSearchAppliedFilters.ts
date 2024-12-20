import { useAtom, useSetAtom } from "jotai";
import { ProjSearchAppliedFiltersStore } from "../store/projSearchStore";

type Props = {};

export default function useProjSearchAppliedFilters() {
  const setAppliedFilters = useSetAtom(ProjSearchAppliedFiltersStore);
  const handleApplyFilters = () => {
    setAppliedFilters(() => console.log("hello"));
  };
  return { handleApplyFilters };
}
