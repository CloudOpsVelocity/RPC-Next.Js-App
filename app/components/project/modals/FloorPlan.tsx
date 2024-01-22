import { useDisclosure } from "@mantine/hooks";
import { Modal, Select } from "@mantine/core";
import { LenseIcon, PopupOpenSvg } from "@/app/images/commonSvgs";
import S from "@/app/styles/Floorplan.module.css";
import ButtonLink from "@/app/elements/link";
import Button from "@/app/elements/button";
import Grid from "../../molecules/Utils/Grid";
import Image from "next/image";
import CarouselModal from "./Carousel";
import { useState } from "react";
import { projectprops } from "@/app/data/projectDetails";
import {
  FormProvider,
  useForm,
  useFormContext,
} from "@/app/context/floorplanContext";

type Props = {
  propCgId: any;
};

function FloorPlanModal({ propCgId }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm();

  return (
    <FormProvider form={form}>
      <div
        className="bg-[#F4FBFF] p-[10px] rounded-[29px] gap-[12px] flex justify-end items-center  cursor-pointer"
        onClick={open}
      >
        <p className="text-[12px] lg:text-[14px] font-[600] text-[#0073C6] underline ">
          Click on image to open floor plan details
        </p>
        <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[33px] lg:h-[33px] " />
      </div>
      <Modal
        opened={opened}
        classNames={{
          title: S.title,
          close: S.close,
          content: S.content,
        }}
        onClose={close}
        title="Floor Plan"
        size={"90%"}
      >
        <>
          <div className="bg-white pl-5">
            <h1 className="text-2xl font-bold">Floor Plan</h1>
            <p className="text-sm mt-2 mb-6">
              See floor plan according to your selections
            </p>
            <div className="flex flex-wrap gap-4 mb-4">
              {Object.entries(form.values).map(
                ([key, value]) =>
                  value !== null &&
                  value !== 0 &&
                  value !== "" && (
                    <div
                      className="flex items-center px-3 py-1.5 bg-white border border-[#c4f1f9] rounded-full"
                      key={key}
                    >
                      <span className="text-[#57a773] font-semibold">
                        {value}
                      </span>
                      <span className="mx-1.5 text-[#6e798c]">|</span>
                      <span className="text-[#6e798c]">{key}</span>
                      <button className="ml-2">
                        <Image
                          src={"/cross.svg"}
                          alt="close"
                          width={10}
                          height={10}
                        />
                      </button>
                    </div>
                  )
              )}

              <button
                className="flex items-center rounded-[10px] shadow-md border-solid border-[1px] border-[#a5bfd8] px-2.5 py-0.5 w-fit  font-[500] text-[18px] lg:text-[20px] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#FFF] text-secondary-foreground hover:bg-gray-100/80 fnt-[600] text-[#0073C6] underline"
                onClick={form.reset}
              >
                Clear All Filter
              </button>
            </div>
            <Grid>
              <LeftSection propCgId={propCgId} />
              <div className="flex rounded-[14px] shadow-md w-full h-[501px] justify-between items-start gap-[45px] shrink-0">
                <MiddleSection />
                <RightSection propCgId={propCgId} />
              </div>
            </Grid>
          </div>
        </>
      </Modal>
    </FormProvider>
  );
}

export default FloorPlanModal;

