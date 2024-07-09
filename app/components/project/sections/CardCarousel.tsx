import React from "react";
import Style from "./Carouse.module.css";
import { Carousel } from "@mantine/carousel";
import {
  DarkCarouseIcon,
  DarkNextCarouselButton,
} from "@/app/images/commonSvgs";
import Card from "./Card";
import { useAtomValue, useSetAtom } from "jotai";
import { propertyDetailsTypes } from "@/app/data/projectDetails";
import { currentPhaseAtom, propCgIdAtom } from "@/app/store/vewfloor";
import {
  parital_unit_atom,
  selectedPartialUnitAtom,
} from "@/app/store/partialsUnits";
import Loading from "../../atoms/Loader";
import { formatCurrency } from "@/app/utils/numbers";

type Props = {
  partialUnitData: any;
};

export default function CardCarousel({ partialUnitData }: Props) {
  const currentPhase = useAtomValue(currentPhaseAtom);
  const propCgId = useAtomValue(propCgIdAtom);
  const selected = useAtomValue(parital_unit_atom);
  const phaseData = partialUnitData[currentPhase];
  const propDetails = propertyDetailsTypes.get(propCgId);
  const apiProp = propDetails?.apiProp ?? "plot";
  const unitData = phaseData ? phaseData[apiProp] : null;

  let key = "";
  let data = [];
  if (unitData && Object.keys(unitData).length > 0) {
    key = Object.keys(unitData)[selected ?? 0];
    if (unitData[key] && unitData[key].unitDataDtoList) {
      data = unitData[key].unitDataDtoList;
    } else {
      console.warn("No unitDataDtoList found for the given key.");
    }
  } else {
    console.warn("No keys found in unit data.");
  }
  const setData = useSetAtom(selectedPartialUnitAtom);
  return (
    <div className="flex flex-col justify-center items-start gap-[18px] rounded shadow-[0px_4px_10px_0px_rgba(183,208,224,0.32)] p-[18px] border-l-[#B1BEC7] border-y-[#B1BEC7] border-t border-solid border-b border-l bg-[#fafafafa] mt-10">
      <p className="text-[color:var(--Black-2,#333)] text-base not-italic font-semibold">
        {data.length} floor plans available
      </p>
      {data.length > 0 ? (
        <Carousel
          classNames={Style}
          slideSize="20.333333%"
          slideGap="md"
          align="start"
          slidesToScroll={3}
          nextControlIcon={<DarkNextCarouselButton />}
          previousControlIcon={<DarkCarouseIcon />}
          mih={120}
        >
          {data.map((item: any, index: number) => (
            <Carousel.Slide key={index}>
              <Card
                cardClick={() =>
                  setData({
                    main: index,
                    others: data,
                    priceRange: `${formatCurrency(
                      unitData[key].minPrice
                    )} - ${formatCurrency(unitData[key].maxPrice)}`,
                  })
                }
                {...item}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      ) : (
        <div>No Units Available</div>
      )}
    </div>
  );
}
