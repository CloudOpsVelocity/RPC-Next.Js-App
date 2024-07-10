import React from "react";
import { BackgroundImage, Center, Box, Text } from "@mantine/core";
import Button from "@/app/components/atoms/buttons/variansts";

type Props = {};

export default function Card({}: Props) {
  return (
    <div className="w-[881.143px] h-[514px] shrink-0 relative">
      <BackgroundImage src="/test.jpg" radius="sm" h={"100%"}>
        <div className="p-6">
          <img
            src="https://im.proptiger.com/3/100683/13/sumadhura-infracon-23973255.jpeg?width=800&height=620"
            alt=""
            className="w-[100px] h-[100px] object-cover"
          />
        </div>
        <div className="absolute right-0 top-0 w-[475px] h-[514px] shrink-0 bg-gradient-to-l from-[#00121F] via-[rgba(59,70,98,0.86)] to-[rgba(86,93,112,0.04)] text-right p-7 flex flex-col justify-between">
          <div>
            <p className="text-white text-[32px] not-italic font-extrabold leading-[normal] tracking-[0.64px]">
              ₹ 99 Lkh - ₹ 12 Cr
            </p>
            <p className="text-white text-[26px] not-italic font-bold leading-[normal] tracking-[0.52px] mt-3">
              Sarang By Sumadhura
            </p>
            <p className="text-white  text-xl not-italic font-bold leading-[normal] tracking-[0.4px] mt-6">
              Apartment, Villa
            </p>
          </div>
          <div className="flex flex-col items-end gap-[19px]">
            <div className="inline-flex gap-3">
              {config.heart} {config.share}
            </div>
            <div>
              <p className="text-white text-[22px] not-italic font-bold leading-[normal] tracking-[0.44px]">
                Start Date: 11 Jan, 2020
              </p>
              <p className="text-white text-[22px] not-italic font-bold leading-[normal] tracking-[0.44px] mt-1">
                End Date: 15 Jan, 2024
              </p>
            </div>
            <ViewAllButton />
            <Button>Request Callback</Button>
          </div>
        </div>
      </BackgroundImage>
    </div>
  );
}

const ViewAllButton: React.FC = () => {
  return (
    <button className="inline-flex max-w-fit justify-center items-center gap-2.5 rounded p-2.5 bg-[#41d1d44d] text-white text-xl not-italic font-bold leading-[normal] tracking-[0.4px]">
      View Detail
    </button>
  );
};

const config = {
  heart: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
    >
      <path
        d="M32.75 16C32.75 24.6913 25.4819 31.75 16.5 31.75C7.51807 31.75 0.25 24.6913 0.25 16C0.25 7.30871 7.51807 0.25 16.5 0.25C25.4819 0.25 32.75 7.30871 32.75 16Z"
        fill="#ECF0F3"
        stroke="#A7C4DA"
        stroke-width="0.5"
      />
      <path
        d="M21.3584 8C18.1041 8 16.5 11.1515 16.5 11.1515C16.5 11.1515 14.8959 8 11.6416 8C8.99691 8 6.90258 10.1736 6.87551 12.7671C6.82037 18.1508 11.2231 21.9794 16.0489 25.1969C16.1819 25.2858 16.3391 25.3333 16.5 25.3333C16.6609 25.3333 16.8181 25.2858 16.9512 25.1969C21.7764 21.9794 26.1791 18.1508 26.1245 12.7671C26.0974 10.1736 24.0031 8 21.3584 8Z"
        stroke="#4D6677"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  share: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="23"
      viewBox="0 0 24 23"
      fill="none"
    >
      <path
        d="M9.26432 11.6668C9.26432 12.293 9.00779 12.8935 8.55116 13.3363C8.09453 13.7791 7.4752 14.0279 6.82943 14.0279C6.18365 14.0279 5.56433 13.7791 5.1077 13.3363C4.65106 12.8935 4.39453 12.293 4.39453 11.6668C4.39453 11.0406 4.65106 10.44 5.1077 9.99722C5.56433 9.55442 6.18365 9.30566 6.82943 9.30566C7.4752 9.30566 8.09453 9.55442 8.55116 9.99722C9.00779 10.44 9.26432 11.0406 9.26432 11.6668Z"
        stroke="#616D75"
        stroke-width="1.5"
      />
      <path
        d="M14.1354 6.47229L9.26562 9.77785M14.1354 16.8612L9.26562 13.5556"
        stroke="#616D75"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M19.0026 17.8056C19.0026 18.4318 18.7461 19.0324 18.2894 19.4752C17.8328 19.918 17.2135 20.1667 16.5677 20.1667C15.9219 20.1667 15.3026 19.918 14.846 19.4752C14.3893 19.0324 14.1328 18.4318 14.1328 17.8056C14.1328 17.1794 14.3893 16.5789 14.846 16.1361C15.3026 15.6933 15.9219 15.4445 16.5677 15.4445C17.2135 15.4445 17.8328 15.6933 18.2894 16.1361C18.7461 16.5789 19.0026 17.1794 19.0026 17.8056ZM19.0026 5.52786C19.0026 6.15406 18.7461 6.75462 18.2894 7.19742C17.8328 7.64021 17.2135 7.88897 16.5677 7.88897C15.9219 7.88897 15.3026 7.64021 14.846 7.19742C14.3893 6.75462 14.1328 6.15406 14.1328 5.52786C14.1328 4.90165 14.3893 4.3011 14.846 3.8583C15.3026 3.41551 15.9219 3.16675 16.5677 3.16675C17.2135 3.16675 17.8328 3.41551 18.2894 3.8583C18.7461 4.3011 19.0026 4.90165 19.0026 5.52786Z"
        stroke="#616D75"
        stroke-width="1.5"
      />
    </svg>
  ),
};
