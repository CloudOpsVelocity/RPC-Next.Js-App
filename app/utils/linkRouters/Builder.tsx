import { BASE_PATH_BUILDER_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/builder.route";
import Link, { LinkProps } from "next/link";
import React, { ReactNode, useMemo } from "react";

// Simple slugify function without memoization
const slugify = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

type BuilderLinkProps = {
  // Keep all props from LinkProps
  routeParams?: {
    city?: string;
    slug: string;
    type?: string; // Add type to routeParams
    id?: number; // Add id to routeParams
    statusId?: number;
  };
  children: ReactNode;
  className?: string;
};

export default function BuilderLink({
  routeParams,
  children,
  ...rest
}: BuilderLinkProps) {
  const { city, slug, type, id, statusId } = routeParams || {};

  // Memoize the href to avoid recalculating it unnecessarily
  const href = useMemo(() => {
    if (type === "project") {
      if (!id) {
        return `/search`;
      }
      return (
        "/search?builderIds=" +
        encodeURIComponent(`${slug}+${id}`).replaceAll("%20", "+")
      );
    } else if (type === "projStatus") {
      if (!id) {
        return `/search`;
      }
      return `/search?projStatus=${statusId}&builderIds=${encodeURIComponent(
        `${slug}+${id}`
      ).replaceAll("%20", "+")}`;
    } else if (city && slug) {
      // Redirect to builder details page
      return `${BASE_PATH_BUILDER_DETAILS}/${slugify(city)}/${slugify(
        slug as string
      )}`;
    } else if (city) {
      // Redirect to city-specific builder details
      return `${BASE_PATH_BUILDER_DETAILS}/${slugify(city)}`;
    } else {
      // Default redirect to /search
      return `/search`;
    }
  }, [city, slug, type, id, statusId]);

  return (
    <Link {...rest} href={href}>
      {children}
    </Link>
  );
}
