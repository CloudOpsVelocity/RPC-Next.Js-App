import { atom, useAtom } from 'jotai';

// Define a generic atom that works with any array of type T
const recentUnitsAtom = atom<any[]>([]);

// Custom hook to manage recent units with generics
export default function useRecentUnits<T>() {
  const [recentUnits, setRecentUnits] = useAtom<T[]>(recentUnitsAtom);

  const setPreviousFilers = (unit: T) => {
    // Check if the recentUnits array already has 5 units
    if (recentUnits.length >= 5) {
      // Remove the last unit and add the new unit at the front
      setRecentUnits((prev) => [...prev.slice(1), unit]);
    } else {
      // Add the new unit without removing any units
      setRecentUnits((prev) => [...prev, unit]);
    }
  };

  console.log(recentUnits);
  return {
    recentUnits,
    setPreviousFilers,
  };
}
