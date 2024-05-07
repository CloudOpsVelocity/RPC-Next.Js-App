import { PopupOpenSvg } from "@/app/images/commonSvgs";
import { Flex, Image, Modal } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import SharePopup from "../../atoms/SharePopup";
import { imageUrlParser } from "@/app/utils/image";
import Close from "../button/close";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import S from "@/app/styles/ImgCarousel.module.css";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import { useSession } from "next-auth/react";
export default function MasterPlanPopup({
  url,
  onDownload,
}: {
  url: string;
  onDownload: () => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery(`(max-width: 750px`);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        classNames={{
          close: S.close,
          content: S.mContent,
          header: S.header,
          overlay: S.mOverlay,
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
              <a
                className="flex justify-center items-center gap-1 p-2 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] rounded-[10px] bg-[#F3F7FF] text-[#0073C6] text-base not-italic font-semibold leading-[normal] tracking-[0.32px]"
                onClick={onDownload}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM4 20V15H6V18H18V15H20V20H4Z"
                    fill="#0073C6"
                  />
                </svg>{" "}
                Download
              </a>
              <SharePopup
                title="Share"
                url={imageUrlParser(url || "")}
                className="text-[#0073C6] text-base not-italic font-semibold leading-[normal] tracking-[0.32px]"
              />
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
                  mah={700}
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
        <div className="bg-[#F4FBFF] p-[10px] rounded-[29px] gap-[12px] flex justify-end items-center  cursor-pointer absolute bottom-10 right-4 z-50 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.40)]">
          <p className="text-[#0073C6] text-xl not-italic font-semibold leading-[normal] underline capitalize">
            Click on image to open master plan
          </p>
          <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px]  " />
        </div>{" "}
      </button>
    </>
  );
}
