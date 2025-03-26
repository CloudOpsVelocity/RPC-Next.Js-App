"use client";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect } from "react";
import {
  CompareListingMessage,
  // CompareMessage
} from "../../project/success";
import { Modal } from "@mantine/core";
import Close from "../../project/button/close";
import S from "@/app/styles/Qna.module.css";
import { useErrorListing } from "@/app/hooks/property/useError";
const CompareError = () => {
  const [opened, { close, open: openSuccesPopup }] = useErrorListing();
  const isMobile = useMediaQuery(`(max-width: 750px)`);
  useEffect(() => {
    const timer = setTimeout(() => {
      close();
    }, 5000);

    return () => clearTimeout(timer);
  }, [close]);
  return (
    <Modal
      classNames={{
        title: S.title,
        root: S.root,
        close: S.close,
        content: S.content,
        overlay: S.overlay,
        header: S.disabled,
        body: S.body,
      }}
      opened={opened.status}
      onClose={close}
      centered
      title="Add Rating"
      size={isMobile ? "100%" : "auto"}
    >
      <Close close={close} className="absolute top-2 right-2 z-50" />

      <CompareListingMessage />
    </Modal>
  );
};
export default CompareError;
