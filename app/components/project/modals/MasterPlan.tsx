import { PopupOpenSvg } from "@/app/images/commonSvgs";
import { Flex, Image, Modal } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import SharePopup from "../../atoms/SharePopup";
import { imageUrlParser } from "@/app/utils/image";
import Close from "../button/close";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import S from "@/app/styles/ImgCarousel.module.css";
import NextImage from "next/image";
import { Controls } from "./Carousel";
export default function MasterPlanPopup({ url }: { url: string }) {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery(`(max-width: 750px`);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        classNames={{
          close: S.close,
          content: S.content,
          header: S.header,
          overlay: S.overlay,
          inner: S.inner,
        }}
        size={isMobile ? "100%" : "90%"}
        centered={isMobile}
      >
        <div className="h-auto scrollbar-hide flex justify-end flex-col items-center">
          <div className="w-full bg-transparent    h-[57px] flex items-center justify-between  z-[1000] md:px-10 max-w-[91rem] m-auto">
            <div className="text-white sm:text-2xl not-italic font-bold leading-[normal]">
              Master Plan
            </div>
            <div className="flex justify-center items-center gap-5">
              <SharePopup title="Share" url={imageUrlParser(url || "")} />
              <Close close={close} />
            </div>
          </div>
          <div className="relative">
            <TransformWrapper>
              <TransformComponent>
                <Image
                  radius="md"
                  m={"auto"}
                  // fit="fill"
                  src={url}
                  // component={NextImage}
                  mah={750}
                  // w="100%"
                  fit="contain"
                  alt="master plan"
                  className="cursor-pointer border-[5px] bg-white border-white md:min-w-[1400px] max-h-[770px] object-contain"
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
        </div>
      </Modal>
      <Image
        radius="md"
        src={`${url}`}
        mah={600}
        w="100%"
        fit="contain"
        onClick={open}
        className="cursor-pointer shadow-[0px_4px_30px_0px_rgba(0,0,0,0.25)] rounded-[14px] border-[0.5px] border-solid border-[#D2CDCD] py-4"
      />
      <button onClick={open}>
        <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[33px] lg:h-[33px] absolute bottom-10 right-3 z-50 " />
      </button>
    </>
  );
}
