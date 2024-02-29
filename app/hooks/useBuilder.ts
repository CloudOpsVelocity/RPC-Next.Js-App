import React from "react";
import { useQuery } from "react-query";
import { getBuilderDetails } from "../utils/api/builder";
import { useParams, usePathname } from "next/navigation";
type Props = {
  id: number | string;
  y: string;
  type?: "prop" | "proj";
};
export default function useBuilder({ id, y, type = "proj" }: Props) {
  const path = usePathname();
  const { data, isLoading } = useQuery({
    queryKey: [`builder/${id}&isBuilderPage=${y}` + type],
    queryFn: () => getBuilderDetails(id, y, type),
    keepPreviousData: true,
    staleTime: 30000,
    cacheTime: 300000,
    enabled: path !== "/search",
  });
  return { data, isLoading };
}
