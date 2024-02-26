import { listingSearchAtom } from "@/app/store/search/map";
import { Modal, em } from "@mantine/core";
import { useAtom } from "jotai";
import S from "@/app/styles/Drawer.module.css";
import MapSkeleton from "@/app/components/maps/Skeleton";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import Header from "./header";
import { useMediaQuery } from "@mantine/hooks";

function MapModal() {
  const [selected, setSelectedSearch] = useAtom(listingSearchAtom);
  const Map = useMemo(
    () =>
      dynamic(() => import("../map"), {
        loading: () => <MapSkeleton />,
        ssr: false,
      }),
    []
  );
  const onClose = () => setSelectedSearch(null);
  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <Modal
      opened={selected !== null}
      onClose={onClose}
      centered
      size={isMobile ? "100%" : "90%"}
      title={selected?.projName}
      classNames={{
        content: S.content,
        overlay: S.overlay,
        header: S.header,
      }}
    >
      <Header close={onClose} />
      <Map />
    </Modal>
  );
}
export default MapModal;
