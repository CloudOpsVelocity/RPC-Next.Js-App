import { Dispatch, SetStateAction, useState } from "react";
import { Button, Modal, rem } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { PopupOpenSvg, emptyFilesIcon } from "@/app/images/commonSvgs";
import { RightSection } from "./FloorPlan";
import S from "@/app/styles/ModalCarousel.module.css";
import { useAtom, useAtomValue } from "jotai";
import { floorPlansArray, selectedFloorAtom } from "@/app/store/floor";
import { Image } from "@mantine/core";

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
        <div className="flex flex-col md:flex-row p-[2%]  mb-10 justify-center items-center gap-[45px] shrink-0">
          <MiddleSection />
          <RightSection propCgId={""} />
        </div>
      </Modal>
    </>
  );
}

export default CarouselModal;

const MiddleSection = () => {
  const data = useAtomValue(selectedFloorAtom);

  return (
    <div className="max-w-[1400px]">
      <p className="text-[#005DA0] w-full  mb-[1%] text-[16px] font-[500]  text-left">
        Sarang by sumadhura/2bhk/tower 1/ 04/north/1124 sq.ft
      </p>
      {data?.floorPlanUrl ? (
        <Image
          // @ts-ignore
          src={data.floorPlanUrl}
          radius="md"
          h={750}
          w={1500}
          fit="cover"
        />
      ) : (
        <div>
          {emptyFilesIcon}
          <p>No Matching Results Found !</p>
        </div>
      )}
    </div>
  );
};
