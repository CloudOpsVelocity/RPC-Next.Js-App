import { Dispatch, SetStateAction, useState } from "react";
import { Modal } from "@mantine/core";
import { PopupOpenSvg } from "@/app/images/commonSvgs";
import S from "@/app/styles/ModalCarousel.module.css";
import { RightSection } from "../../project/modals/FloorPlan";
import { Main } from "@/app/validations/property";
import { selectedFloorAtom } from "@/app/store/floor";
import { useAtomValue, useSetAtom } from "jotai";
import { listingProps } from "@/app/data/projectDetails";

function PFloorPlanModal({
  data,
  opened,
  setOpened,
}: {
  data: Main;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const TRANSITION_DURATION = 200;
  const setValue = useSetAtom(selectedFloorAtom);
  const type = listingProps[data.propTypeName as keyof typeof listingProps];
  const handleOpen = () => {
    setValue({
      projIdEnc: "4f313de2f95cd9d761098b8f6c09417c",
      phaseId: 670,
      propType: type,
      bhk: 42,
      bhkName: data.bhkName,
      towerName: data.tower,
      towerId: data.tower,
      block: data.block,
      floor: data.atFloor,
      unitNumber: data.unitNumber,
      facingId: data.facingName,
      facingName: data.facingName,
      caretarea: data.ca,
      superBuildUparea: data.sba,
      terraceArea: data.ta,
      parkingType: "Opened",
      totalNumberofBathroom: data.nobt,
      totalNumberOfBalcony: data.nobl,
      noOfCarParking: data.noocp,
      floorPlanUrl: data.projMedia.floorPlanUrl,
    });
    setOpened(true);
  };
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
        <div className="flex  mb-10 justify-center items-start gap-[45px] shrink-0">
          <MiddleSection />
          <RightSection propCgId={type} />
        </div>
      </Modal>
    </>
  );
}

export default PFloorPlanModal;

const MiddleSection = () => {
  const data = useAtomValue(selectedFloorAtom);
  return (
    <div className="col-span-1">
      <div className="relative">
        <img
          src={data.floorPlanUrl}
          alt="Floor Plan"
          className="border"
          width={800}
          height={400}
          style={{ aspectRatio: "800 / 540", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};
