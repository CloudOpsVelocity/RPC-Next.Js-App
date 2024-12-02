import { useQuery, QueryFunction } from "react-query";

type Props = {
  isOpen: boolean;
  conType: string;
  id: string;
  pType: string;
  lat?: number;
  lang?: number;
  propId?: string;
};

export default function useProjectCardData({ id, isOpen, conType, pType, lat, lang,propId }: Props) {
  const queryConfig = getQueryConfig(conType, id, isOpen, pType, lat, lang,propId);

  const { data, isLoading } = useQuery({
    queryKey: queryConfig.queryKey,
    queryFn: queryConfig.queryFn,
    enabled: queryConfig.enabled,
  });

  return { data, isLoading };
}

function getQueryConfig(conType: string, id: string, isOpen: boolean, type: string, lat?: number, lang?: number,propId?: string) {
  const idToUse = id.includes('+') ?  id.split('+')[0] : id;
  if (conType === "amenities") {
    return {
      queryKey: [conType + idToUse],
      queryFn: () => getAmenties(idToUse, type,propId),
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
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}`
    if(type === 'proj'){
      url += `/api/project/get-nearby?projIdEnc=${id}&iden=P&lat=${lat}&lng=${lang}`
    }else{
      url += `/api/v1/fetch/get-nearby?propIdEnc=${id}&iden=L&lat=${lat}&lng=${lang}`
    }
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch nearby locations:", error);
    throw error;
  }
}

async function getAmenties(id: string, type: string,propId?: string) {

  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/api/project/get-amenities?projIdEnc=${propId ?? id}&iden=${type == "proj" ? "P" : "L"}`
    );
    return await res.text();
  } catch (error) {
    console.error("Failed to fetch nearby locations:", error);
    throw error;
  }
}
