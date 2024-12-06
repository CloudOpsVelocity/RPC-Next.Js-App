"use client";

import { createTheme } from "@mantine/core";
import { Montserrat, Playball } from "next/font/google";
const montserrat = Montserrat({
  subsets: ['latin'], // Specify the subset you need
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'], // Include all weights for Montserrat
  display: 'swap', // Same as the `display=swap` in Google Fonts
});


const Mantine = createTheme({
  fontFamily: montserrat.style.fontFamily,
  fontFamilyMonospace: montserrat.style.fontFamily,
  headings: { fontFamily: montserrat.style.fontFamily },
  cursorType: "pointer",
  colors: {
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
