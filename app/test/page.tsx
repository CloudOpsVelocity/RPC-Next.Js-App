// import axios from "axios";
// import React from "react";

// export default async function page() {
//   const data = await getCarouselData();
//   return <div>{JSON.stringify(data)}</div>;
// }
// const getCarouselData = async () => {
//   const res = await axios.get(
//     `http://localhost:8081/project/new-launch-project?page=${1}`
//   );
//   return res.data;
// };

import axios from "axios";
import Image from "next/image";
import React from "react";

export default async function page() {
  const data = await getCarouselData();
  return <div>{JSON.stringify(data)}</div>;
}
const getCarouselData = async () => {
  try {
    const res = await fetch(`http://localhost:8081/user/v1/apiForCachingTest`);
    const data = await res.json();
  } catch (error) {
    console.log(error);
  }
};
