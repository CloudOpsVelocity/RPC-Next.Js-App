import { Dispatch, SetStateAction, useState } from "react";
import { Button, Modal, rem } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { PopupOpenSvg, emptyFilesIcon } from "@/app/images/commonSvgs";
import { MiddleSection, RightSection } from "./FloorPlan";
import S from "@/app/styles/ModalCarousel.module.css";
import { useAtomValue } from "jotai";
import { floorPlansArray, selectedFloorAtom } from "@/app/store/floor";
import Image from "next/image";

type CarouselModalProps = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

function CarouselModal({ opened, setOpened }: CarouselModalProps) {
  const data = useAtomValue(selectedFloorAtom);
  const TRANSITION_DURATION = 200;

  return (
    <>
      <Modal
        opened={opened}
        size={"90%"}
        padding={0}
        transitionProps={{ duration: TRANSITION_DURATION }}
        onClose={() => setOpened(false)}
        classNames={{
          content: S.body,
          close: S.close,
        }}
      >
        <div className="flex flex-col md:flex-row p-[2%]  mb-10 justify-center items-start gap-[45px] shrink-0">
          <MiddleSection hide={true} />
          <RightSection propCgId={""} />
        </div>
      </Modal>
    </>
  );
}

export default CarouselModal;
