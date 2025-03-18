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
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How can I search for properties on GetRightProperty?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can easily search for properties by using our search filters. Select your preferred location, budget range, property type, and other specifications to find properties that match your requirements."
                }
              },
              {
                "@type": "Question", 
                "name": "Are the properties listed on GetRightProperty verified?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, all properties listed on GetRightProperty go through a verification process. Our team ensures that the property details and documents are authentic before listing them on our platform."
                }
              },
              {
                "@type": "Question",
                "name": "What types of properties can I find on GetRightProperty?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "GetRightProperty offers a wide range of residential and commercial properties including apartments, villas, plots, office spaces, and retail shops. You can find both ready-to-move and under-construction properties."
                }
              },
              {
                "@type": "Question",
                "name": "How do I contact property sellers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Once you find a property of interest, you can directly contact the seller through the contact details provided on the property listing page. You can also request a callback or schedule a site visit through our platform."
                }
              }
            ]
          })
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
