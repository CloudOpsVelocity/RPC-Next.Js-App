import React from "react";
import MainHeading from "../heading";
import ListBox from "./ListBox";

type Props = {};

export default function TopLocalities({}: Props) {
  return (
    <div className="mt-[80px] w-[90%] m-auto">
      <MainHeading
        title={"Top Localities"}
        content={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. "}
      />
      <ListBox />
    </div>
  );
}
