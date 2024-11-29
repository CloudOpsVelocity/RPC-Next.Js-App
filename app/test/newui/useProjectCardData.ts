import { useQuery, QueryFunction } from "react-query";

type Props = {
  isOpen: boolean;
  conType: string;
  id: string;
  pType: string;
  lat?: number;
  lang?: number;
};

export default function useProjectCardData({ id, isOpen, conType, pType, lat, lang }: Props) {
  const queryConfig = getQueryConfig(conType, id, isOpen, pType, lat, lang);

  const { data, isLoading } = useQuery({
    queryKey: queryConfig.queryKey,
    queryFn: queryConfig.queryFn,
    enabled: queryConfig.enabled,
  });

  return { data, isLoading };
}

function getQueryConfig(conType: string, id: string, isOpen: boolean, type: string, lat?: number, lang?: number) {
  const idToUse = id.includes('+') ?  id.split('+')[0] : id;
  if (conType === "amenities") {
    return {
      queryKey: [conType + idToUse],
      queryFn: () => getAmenties(idToUse, type),
      enabled: isOpen,
    };
  } else if (conType === "nearby") {
    return {
      queryKey: [conType + idToUse],
      queryFn: () => getNearByLocations(idToUse, type, lat, lang),
      enabled: isOpen,
    };
  }

  return {
    queryKey: [],
    queryFn: async () => null,
    enabled: false,
  };
}

async function getNearByLocations(id: string, type: string, lat?: number, lang?: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/get-nearby?${type == "proj" ? "projIdEnc" : "propIdEnc"}=${id}&iden=${type == "proj" ? "P" : "L"}${lat ? `&lat=${lat}` : ''}${lang ? `&lng=${lang}` : ''}`
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
      }/api/project/get-amenities?projIdEnc=${id}&iden=${type == "proj" ? "P" : "L"}`
    );
    return await res.text();
  } catch (error) {
    console.error("Failed to fetch nearby locations:", error);
    throw error;
  }
}
