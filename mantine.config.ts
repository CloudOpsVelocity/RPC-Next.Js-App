"use client";

import { createTheme } from "@mantine/core";

const Mantine = createTheme({
  fontFamily: "Josefin Sans, sans-serif",
  fontFamilyMonospace: "Monaco, Courier, monospace",
  headings: { fontFamily: "Gabarito, sans-serif" },
  cursorType: "pointer",
  colors: {
    // Add your color
    themeBlue: [
      "#0073C6",
      "#0073C6",
      "#0073C6",
      "#0073C6",
      "#0073C6",
      "#0073C6",
      "#0073C6",
      "#0073C6",
      "#0073C6",
      "#0073C6",
    ],
  },
});

export default Mantine;
