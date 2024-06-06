"use client";
import React from "react";

export default function Section() {
  // let arr = [3, 3, 3, 3, 3, 3, 33];
  // const callback = (item: number[]) => {
  //   return item > 2;
  // };

  // const isProject = myEvery(arr, callback);

  // console.log("🚀 ~ page ~ isProject:", isProject);
  return <div>Section</div>;
}
function myEvery<T>(
  arr: T[],
  callbackFn: (value: T, index: number, array: T[]) => boolean
): boolean {
  // Handle cases where arr is null or undefined
  if (arr === null || arr === undefined) {
    throw new TypeError("Array cannot be null or undefined");
  }

  // Handle cases where callbackFn is not a function
  if (typeof callbackFn !== "function") {
    throw new TypeError(`${callbackFn} is not a function`);
  }

  // Special case for empty arrays
  if (arr.length === 0) {
    return true;
  }

  // Iterate over the array elements
  for (let i = 0; i < arr.length; i++) {
    // Call the provided callback function with the current element, index, and the array itself
    if (!callbackFn(arr[i], i, arr)) {
      // If the callback function returns false for any element, return false
      return false;
    }
  }

  // If the loop completes without returning false, return true
  return true;
}
