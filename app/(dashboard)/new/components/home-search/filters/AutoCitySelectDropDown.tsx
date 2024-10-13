import { SearchLocationIcon } from "@/app/images/commonSvgs";
import { Loader, Select } from "@mantine/core";
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
  return (
    <Select
      disabled={isLoading}
      data={["Bengaluru", "Angular", "Vue", "Svelte"]}
      placeholder="Pick value"
      defaultValue={DefaultCity?.data?.city}
      value={DefaultCity?.data?.city}
      searchable
      rightSection={isLoading ? <Loader size="xs" /> : <SearchLocationIcon />}
    />
  );
}
