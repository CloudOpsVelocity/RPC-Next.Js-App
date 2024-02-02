"use client";
import S from "@/app/styles/Share.module.css";
import {
  EmailIcon,
  FacbookIcon,
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

export default function SharePopup({
  title = "Share Project",
}: {
  title?: string;
}) {
  const clipboard = useClipboard({ timeout: 500 });
  const pathname = usePathname();
  const CopiedUrl = `${process.env.NEXT_PUBLIC_PROJECT_URL}/${pathname}`;

  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        size={isMobile ? "70%" : "30%"}
        classNames={{
          close: S.close,
          content: S.body,
          overlay: S.overlay,
        }}
      >
        <>
          <div className="p-5">
            <h3 className="text-[#202020] text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px] ">
              {title}
            </h3>
            <p className="text-[#565D70] text-xl not-italic font-semibold leading-[normal] tracking-[0.8px] my-5">
              Share this link via
            </p>
            <div className="flex space-x-4 mb-4">
              <Share shareUrl={CopiedUrl} />
            </div>
            <p className="text-sm font-medium mb-2">or Copy Link</p>
            <div className="flex items-center justify-between border rounded-md p-2">
              <span
                className="text-xs truncate cursor-pointer"
                onClick={() => clipboard.copy(CopiedUrl)}
              >
                {CopiedUrl}
              </span>
              <CopyButton value={CopiedUrl}>
                {({ copied, copy }) => (
                  <Button
                    className={`${
                      clipboard.copied ? "!bg-[#148B16]" : "!bg-[#0073C6]"
                    }`}
                    color={clipboard.copied ? "teal" : "#0073C6"}
                    miw={100}
                    onClick={() => clipboard.copy(CopiedUrl)}
                  >
                    {clipboard.copied ? "Copied" : "Copy url"}
                  </Button>
                )}
              </CopyButton>
            </div>
          </div>
        </>
      </Modal>

      <button
        onClick={open}
        className={`shadow-md cursor-pointer gap-[4px] p-[8px] flex justify-center items-center rounded-[20px] bg-[#F3F7FF] text-[#0073C6] text-[14px] font-[600]  max-w-[140px] ml-auto ${
          title === "Share Project" ? "mt-[13px]" : ""
        }`}
      >
        <ShearIcon />
        {title}
      </button>
    </>
  );
}

const Share = ({ shareUrl }: { shareUrl: string }) => {
  const title = "Share with friends";
  return (
    <>
      <div className="Demo__some-network">
        <FacebookShareButton
          url={shareUrl}
          className="Demo__some-network__share-button"
        >
          {FacbookIcon}
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
        <TelegramShareButton
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          {Telegram}
        </TelegramShareButton>
      </div>

      <div className="Demo__some-network">
        <WhatsappShareButton
          url={shareUrl}
          title={title}
          separator=":: "
          className="Demo__some-network__share-button"
        >
          {WhatsAppIcon}
        </WhatsappShareButton>
      </div>

      <div className="Demo__some-network">
        <EmailShareButton
          url={shareUrl}
          subject={title}
          body="body"
          className="Demo__some-network__share-button"
        >
          {EmailIcon}
        </EmailShareButton>
      </div>
    </>
  );
};
