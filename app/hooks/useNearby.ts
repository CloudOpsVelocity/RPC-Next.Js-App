import axios from "axios";
import React from "react";
import { BACKEND_BASE_URL } from "../env";
import { useQuery } from "react-query";

export default function useNearby() {
  const getData = async () => {
    const res = await axios.get(
      `${BACKEND_BASE_URL}/api/project/nearbyProjects?lat=12.956924&lng=77.701127&projIdEnc=2abe363e093100b56f77f632cc731c10`
    );
    return res.data;
  };
  const { isLoading, data } = useQuery({
    queryKey: "nearby",
    queryFn: getData,
  });
  return { isLoading, data };
}
