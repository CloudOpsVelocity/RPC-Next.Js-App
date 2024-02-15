import axios from "axios";
import React from "react";
import { BACKEND_BASE_URL } from "../env";
import { useQuery } from "react-query";
import { useParams } from "next/navigation";

export default function useNearby({ lat, lng }: { lat: string; lng: string }) {
  const { slug } = useParams<{ slug: string }>();
  const getData = async () => {
    const res = await axios.get(
      `${BACKEND_BASE_URL}/api/project/nearbyProjects?lat=${lat}&lng=${lng}&projIdEnc=${slug}`
    );
    return res.data;
  };
  const { isLoading, data } = useQuery({
    queryKey: "nearby",
    queryFn: getData,
  });
  return { isLoading, data };
}
