// import { useState } from "react";
// import Image from "next/image";
// import { FiMapPin } from "react-icons/fi";
// import Link from "next/link";

import NewSearchPage from "../../search/NewSearchPage";
import { getProjSearchData } from "../../in/utils/api";
import { Metadata } from "next";

export default async function Home() {
  const serverData = await getProjSearchData("");
  const pageUrl = `/residential/projects/`;
  return (
    <NewSearchPage
      pageUrl={pageUrl}
      frontendFilters={{}}
      serverData={serverData}
    />
  );
}

export const metadata: Metadata = {
  title: "Residential Projects in Bangalore - Get Right Property",
  description:
    "Explore top residential projects in Bangalore with verified listings, premium amenities, and the best investment opportunities. Find your dream home with Get Right Property.",
};
