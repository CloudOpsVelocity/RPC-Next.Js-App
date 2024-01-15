import { Dispatch, SetStateAction, useState } from "react";
import { Modal } from "@mantine/core";
import { PopupOpenSvg } from "@/app/images/commonSvgs";
import S from "@/app/styles/ModalCarousel.module.css";
import { RightSection } from "../../project/modals/FloorPlan";

function PFloorPlanModal() {
  const TRANSITION_DURATION = 200;
  const [opened, setOpened] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpened(true)}
        className="absolute bottom-2 right-2 cursor-pointer"
      >
        <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[33px] lg:h-[33px] " />
      </button>
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
          <RightSection />
        </div>
      </Modal>
    </>
  );
}

export default PFloorPlanModal;

const MiddleSection = () => {
  return (
    <div className="col-span-1">
      <div className="relative">
        <img
          src="https://imagesrpc.s3.ap-south-1.amazonaws.com/images/varify/project/197/cover/cover.jpg"
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