const LeftSection = ({ propCgId }: Props) => {
  const { getInputProps } = useFormContext();
  return (
    <div className="col-span-1 w-full max-w-[393px] ">
      <div className="w-[100%] flex justify-between items-start flex-wrap gap-[5%]">
        {propCgId != projectprops.plot && (
          <Select
            w={"full"}
            mt="md"
            label="Select Unit Type"
            className="!w-[46%]"
            placeholder="-- select --"
            data={["1", "2", "3", "4", "5"]}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("unitType")}
          />
        )}
        {propCgId != projectprops.plot && (
          <Select
            w={"full"}
            mt="md"
            label="Select Tower"
            className="!w-[46%]"
            placeholder="-- select --"
            data={["1", "2", "3", "4", "5"]}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("tower")}
          />
        )}

        {propCgId == projectprops.apartment &&
          propCgId != projectprops.plot && (
            <Select
              w={"full"}
              mt="md"
              label="Select Block"
              className="!w-[46%]"
              placeholder="-- select --"
              data={["1", "2", "3", "4", "5"]}
              searchable
              maxDropdownHeight={200}
              {...getInputProps("block")}
            />
          )}

        {propCgId != projectprops.plot && (
          <Select
            w={"full"}
            mt="md"
            label={`${
              propCgId == projectprops.rowHouse ||
              propCgId == projectprops.villa
                ? "Select Elevation"
                : "Select Floor"
            }`}
            className="!w-[46%]"
            placeholder="-- select --"
            data={["1", "2", "3", "4", "5"]}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("floor")}
          />
        )}

        <Select
          w={"full"}
          mt="md"
          label="Select Unit Number"
          className="!w-[46%]"
          placeholder="-- select --"
          data={["1", "2", "3", "4", "5"]}
          searchable
          maxDropdownHeight={200}
          {...getInputProps("unit")}
        />

        <Select
          w={"full"}
          mt="md"
          label={`${
            propCgId == projectprops.plot
              ? "Select Plot Facing"
              : "Select Facing"
          } `}
          className="!w-[46%]"
          placeholder="-- select --"
          data={["1", "2", "3", "4", "5"]}
          searchable
          maxDropdownHeight={200}
          {...getInputProps("facing")}
        />

        {propCgId != projectprops.plot && (
          <Select
            w={"full"}
            mt="md"
            label="Super Built-up Area "
            className="!w-[46%]"
            placeholder="-- select --"
            data={["1", "2", "3", "4", "5"]}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("superArea")}
          />
        )}

        {propCgId != projectprops.plot && (
          <Select
            w={"full"}
            mt="md"
            label="Carpet Area"
            className="!w-[46%]"
            placeholder="-- select --"
            data={["1", "2", "3", "4", "5"]}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("carpetArea")}
          />
        )}

        {propCgId != projectprops.apartment &&
          propCgId != projectprops.plot && (
            <Select
              w={"full"}
              mt="md"
              label="Select Garden Area"
              className="!w-[46%]"
              placeholder="-- select --"
              data={["1", "2", "3", "4", "5"]}
              searchable
              maxDropdownHeight={200}
              {...getInputProps("gardenArea")}
            />
          )}

        {propCgId != projectprops.apartment &&
          propCgId != projectprops.plot && (
            <Select
              w={"full"}
              mt="md"
              label="Select Terrace Area"
              className="!w-[46%]"
              placeholder="-- select --"
              data={["1", "2", "3", "4", "5"]}
              searchable
              maxDropdownHeight={200}
              {...getInputProps("terraceArea")}
            />
          )}

        {propCgId != projectprops.plot && (
          <Select
            w={"full"}
            mt="md"
            label="Select Car Parking"
            className="!w-[46%]"
            placeholder="-- select --"
            data={["1", "2", "3", "4", "5"]}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("carParking")}
          />
        )}

        {propCgId != projectprops.plot && (
          <Select
            w={"full"}
            mt="md"
            label="Open/ Covered Parking"
            className="!w-[46%]"
            placeholder="-- select --"
            data={["1", "2", "3", "4", "5"]}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("openCoveredParking")}
          />
        )}

        {propCgId != projectprops.plot && (
          <Select
            w={"full"}
            mt="md"
            label="No: of Balcony"
            className="!w-[46%]"
            placeholder="-- select --"
            data={["1", "2", "3", "4", "5"]}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("balcony")}
          />
        )}

        {propCgId != projectprops.plot && (
          <Select
            w={"full"}
            mt="md"
            label="No: of Bathroom"
            className="!w-[46%]"
            placeholder="-- select --"
            data={["1", "2", "3", "4", "5"]}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("bathroom")}
          />
        )}

        {propCgId == projectprops.villament &&
          propCgId != projectprops.plot && (
            <Select
              w={"full"}
              mt="md"
              label="Choose Balcony Size"
              className="!w-[46%]"
              placeholder="-- select --"
              data={["1", "2", "3", "4", "5"]}
              searchable
              maxDropdownHeight={200}
              {...getInputProps("balconySize")}
            />
          )}

        {propCgId == projectprops.plot && (
          <Select
            w={"full"}
            mt="md"
            label="Select Plot Area"
            className="!w-[46%]"
            placeholder="-- select --"
            data={["1", "2", "3", "4", "5"]}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("plotArea")}
          />
        )}

        {propCgId == projectprops.plot && (
          <Select
            w={"full"}
            mt="md"
            label="length Of Plot"
            className="!w-[46%]"
            placeholder="-- select --"
            data={["1", "2", "3", "4", "5"]}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("lengthOfPlot")}
          />
        )}

        {propCgId == projectprops.plot && (
          <Select
            w={"full"}
            mt="md"
            label="Breadth of Plot"
            className="!w-[46%]"
            placeholder="-- select --"
            data={["1", "2", "3", "4", "5"]}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("breadthOfPlot")}
          />
        )}
      </div>
      <Button
        icon={<LenseIcon />}
        title="Search"
        onChange={() => ""}
        buttonClass=" flex items-center justify-center gap-[10px] border-none text-[#FFF] text-[20px] font-[600] bg-[#0073C6] rounded-[10px] p-[6px]  mt-10"
      />
    </div>
  );
};
const RightSection = ({ propCgId }: Props) => {
  const { values, reset } = useFormContext();
  return (
    <div className="col-span-1 w-full max-w-[342px] ">
      <div className="bg-[#F4FBFF] p-6 rounded-lg shadow max-w-sm">
        <div className="space-y-4">
          {propCgId != projectprops.plot && (
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span className="font-medium">Unit Type</span>
              <span>2 BHK</span>
            </div>
          )}

          {propCgId != projectprops.plot && (
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500"
              >
                <rect width={16} height={20} x={4} y={2} rx={2} ry={2} />
                <path d="M9 22v-4h6v4" />
                <path d="M8 6h.01" />
                <path d="M16 6h.01" />
                <path d="M12 6h.01" />
                <path d="M12 10h.01" />
                <path d="M12 14h.01" />
                <path d="M16 10h.01" />
                <path d="M16 14h.01" />
                <path d="M8 10h.01" />
                <path d="M8 14h.01" />
              </svg>
              <span className="font-medium">Tower</span>
              <span>Tower 1</span>
            </div>
          )}

          {propCgId == projectprops.apartment &&
            propCgId != projectprops.plot && (
              <div className="flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <rect width={7} height={7} x={14} y={3} rx={1} />
                  <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
                </svg>
                <span className="font-medium">Block</span>
                <span>02</span>
              </div>
            )}

          {propCgId != projectprops.plot && (
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500"
              >
                <line x1={6} x2={6} y1={4} y2={20} />
                <polygon points="10,4 20,12 10,20" />
              </svg>
              <span className="font-medium">{`${
                propCgId == projectprops.rowHouse ||
                propCgId == projectprops.villa
                  ? "Elevation"
                  : "Floor"
              }`}</span>
              <span>02</span>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <path d="M13 4h3a2 2 0 0 1 2 2v14" />
              <path d="M2 20h3" />
              <path d="M13 20h9" />
              <path d="M10 12v.01" />
              <path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z" />
            </svg>
            <span className="font-medium">Unit Number</span>
            <span>03</span>
          </div>

          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <circle cx={12} cy={12} r={10} />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
            <span className="font-medium">{`${
              propCgId == projectprops.plot ? "Plot Facing" : "Facing"
            } `}</span>
            <span>North - East</span>
          </div>

          {propCgId != projectprops.plot && (
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500"
              >
                <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" />
                <path d="M3 16.2V21m0 0h4.8M3 21l6-6" />
                <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6" />
                <path d="M3 7.8V3m0 0h4.8M3 3l6 6" />
              </svg>
              <span className="font-medium">Super Builtup Area</span>
              <span>1120 sq.ft</span>
            </div>
          )}

          {propCgId != projectprops.plot && (
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500"
              >
                <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
                <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z" />
                <path d="M4 18v2" />
                <path d="M20 18v2" />
                <path d="M12 4v9" />
              </svg>
              <span className="font-medium">Carpet Area</span>
              <span>840 sq.ft</span>
            </div>
          )}

          {propCgId != projectprops.plot && (
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500"
              >
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                <circle cx={7} cy={17} r={2} />
                <path d="M9 17h6" />
                <circle cx={17} cy={17} r={2} />
              </svg>
              <span className="font-medium">Car Parking</span>
              <span>02</span>
            </div>
          )}

          {propCgId != projectprops.plot && (
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500"
              >
                <rect width={18} height={18} x={3} y={3} rx={2} />
                <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
              </svg>
              <span className="font-medium">Open/Covered Parking</span>
              <span>Open Parking</span>
            </div>
          )}

          {propCgId != projectprops.plot && (
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500"
              >
                <rect width={16} height={20} x={4} y={2} rx={2} ry={2} />
                <path d="M9 22v-4h6v4" />
                <path d="M8 6h.01" />
                <path d="M16 6h.01" />
                <path d="M12 6h.01" />
                <path d="M12 10h.01" />
                <path d="M12 14h.01" />
                <path d="M16 10h.01" />
                <path d="M16 14h.01" />
                <path d="M8 10h.01" />
                <path d="M8 14h.01" />
              </svg>
              <span className="font-medium">Balconies</span>
              <span>01</span>
            </div>
          )}

          {propCgId != projectprops.plot && (
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500"
              >
                <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
                <line x1={10} x2={8} y1={5} y2={7} />
                <line x1={2} x2={22} y1={12} y2={12} />
                <line x1={7} x2={7} y1={19} y2={21} />
                <line x1={17} x2={17} y1={19} y2={21} />
              </svg>
              <span className="font-medium">Bathroom</span>
              <span>02</span>
            </div>
          )}

          {propCgId == projectprops.plot && (
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M16.8757 13.8394V6.16191C17.3022 6.05261 17.6921 5.83241 18.006 5.52365C18.3199 5.21489 18.5464 4.82858 18.6627 4.40393C18.779 3.97928 18.7808 3.53143 18.6681 3.10584C18.5553 2.68025 18.3319 2.29209 18.0205 1.98077C17.7092 1.66944 17.3211 1.44605 16.8955 1.33326C16.4699 1.22047 16.022 1.22231 15.5974 1.33858C15.1727 1.45486 14.7864 1.68144 14.4777 1.99531C14.1689 2.30918 13.9487 2.69916 13.8394 3.12566H6.16191C6.05261 2.69916 5.83241 2.30918 5.52365 1.99531C5.21489 1.68144 4.82858 1.45486 4.40393 1.33858C3.97928 1.22231 3.53143 1.22047 3.10584 1.33326C2.68025 1.44605 2.29209 1.66944 1.98077 1.98077C1.66944 2.29209 1.44605 2.68025 1.33326 3.10584C1.22047 3.53143 1.22231 3.97928 1.33858 4.40393C1.45486 4.82858 1.68144 5.21489 1.99531 5.52365C2.30918 5.83241 2.69916 6.05261 3.12566 6.16191V13.8394C2.69916 13.9487 2.30918 14.1689 1.99531 14.4777C1.68144 14.7864 1.45486 15.1727 1.33858 15.5974C1.22231 16.022 1.22047 16.4699 1.33326 16.8955C1.44605 17.3211 1.66944 17.7092 1.98077 18.0205C2.29209 18.3319 2.68025 18.5553 3.10584 18.6681C3.53143 18.7808 3.97928 18.779 4.40393 18.6627C4.82858 18.5464 5.21489 18.3199 5.52365 18.006C5.83241 17.6921 6.05261 17.3022 6.16191 16.8757H13.8394C13.9487 17.3022 14.1689 17.6921 14.4777 18.006C14.7864 18.3199 15.1727 18.5464 15.5974 18.6627C16.022 18.779 16.4699 18.7808 16.8955 18.6681C17.3211 18.5553 17.7092 18.3319 18.0205 18.0205C18.3319 17.7092 18.5553 17.3211 18.6681 16.8955C18.7808 16.4699 18.779 16.022 18.6627 15.5974C18.5464 15.1727 18.3199 14.7864 18.006 14.4777C17.6921 14.1689 17.3022 13.9487 16.8757 13.8394ZM16.2507 2.50066C16.4979 2.50066 16.7396 2.57397 16.9451 2.71132C17.1507 2.84867 17.3109 3.04389 17.4055 3.2723C17.5001 3.50071 17.5249 3.75204 17.4766 3.99452C17.4284 4.237 17.3094 4.45972 17.1345 4.63454C16.9597 4.80936 16.737 4.92841 16.4945 4.97664C16.252 5.02487 16.0007 5.00012 15.7723 4.90551C15.5439 4.8109 15.3487 4.65068 15.2113 4.44512C15.074 4.23956 15.0007 3.99788 15.0007 3.75066C15.001 3.41924 15.1328 3.10149 15.3671 2.86714C15.6015 2.63279 15.9192 2.50099 16.2507 2.50066ZM2.50066 3.75066C2.50066 3.50343 2.57397 3.26176 2.71132 3.05619C2.84867 2.85063 3.04389 2.69042 3.2723 2.59581C3.50071 2.5012 3.75204 2.47644 3.99452 2.52468C4.237 2.57291 4.45972 2.69196 4.63454 2.86677C4.80936 3.04159 4.92841 3.26432 4.97664 3.50679C5.02487 3.74927 5.00012 4.0006 4.90551 4.22901C4.8109 4.45742 4.65068 4.65264 4.44512 4.78999C4.23956 4.92735 3.99788 5.00066 3.75066 5.00066C3.41924 5.00033 3.10149 4.86852 2.86714 4.63417C2.63279 4.39983 2.50099 4.08208 2.50066 3.75066ZM3.75066 17.5007C3.50343 17.5007 3.26176 17.4273 3.05619 17.29C2.85063 17.1526 2.69042 16.9574 2.59581 16.729C2.5012 16.5006 2.47644 16.2493 2.52468 16.0068C2.57291 15.7643 2.69196 15.5416 2.86677 15.3668C3.04159 15.192 3.26432 15.0729 3.50679 15.0247C3.74927 14.9764 4.0006 15.0012 4.22901 15.0958C4.45742 15.1904 4.65264 15.3506 4.78999 15.5562C4.92735 15.7618 5.00066 16.0034 5.00066 16.2507C5.00033 16.5821 4.86852 16.8998 4.63417 17.1342C4.39983 17.3685 4.08208 17.5003 3.75066 17.5007ZM13.8394 15.6257H6.16191C6.04995 15.196 5.8254 14.8039 5.51141 14.4899C5.19742 14.1759 4.80536 13.9514 4.37566 13.8394V6.16191C4.80533 6.04989 5.19736 5.82532 5.51134 5.51134C5.82532 5.19736 6.04989 4.80533 6.16191 4.37566H13.8394C13.9514 4.80536 14.1759 5.19742 14.4899 5.51141C14.8039 5.8254 15.196 6.04995 15.6257 6.16191V13.8394C15.1959 13.9513 14.8038 14.1758 14.4898 14.4898C14.1758 14.8038 13.9513 15.1959 13.8394 15.6257ZM16.2507 17.5007C16.0034 17.5007 15.7618 17.4273 15.5562 17.29C15.3506 17.1526 15.1904 16.9574 15.0958 16.729C15.0012 16.5006 14.9764 16.2493 15.0247 16.0068C15.0729 15.7643 15.192 15.5416 15.3668 15.3668C15.5416 15.192 15.7643 15.0729 16.0068 15.0247C16.2493 14.9764 16.5006 15.0012 16.729 15.0958C16.9574 15.1904 17.1526 15.3506 17.29 15.5562C17.4273 15.7618 17.5007 16.0034 17.5007 16.2507C17.5002 16.582 17.3683 16.8997 17.134 17.134C16.8997 17.3683 16.582 17.5002 16.2507 17.5007Z"
                  fill="#4D6677"
                />
              </svg>
              <span className="font-medium">Plot Area</span>
              <span>02</span>
            </div>
          )}

          {propCgId == projectprops.plot && (
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M18.7507 3.74922C18.7487 3.10093 18.4945 2.47886 18.0419 2.01474C17.5892 1.55062 16.9737 1.2809 16.3257 1.2627C15.6777 1.24451 15.048 1.47926 14.57 1.91725C14.0921 2.35524 13.8034 2.96206 13.765 3.60922L5.99191 5.1636C5.81017 4.78586 5.53614 4.46003 5.19515 4.21622C4.85416 3.97242 4.45721 3.8185 4.041 3.7687C3.62479 3.71889 3.20273 3.77482 2.81385 3.93129C2.42496 4.08777 2.0818 4.33974 1.81607 4.66394C1.55034 4.98814 1.37062 5.37408 1.29352 5.78612C1.21642 6.19815 1.24443 6.62297 1.37496 7.02131C1.50549 7.41966 1.73433 7.77867 2.04032 8.06517C2.34632 8.35167 2.71959 8.55641 3.12566 8.66047V13.838C2.69916 13.9473 2.30918 14.1675 1.99531 14.4762C1.68144 14.785 1.45486 15.1713 1.33858 15.5959C1.22231 16.0206 1.22047 16.4685 1.33326 16.894C1.44605 17.3196 1.66944 17.7078 1.98077 18.0191C2.29209 18.3304 2.68026 18.5538 3.10584 18.6666C3.53143 18.7794 3.97928 18.7776 4.40393 18.6613C4.82858 18.545 5.21489 18.3184 5.52365 18.0046C5.83241 17.6907 6.05261 17.3007 6.16191 16.8742H11.3394C11.4433 17.2806 11.648 17.6541 11.9345 17.9604C12.221 18.2667 12.5802 18.4957 12.9787 18.6264C13.3772 18.7572 13.8022 18.7853 14.2145 18.7082C14.6267 18.6311 15.0129 18.4513 15.3373 18.1854C15.6616 17.9196 15.9137 17.5762 16.0702 17.1871C16.2267 16.798 16.2826 16.3757 16.2327 15.9593C16.1827 15.5429 16.0286 15.1458 15.7845 14.8047C15.5404 14.4636 15.2143 14.1896 14.8363 14.008L16.3907 6.23485C17.0269 6.19992 17.6258 5.92304 18.0645 5.46093C18.5033 4.99882 18.7487 4.38644 18.7507 3.74922ZM16.2507 2.49922C16.4979 2.49922 16.7396 2.57253 16.9451 2.70988C17.1507 2.84724 17.3109 3.04246 17.4055 3.27087C17.5001 3.49927 17.5249 3.75061 17.4766 3.99308C17.4284 4.23556 17.3094 4.45829 17.1345 4.6331C16.9597 4.80792 16.737 4.92697 16.4945 4.9752C16.252 5.02343 16.0007 4.99868 15.7723 4.90407C15.5439 4.80946 15.3487 4.64925 15.2113 4.44368C15.074 4.23812 15.0007 3.99645 15.0007 3.74922C15.001 3.4178 15.1328 3.10005 15.3671 2.8657C15.6015 2.63135 15.9192 2.49955 16.2507 2.49922ZM2.50066 6.24922C2.50066 6.00199 2.57397 5.76032 2.71132 5.55476C2.84867 5.3492 3.04389 5.18898 3.2723 5.09437C3.50071 4.99976 3.75204 4.97501 3.99452 5.02324C4.237 5.07147 4.45972 5.19052 4.63454 5.36534C4.80936 5.54015 4.92841 5.76288 4.97664 6.00536C5.02487 6.24783 5.00012 6.49917 4.90551 6.72758C4.8109 6.95598 4.65068 7.15121 4.44512 7.28856C4.23956 7.42591 3.99788 7.49922 3.75066 7.49922C3.41924 7.49889 3.10149 7.36709 2.86714 7.13274C2.63279 6.89839 2.50099 6.58064 2.50066 6.24922ZM3.75066 17.4992C3.50343 17.4992 3.26176 17.4259 3.05619 17.2886C2.85063 17.1512 2.69042 16.956 2.59581 16.7276C2.5012 16.4992 2.47644 16.2478 2.52468 16.0054C2.57291 15.7629 2.69196 15.5402 2.86677 15.3653C3.04159 15.1905 3.26432 15.0715 3.50679 15.0232C3.74927 14.975 4.0006 14.9998 4.22901 15.0944C4.45742 15.189 4.65264 15.3492 4.78999 15.5548C4.92735 15.7603 5.00066 16.002 5.00066 16.2492C5.00033 16.5806 4.86852 16.8984 4.63417 17.1327C4.39983 17.3671 4.08208 17.4989 3.75066 17.4992ZM11.3394 15.6242H6.16191C6.04995 15.1945 5.8254 14.8025 5.51141 14.4885C5.19742 14.1745 4.80536 13.9499 4.37566 13.838V8.66047C4.88631 8.52764 5.34162 8.23615 5.676 7.82798C6.01038 7.41981 6.20656 6.91603 6.23628 6.38922L14.0094 4.83485C14.2544 5.33873 14.6613 5.74587 15.165 5.9911L13.6107 13.7636C13.0838 13.7933 12.5801 13.9895 12.1719 14.3239C11.7637 14.6583 11.4722 15.1136 11.3394 15.6242ZM13.7507 17.4992C13.5034 17.4992 13.2618 17.4259 13.0562 17.2886C12.8506 17.1512 12.6904 16.956 12.5958 16.7276C12.5012 16.4992 12.4764 16.2478 12.5247 16.0054C12.5729 15.7629 12.692 15.5402 12.8668 15.3653C13.0416 15.1905 13.2643 15.0715 13.5068 15.0232C13.7493 14.975 14.0006 14.9998 14.229 15.0944C14.4574 15.189 14.6526 15.3492 14.79 15.5548C14.9273 15.7603 15.0007 16.002 15.0007 16.2492C15.0003 16.5806 14.8685 16.8984 14.6342 17.1327C14.3998 17.3671 14.0821 17.4989 13.7507 17.4992Z"
                  fill="#4D6677"
                />
              </svg>
              <span className="font-medium">Length of Plot</span>
              <span>02</span>
            </div>
          )}

          {propCgId == projectprops.plot && (
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M16.8757 13.8394V6.16191C17.3022 6.05261 17.6921 5.83241 18.006 5.52365C18.3199 5.21489 18.5464 4.82858 18.6627 4.40393C18.779 3.97928 18.7808 3.53143 18.6681 3.10584C18.5553 2.68025 18.3319 2.29209 18.0205 1.98077C17.7092 1.66944 17.3211 1.44605 16.8955 1.33326C16.4699 1.22047 16.022 1.22231 15.5974 1.33858C15.1727 1.45486 14.7864 1.68144 14.4777 1.99531C14.1689 2.30918 13.9487 2.69916 13.8394 3.12566H6.16191C6.05261 2.69916 5.83241 2.30918 5.52365 1.99531C5.21489 1.68144 4.82858 1.45486 4.40393 1.33858C3.97928 1.22231 3.53143 1.22047 3.10584 1.33326C2.68025 1.44605 2.29209 1.66944 1.98077 1.98077C1.66944 2.29209 1.44605 2.68025 1.33326 3.10584C1.22047 3.53143 1.22231 3.97928 1.33858 4.40393C1.45486 4.82858 1.68144 5.21489 1.99531 5.52365C2.30918 5.83241 2.69916 6.05261 3.12566 6.16191V13.8394C2.69916 13.9487 2.30918 14.1689 1.99531 14.4777C1.68144 14.7864 1.45486 15.1727 1.33858 15.5974C1.22231 16.022 1.22047 16.4699 1.33326 16.8955C1.44605 17.3211 1.66944 17.7092 1.98077 18.0205C2.29209 18.3319 2.68025 18.5553 3.10584 18.6681C3.53143 18.7808 3.97928 18.779 4.40393 18.6627C4.82858 18.5464 5.21489 18.3199 5.52365 18.006C5.83241 17.6921 6.05261 17.3022 6.16191 16.8757H13.8394C13.9487 17.3022 14.1689 17.6921 14.4777 18.006C14.7864 18.3199 15.1727 18.5464 15.5974 18.6627C16.022 18.779 16.4699 18.7808 16.8955 18.6681C17.3211 18.5553 17.7092 18.3319 18.0205 18.0205C18.3319 17.7092 18.5553 17.3211 18.6681 16.8955C18.7808 16.4699 18.779 16.022 18.6627 15.5974C18.5464 15.1727 18.3199 14.7864 18.006 14.4777C17.6921 14.1689 17.3022 13.9487 16.8757 13.8394ZM16.2507 2.50066C16.4979 2.50066 16.7396 2.57397 16.9451 2.71132C17.1507 2.84867 17.3109 3.04389 17.4055 3.2723C17.5001 3.50071 17.5249 3.75204 17.4766 3.99452C17.4284 4.237 17.3094 4.45972 17.1345 4.63454C16.9597 4.80936 16.737 4.92841 16.4945 4.97664C16.252 5.02487 16.0007 5.00012 15.7723 4.90551C15.5439 4.8109 15.3487 4.65068 15.2113 4.44512C15.074 4.23956 15.0007 3.99788 15.0007 3.75066C15.001 3.41924 15.1328 3.10149 15.3671 2.86714C15.6015 2.63279 15.9192 2.50099 16.2507 2.50066ZM2.50066 3.75066C2.50066 3.50343 2.57397 3.26176 2.71132 3.05619C2.84867 2.85063 3.04389 2.69042 3.2723 2.59581C3.50071 2.5012 3.75204 2.47644 3.99452 2.52468C4.237 2.57291 4.45972 2.69196 4.63454 2.86677C4.80936 3.04159 4.92841 3.26432 4.97664 3.50679C5.02487 3.74927 5.00012 4.0006 4.90551 4.22901C4.8109 4.45742 4.65068 4.65264 4.44512 4.78999C4.23956 4.92735 3.99788 5.00066 3.75066 5.00066C3.41924 5.00033 3.10149 4.86852 2.86714 4.63417C2.63279 4.39983 2.50099 4.08208 2.50066 3.75066ZM3.75066 17.5007C3.50343 17.5007 3.26176 17.4273 3.05619 17.29C2.85063 17.1526 2.69042 16.9574 2.59581 16.729C2.5012 16.5006 2.47644 16.2493 2.52468 16.0068C2.57291 15.7643 2.69196 15.5416 2.86677 15.3668C3.04159 15.192 3.26432 15.0729 3.50679 15.0247C3.74927 14.9764 4.0006 15.0012 4.22901 15.0958C4.45742 15.1904 4.65264 15.3506 4.78999 15.5562C4.92735 15.7618 5.00066 16.0034 5.00066 16.2507C5.00033 16.5821 4.86852 16.8998 4.63417 17.1342C4.39983 17.3685 4.08208 17.5003 3.75066 17.5007ZM13.8394 15.6257H6.16191C6.04995 15.196 5.8254 14.8039 5.51141 14.4899C5.19742 14.1759 4.80536 13.9514 4.37566 13.8394V6.16191C4.80533 6.04989 5.19736 5.82532 5.51134 5.51134C5.82532 5.19736 6.04989 4.80533 6.16191 4.37566H13.8394C13.9514 4.80536 14.1759 5.19742 14.4899 5.51141C14.8039 5.8254 15.196 6.04995 15.6257 6.16191V13.8394C15.1959 13.9513 14.8038 14.1758 14.4898 14.4898C14.1758 14.8038 13.9513 15.1959 13.8394 15.6257ZM16.2507 17.5007C16.0034 17.5007 15.7618 17.4273 15.5562 17.29C15.3506 17.1526 15.1904 16.9574 15.0958 16.729C15.0012 16.5006 14.9764 16.2493 15.0247 16.0068C15.0729 15.7643 15.192 15.5416 15.3668 15.3668C15.5416 15.192 15.7643 15.0729 16.0068 15.0247C16.2493 14.9764 16.5006 15.0012 16.729 15.0958C16.9574 15.1904 17.1526 15.3506 17.29 15.5562C17.4273 15.7618 17.5007 16.0034 17.5007 16.2507C17.5002 16.582 17.3683 16.8997 17.134 17.134C16.8997 17.3683 16.582 17.5002 16.2507 17.5007Z"
                  fill="#4D6677"
                />
              </svg>
              <span className="font-medium">Breadth of Plot</span>
              <span>02</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MiddleSection = () => {
  const [opened, setOpened] = useState(false);
  return (
    <div className="col-span-1 w-full max-w-[686px]">
      <div className="relative">
        <p className="text-[#005DA0] text-[16px] font-[500] ">
          Sarang by sumadhura/2bhk/tower 1/ 04/north/1124 sq.ft
        </p>
        <img
          src="https://imagesrpc.s3.ap-south-1.amazonaws.com/images/varify/project/197/cover/cover.jpg"
          alt="Floor Plan"
          className="border"
          width={800}
          height={400}
          style={{ aspectRatio: "800 / 400", objectFit: "cover" }}
        />
        <CarouselModal opened={opened} setOpened={setOpened} />
      </div>
      <div className="flex justify-between items-center mt-4">
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-600"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <div className="grid grid-cols-5 gap-2">
          <img
            src="https://imagesrpc.s3.ap-south-1.amazonaws.com/images/varify/project/197/cover/cover.jpg"
            alt="Floor Plan Thumbnail"
            className="border"
            width={100}
            height={50}
            style={{ aspectRatio: "100 / 50", objectFit: "cover" }}
          />
          <img
            src="https://imagesrpc.s3.ap-south-1.amazonaws.com/images/varify/project/197/cover/cover.jpg"
            alt="Floor Plan Thumbnail"
            className="border"
            width={100}
            height={50}
            style={{ aspectRatio: "100 / 50", objectFit: "cover" }}
          />
          <img
            src="https://imagesrpc.s3.ap-south-1.amazonaws.com/images/varify/project/197/cover/cover.jpg"
            alt="Floor Plan Thumbnail"
            className="border"
            width={100}
            height={50}
            style={{ aspectRatio: "100 / 50", objectFit: "cover" }}
          />
          <img
            src="https://imagesrpc.s3.ap-south-1.amazonaws.com/images/varify/project/197/cover/cover.jpg"
            alt="Floor Plan Thumbnail"
            className="border"
            width={100}
            height={50}
            style={{ aspectRatio: "100 / 50", objectFit: "cover" }}
          />
          <img
            src="https://imagesrpc.s3.ap-south-1.amazonaws.com/images/varify/project/197/cover/cover.jpg"
            alt="Floor Plan Thumbnail"
            className="border"
            width={100}
            height={50}
            style={{ aspectRatio: "100 / 50", objectFit: "cover" }}
          />
        </div>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-600"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export { MiddleSection, RightSection };
