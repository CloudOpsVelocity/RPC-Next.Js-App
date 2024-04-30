"use client";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Drawer, Button, em } from "@mantine/core";
import { useAtom } from "jotai";
import { readMoreAtom } from "@/app/store/drawer";
import S from "@/app/styles/Drawer.module.css";
import { AmenityList } from "@/app/validations/types/project";
import { amenitiesGroupList } from "@/app/images/commonSvgs";
import React from "react";
import Close from "./button/close";
function ProjectDrawer({ projName }: { projName: string }) {
  const [
    { expanded, content, type, title, showProjName, builderName },
    setReadMore,
  ] = useAtom(readMoreAtom);
  const handleReadMoreClick = () => {
    setReadMore((prev) => ({
      ...prev,
      expanded: false,
      builderName: "",
    }));
  };
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return (
    <>
      <Drawer
        classNames={{
          title: S.title,
          header: S.header,
          close: S.close,
          overlay: S.overlay,
          content: S.content,
        }}
        offset={8}
        radius="md"
        opened={expanded}
        onClose={handleReadMoreClick}
        position="right"
        size={isMobile ? "100%" : "60%"}
        zIndex={100}
      >
        <div className="mt-4 flex justify-between mb-8">
          <h1 className="uppercase text-[24px] lg:text-[32px] font-[600] text-[#001F35] pl-[57px] max-w-[950px]">
            {builderName ? "About Builder" : title}{" "}
            {showProjName && (
              <span className="text-[#148B16] font-[700] uppercase">
                {builderName || projName}
              </span>
            )}
          </h1>
          <Close close={handleReadMoreClick} />
        </div>

        <div className="w-[90%] text-[#233333] text-xl mt-5 pl-[57px] pb-20">
          {type === "content" ? (
            <p>{content}</p>
          ) : (
            <div className="flex flex-wrap w-full">
              {content.data.map((eachItem: AmenityList, index: number) => {
                if (amenitiesGroupList.get(eachItem.id) != null) {
                  const amenitiesFromDB = content.amenitiesFromDB;
                  return (
                    <React.Fragment>
                      {amenitiesFromDB != undefined &&
                        amenitiesFromDB != null &&
                        Object.keys(amenitiesFromDB).map((group, ind) => {
                          return (
                            <React.Fragment>
                              {amenitiesFromDB != undefined &&
                                amenitiesFromDB != null &&
                                amenitiesFromDB[`${group}`] != undefined &&
                                amenitiesFromDB[`${group}`] != null &&
                                amenitiesFromDB[`${group}`].length != 0 &&
                                amenitiesFromDB[group].map(
                                  (eachOne: any, index: number) => {
                                    if (eachOne.cid == eachItem.id) {
                                      return (
                                        <div
                                          key={ind}
                                          className="flex items-center rounded-[10px] gap-[8px] shadow-md border-solid border-[1px] mr-[24px] mb-[24px] border-[#a5bfd8] px-2.5 py-0.5 w-fit text-[#001F35] font-[500] text-[18px] lg:text-[20px] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#FFF] text-secondary-foreground hover:bg-gray-100/80"
                                        >
                                          {amenitiesGroupList.get(eachItem.id)}
                                          {eachOne.constDesc}
                                        </div>
                                      );
                                    }
                                  }
                                )}
                            </React.Fragment>
                          );
                        })}
                    </React.Fragment>
                  );
                }
              })}
            </div>
          )}
        </div>
        {/* Drawer content */}
      </Drawer>
    </>
  );
}

export default ProjectDrawer;
