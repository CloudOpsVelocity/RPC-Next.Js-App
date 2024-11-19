import { atom, useAtom } from 'jotai';

// Define a generic atom that works with any array of type T
const recentUnitsAtom = atom<any[]>([]);

// Custom hook to manage recent units with generics
export default function useRecentUnits<T extends Record<string, any>>() {
  const [recentUnits, setRecentUnits] = useAtom<T[]>(recentUnitsAtom);

  const setPreviousFilters = (unit: T) => {
    // Check if the new unit already exists in the array by comparing each value, including null
    const isExisting = recentUnits.some((existingUnit) =>
      Object.keys(unit).every((key) => existingUnit[key] === unit[key])
    );

    if (isExisting) return; // Skip adding if the unit already exists

    // Check if the recentUnits array already has 5 units
    if (recentUnits.length >= 5) {
      // Remove the last unit and add the new unit at the front
      setRecentUnits((prev) => [unit, ...prev.slice(0, 4)]);
    } else {
      // Add the new unit without removing any units
      setRecentUnits((prev) => [unit, ...prev]);
    }
  };

  return {
    recentUnits,
    setPreviousFilers:setPreviousFilters,
  };
}
