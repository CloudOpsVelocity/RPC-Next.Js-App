"use client";
import { formatDate } from "@/app/utils/date";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useCallback, memo } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

type Props = { data: any };

export default function ResidentialCardSection({ data }: Props) {
  const properties = data.data || [];
  const [listItemsCount, setListItemsCount] = useState(20);
  const [loading, setLoading] = useState(false);

  const fetchMoreItems = useCallback(() => {
    if (properties.length > listItemsCount) {
      setLoading(true);
      setTimeout(() => {
        setListItemsCount((prevCount) => prevCount + 20);
        setLoading(false);
      }, 500);
    }
  }, [listItemsCount, properties.length]);

  useEffect(() => {
    if (listItemsCount >= properties.length) return;

    const items = document.querySelectorAll(".infinityItem");
    if (items.length === 0) return;

    const observerCallback = (entries: any, observer: any) => {
      entries.forEach((entry: any) => {
        if (
          entry.isIntersecting &&
          entry.target.id === `item-${items.length - 1}`
        ) {
          fetchMoreItems(); // Trigger loading more items
          items.forEach((item) => observer.unobserve(item)); // Unobserve items after fetching more
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1, // Trigger when 10% of the item is visible
    });

    // Observe the last item
    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, [listItemsCount, properties, fetchMoreItems]);

  const LoadingSpinner = memo(function LoadingSpinner() {
    return (
      <div className="flex items-center gap-2">
        <div className="w-[20px] h-[20px] md:w-[26px] md:h-[26px] xl:w-[30px] xl:h-[30px] border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
        <span className="font-bold">Loading more results...</span>
      </div>
    );
  });

  return (
    <section className="py-20 container mx-auto px-4">
      {!properties || properties.length < 1 ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 capitalize">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties
              .slice(0, listItemsCount)
              .map((property: any, index: any) => {
                if (!property) {
                  return null; // Handle case where property is undefined
                }

                const minPrice = property.minPrice
                  ? parseInt(property.minPrice)
                  : 0;
                const maxPrice = property.maxPrice
                  ? parseInt(property.maxPrice)
                  : 0;
                const possessionDate = property.possassionDate
                  ? formatDate(property.possassionDate)
                  : "N/A";
                const propertyType =
                  Array.isArray(property.propType) &&
                  property.propType.length > 0
                    ? property.propType.join(", ")
                    : property.propType;
                const reraStatus = property.rerastatus || "N/A";

                return (
                  <div
                    id={`item-${index}`}
                    key={property.projIdEnc}
                    className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow infinityItem"
                  >
                    <div className="relative h-64">
                      <Image
                        src={
                          property.coverUrl
                            ? property.coverUrl.split(",")[0]
                            : "/api/placeholder/60/60"
                        }
                        alt={property.projName || "Property Image"}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                        {property.projstatus || "Status Unknown"}
                      </div>
                    </div>
                    <div className="p-6">
                      <Link
                        href={`/residential/projects/${
                          property.city?.toLowerCase() || "unknown"
                        }/${
                          property.locality?.toLowerCase() || "unknown"
                        }/${property.projName
                          ?.toLowerCase()
                          .replace(/ /g, "-")}-${property.projIdEnc}`}
                        className="text-xl font-bold mb-2 text-blue-600 hover:cursor-pointer"
                      >
                        {property.projName || "Unnamed Property"}
                      </Link>
                      <p className="text-muted-foreground flex items-center gap-2 mb-4">
                        <FaMapMarkerAlt />{" "}
                        {property.locality || "Unknown Locality"},{" "}
                        {property.city || "Unknown City"}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-sm">
                          <div className="font-semibold">Price Range</div>
                          <div>
                            ₹{(minPrice / 10000000).toFixed(2)} Cr - ₹
                            {(maxPrice / 10000000).toFixed(2)} Cr
                          </div>
                        </div>
                        <div className="text-sm">
                          <div className="font-semibold">Property Type</div>
                          <div>{propertyType}</div>
                        </div>
                        <div className="text-sm">
                          <div className="font-semibold">Possession</div>
                          <div>{possessionDate}</div>
                        </div>
                        <div className="text-sm">
                          <div className="font-semibold">RERA Status</div>
                          <div>{reraStatus}</div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Link
                          href={`/residential/projects/${
                            property.city?.toLowerCase() || "unknown"
                          }/${
                            property.locality?.toLowerCase() || "unknown"
                          }/${property.projName
                            ?.toLowerCase()
                            .replace(/ /g, "-")}-${property.projIdEnc}`}
                          className="flex-1 bg-bgSecondary bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-center text-sm font-medium transition-colors"
                        >
                          View Details
                        </Link>
                        <Link
                          rel="noopener noreferrer"
                          prefetch={false}
                          href="tel:+91-8884440963"
                          className="flex-1 border border-primary text-primary hover:bg-primary/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Enquire Now
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {loading && (
            <div className="w-full h-[10vh] py-8 flex justify-center items-center text-gray-600">
              <LoadingSpinner />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
