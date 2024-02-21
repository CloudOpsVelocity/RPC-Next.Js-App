import React from "react";
import { useQuery } from "react-query";
import { getBuilderDetails } from "../utils/api/builder";
import { useParams, usePathname } from "next/navigation";
type Props = {
  id: number | string;
  y: string;
};
export default function useBuilder({ id, y }: Props) {
  const path = usePathname();
  const { data, isLoading } = useQuery({
    queryKey: [`builder/${id}&isBuilderPage=${y}`],
    queryFn: () => getBuilderDetails(id, y),
    keepPreviousData: true,
    staleTime: 30000,
    cacheTime: 300000,
    enabled: path !== "/search",
  });
  return { data, isLoading };
}
