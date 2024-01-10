"use client";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button } from "@mantine/core";
import { useAtom } from "jotai";
import { readMoreAtom } from "@/app/store/drawer";

function ProjectDrawer() {
  const [{ expanded, content }, setReadMore] = useAtom(readMoreAtom);
  const handleReadMoreClick = () => {
    setReadMore((prev) => ({ ...prev, expanded: !prev.expanded }));
  };
  console.log(content);

  return (
    <>
      <Drawer
        offset={8}
        radius="md"
        opened={expanded}
        onClose={handleReadMoreClick}
        title="About Sarang By Sumadhura"
        position="right"
      >
        <div className="w-[90%] ">{content}</div>
        {/* Drawer content */}
      </Drawer>
    </>
  );
}

export default ProjectDrawer;
