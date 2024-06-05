import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "next/navigation";
import { BACKEND_BASE_URL } from "@/app/env";

export default function useNearby({
  lat,
  lng,
  projId,
  cg,
  bhkId,
  propType,
}: {
  lat: string;
  lng: string;
  projId?: string;
  cg: string;
  bhkId: number;
  propType: number;
}) {
  const { slug } = useParams<{ slug: string }>();
  const getData = async () => {
    const res = await axios.get(
      `${BACKEND_BASE_URL}/api/v1/fetch/nearbyProperties?lat=${lat}&lng=${lng}&bhkId=${bhkId}&propType=${propType}&cg=${cg.toLowerCase()}&propIdEnc=${slug}${
        projId && `&projIdEnc=${projId}`
      }  `
    );
    return res.data;
  };
  const { isLoading, data } = useQuery({
    queryKey: [`nearby` + projId + slug + cg],
    queryFn: getData,
  });
  return { isLoading, data };
}
