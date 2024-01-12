"use client";
// import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
// import Form from "./form";
import Button from "../../../elements/button";
import { useSession } from "next-auth/react";
import OtpBox from "../../atoms/OtpBox";

type props = {
  opened: any;
  open: any;
  close: any;
  userName: string;
  callback: () => void;
  mobile: number | null;
};

function AuthPopup({ opened, open, close, userName, callback, mobile }: props) {
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        transitionProps={{ transition: "fade", duration: 200 }}
        zIndex={1000}
        maw={"max-content"}
        size={"40%"}
      >
        {/* {JSON.stringify(session)} */}
        {/* <Form /> */}
        <OtpBox
          callback={callback}
          userName={userName}
          close={close}
          mobile={mobile}
        />
      </Modal>
      {/* 
      <Button
        key={"loginBtn"}
        onChange={() => open()}
        buttonClass=""
        title="OPEN"
      /> */}
    </>
  );
}

export default AuthPopup;
