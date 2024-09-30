import { useRef } from "react";
import Image from "next/image";

import { ImagesScrollIcon } from "@/app/images/commonSvgs";
import { setPropertyValues } from "@/app/utils/dyanamic/projects";
import { useAtom } from "jotai";
import { unitFloorsAtom } from "../byunitblock";
import { useMediaQuery } from "@mantine/hooks";

const UnitsImagesBlock = ({
  propCgId,
  form: { setValues },
}: {
  propCgId: number;
  form: any;
}) => {
  const [floorsArray, setFloorArray] = useAtom(unitFloorsAtom);
  const containerRef = useRef<HTMLDivElement>(null);
  const filteredUrlsArray = floorsArray.filter(
    (eachObj: { floorPlanUrl: undefined }) => eachObj.floorPlanUrl !== undefined
  );

  const isTab = useMediaQuery("(min-width: 1280px)");

  const selectImg = (index: number) => {
    setValues(setPropertyValues(floorsArray[index], propCgId));
    handleSearch(index);
  };
  const handleSearch = (index: number): void => {
    const filteredFloors = floorsArray?.filter(
      // @ts-ignore
      (floor: any) => floor.unitNumber === floorsArray[index].unitNumber
    );
    // @ts-ignore
    setFloorArray(filteredFloors);
  };

  const onScrollingLeftAndRight = (direction: string) => {
    const ele = containerRef.current;

    if (ele) {
      if (direction == "L") {
        ele.scrollLeft -= 100;
      } else {
        ele.scrollLeft += 100;
      }
    }
  };

  const maxValue = !isTab ? 3 : 6;
  if(filteredUrlsArray?.length > 0){
  return (
      <div className="flex justify-between items-center w-full mt-[10px] mb-[10px] gap-[16px] ">
          {filteredUrlsArray?.length > maxValue && (
            <ImagesScrollIcon
              className=" rotate-180 h-[30px] select-none w-[30px] rounded-[50%] bg-[gray] cursor-pointer "
              onClick={() => onScrollingLeftAndRight("L")}
            />
          )}

          <div
            ref={containerRef}
            className="flex justify-start scroll-smooth scrollbar-hide items-center w-full max-w-[800px] overflow-x-auto gap-[10px] "
          >
            {floorsArray.map((eachOne: any, index: number) => {
              let imgUrl = eachOne.floorPlanUrl;
              if (imgUrl !== undefined && imgUrl !== "") {
                return (
                  <Image
                    className="cursor-pointer border max-h-[64px] border-indigo-600 border-1 border-solid rounded-[4px] "
                    key={`unitsImgUrl_${imgUrl[index]}`}
                    src={imgUrl}
                    width={100}
                    height={100}
                    alt="not found"
                    onClick={() => selectImg(index)}
                  />
                );
              }
            })}
          </div>

          {filteredUrlsArray?.length > maxValue && (
            <ImagesScrollIcon
              className=" h-[30px] w-[30px] select-none rounded-[50%] bg-[gray] cursor-pointer "
              onClick={() => onScrollingLeftAndRight("R")}
            />
          )}
      </div>
  )}
};

export default UnitsImagesBlock;
