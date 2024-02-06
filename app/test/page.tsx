// "use client";
// import dynamic from "next/dynamic";
// import { useMemo } from "react";

// export default function MyPage() {
//   const Map = useMemo(
//     () =>
//       dynamic(() => import("@/app/components/maps"), {
//         loading: () => <MapSkeleton />,
//         ssr: false,
//       }),
//     []
//   );

//   return (
//     <div>
//       <Map />
//     </div>
//   );
// }

import React from "react";
import LeafMap from "../components/project/map";

export default function Page() {
  return (
    <div>
      <LeafMap
        lang={"77.60569269999999"}
        lat="12.9856503"
        projName="The Boss Naruto Uchimaru"
      />
    </div>
  );
}
