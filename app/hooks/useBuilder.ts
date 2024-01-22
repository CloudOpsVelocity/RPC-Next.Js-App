import React from "react";
import { useQuery } from "react-query";
import { getBuilderDetails } from "../utils/api/builder";
type Props = {
  id: number | string;
  y: string;
};
export default function useBuilder({ id, y }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: [`builder/${id}&isBuilderPage=${y}`],
    queryFn: () => getBuilderDetails(id, y),
    keepPreviousData: true,
    staleTime: 30000,
    cacheTime: 300000,
  });
  return { data, isLoading };
}
