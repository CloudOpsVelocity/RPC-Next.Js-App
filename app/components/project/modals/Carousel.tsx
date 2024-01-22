import { Dispatch, SetStateAction, useState } from "react";
import { Button, Modal, rem } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { PopupOpenSvg } from "@/app/images/commonSvgs";
import { RightSection } from "./FloorPlan";
import S from "@/app/styles/ModalCarousel.module.css";
type CarouselModalProps = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

function CarouselModal({ opened, setOpened }: CarouselModalProps) {
  const TRANSITION_DURATION = 200;
  //   const [opened, setOpened] = useState(false);

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
          <RightSection propCgId={""} />
        </div>
        <Carousel
          loop
          w={"70%"}
          m={"auto"}
          withIndicators
          height={100}
          slideSize={{ base: "100%", sm: "50%", md: "20.333333%" }}
          slideGap={{ base: 0, sm: "md" }}
          align="start"
          slidesToScroll={5}
          mb={20}
        >
          <Carousel.Slide>
            <img
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png"
              alt="Cat"
              style={{ width: rem(150), height: rem(100), objectFit: "cover" }}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <img
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png"
              alt="Cat"
              style={{ width: rem(150), height: rem(100), objectFit: "cover" }}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <img
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png"
              alt="Cat"
              style={{ width: rem(150), height: rem(100), objectFit: "cover" }}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <img
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png"
              alt="Cat"
              style={{ width: rem(150), height: rem(100), objectFit: "cover" }}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <img
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png"
              alt="Cat"
              style={{ width: rem(150), height: rem(100), objectFit: "cover" }}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <img
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png"
              alt="Cat"
              style={{ width: rem(150), height: rem(100), objectFit: "cover" }}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <img
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png"
              alt="Cat"
              style={{ width: rem(150), height: rem(100), objectFit: "cover" }}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <img
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png"
              alt="Cat"
              style={{ width: rem(150), height: rem(100), objectFit: "cover" }}
            />
          </Carousel.Slide>
        </Carousel>
      </Modal>
    </>
  );
}

export default CarouselModal;

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
