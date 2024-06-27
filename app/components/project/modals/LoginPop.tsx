"use client";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Modal, Button, em } from "@mantine/core";
import { comparingIcon, tagIcon } from "@/app/images/commonSvgs";
import LoginPop from "@/app/components/molecules/popups/login";
import S from "@/app/styles/Rating.module.css";

import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import Close from "../button/close";
function LoginPopup() {
  const [opened, { close }] = usePopShortList();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      classNames={{
        title: S.title,
        root: S.root,
        close: S.close,
        content: S.content,
        overlay: S.overlay,
        header: S.headerCustomLoginPopup,
        body: S.bodyPadding,
      }}
      size={isMobile ? "100%" : "30%"}
      zIndex={1000}
    >
      <Close
        className="absolute  right-3 top-3 size-6 cursor-pointer "
        close={close}
      />
      <LoginPop close={close} />
    </Modal>
  );
}
export default LoginPopup;
