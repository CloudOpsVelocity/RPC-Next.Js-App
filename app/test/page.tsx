"use client";
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
import { Button, Popover, Text } from "@mantine/core";
import FilterPopup from "../search/filterPopup";

export default function Page() {
  return (
    <Popover width={"auto"} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <FilterPopup />
      </Popover.Dropdown>
    </Popover>
  );
}
