import React from "react";
import { useQuery } from "react-query";
import { getBuilderDetails } from "../utils/api/builder";
type Props = {
  id: number | string;
};
export default function useBuilder({ id }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: [`builder/${id}`],
    queryFn: () => getBuilderDetails(id),
  });
  return { data, isLoading };
}
