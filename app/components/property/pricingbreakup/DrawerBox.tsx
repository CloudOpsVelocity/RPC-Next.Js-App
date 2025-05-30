"use client";
import React, { ReactNode, useEffect, useRef } from "react";
// import { MdClose } from 'react-icons/md';
import Close from "../../project/button/close";

type Props = {
  children: ReactNode;
  isOpen?: boolean;
  handleChange?: any;
  containerClassStyle?: string;
  title?: string;
  hideHeader?: boolean;
  childrenContainerClass?: string;
  HeadingElemnt?: ReactNode;
  iconBox?:any;
};

function DrawerBox({
  children,
  isOpen,
  handleChange,
  containerClassStyle,
  title,
  hideHeader,
  childrenContainerClass,
  HeadingElemnt,
  iconBox
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const onMainConClick = (e: any) => {
    if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
      document.body.style.overflow = "unset";
      window.history.back();
      handleChange(false);
    }
  };

  useEffect(() => {
    const handleClose = () => {
      document.body.style.overflow = "unset";
      handleChange(false);
      window.history.back();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.history.pushState(null, "", window.location.href);

      const onPopState = () => handleClose();
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") handleClose();
      };

      window.addEventListener("popstate", onPopState);
      window.addEventListener("keydown", onKeyDown);

      return () => {
        window.removeEventListener("popstate", onPopState);
        window.removeEventListener("keydown", onKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
      console.log("scroll cccc");
      window.history.back();
    }
  }, [isOpen, handleChange]);

  // swipping
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e:any) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e:any) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const threshold = 50;
    if (touchEndX.current - touchStartX.current > threshold) {
      console.log("Swiped Left to Right");
      document.body.style.overflow = "unset";
      window.history.back();
      handleChange(false);
    }
  };


  return (
    <div
      className="fixed w-full min-h-[calc(100vh-70px)] flex justify-end items-end overflow-hidden z-[1000] right-0 top-[70px] bg-black/30 mb-[2rem]"
      onClick={(e) => onMainConClick(e)}
    >
      <div
        id="modalDrawerPopupInnerCon"
        ref={cardRef}
        className={`relative bg-white flex flex-col overflow-y-auto shrink-0 z-[3] overflow-x-hidden min-h-[calc(100vh-70px)] h-full w-full md:w-[400px] xl:w-[560px] ${
          containerClassStyle ? containerClassStyle : ""
        } ${` top-0 right-0 h-full shadow-lg transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {hideHeader !== true && (
          <div className="flex justify-between items-center w-full px-[16px] mt-[16px] ">
            {title &&
            <h3 className="text-[#001F35] sm:text-[20px] xl:text-[24px] font-[600]">
              {title}
            </h3>
            }
            {HeadingElemnt ? HeadingElemnt : ""}
            {iconBox ? iconBox : ""}
            <Close
              close={() => {
                document.body.style.overflow = "unset";
                handleChange(false);
                // window.history.replaceState(null, "", window.location.href);
                window.history.back();
              }}
              className=" hover:bg-gray-100 rounded-full w-[30px] h-[30px]"
            />
          </div>
        )}

        <div className={`w-full rounded-[4px] ${childrenContainerClass ? childrenContainerClass : ""}`}>{children}</div>
      </div>
    </div>
  );
}

export default DrawerBox;
