"use client";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import Form from "./form";

function AuthPopup() {
  const [opened, { open, close }] = useDisclosure(false);
  console.log(opened);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="This is a fullscreen modal"
        transitionProps={{ transition: "fade", duration: 200 }}
        zIndex={1000}
        maw={"max-content"}
        size={"80%"}
      >
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
