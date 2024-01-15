"use client";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button } from "@mantine/core";
import { useAtom } from "jotai";
import { AtomContent, readMoreAtom } from "@/app/store/drawer";
import S from "@/app/styles/Drawer.module.css";
import { AmenityList } from "@/app/validations/types/project";
import Flex from "../molecules/Utils/Flex";
function ProjectDrawer() {
  const [{ expanded, content, type }, setReadMore] = useAtom(readMoreAtom);
  const handleReadMoreClick = () => {
    setReadMore((prev) => ({ ...prev, expanded: !prev.expanded }));
  };

  return (
    <>
      <Drawer
        classNames={{
          title: S.title,
          header: S.header,
          close: S.close,
        }}
        offset={8}
        radius="md"
        opened={expanded}
        onClose={handleReadMoreClick}
        title="About Sarang By Sumadhura"
        position="right"
        size={"50%"}
      >
        <h1 className="uppercase text-[24px] lg:text-[32px] font-[600] text-[#001F35]">
          about{" "}
          <span className="text-[#148B16] font-[700] uppercase">sarang</span>
        </h1>
        <div className="w-[90%] text-[#233333] text-xl mt-5">
          {type === "content" ? (
            <p>{content}</p>
          ) : (
            <div className="grid grid-cols-5 gap-5">
              {content.map((item: AmenityList, index: number) => (
                <div
                  className="flex justify-center items-center gap-2 p-2.5 border shadow-[0px_4px_10px_0px_rgba(202,233,255,0.30)] rounded-[10px] border-solid border-[#92B2C8];
                  background: #fff"
                  key={item.id}
                >
                  <span className="text-[#57a773] font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-[#6e798c]">{item.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Drawer content */}
      </Drawer>
    </>
  );
}

export default ProjectDrawer;
