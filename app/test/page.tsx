"use client";
import { useCallback, useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { Text, Paper, Box, Button } from "@mantine/core";

function Demo() {
  const heavyCalcFn = (num: number) => {
    alert(num * 100000);
  };
  const cacheHeavyFn = useCallback(heavyCalcFn, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });
  let obj = {
    name: "John",
    age: 30,
  };

  return (
    <Paper>
      <Demo1 />
    </Paper>
  );
}

export default Demo;

import { RangeSlider, Slider } from "@mantine/core";

function valueLabelFormat(value: number) {
  const units = ["KB", "MB", "GB", "TB"];

  let unitIndex = 0;
  let scaledValue = value;

  while (scaledValue >= 1024 && unitIndex < units.length - 1) {
    unitIndex += 1;
    scaledValue /= 1024;
  }

  return `${scaledValue} ${units[unitIndex]}`;
}

const getScale = (v: number) => 2 ** v;

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
