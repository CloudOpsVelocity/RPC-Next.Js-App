import { atom, useAtom } from 'jotai';

// Define a generic atom that works with any array of type T
const recentUnitsAtom = atom<any>([]);

// Custom hook to manage recent units with generics
export default function useRecentUnits<T>() {
  const [recentUnits, setRecentUnits] = useAtom<T[]>(recentUnitsAtom);
  // Function to directly set the filtered array of units
  const setFilteredUnits = (units: T[]) => {
    setRecentUnits(units);
  };
  return {
    recentUnits,
    setFilteredUnits,
  };
}
