"use client";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Modal, Button, em } from "@mantine/core";
import { comparingIcon, tagIcon } from "@/app/images/commonSvgs";
import LoginPop from "@/app/components/molecules/popups/login";
import S from "@/app/styles/Rating.module.css";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
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
      }}
      size={isMobile ? "100%" : "30%"}
      zIndex={1000}
    >
      <LoginPop close={close} />
    </Modal>
  );
}
export default LoginPopup;
