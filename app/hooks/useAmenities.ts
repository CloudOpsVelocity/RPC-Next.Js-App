import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

export default function useAmenities() {
  const getAmenties = async () => {
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/projAmenities`
    );
    return data.data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["amenities"],
    queryFn: getAmenties,
  });
  return { data, isLoading, error };
}
