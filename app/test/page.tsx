import React from "react";
import { promiseHooks } from "v8";
import VersaMessage from "../components/project/success/VersaMessage";
import {
  ListingNotFoundMessage,
  QnaSuccesssMessage,
  RatingMessage,
} from "../components/project/success";

export default async function page() {
  const array = [1, 2, 3, 4, 5, 6];
  for (let i = 0; i < array.length; i++) {
    if (array[i + 1] !== undefined) {
      [array[i], array[i + 1]] = [array[i + 1], array[i]];
    }
  }
  console.log(array);
  return <>{/* <RatingMessage /> */}</>;
}
