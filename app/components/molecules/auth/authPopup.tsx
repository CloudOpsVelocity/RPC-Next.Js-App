"use client";
// import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
// import Form from "./form";
import Button from "../../../elements/button";
import { useSession } from "next-auth/react";
import OtpBox from "@/app/(auth)/otp/page";

type props = {
  opened: any;
  open: any;
  close: any;
  userName: string;
};

function AuthPopup({ opened, open, close, userName }: props) {
  const { data: session } = useSession();

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        transitionProps={{ transition: "fade", duration: 200 }}
        zIndex={1000}
        maw={"max-content"}
        size={"80%"}
      >
        {/* {JSON.stringify(session)} */}
        {/* <Form /> */}
        <OtpBox userName={userName} />
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
