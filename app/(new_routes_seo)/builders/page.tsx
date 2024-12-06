import React from "react";
import BuildersDirectory from "./components/CitiesBuilder";
import { getCitiesBuilder } from "../utils/new-seo-routes/builder.client";

type Props = {};

export default async function Page({}: Props) {
  const builderData = await getCitiesBuilder({
    page: 0,
    sort: 0,
  });
  return <BuildersDirectory initialData={builderData} />;
}
