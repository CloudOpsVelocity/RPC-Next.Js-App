import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { comparingIcon, tagIcon } from "@/app/images/commonSvgs";
import LoginPop from "@/app/components/molecules/popups/login";
import S from "@/app/styles/Rating.module.css";
function LoginPopup({ type }: { type: "Shortlist" | "Compare" }) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
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
        size={"35%"}
      >
        <LoginPop />
      </Modal>
      <button
        onClick={open}
        className="text-[20px] flex justify-center items-center gap-[8px]  cursor-pointer lg:text-[24px] text-[#0073C6] font-[600] underline whitespace-nowrap decoration-dashed "
      >
        {type == "Shortlist" ? tagIcon : comparingIcon}
        Add to {type}
      </button>
    </>
  );
}
export default LoginPopup;
