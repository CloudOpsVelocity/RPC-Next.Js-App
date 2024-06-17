import {
  RestaurentIcon,
  ZoomInIcon,
  ZoomOutIcon,
  newIcons,
} from "@/app/images/commonSvgs";
import React from "react";
import { useControls } from "react-zoom-pan-pinch";

type Props = {};

export default function ZoomInOut({}: Props) {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  const handleButtonClick = (type: string) => {
    switch (type) {
      case "zoomIn":
        zoomIn();
        break;
      case "zoomOut":
        zoomOut();
        break;
      case "resetTransform":
        resetTransform();
        break;
    }
  };
  return (
    <div className="flex justify-center items-center gap-4 absolute bottom-5 right-14">
      {config.buttons.map((item, index) => (
        <button
          key={index}
          className={config.styles}
          onClick={() => handleButtonClick(item.onClick)}
        >
          {item.icon}
          <span className="hidden sm:block">{item.title}</span>
        </button>
      ))}
    </div>
  );
}

const config = {
  styles:
    "flex justify-center items-center gap-2.5 px-[7px] py-1.5 rounded-2xl border-[0.8px] border-solid border-[#616D75] bg-[#EAEAEA] text-[#333] text-base not-italic font-semibold",
  buttons: [
    {
      icon: <ZoomInIcon />,
      title: "Zoom In",
      onClick: "zoomIn",
    },
    {
      icon: <ZoomOutIcon />,
      title: "Zoom Out",
      onClick: "zoomOut",
    },
    {
      icon: newIcons.get("resetIcon"),
      title: "Reset",
      onClick: "resetTransform",
    },
  ],
};
