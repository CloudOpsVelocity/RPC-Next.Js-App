"use client";
import S from "@/app/styles/Share.module.css";
import {
  EmailIcon,
  FacbookIcon,
  PinIcon,
  ShearIcon,
  Telegram,
  WhatsAppIcon,
} from "@/app/images/commonSvgs";
import { Button, CopyButton, Modal, em } from "@mantine/core";
import { useClipboard, useDisclosure, useMediaQuery } from "@mantine/hooks";
import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookShareCount,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Close from "../project/button/close";

export default function SharePopup({
  title = "Share Project",
  url,
  className,
  titleText,
}: {
  title?: string;
  url?: string;
  className?: string;
  titleText?: string;
}) {
  const clipboard = useClipboard({ timeout: 700 });
  const pathname = usePathname();
  const CopiedUrl = url
    ? url
    : `${process.env.NEXT_PUBLIC_PROJECT_URL}/${pathname}`;

  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        size={isMobile ? "70%" : "40%"}
        classNames={{
          close: S.close,
          content: S.body,
          overlay: S.overlay,
          header: S.header,
          body: S.remove_padding,
        }}
      >
        <div className="p-5">
          <div className="flex justify-between">
            <h3 className="text-[#202020] text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px] ">
              {titleText ?? title}
            </h3>
            <Close close={close} />
          </div>

          <p className="text-[#565D70] text-xl not-italic font-semibold leading-[normal] tracking-[0.8px] my-5">
            Share this link via
          </p>
          <div className="flex space-x-4 mb-4">
            <Share shareUrl={CopiedUrl} />
          </div>
          <p className="text-sm font-medium mb-2">or Copy Link</p>
          <div className="flex items-center justify-between border rounded-md p-2">
            <span
              className="text-black text-base not-italic font-medium leading-[normal] truncate cursor-pointer"
              onClick={() => clipboard.copy(CopiedUrl)}
            >
              {CopiedUrl}
            </span>
            <CopyButton value={CopiedUrl}>
              {() => (
                <button
                  className={`${
                    clipboard.copied ? "!bg-[#148B16]" : "!bg-[#0073C6]"
                  } flex justify-center items-center gap-1 shadow-[0px_4px_20px_0px_rgba(112,144,176,0.08)] p-2 rounded-[5px] text-white text-xl not-italic font-semibold leading-[normal] min-w-fit`}
                  // color={clipboard.copied ? "teal" : "#0073C6"}
                  onClick={() => clipboard.copy(CopiedUrl)}
                >
                  <PinIcon /> {clipboard.copied ? "Copied" : "Copy"}
                </button>
              )}
            </CopyButton>
          </div>
        </div>
      </Modal>

      <button
        onClick={open}
        className={clsx(
          "flex justify-center items-center gap-1 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] p-2 rounded-[10px] bg-[#F3F7FF] ml-auto text-[#0073C6]  not-italic font-semibold leading-[normal] tracking-[0.4px]",
          title === "Share Project" && "mt-[13px]",
          className
        )}
      >
        <ShearIcon className="w-[26px] h-[26px]" />
        {title}
      </button>
    </>
  );
}

const Share = ({ shareUrl }: { shareUrl: string }) => {
  const title = "Share with friends";
  return (
    <div className="space-x-10 inline-flex mb-4 mt-1">
      <div className="Demo__some-network">
        <WhatsappShareButton
          url={shareUrl}
          title={title}
          separator=":: "
          className="Demo__some-network__share-button"
          windowWidth={1200}
          windowHeight={700}
        >
          {WhatsAppIcon}
          <p className="mt-1">Whatsapp</p>
        </WhatsappShareButton>
      </div>
      <div className="Demo__some-network">
        <TelegramShareButton
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
          windowWidth={1200}
          windowHeight={700}
        >
          {Telegram}
          <p className="mt-1">Telegram</p>
        </TelegramShareButton>
      </div>
      <div className="Demo__some-network">
        <FacebookShareButton
          url={shareUrl}
          className="Demo__some-network__share-button"
          windowWidth={1200}
          windowHeight={700}
        >
          {FacbookIcon}
          <p className="mt-1">Facebook</p>
        </FacebookShareButton>

        <div>
          <FacebookShareCount
            url={shareUrl}
            className="Demo__some-network__share-count"
          >
            {(count) => count}
          </FacebookShareCount>
        </div>
      </div>
      <div className="Demo__some-network">
        <EmailShareButton
          url={shareUrl}
          subject={title}
          body="body"
          className="Demo__some-network__share-button"
          windowHeight={700}
          windowWidth={1200}
        >
          {EmailIcon}
          <p className="mt-1">Mail</p>
        </EmailShareButton>
      </div>
    </div>
  );
};
