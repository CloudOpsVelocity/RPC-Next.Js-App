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

const marks = [
  { value: 0.05, label: "₹ 5L" },
  { value: 0.3, label: "₹ 30L" },
  { value: 0.55, label: "₹ 55L" },
  { value: 0.85, label: "₹ 85L" },
  { value: 10.5, label: "₹ 10.5Cr" },
  { value: 35.5, label: "₹ 35.5Cr" },
  { value: 60, label: "₹ 60Cr" },
];

function Demo1() {
  return (
    <>
      <Slider
        step={0.05}
        min={0.05}
        max={60}
        marks={marks}
        labelAlwaysOn
        defaultValue={0.85}
      />
      <RangeSlider
        mt={50}
        step={0.05}
        min={0.05}
        max={60}
        marks={marks}
        labelAlwaysOn
        defaultValue={[0.85, 10.5]}
      />
    </>
  );
}
