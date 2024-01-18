import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { PopupOpenSvg } from "@/app/images/commonSvgs";

export default function Gallery() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        {/* Modal content */}
      </Modal>
      <button onClick={open}>
        <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[33px] lg:h-[33px] absolute bottom-3 right-3 z-50 " />
      </button>
    </>
  );
}
