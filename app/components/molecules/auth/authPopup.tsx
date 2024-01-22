"use client";
import { Modal, em } from "@mantine/core";
import OtpBox from "../../atoms/OtpBox";
import { useMediaQuery } from "@mantine/hooks";

type props = {
  opened: any;
  open: any;
  close: any;
  userName: string;
  callback: () => void;
  mobile: number | null;
};

function AuthPopup({ opened, open, close, userName, callback, mobile }: props) {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        transitionProps={{ transition: "fade", duration: 200 }}
        zIndex={1000}
        maw={"max-content"}
        size={isMobile ? "90%" : "40%"}
      >
        <OtpBox
          callback={callback}
          userName={userName}
          close={close}
          mobile={mobile}
        />
      </Modal>
    </>
  );
}

export default AuthPopup;
