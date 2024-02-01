import { Dispatch, SetStateAction, useState } from "react";
import { Button, Modal, rem } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { PopupOpenSvg, emptyFilesIcon } from "@/app/images/commonSvgs";
import { RightSection } from "./FloorPlan";
import S from "@/app/styles/ModalCarousel.module.css";
import { useAtom, useAtomValue } from "jotai";
import { floorPlansArray, selectedFloorAtom } from "@/app/store/floor";
import { Image } from "@mantine/core";
import { useSubFloorPlanPopup } from "@/app/hooks/useSubFloorplanPopup";
import { projectprops } from "@/app/data/projectDetails";

type CarouselModalProps = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  close: () => void;
};

function CarouselModal({projName, propCgId}:{projName: string,propCgId: number }) {
  const [opened, { close }] = useSubFloorPlanPopup();
  const TRANSITION_DURATION = 200;

  return (
    <>
      <Modal
        opened={opened}
        size={"90%"}
        padding={0}
        transitionProps={{ duration: TRANSITION_DURATION }}
        onClose={close}
        classNames={{
          content: S.body,
          close: S.close,
          header: S.header,
        }}
      >
        <div className="flex flex-col md:flex-row p-[2%]  mb-10 justify-center items-center gap-[45px] shrink-0">
          <MiddleSection projName={projName} propCgId={propCgId} />
          <RightSection propCgId={""} />
        </div>
      </Modal>
    </>
  );
}

export default CarouselModal;

const MiddleSection = ({projName, propCgId}:{projName: string,propCgId: number }) => {
  const selectedFloor = useAtomValue(selectedFloorAtom);


  return (
    <div className="max-w-[1400px]">
      <p className="text-[#005DA0] w-full  mb-[1%] text-[16px] font-[500]  text-left">
        {/* Sarang by sumadhura/2bhk/tower 1/ 04/north/1124 sq.ft - 3 */}
          {projName}

          {propCgId != projectprops.plot && selectedFloor.bhkName &&
            "_" + selectedFloor.bhkName 
          }

          {propCgId == projectprops.apartment && selectedFloor.towerName && selectedFloor.towerName != "NA" &&
            "_" + selectedFloor.towerName
          }

          {propCgId != projectprops.apartment && propCgId != projectprops.villament && selectedFloor.unitNumber &&
            "_" + selectedFloor.unitNumber
          }

          {propCgId != projectprops.plot && selectedFloor.floor &&
            "_" + selectedFloor.floor
          }

          _{selectedFloor.facingName}

          {propCgId != projectprops.plot && selectedFloor.superBuildUparea &&
            "_" + selectedFloor.superBuildUparea + " sq.ft"
          }

          {propCgId == projectprops.plot && selectedFloor.plotArea &&
            "_" + selectedFloor.plotArea + " sq.ft"
          }
      </p>
      {selectedFloor?.floorPlanUrl ? (
        <Image
          // @ts-ignore
          src={selectedFloor.floorPlanUrl}
          radius="md"
          h={600}
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

