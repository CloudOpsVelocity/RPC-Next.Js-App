"use client";
import clsx from "clsx";
import React, { useState } from "react";

type Props = {};

export default function DisClamerReadMore({}: Props) {
  const [isReadMore, setReadmore] = useState(false);
  return (
    <p
      className={clsx(
        "text-sm text-gray-700 mb-1 relative",
        !isReadMore && "line-clamp-1"
      )}
    >
      from{" "}
      <a
        href="https://www.getrightproperty.com"
        className="text-blue-600 underline"
      >
        Get Right Property
      </a>{" "}
      Sources of Information: Project details presented on this page are
      collected from public sources including State RERA websites (wherever
      applicable), project websites created by builders and authorized channel
      partners and official documentation shared by these authorized advertisers
      (project brochure, price list, payment plans). Get Right Property only
      presents this content in an easy format for user research and user
      education and does not own any content. Users are advised to exercise
      caution and validate facts from the builder/promoter before purchase.
      <button className="text-blue-600 absolute top-0 right-0">
        ReadMore...
      </button>
    </p>
  );
}
