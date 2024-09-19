"use client";
import { Paper, RangeSlider, Slider } from "@mantine/core";

function Demo() {
  return (
    <Paper>
      <Demo1 />
    </Paper>
  );
}

export default Demo;

function mapPropTypeToKey(propType: string): string {
  switch (propType) {
    case "apt":
      return "apartment";
    case "rowHouse":
      return "rowhouse";
    case "villa":
      return "villa";
    case "vlmt":
      return "villament";
    case "plot":
      return "plot";
    default:
      return "unknown";
  }
}

function Demo1() {
  const gifts = ["tren", "oso", "pelota"];
  const materials = "tronesa";
  function manufacture(gifts: string[], materials: string) {
    // Code here
    return [];
  }

  manufacture(gifts, materials);
  return <>df</>;
}
