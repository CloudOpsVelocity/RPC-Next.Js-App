import React from "react";
import { useQuery } from "react-query";

type Props = {};

export default function AutoCitySelectDropDown({}: Props) {
  const getCity = async () => {
    const res = await fetch("/api/get-user-city");
    const data = await res.json();
    return data;
  };
  const { data: DefaultCity, isLoading } = useQuery({
    queryKey: ["my-location"],
    queryFn: getCity,
  });
  return <div>{isLoading ? "loading.." : JSON.stringify(DefaultCity)}</div>;
}
