import { useDisclosure } from "@mantine/hooks";
import { Modal, Select } from "@mantine/core";
import { LenseIcon, PopupOpenSvg } from "@/app/images/commonSvgs";
import S from "@/app/styles/Floorplan.module.css";
import ButtonLink from "@/app/elements/link";
import Button from "@/app/elements/button";
import { useForm } from "@mantine/form";
import Grid from "../../molecules/Utils/Grid";
import Image from "next/image";
import CarouselModal from "./Carousel";
import { useState } from "react";
function FloorPlanModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm();

  return (
    <>
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
              {[...Array(10)].map((_, i) => (
                <div
                  className="flex items-center px-3 py-1.5 bg-white border border-[#c4f1f9] rounded-full"
                  key={i}
                >
                  <span className="text-[#57a773] font-semibold">01</span>
                  <span className="mx-1.5 text-[#6e798c]">|</span>
                  <span className="text-[#6e798c]">Unit Number</span>
                  <button className="ml-2">
                    <Image
                      src={"/cross.svg"}
                      alt="close"
                      width={10}
                      height={10}
                    />
                  </button>
                </div>
              ))}

              <button className="flex items-center rounded-[10px] shadow-md border-solid border-[1px] border-[#a5bfd8] px-2.5 py-0.5 w-fit  font-[500] text-[18px] lg:text-[20px] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#FFF] text-secondary-foreground hover:bg-gray-100/80 fnt-[600] text-[#0073C6] underline">
                Clear All Filter
              </button>
            </div>
            <Grid>
              <LeftSection />
              <div className="flex w-[1073px] h-[501px] justify-center items-start gap-[45px] shrink-0">
                <MiddleSection />
                <RightSection />
              </div>
            </Grid>
          </div>
        </>
      </Modal>
    </>
  );
}

export default FloorPlanModal;
const LeftSection = () => {
  return (
    <div className="col-span-1">
      <div className="w-[90%] flex justify-between items-start flex-wrap gap-[5%]">
        <Select
          w={"full"}
          mt="md"
          label="Select Unit Type"
          className="!w-[46%]"
          placeholder="-- select Tower --"
          data={["1", "2", "3", "4", "5"]}
          searchable
          maxDropdownHeight={200}
        />
        <Select
          w={"full"}
          mt="md"
          label="Select Tower"
          className="!w-[46%]"
          placeholder="-- select Tower --"
          data={["1", "2", "3", "4", "5"]}
          searchable
          maxDropdownHeight={200}
        />
        <Select
          w={"full"}
          mt="md"
          label="Select Block"
          className="!w-[46%]"
          placeholder="-- select Tower --"
          data={["1", "2", "3", "4", "5"]}
          searchable
          maxDropdownHeight={200}
        />
        <Select
          w={"full"}
          mt="md"
          label="Select Floor"
          className="!w-[46%]"
          placeholder="-- select Tower --"
          data={["1", "2", "3", "4", "5"]}
          searchable
          maxDropdownHeight={200}
        />
        <Select
          w={"full"}
          mt="md"
          label="Select Unit No"
          className="!w-[46%]"
          placeholder="-- select Tower --"
          data={["1", "2", "3", "4", "5"]}
          searchable
          maxDropdownHeight={200}
        />
        <Select
          w={"full"}
          mt="md"
          label="Select Facing"
          className="!w-[46%]"
          placeholder="-- select Tower --"
          data={["1", "2", "3", "4", "5"]}
          searchable
          maxDropdownHeight={200}
        />
        <Select
          w={"full"}
          mt="md"
          label="Super Build Area"
          className="!w-[46%]"
          placeholder="-- select Tower --"
          data={["1", "2", "3", "4", "5"]}
          searchable
          maxDropdownHeight={200}
        />
        <Select
          w={"full"}
          mt="md"
          label="Carpet Area"
          className="!w-[46%]"
          placeholder="-- select Tower --"
          data={["1", "2", "3", "4", "5"]}
          searchable
          maxDropdownHeight={200}
        />
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
const RightSection = () => {
  return (
    <div className="col-span-1">
      <div className="bg-[#F4FBFF] p-6 rounded-lg shadow max-w-sm">
        <div className="space-y-4">
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
            <span className="font-medium">Floor</span>
            <span>02</span>
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
            <span className="font-medium">Facing</span>
            <span>North - East</span>
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
              <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" />
              <path d="M3 16.2V21m0 0h4.8M3 21l6-6" />
              <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6" />
              <path d="M3 7.8V3m0 0h4.8M3 3l6 6" />
            </svg>
            <span className="font-medium">Super Builtup Area</span>
            <span>1120 sq.ft</span>
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
              <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
              <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z" />
              <path d="M4 18v2" />
              <path d="M20 18v2" />
              <path d="M12 4v9" />
            </svg>
            <span className="font-medium">Carpet Area</span>
            <span>840 sq.ft</span>
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
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
              <circle cx={7} cy={17} r={2} />
              <path d="M9 17h6" />
              <circle cx={17} cy={17} r={2} />
            </svg>
            <span className="font-medium">Car Parking</span>
            <span>02</span>
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
              <rect width={18} height={18} x={3} y={3} rx={2} />
              <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
            </svg>
            <span className="font-medium">Open/Covered Parking</span>
            <span>Open Parking</span>
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
        </div>
      </div>
    </div>
  );
};

const MiddleSection = () => {
  const [opened, setOpened] = useState(false);
  return (
    <div className="col-span-1">
      <div className="relative">
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
