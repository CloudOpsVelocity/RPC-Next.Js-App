"use client";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button } from "@mantine/core";
import { useAtom } from "jotai";
import { readMoreAtom } from "@/app/store/drawer";
import S from "@/app/styles/Drawer.module.css";
function ProjectDrawer() {
  const [{ expanded, content }, setReadMore] = useAtom(readMoreAtom);
  const handleReadMoreClick = () => {
    setReadMore((prev) => ({ ...prev, expanded: !prev.expanded }));
  };

  return (
    <>
      <Drawer
        classNames={{
          title: S.title,
          header: S.header,
        }}
        offset={8}
        radius="md"
        opened={expanded}
        onClose={handleReadMoreClick}
        title="About Sarang By Sumadhura"
        position="right"
        size={"50%"}
      >
        <div className="w-[90%] text-[#233333] text-xl">{content}</div>
        {/* Drawer content */}
      </Drawer>
    </>
  );
}

export default ProjectDrawer;
