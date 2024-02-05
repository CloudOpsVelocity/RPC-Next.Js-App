import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { comparingIcon, tagIcon } from "@/app/images/commonSvgs";
import LoginPop from "@/app/components/molecules/popups/login";
import S from "@/app/styles/Rating.module.css";
function LoginPopup({
  type,
  card,
}: {
  type: "Shortlist" | "Compare";
  card: boolean;
}) {
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
        size={"30%"}
      >
        <LoginPop />
      </Modal>
      {card ? (
        <button
          className="mt-[-30px] rounded-[10px] relative bottom-[35px] z-10 p-[8px] text-[#0073C6] text-[18px] font-[700] flex pl-[4px] justify-center items-center bg-gradient-to-r from-[#EFF5FF] /0 to-[#F2FAFF]/100"
          onClick={() => open()}
        >
          <div className=" w-[24px] h-[24px] ">
            {type == "Shortlist" ? tagIcon : comparingIcon}
          </div>
          <div>ShortList</div>
        </button>
      ) : (
        <button
          onClick={open}
          className="text-[20px] flex justify-center items-center gap-[8px]  cursor-pointer lg:text-[24px] text-[#0073C6] font-[600] underline whitespace-nowrap decoration-dashed "
        >
          {type == "Shortlist" ? tagIcon : comparingIcon}
          Add to {type}
        </button>
      )}
    </>
  );
}
export default LoginPopup;
