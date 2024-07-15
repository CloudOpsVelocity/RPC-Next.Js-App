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

  useEffect(() => {
    console.log("manish ");
  }, [entry?.isIntersecting]);
  return (
    <Paper>
      <Button onClick={() => cacheHeavyFn(20)}>CACHE RUN</Button>
      <Box pt={260} pb={280}>
        <Paper
          ref={ref}
          p="xl"
          style={{
            backgroundColor: entry?.isIntersecting
              ? "var(--mantine-color-teal-7)"
              : "var(--mantine-color-red-7)",
            minWidth: "50%",
          }}
        >
          <Text c="#fff" fw={700}>
            {entry?.isIntersecting ? "Fully visible" : "Obscured"}
          </Text>
        </Paper>
      </Box>
    </Paper>
  );
}

export default Demo;
