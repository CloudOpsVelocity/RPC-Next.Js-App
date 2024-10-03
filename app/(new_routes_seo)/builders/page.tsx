import React from "react";
import StateBuilder from "./components/StateBuilder";
import BuildersDirectory from "./components/CitiesBuilder";
import { getCitiesBuilder } from "../utils/new-seo-routes/builder.client";

type Props = {};

export default async function Page({}: Props) {
  const builderData = await getCitiesBuilder({
    page: 0,
    sort: 0,
  });
  console.log(builderData);
  return <BuildersDirectory initialData={builderData} />;
}
