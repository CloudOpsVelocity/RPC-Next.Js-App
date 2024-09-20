import { useQuery, QueryFunction } from "react-query";

type Props = {
  isOpen: boolean;
  conType: string;
  id: string;
  pType: string;
};

export default function useProjectCardData({ id, isOpen, conType, pType }: Props) {
  const queryConfig = getQueryConfig(conType, id, isOpen, pType);

  const { data, isLoading } = useQuery({
    queryKey: queryConfig.queryKey,
    queryFn: queryConfig.queryFn,
    enabled: queryConfig.enabled,
  });

  return { data, isLoading };
}

function getQueryConfig(conType: string, id: string, isOpen: boolean, type: string) {
  if (conType === "amenities") {
    return {
      queryKey: [conType + id],
      queryFn: () => getAmenties(id, type),
      enabled: isOpen,
    };
  } else if (conType === "nearby") {
    return {
      queryKey: [conType + id],
      queryFn: () => getNearByLocations(id, type),
      enabled: isOpen,
    };
  }

  return {
    queryKey: [],
    queryFn: async () => null,
    enabled: false,
  };
}

async function getNearByLocations(id: string, type: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/get-nearby?projIdEnc=${id}&iden=${type == "proj" ? "P" : "L"}`
    );
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch nearby locations:", error);
    throw error;
  }
}
async function getAmenties(id: string, type: string) {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/api/project/get-amenities?projIdEnc=${id.split("+")[0]}&iden=${type == "proj" ? "P" : "L"}`
    );
    return await res.text();
  } catch (error) {
    console.error("Failed to fetch nearby locations:", error);
    throw error;
  }
}
