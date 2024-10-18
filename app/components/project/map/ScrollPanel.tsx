import React from "react";
import clsx from "clsx";
import { Area, areasMap } from ".";
import { Carousel } from "@mantine/carousel";
import styles from "@/app/styles/Map.module.css";
import {
  ImgCarouselIcon,
  NextDarkButton,
  PrevCarouselIcon,
  PrevDarkButton,
} from "@/app/images/commonSvgs";
import { useMediaQuery } from "@mantine/hooks";

const CustomScrollArea: React.FC<{
  areas: Area[];
  selected: string;
  setSelected: (key: string) => void;
  data: any;
}> = ({ areas, selected, setSelected, data }) => {
  const isMobile = useMediaQuery("(max-width: 601px)");
  return (
    <Carousel
      align="start"
      w={"100%"}
      withControls={
        !isMobile ? (Object.keys(data).length > 6 ? true : false) : true
      }
      draggable={
        !isMobile ? (Object.keys(data).length > 6 ? true : false) : true
      }
      px={isMobile ? 0 : 40}
      {...(!isMobile && { nextControlIcon: <NextDarkButton /> })}
      {...(!isMobile && { previousControlIcon: <PrevDarkButton /> })}
      classNames={styles}
      nextControlProps={{
        style: {
          background: "#8c9096",
          color: "white",
        },
      }}
      previousControlProps={{
        style: {
          background: "#8c9096",
          color: "white",
        },
      }}
    >
      {Object.keys(data).map((key, index) => {
        const isAvail = !!data[key as string];
        if (!isAvail) return null;
        const Icon = areasMap.get(key).Icon;
        const name = areasMap.get(key).name;
        return (
          <Carousel.Slide key={key} className="max-w-fit">
            <h4
              key={key}
              onClick={() => setSelected(key ?? "")}
              className={clsx(
                "inline-flex justify-center items-center gap-1.5 px-2.5 py-1.5 text-[12px] text-[#0073C6] md:text-[20px] xl:text-[26px] not-italic font-medium leading-[normal] capitalize rounded border border-solid border-[#0073C6]  ml-3 sm:ml-8 min-w-fit ",
                selected === key && "!text-white font-semibold bg-[#0073C6] "
              )}
            >
              <Icon
                stroke={clsx(selected === key ? "#FFF" : "#0073C6")}
                className="w-[18px] h-[18px]"
              />
              {name}
            </h4>
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
};

export default CustomScrollArea;
