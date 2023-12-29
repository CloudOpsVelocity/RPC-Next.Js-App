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
import Individual from "../components/molecules/auth/signup/individual";

// export default async function page() {
//   const data = await getCarouselData();
//   console.log(data);
//   return (
//     <div className="text-black w-full h-screen flex justify-center items-center">
//       <Individual />
//       <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
//         <div className="p-6">
//           <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
//             CHECKING NEXT JS CACHING
//           </h5>
//           <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
//             {data.api}
//           </p>
//         </div>
//         <div className="p-6 pt-0">
//           <button
//             className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
//             type="button"
//           >
//             Read More
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// const getCarouselData = async () => {
//   try {
//     const res = await fetch(
//       `http://13.232.38.110:8081/user/v1/apiForCachingTest`,
//       {
//         next: { revalidate: 30 },
//       }
//     );
//     return await res.json();
//   } catch (error) {
//     console.log(error);
//   }
//   // };
// };

import React from "react";
import { DropZone } from "../components/molecules/auth/signup/dropzone";

export default function page() {
  return (
    <div>
      <DropZone />
    </div>
  );
}
