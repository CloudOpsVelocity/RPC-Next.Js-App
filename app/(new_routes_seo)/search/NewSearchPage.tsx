import React from "react";
import LeftSection from "./components/ProjectSearchLeftSection";
import RightSection from "./components/ProjectSearchRightSection";
import ProjSearchMainFilterSection from "./components/filters/ProjSearchMainFilterSection";
import ProjectSearchBreadCrumbs from "./components/ProjSearchBreadCrums";
import { ProjectSeachSchema } from "@/app/seo/search/Project-search-schema";
type Props = {
  serverData: any;
  frontendFilters: any;
  pageUrl: string;
};

export default function NewSearchPage({
  serverData,
  frontendFilters,
  pageUrl,
}: Props) {
  const isListing = false;
  const pagetitle = cleanHeading(pageUrl);
  const address = pagetitle.split("In")[1];
  return (
    <main className="pt-[70px] min-h-[calc(100vh)] relative ">
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_URL}/${pageUrl}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is the purpose of this page?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `The purpose of this page is to provide detailed information about the property titled "${pagetitle}", including its features, pricing, and availability.`,
                },
              },
              {
                "@type": "Question",
                name: "What is the address of the property?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `The address of the property is "${address}".`,
                },
              },
              {
                "@type": "Question",
                name: "What documents do I need to buy a property?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The essential documents needed are sale deed, property tax receipts, encumbrance certificate, approved building plan, and completion certificate. Additional documents may be required based on the property type and location.",
                },
              },
              {
                "@type": "Question",
                name: "How can I find the best property prices in Bangalore?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "GetRightProperty helps you find the best property prices in Bangalore by comparing prices across different localities, providing market analysis, and connecting you with verified sellers. Our extensive database includes both ready-to-move and under-construction properties.",
                },
              },
              {
                "@type": "Question",
                name: "What are the benefits of using GetRightProperty for property search?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "GetRightProperty offers verified listings, transparent pricing, expert guidance, and a hassle-free property search experience. We provide detailed property information, high-quality images, and direct contact with property owners and agents.",
                },
              },
              {
                "@type": "Question",
                name: "Which are the top investment areas in Bangalore?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Popular investment areas in Bangalore include Whitefield, Electronic City, Sarjapur Road, and Hebbal. These areas offer good appreciation potential, infrastructure development, and proximity to IT hubs. GetRightProperty can help you find the best properties in these locations.",
                },
              },
              {
                "@type": "Question",
                name: "What price ranges are available for properties in Bangalore?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Property prices in Bangalore vary by location and type. Apartments range from ₹40 lakhs to ₹5 crores, while villas start from ₹1 crore. GetRightProperty offers options across all budget ranges with transparent pricing and negotiation assistance.",
                },
              },
            ],
          }),
        }}
      />
      {serverData && (
        <ProjectSeachSchema properties={serverData} pageUrl={pageUrl} />
      )}
      <div className="relative md:fixed top-0 md:top-[70px] z-auto md:z-10 w-full ">
        <ProjectSearchBreadCrumbs key="newSearchPage1" pageUrl={pageUrl} />
        <ProjSearchMainFilterSection
          isListing={isListing}
          key="newSearchFilter1"
        />
      </div>

      <div className=" sm:min-w-full xl:m-0 flex justify-between items-start flex-wrap-reverse sm:flex-nowrap relative md:pt-[154px] xl:pt-[190px] ">
        <LeftSection
          serverData={serverData}
          frontendFilters={frontendFilters}
        />
        <div className="w-[100%] sm:w-[50%] -z-10" />
        <RightSection serverData={serverData} key="projRightSection2" />
      </div>
    </main>
  );
}

function cleanHeading(url: string) {
  const ids =
    url
      .replace(/^\//, "")
      .split(process.env.NEXTAUTH_URL ?? "")[1]
      ?.split("-") ?? [];
  const cleaned = ids
    .join(" ")
    .replace(/\b\d*(B|C|G|L|P|CG|SCG|RCG|PJ|")\b/g, "")
    .replace(/\s+/g, " ")
    .replace("/", "")
    .trim();

  return cleaned
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}