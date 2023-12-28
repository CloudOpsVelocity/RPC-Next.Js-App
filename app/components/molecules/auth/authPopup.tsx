"use client";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import Form from "./form";
import { useSession } from "next-auth/react";

function AuthPopup() {
  const { data: session } = useSession();
  const [opened, { open, close }] = useDisclosure(false);

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
        {JSON.stringify(session)}
        <Form />
      </Modal>

      <Button
        onClick={open}
        radius={"xl"}
        className="login-btn text-[20px] font-semibold px-5 py-2 rounded-full text-[#0073C6] border-2 border-white underline "
      >
        Login & Signup
      </Button>
    </>
  );
}

export default AuthPopup;
