import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
type Prosp = {
  projectId: string;
};
export default function useRatings({ projectId }: Prosp) {
  const getProjRatings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-actions/get-proj-review?projIdEnc=${projectId}`
      );
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: [`rating/${projectId}`],
    queryFn: getProjRatings,
    keepPreviousData: true,
    staleTime: 30000,
    cacheTime: 300000,
  });
  return { data, isLoading };
}
