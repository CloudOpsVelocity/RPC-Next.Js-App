"use client";
import React from "react";

export default function Section() {
  let obj = {
    x: { y: { z: 4 } },
    state: {
      value: 10,
      city: {
        value: 2,
        locality: "",
      },
    },
  };
  // 'x.y.z':4
  //   let arr = [1, 3, 3, 4, 3, 5, 4, 4];
  //   let obj = {};
  //   for (let i = 0; i < arr.length; i++) {
  //     const element = arr[i];
  //     if (obj[element]) {
  //       obj[element] = obj[element] + 1;
  //       console.log(arr.length, i + 1);
  //     } else {
  //       obj[element] = 1;
  //     }
  //   }
  //   console.log(obj);
  // function findSecondRepeated(arr) {
  //   const countObj = {};
  //   let firstRepeated = null;
  //   let secondRepeated = null;

  //   for (let i = 0; i < arr.length; i++) {
  //     const elem = arr[i];
  //     countObj[elem] = (countObj[elem] || 0) + 1;

  //     if (countObj[elem] === 2) {
  //       if (firstRepeated === null) {
  //         firstRepeated = elem;
  //       } else {
  //         secondRepeated = elem;
  //         break;
  //       }
  //     }
  //   }

  //   return secondRepeated;
  // }

  // const arr = [1, 3, 3, 4, 3, 5, 4, 4];
  // const result = findSecondRepeated(arr);
  // console.log(result); // Output: 4
  return <div>Section</div>;
}
