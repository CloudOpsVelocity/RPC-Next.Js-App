import React from "react";
import clsx from "clsx";
import { Area } from ".";
import { Carousel } from "@mantine/carousel";
import styles from "@/app/styles/Map.module.css";
import {
  ImgCarouselIcon,
  NextDarkButton,
  PrevCarouselIcon,
  PrevDarkButton,
} from "@/app/images/commonSvgs";
const CustomScrollArea: React.FC<{
  areas: Area[];
  selected: string;
  setSelected: (key: string) => void;
}> = ({ areas, selected, setSelected }) => {
  return (
    <Carousel
      align="start"
      // w={"90%"}
      // px={40}
      nextControlIcon={<NextDarkButton className="w-[10px]  h-[10px]" />}
      previousControlIcon={<PrevDarkButton className="w-[10px]  h-[10px]" />}
      classNames={styles}
      m={"auto"}
    >
      {areas.map(({ Icon, name, key }, index) => (
        <Carousel.Slide key={key} className="max-w-fit">
          <button
            key={key}
            onClick={() => setSelected(key ?? "")}
            className={clsx(
              "inline-flex justify-center items-center gap-1.5 px-2.5 py-1.5 text-[#0073C6] text-[12px] sm:text-[26px] not-italic font-medium leading-[normal] capitalize rounded border border-solid border-[#0073C6] ml-1 sm:ml-8 min-w-fit ",
              selected === key && "!text-white font-semibold bg-[#0073C6] "
            )}
          >
            <div className="hidden sm:block">
              <Icon stroke={clsx(selected === key ? "#FFF" : "#0073C6")} />
            </div>
            {name}
          </button>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default CustomScrollArea;
