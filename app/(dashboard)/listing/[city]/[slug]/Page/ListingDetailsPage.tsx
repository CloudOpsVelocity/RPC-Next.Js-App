import React from "react";
import dynamic from "next/dynamic";
import "@mantine/carousel/styles.css";
const AboutBuilder = dynamic(
  () => import("@/app/components/project/aboutBuilder")
);
const GalleryBlock = dynamic(
  () => import("@/app/components/project/galleryBlock")
);
const Amenties = dynamic(() => import("@/app/components/project/amenties"));
const Loans = dynamic(() => import("@/app/components/project/loans"));
const FaqWithBg = dynamic(() => import("@/app/components/project/faq"));
const About = dynamic(() => import("@/app/components/project/about"));
const Navigation = dynamic(
  () => import("@/app/components/property/Navigation")
);
const ProjectDrawer = dynamic(() => import("@/app/components/project/Drawer"));
const RoomDetails = dynamic(
  () => import("@/app/components/property/RoomDetails")
);
const PropertyOverView = dynamic(
  () => import("@/app/components/property/Overview")
);
const RoomFloorplansBlock = dynamic(
  () => import("@/app/components/property/Floorplan")
);
const PropertyBanner = dynamic(
  () => import("@/app/components/property/propertyBanner")
);
const PropertyFirstBlock = dynamic(
  () => import("@/app/components/property/fistblock")
);
import LeafMap from "@/app/components/project/map";
import ListingSchema from "@/app/seo/listing/listing.schema";
import TagsSections from "@/app/components/sections/TagsSections";
import { formatDateDDMMYYYY } from "@/app/utils/date";
const PropertyMap = dynamic(() => import("@/app/components/property/map"));
const NearByCarouselProperty = dynamic(
  () => import("@/app/components/property/carousel")
);
const LoginPopup = dynamic(
  () => import("@/app/components/project/modals/LoginPop")
);
const MobileHidden = dynamic(
  () => import("@/app/components/molecules/MobileHidden")
);
const PriceBreakup = dynamic(
  () => import("@/app/components/property/pricingbreakup/PriceBreakup")
);
const CompareError = dynamic(
  () => import("@/app/components/property/actions/Error")
);
const NearByCarouselProjProperty = dynamic(
  () => import("@/app/components/property/carousel/ProjectCarouse")
);
const ListingBreadCrumbs = dynamic(
  () => import("@/app/components/property/BreadCrumb/ListingBreadcrumb")
);
const ProjectGallery = dynamic(
  () => import("@/app/components/project/_ui/modals/GallerySectionModal")
);

type Props = {
  data: any;
  totalPrice: number;
  projData: any;
  issueData: any;
  amenitiesFromDB: any;
  nearByLocations: any;
  TITLE_OF_PROP: string;
  params: any;
  pathname: string;
};

