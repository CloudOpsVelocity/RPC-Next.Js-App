import { getAmenties } from "@/app/utils/api/project";
import { useQuery, QueryFunction } from "react-query";

type Props = {
  isOpen: boolean;
  conType: string;
  id: string;
};

export default function useProjectCardData({ id, isOpen, conType }: Props) {
  const queryConfig = getQueryConfig(conType, id, isOpen);

  const { data, isLoading } = useQuery({
    queryKey: queryConfig.queryKey,
    queryFn: queryConfig.queryFn,
    enabled: queryConfig.enabled,
  });

  return { data, isLoading };
}

function getQueryConfig(conType: string, id: string, isOpen: boolean) {
  if (conType === "amenities") {
    return {
      queryKey: [id],
      queryFn: getAmenties as QueryFunction<any>,
      enabled: isOpen,
    };
  } else if (conType === "nearby") {
    return {
      queryKey: [id],
      queryFn: () => getNearByLocations(id),
      enabled: isOpen,
    };
  }

  return {
    queryKey: [],
    queryFn: async () => null,
    enabled: false,
  };
}

async function getNearByLocations(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/get-nearby?projIdEnc=${id}`
    );
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch nearby locations:", error);
    throw error;
  }
}
