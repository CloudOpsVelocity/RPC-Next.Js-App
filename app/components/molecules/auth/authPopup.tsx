"use client";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import Form from "./form";
import Button from '../../../elements/button';

function AuthPopup() {
  const [opened, { open, close }] = useDisclosure(false);
  console.log(opened);

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
        <Form />
      </Modal>

      <Button
        key={"loginBtn"}
        onChange={()=>open()}
        buttonClass="login-btn text-[20px] font-semibold px-5 py-2 rounded-full text-[#0073C6] border-none underline bg-gradient-to-r from-[#EFF8FF] to-[#FFF] shadow-md"
        title="Login/ Sign up"
      />
      
    </>
  );
}

export default AuthPopup;