export default function ListingDetailsPage({
  data,
  projData,
  totalPrice,
  issueData,
  amenitiesFromDB,
  nearByLocations,
  TITLE_OF_PROP,
  params,
  pathname,
}: Props) {
  const title = `${data?.bhkName ?? ""} ${data?.propTypeName} For
  ${data?.cg === "S" ? " Sale" : " Rent"} In
  ${data?.ltName}${data?.projIdEnc ? `, ${data?.propName}` : ""}`;
  const newTitle = `${data?.bhkName ?? ""} ${data?.propTypeName} For
  ${data?.cg === "S" ? " Sale" : " Rent"} In
  ${data?.ltName} at ${data.propName}`;

  const newParams = {
    "residential-listings": "residential-listings",
    ...params,
  };

  // console.log(data)

  // "5-bhk-villa-for-buy-sale-in-yellupura-bengaluru-683B-31P-SCG-570L-9C",
  const rentAndSaleTagUrls = [
    {
      title: data.propTypeName
        ? `${data.bhkName ?? ""} ${data.propTypeName} in ${data.ltName}, ${
            data.ctName
          } for ${data.cg === "R" ? "Rent" : "Sale"}`
        : "",
      url: `/${
        data.bhkName
          ? `${data.bhkName.toLowerCase().replaceAll(" ", "-")}-`
          : ""
      }${data.propTypeName.toLowerCase().replaceAll(" ", "-") ?? ""}-for-${
        data.cg == "R" ? "rent" : "buy-sale"
      }-in-${data.ltName.toLowerCase().replaceAll(" ", "-")}-${data.ctName
        .toLowerCase()
        .replaceAll(" ", "-")}-${data.bhkId ? `${data.bhkId}B-` : ""}${
        data.propTypeId ? `${data.propTypeId}P-` : ""
      }${data.cg}CG-${data.localityId ? `${data.localityId}L` : ""}-${
        data.cityId
      }C`,
    },
    ...(data.bhkName
      ? [
          {
            title: data?.bhkName
              ? `${data.bhkName ?? ""} in ${data.ltName},  ${data.ctName} for ${
                  data.cg === "R" ? "Rent" : "Sale"
                }`
              : "",
            url: `/${
              data.bhkName
                ? `${data.bhkName.toLowerCase().replaceAll(" ", "-")}-`
                : ""
            }for-${data.cg == "R" ? "rent" : "buy-sale"}-in-${data.ltName
              .toLowerCase()
              .replaceAll(" ", "-")}-${data.ctName
              .toLowerCase()
              .replaceAll(" ", "-")}-${data.bhkId ? `${data.bhkId}B-` : ""}${
              data.cg
            }CG-${data.localityId ? `${data.localityId}L` : ""}-${
              data.cityId
            }C`,
          },
        ]
      : []),
  ];

  // -in-

  const getUrls = (pathname: string) => {
    const routes = pathname.split("/").filter(Boolean);

    // Remove last segment if it's a listing ID or slug
    if (routes[routes.length - 1]?.startsWith("listing-")) {
      routes.pop();
    }

    const breadcrumbs: { title: string; url: string }[] = [];
    let accumulatedUrl = "";

    routes.forEach((segment, index) => {
      accumulatedUrl += `/${segment}`;
      let title = "";

      if (index === 0 && segment === "residential-listings") {
        title = "Residential Properties";
      } else if (index === 1) {
        title = `Residential Properties for ${
          data.cg === "R" ? "Rent" : "Sale"
        }`;
      } else if (index === 2) {
        title = `Properties for ${
          data.cg === "R" ? "Rent" : "Sale"
        } in ${capitalize(segment)}`;
      } else if (index === 3) {
        title = `Properties for ${
          data.cg === "R" ? "Rent" : "Sale"
        } in ${capitalize(segment)}, ${capitalize(routes[2])}`;
      } else if (index === 4) {
        title = `Propertiles For ${
          data.cg === "R" ? "Rent" : "Sale"
        } in ${toTitleCase(segment)} ,${capitalize(routes[3])}, ${capitalize(
          routes[2]
        )}`;
      } else if (index === 5) {
        title = `${segment.replace(/-/g, " ").toUpperCase()} in ${toTitleCase(
          routes[4]
        )}, ${capitalize(routes[3])}`;
      }

      if (title) {
        breadcrumbs.push({ title, url: accumulatedUrl });
      }
    });

    return breadcrumbs;
  };

  // Helpers
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1)?.toLowerCase();

  const toTitleCase = (str: string) =>
    str
      .split("-")
      .map((word) => capitalize(word))
      .join(" ");

  //   currentPath += `/${slugify(params[key])}`;
  //   const isLast = index === allParams.length - 1;

  //   return (
  //     <React.Fragment key={`${key[index]}`}>
  //       {!isLast ? (
  //         <>
  //           <Link
  //             prefetch={false}
  //             href={`${isProject ? "" : BASE_PATH_LISTING}${currentPath}`}
  //             // target="_blank"
  //             className="hover:underline cursor-pointer capitalize"
  //           >
  //             {/* <a onTouchStart={() => {}}></a> */}
  //             {titleOfKeys[key as keyof typeof titleOfKeys] && (
  //               <span>{titleOfKeys[key as keyof typeof titleOfKeys]}</span>
  //             )}
  //             <span>
  //               {index === allParams.length - 2
  //                 ? params[key].replace(/-/g, " ").replace(/bhk/i, "BHK")
  //                 : params[key].replace(/-/g, " ")}
  //             </span>
  //           </Link>
  //           {" > "}
  //         </>
  //       ) : (
  //         <span className="capitalize">{title.replace("undefined ", "")}</span>
  //       )}
  //     </React.Fragment>
  //   );
  // });
  const faqList = [
    {
      qnaId: null,
      faqQuestion: `1. What is the price of ${newTitle}?`,
      faqAnswer: `The price of ${newTitle} in ${data?.ltName}, ${
        data?.ctName
      } is ₹${data?.price?.toLocaleString(
        "en-IN"
      )}*. The final cost may vary based on furnishings, negotiation, and market conditions.`,
    },
    {
      qnaId: null,
      faqQuestion: `2. Is ${data?.propName} a good option to ${
        data?.cg === "S" ? "buy" : "rent"
      } a home in ${data?.ltName}, ${data?.ctName}?`,
      faqAnswer:
        data?.propTypeName?.toLowerCase() === "plot"
          ? `${data?.propName} is a ${
              data?.isCornerPlot ? "corner plot" : "plot"
            } of area ${data?.plotArea ?? "unspecified"} sqft located in ${
              data?.ltName
            }, ${data?.ctName}. It has ${
              data?.noOfOpenSide ?? "an unspecified number of"
            } open sides and ${
              data?.boundryWallEnclose
                ? "is enclosed with a boundary wall."
                : "no boundary wall."
            }`
          : `${data?.propName} offers a ${data?.bhkName?.toLowerCase()} ${
              data?.propTypeName
            } that is ${data?.furnshName?.toLowerCase()}. It's located in ${
              data?.ltName
            }, a rapidly developing area in ${data?.ctName}. ${
              data?.ageofBuilding
                ? `The property is ${data?.ageofBuilding} old and ${
                    data?.availablityStatus === "R"
                      ? "ready for possession"
                      : "currently under construction"
                  }.`
                : ""
            }`,
    },

    {
      qnaId: null,
      faqQuestion: `3. What amenities are available at ${data?.propName}?`,
      faqAnswer:
        data?.propTypeName?.toLowerCase() === "plot"
          ? data?.amenities?.length > 0
            ? `This plot includes ${data?.amenities.length} essential amenities. This plot is a spacious open land with basic facilities like road access and water supply, ideal for custom construction or investment purposes. `
            : `This plot is a spacious open land with basic facilities like road access and water supply, ideal for custom construction or investment purposes.`
          : `This ${data?.bhkName} ${
              data?.propTypeName
            } includes features such as ${
              data?.amenities?.length > 0
                ? `over ${data?.amenities.length} modern amenities including clubhouse, security, lifts, and more.`
                : `basic facilities and a comfortable living environment.`
            }`,
    },
    {
      qnaId: null,
      faqQuestion: `4. What is the exact location of ${newTitle}?`,
      faqAnswer: `${data?.propName} is located at ${data?.address}, ${data?.ltName}, ${data?.ctName}, ${data?.stateName} - ${data?.pinCode}. This location provides good connectivity to schools, hospitals, and tech hubs in Bengaluru.`,
    },
    {
      qnaId: null,
      faqQuestion: `5. Who is the owner of ${newTitle}?`,
      faqAnswer: `This property is listed by ${data?.postedByName}, who is ${
        data?.postedByType === "I"
          ? "an individual owner"
          : data?.postedByType === "A"
          ? "an agent"
          : data?.postedByType === "B"
          ? "the builder"
          : "a verified seller"
      }. ${
        data?.postedByType === "I"
          ? "Direct owner listings ensure better transparency and price negotiation."
          : data?.postedByType === "A"
          ? "You can contact the agent for assistance and negotiations."
          : data?.postedByType === "B"
          ? "Buy directly from the builder with assured quality and compliance."
          : ""
      }`,
    },
    {
      qnaId: null,
      faqQuestion: `6. Is ${data?.propName} pet-friendly and broker-friendly?`,
      faqAnswer: `${data?.propName} is ${
        data?.ispetFriendly ? "pet-friendly" : "not pet-friendly"
      } and ${
        data?.isOkWithBrokerContact
          ? "open to broker communication"
          : "not accepting broker contacts"
      }.`,
    },
    {
      qnaId: null,
      faqQuestion: `7. Is ${data?.propName} ready to move or under construction?`,
      faqAnswer: `This property is ${
        data?.availablityStatus === "R"
          ? "ready to move in"
          : "under construction"
      }. Available from ${formatDateDDMMYYYY(data?.availableFrom)}.`,
    },
    {
      qnaId: null,
      faqQuestion:
        data?.propTypeName?.toLowerCase() === "plot"
          ? `9. What is the plot area and construction details of ${data?.propName}?`
          : `9. How is the furnishing and flooring in ${data?.propName}?`,
      faqAnswer:
        data?.propTypeName?.toLowerCase() === "plot"
          ? `${data?.propName} is a plot with an area of ${
              data?.plotArea ? data.plotArea + " sqft" : "unspecified size"
            }.${
              data?.boundryWallEnclose
                ? " It has a boundary wall enclosed."
                : ""
            }${data?.isCornerPlot ? " It is a corner plot." : ""}${
              data?.noOfOpenSide
                ? ` The plot is open on ${data.noOfOpenSide} side${
                    data.noOfOpenSide > 1 ? "s" : ""
                  }.`
                : ""
            }`
          : `${data?.propName} offers a carpet area of ${
              data?.ca ?? "unspecified"
            } sqft and a super built-up area of ${
              data?.sba ?? "unspecified"
            } sqft. The apartment is ${
              data?.facingName ?? "unspecified facing"
            } facing and located on floor ${
              data?.atFloor === 0 ? "Ground" : data?.atFloor ?? "unspecified"
            } of ${data?.totalFloor ?? "unspecified floors"}.`,
    },
    {
      qnaId: null,
      faqQuestion:
        data?.propTypeName?.toLowerCase() === "plot"
          ? `9. What is the construction status and type of ${data?.propName}?`
          : `9. How is the furnishing and flooring in ${data?.propName}?`,
      faqAnswer:
        data?.propTypeName?.toLowerCase() === "plot"
          ? `This plot ${
              data?.cunstructionStatus
                ? "has construction status as " +
                  (data?.cunstructionStatus === 1
                    ? "constructed"
                    : "not constructed")
                : "has no construction details available"
            }${
              data?.cunstructionType
                ? " with construction type: " + data.cunstructionType
                : ""
            }.`
          : `This apartment is ${
              data?.furnshName?.toLowerCase() ?? "not furnished"
            } with ${
              data?.flooringType ?? "unspecified"
            } flooring, ensuring comfort and aesthetic appeal.`,
    },

    {
      qnaId: null,
      faqQuestion: `10. What type of ${
        data?.cg === "R"
          ? "facing, furnishing, and floor details"
          : "ownership, facing, and floor details"
      } are offered in ${newTitle}?`,
      faqAnswer:
        data?.cg === "R"
          ? `This rental property faces ${
              data?.facingName || "a suitable direction"
            }, is ${
              data?.furnshName?.toLowerCase() || "semi-furnished"
            }, and is located on floor ${
              data?.atFloor === 0 ? "Ground" : data?.atFloor || "N/A"
            } of ${
              data?.totalFloor || "N/A"
            } floors, ensuring convenience and natural light.`
          : `The property is ${
              data?.ownershipName?.toLowerCase() || "standard"
            } owned, faces ${
              data?.facingName || "a preferred direction"
            },  providing both ownership assurance and great ventilation.`,
    },
  ];

  return (
    <div className="w-full">
      <ListingSchema
        listingData={{
          listing: data,
          nearByLocations: nearByLocations,
          faqData: faqList,
          title: title,
          url: pathname,
        }}
      />
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_URL}${pathname}`}
      />
      <div className="mt-[70px] sm:mt-[90px] w-full sm:pb-[2%] flex xl:text-ellipsis items-center justify-center flex-col">
        <div className="p-[1%] sm:p-[1%] sm:py-0 xl:p-[1%] w-full sm:w-[94%]">
          <ListingBreadCrumbs
            params={params}
            isProject={!!data.projIdEnc}
            title={title}
            pathname={pathname}
          />
          {/* Top Cover Image Card */}
          <PropertyFirstBlock
            projectDetails={data}
            projName={data.propName}
            totalPrice={totalPrice}
            isOkWithBrokerContact={data.isOkWithBrokerContact}
            isUsed={data.isUsed}
          />
        </div>
        {/* Navigations Container */}
        <MobileHidden>
          <Navigation
            detailsData={data}
            projData={!!data.projIdEnc}
            relateProjData={projData}
            projName={data.propName}
            lat={projData?.lat ?? data.lat}
            lng={projData?.lang ?? data.lang}
            projId={data.projIdEnc}
            cg={data.cg}
            propTypeName={data.propTypeName}
            bhkId={data.bhkId ?? 41}
            nearByLocations={nearByLocations}
          />
        </MobileHidden>
        {/* Overview */}
        <PropertyOverView data={data} issueData={issueData.propReport} />
        {/* About */}
        {data.usp && (
          <About
            type="prop"
            id="about"
            heading="about Listing"
            projName={"Listing"}
            content={data.usp}
            showProjName={false}
            newTitle={newTitle}
          />
        )}
        {/* Property Details */}
        <RoomDetails data={data} />
        {/* Floor Plan Block */}
        <RoomFloorplansBlock data={data} />
        <GalleryBlock
          media={data.projMedia}
          type="prop"
          coverUrl={""}
          projReviewVideoUrl={""}
          otherImgUrl={[]}
          projectVideoIUrl=""
          coverImageUrl={""}
          projectPlanUrl={""}
          walkThrowVideoUrl={""}
          projBroucherUrl={""}
          newTitle={newTitle}
        />
        {data?.amenities?.length > 0 && (
          <Amenties
            projName="Listing"
            type="prop"
            data={data?.amenities?.map((item: any) => {
              return { id: item, name: String(item) };
            })}
            amenitiesFromDB={amenitiesFromDB}
          />
        )}

        {data.projIdEnc && (
          <>
            <LeafMap
              lat={projData.lat}
              lang={projData.lang}
              projName={data.propName}
              projId={data.projIdEnc}
              type="prop"
              mapData={nearByLocations}
            />
            {/* {data.postedById === projData.builderId && ( */}
            <>
              <PropertyBanner
                {...projData}
                cityName={data.ctName}
                localityName={data.ltName}
                projIdEnc={data.projIdEnc}
              />
              {/* <ErrorContainer data={projData.banks}> */}
              {data.cg === "S" &&
                data.postedById === projData.builderId &&
                projData.banks.length > 0 && (
                  <Loans
                    type="prop"
                    banks={projData.banks}
                    name={data.propName}
                  />
                )}
              {/* About Builder */}
              <AboutBuilder type="proj" id={projData.builderId} />
              {/* {data.postedById === projData.builderId && (
                <div
                  id="faq"
                  className="scroll-mt-[70px] m-auto w-[95%] sm:w-[90%] flex justify-start items-start"
                >
                  <FaqWithBg
                    data={projData.faqs}
                    projName={data.propName}
                    slug={data.projIdEnc}
                    postedById={projData.builderId}
                  />
                </div>
              )} */}
            </>

            {/* )} */}
          </>
        )}
        <FaqWithBg
          data={faqList}
          projName={data.propName}
          slug={data.projIdEnc}
          postedById={projData.builderId}
          qnaShow={false}
        />
        {!data.projIdEnc && (
          <>
            <div id="location-map" className="mt-10 scroll-mt-[180px]" />
            <PropertyMap
              lat={data?.lat ?? 0}
              lang={data?.lang ?? 0}
              projName={TITLE_OF_PROP}
              projId={data.propIdEnc}
              type="prop"
              mapData={nearByLocations}
            />
          </>
        )}

        <NearByCarouselProperty
          projName={data.propName}
          lat={projData?.lat ?? data.lat}
          lng={projData?.lang ?? data.lang}
          projId={data.projIdEnc}
          cg={data.cg}
          propTypeName={data.propTypeName}
          bhkId={data.bhkId ?? 41}
          builderName={data?.postedByName}
          builderId={projData?.builderId}

          // query={""}
        />
        {/* {data.projIdEnc && data.postedById === projData.builderId && ( */}
        <NearByCarouselProjProperty
          projName={""}
          lat={projData?.lat}
          lng={projData?.lang}
          projId={data.projIdEnc}
          builderId={projData?.builderId}
          company={projData?.companyName}
          nearBy={{
            title: `Other Projects by ${data.postedByName}`,
          }}
        />
        <TagsSections urls={[...getUrls(pathname), ...rentAndSaleTagUrls]} />
        {/* )} */}
        <PriceBreakup
          otherPrice={data.otherPrice}
          price={data.price}
          type={data.cg === "S" ? "Selling" : "Rent"}
        />
        <ProjectGallery />
        <LoginPopup />
        <ProjectDrawer projName={TITLE_OF_PROP} />
        <CompareError />
        {/*   <SharePopup /> */}
      </div>
    </div>
  );
}
