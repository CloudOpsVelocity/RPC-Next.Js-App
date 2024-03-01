import { PopupOpenSvg } from "@/app/images/commonSvgs";
import { Flex, Image, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import SharePopup from "../../atoms/SharePopup";
import { imageUrlParser } from "@/app/utils/image";
import Close from "../button/close";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import S from "@/app/styles/ImgCarousel.module.css";
import NextImage from "next/image";
export default function MasterPlanPopup({ url }: { url: string }) {
  const [opened, { open, close }] = useDisclosure(false);

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
        size={"90%"}
      >
        <div className="h-auto scrollbar-hide flex justify-end flex-col items-center">
          <div className="w-full bg-transparent    h-[57px] flex items-center justify-between  z-[1000] px-10 max-w-[91rem] m-auto">
            <div className="text-white text-2xl not-italic font-bold leading-[normal]">
              Master Plan
            </div>
            <div className="flex justify-center items-center gap-5">
              <SharePopup title="Share" url={imageUrlParser(url || "")} />
              <Close close={close} />
            </div>
          </div>
          <TransformWrapper>
            <TransformComponent>
              <Image
                radius="md"
                m={"auto"}
                fit="fill"
                src={url}
                component={NextImage}
                height={800}
                width={1400}
                alt="master plan"
                className="cursor-pointer border-[5px] bg-white border-white min-w-[1400px] max-h-[770px]"
              />
            </TransformComponent>
          </TransformWrapper>
        </div>
      </Modal>

      <button onClick={open}>
        <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[33px] lg:h-[33px] absolute bottom-10 right-3 z-50 " />
      </button>
    </>
  );
}
