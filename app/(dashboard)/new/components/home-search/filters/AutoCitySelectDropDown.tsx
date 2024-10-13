import React from "react";
import { useQuery } from "react-query";

type Props = {};

export default function AutoCitySelectDropDown({}: Props) {
  const getCity = async () => {
    const res = await fetch("/api/get-user-city");
  };
  const { data: DefaultCity } = useQuery({
    queryKey: ["my-location"],
  });
  return <div>AutoCitySelectDropDown</div>;
}
