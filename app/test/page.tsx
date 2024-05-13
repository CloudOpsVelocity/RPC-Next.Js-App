import React from "react";
import { promiseHooks } from "v8";

export default async function page() {
  const arr = [1, 2, 3, 4, 5, 6, 7];
  console.log(arr);
  console.log(arr.fill(1, 4, 5));
  return <>{JSON.stringify(arr.concat())}</>;
}
