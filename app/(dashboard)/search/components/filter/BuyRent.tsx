import { DropDownIcon } from "@/app/images/commonSvgs";
import { Select } from "@mantine/core";
import React from "react";
import classes from "@/app/styles/search.module.css";
import useSearchFilters from "@/app/hooks/search";
export default function BuyRent() {
  const { filters, setSingleType, handleAppliedFilters, params } = useSearchFilters();
  const handleChnage = (value: string) => {
    setSingleType("cg", value);
    handleAppliedFilters();
  };
  return (
    <Select
      label=""
      placeholder="Select"
      data={[
        { label: "Buy", value: "S" },
        { label: "Rent", value: "R" },
      ]}
      classNames={{ input: classes.wrapperSelect }}
      defaultValue={"S"}
      rightSection={<DropDownIcon />}
      size="xs"
      value={params.cg == "R" ? "R" : "S"}
      onChange={(e) => handleChnage(e ?? "S")}
    />
  );
}
