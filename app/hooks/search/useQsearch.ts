import { useDebouncedValue } from "@mantine/hooks";
import { useQueryState } from "nuqs";
import React from "react";
import { useQuery } from "react-query";

export default function useQsearch() {
  const [name, setName] = useQueryState("q");
  const [debounced] = useDebouncedValue(name, 500);
  const getData = async () => {
    // let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/matcher?word=${debounced}`;

    // const res = await fetch(url);
    // const responseData = await res.json();

    // return responseData;
    return {
      loc: [
        {
          name: "nagawara",
          id: 12,
          type: "L",
        },
        {
          name: "marathalli",
          id: 11,
          type: "L",
        },
        {
          name: "hsr Layout",
          id: 13,
          type: "L",
        },
        {
          name: "H locality 1",
          id: 22,
          type: "L",
        },
      ],
      builders: [
        {
          name: "Sivaprasad",
          id: 3,
          type: "B",
        },
        {
          name: "Rare Infracon",
          id: 7,
          type: "B",
        },
        {
          name: "Prestige Estates Projects Ltd.",
          id: 9,
          type: "B",
        },
        {
          name: "Mohan Builders",
          id: 6,
          type: "B",
        },
        {
          name: "manish",
          id: 2,
          type: "B",
        },
        {
          name: "kushwah builder",
          id: 1,
          type: "B",
        },
        {
          name: "Goyal and Co and Hariyana Group",
          id: 36,
          type: "B",
        },
        {
          name: "DS-MAX Properties Pvt. Ltd",
          id: 44,
          type: "B",
        },
      ],
      projects: [
        {
          name: "Jackson Green Lands",
          id: 90,
          type: "P",
        },
        {
          name: "Project Sumadhuura",
          id: 76,
          type: "P",
        },
        {
          name: "Project ds max",
          id: 63,
          type: "P",
        },
        {
          name: "Plot price range testing",
          id: 52,
          type: "P",
        },
        {
          name: "Project name 001",
          id: 44,
          type: "P",
        },
        {
          name: "Testing sample",
          id: 41,
          type: "P",
        },
        {
          name: "GODREJ AQUA",
          id: 37,
          type: "P",
        },
        {
          name: "GODREJ AQUA",
          id: 35,
          type: "P",
        },
      ],
      cities: [
        {
          name: "manglore",
          id: 14,
          type: "C",
        },
        {
          name: "mandya",
          id: 18,
          type: "C",
        },
        {
          name: "Hyderabad West",
          id: 27,
          type: "C",
        },
        {
          name: "Hyderabad south",
          id: 25,
          type: "C",
        },
        {
          name: "Hyderabad north",
          id: 24,
          type: "C",
        },
        {
          name: "Hyderabad East",
          id: 26,
          type: "C",
        },
        {
          name: "Hyderabad",
          id: 21,
          type: "C",
        },
        {
          name: "dawangiri",
          id: 17,
          type: "C",
        },
      ],
    };
  };

  const { data, isLoading } = useQuery({
    queryKey: ["search" + debounced],
    queryFn: () => getData(),
    enabled: !!debounced,
  });
  const onSearchChange = (value: string) => {
    !value ? setName(null) : setName(value);
  };
  const handleResetQuery = () => {
    setName(null);
    onSearchChange("");
  };
  return { data, isLoading, onSearchChange, debounced, name, handleResetQuery };
}
