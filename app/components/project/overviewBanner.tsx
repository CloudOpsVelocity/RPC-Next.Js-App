"use client";
import PriceBag, { Phone, WhatsAppButton } from "@/app/images/commonSvgs";
import React from "react";
import Button from "../../elements/button";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import Image from "next/image";
import { useSession } from "next-auth/react";
export default function OverviewBanner({
  minPrice,
  maxPrice,
}: {
  minPrice: number;
  maxPrice: number;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className="flex justify-start items-center w-full flex-col md:flex-row bg-gradient-to-r from-[#EFF5FF] /50 to-[#F2FAFF ]/50 ">
      <PriceBag className="w-[150px] h-[170px] md:w-[237px] md:h-[263px] " />

      <div className="flex justify-between items-center w-[100%] flex-row ml-[3%] p-[2%] flex-wrap">
        <div className="">
          <p className="text-[#212C33] text-[24px] lg:text-[32px] font-[600]">
            PRICE RANGE{" "}
            <span className="text-[#00487C] text-[24px] md:text-[32px] lg:text-[40px] whitespace-nowrap font-[700]">
              ₹ {minPrice} Cr - ₹ {maxPrice} Cr
            </span>
          </p>
          <Button
            icon={<Phone />}
            title="Request a Callback"
            buttonClass=" text-[#FFF] text-[16px] font-[600] bg-[#0073C6]  rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[6px]  "
            onChange={open}
          />
        </div>

        <WhatsAppButton className="cursor-pointer" onClick={""} />
      </div>
      <RequestCallBackModal close={close} opened={opened} />
    </div>
  );
}
const RequestCallBackModal = ({
  opened,
  close,
}: {
  opened: any;
  close: any;
}) => {
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Request Callback"
        centered
        size={"70%"}
        className="!rounded-full"
        style={{}}
      >
        <>
          {/* <div className="bg-[#E0F7FF]  flex items-center justify-center p-4"> */}
          <div className="bg-white rounded-lg  overflow-hidden flex ">
            <div className="w-full p-8">
              <h2 className="text-2xl font-semibold text-gray-700">
                Request A Callback
              </h2>
              <p className="mt-2 text-green-600 font-semibold">
                Builder: Sarang By Sumadhura
              </p>
              {/* There */}
              <Content />
            </div>
            <div className="hidden md:block w-1/2 relative">
              <Image
                className="absolute inset-0 h-full w-full object-cover"
                src="/requestcallback.png"
                alt="Customer Support"
                width={500}
                height={534}
              />
            </div>
          </div>
          {/* </div> */}
        </>
      </Modal>
    </>
  );
};

const Content = () => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-[#00487C]">Your Details</h3>
          <p className="mt-2 text-gray-600">Name: Ankit Soni</p>
          <p className="mt-2 text-gray-600">Contact: 8888855555</p>
          <p className="mt-2 text-gray-600">Email: ankitsoni12@gmail.com</p>
          <Content />
        </div>
      ) : (
        <div className="w-full max-w-xs">
          <h2 className="text-lg font-semibold mb-4">Your Details</h2>
          <div className="flex flex-col gap-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Your Name
              </span>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter your name here"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Add contact
              </span>
              <div className="flex">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mr-2">
                  01
                </button>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Phone number"
                />
              </div>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Email</span>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter your email here"
                type="email"
              />
            </label>
          </div>
        </div>
      )}
      <Button
        icon={<Phone />}
        title="Request a Callback"
        buttonClass=" text-[#FFF] text-[16px] font-[600] bg-[#0073C6]  rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[6px]  mt-5"
      />
    </>
  );
};
