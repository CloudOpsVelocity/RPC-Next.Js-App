"use client";
import PriceBag, {
  Phone,
  ShearIcon,
  WhatsAppButton,
} from "@/app/images/commonSvgs";
import React from "react";
import Button from "../../elements/button";
import { useDisclosure } from "@mantine/hooks";
import { Collapse, Modal } from "@mantine/core";
import Image from "next/image";
import { useSession } from "next-auth/react";
import S from "@/app/styles/Req.module.css";
import { projectprops } from "@/app/data/projectDetails";
export default function OverviewBanner({
  minPrice,
  maxPrice,
  name,
}: {
  minPrice: number;
  maxPrice: number;
  name: string;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
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

          <WhatsAppButton className="cursor-pointer" name={name} />
        </div>

        <RequestCallBackModal close={close} opened={opened} />
      </div>
    </>
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
        centered
        size={"60%"}
        className="!rounded-full w-[90%] md:w-[70%] lg:w-[60%] "
        classNames={{
          close: S.close,
          content: S.content,
        }}
      >
        <>
          {/* <div className="bg-[#E0F7FF]  flex items-center justify-center p-4"> */}
          <div className="bg-white rounded-lg  overflow-hidden flex ">
            <div className="w-full p-8">
              <h2 className="text-2xl font-semibold text-gray-700">
                Request A Callback
              </h2>
              <p className="text-[#EA7A00] text-[16px] font-[600] ">Looks like you are not registered with us.</p>
              <p className="text-[#4D6677] text-[14px] font-[600] ">No worries add your details to get callback from builder</p>
              <p className="mt-2 text-green-600 font-semibold">
                Builder: Sarang By Sumadhura
              </p>
              {/* There */}
              <Content />
            </div>
            <div className="hidden md:block w-1/2 relative">
              <Image
                className="absolute inset-0 !h-full !w-[100%] object-cover"
                src="/requestcallback.png"
                alt="Customer Support"
                width={600}
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

const PriceBreakUp = () => {
  return (
    <>
      <div className="max-w-[90%] mx-auto p-6 bg-white rounded-lg shadow my-10">
        <h2 className="text-[#202020] text-[32px] not-italic font-semibold leading-[normal] uppercase;">
          PRICE BREAKUP
        </h2>
        <div className=" border-t border-gray-400 mt-4 space-y-4 py-8">
          <h3 className="text-[#034AB6] text-[28px] not-italic font-bold leading-[normal] underline uppercase">
            PRICE / SQ.FT
          </h3>
          <li className="flex w-[771px]  items-start gap-[26px] text-[#4D6677] text-2xl not-italic font-bold leading-[23.784px] border-dashed border-b pb-5">
            <div>Price/SQ.FT</div>{" "}
            <div className="font-semibold">₹ 72,52,050</div>
          </li>
        </div>
        <div className="w-full grid grid-cols-2 justify-between items-center">
          <div className=" border-t border-gray-400 mt-4 space-y-4 py-8 ">
            <h3 className="text-[#034AB6] text-[28px] not-italic font-bold leading-[normal] underline uppercase">
              applicable charges
            </h3>
            <li className="flex max-w-[771px]  items-start gap-[26px] text-[#4D6677]  text-2xl  font-bold leading-[23.784px]  border-b-2 border-black pb-5">
              <div>Price/SQ.FT</div>{" "}
              <div className="font-semibold">₹ 72,52,050</div>
            </li>
            <li className="flex max-w-[771px]  items-start gap-[26px] text-[#4D6677]  text-2xl  font-bold leading-[23.784px]  border-b-2 border-black pb-5">
              <div>Price/SQ.FT</div>{" "}
              <div className="font-semibold">₹ 72,52,050</div>
            </li>
            <li className="flex max-w-[771px]  items-start gap-[26px] text-[#4D6677]  text-2xl  font-bold leading-[23.784px]  border-b-2 border-black pb-5">
              <div>Price/SQ.FT</div>{" "}
              <div className="font-semibold">₹ 72,52,050</div>
            </li>
            <li className="flex max-w-[771px]  items-start gap-[26px] text-[#4D6677]  text-2xl  font-bold leading-[23.784px]  border-b-2 border-black pb-5">
              <div>Price/SQ.FT</div>{" "}
              <div className="font-semibold">₹ 72,52,050</div>
            </li>
            <li className="flex max-w-[771px]  items-start gap-[26px] text-[#4D6677]  text-2xl  font-bold leading-[23.784px]  border-b-2 border-black pb-5">
              <div>Price/SQ.FT</div>{" "}
              <div className="font-semibold">₹ 72,52,050</div>
            </li>
          </div>
          <SideCard />
        </div>
        <div className="w-full grid grid-cols-2 justify-between items-center">
          <div className=" border-t border-gray-400 mt-4 space-y-4 py-8 ">
            <h3 className="text-[#034AB6] text-[28px] not-italic font-bold leading-[normal] underline uppercase">
              applicable charges
            </h3>
            <li className="flex max-w-[771px]  items-start gap-[26px] text-[#4D6677]  text-2xl  font-bold leading-[23.784px]  border-b-2 border-black pb-5">
              <div>Price/SQ.FT</div>{" "}
              <div className="font-semibold">₹ 72,52,050</div>
            </li>
            <li className="flex max-w-[771px]  items-start gap-[26px] text-[#4D6677]  text-2xl  font-bold leading-[23.784px]  border-b-2 border-black pb-5">
              <div>Price/SQ.FT</div>{" "}
              <div className="font-semibold">₹ 72,52,050</div>
            </li>
            <li className="flex max-w-[771px]  items-start gap-[26px] text-[#4D6677]  text-2xl  font-bold leading-[23.784px]  border-b-2 border-black pb-5">
              <div>Price/SQ.FT</div>{" "}
              <div className="font-semibold">₹ 72,52,050</div>
            </li>
            <li className="flex max-w-[771px]  items-start gap-[26px] text-[#4D6677]  text-2xl  font-bold leading-[23.784px]  border-b-2 border-black pb-5">
              <div>Price/SQ.FT</div>{" "}
              <div className="font-semibold">₹ 72,52,050</div>
            </li>
            <li className="flex max-w-[771px]  items-start gap-[26px] text-[#4D6677]  text-2xl  font-bold leading-[23.784px]  border-b-2 border-black pb-5">
              <div>Price/SQ.FT</div>{" "}
              <div className="font-semibold">₹ 72,52,050</div>
            </li>
          </div>
          <SideCard />
        </div>
      </div>
    </>
  );
};

const SideCard = () => {
  return (
    <div
      className=" text-[#4D6677] flex w-96 h-[197px] justify-center items-center shrink-0 pt-7 pb-[27px] px-[27px] border-[color:var(--White-1,#F1F1F1)] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[20px] border-[0.6px] border-solid;
  background: var(--White-2, #fafafa) flex-col text-center ml-auto"
    >
      <p className="text-[color:var(--Pending,#F3A700)] text-center text-[22px] not-italic font-medium leading-[normal]">
        The sum of total of your other charges you included in the &quot;Other
        Charges Applicable&quot; is
      </p>
      <div className="mt-2 flex justify-center items-baseline text-[color:var(--newly-Added,#00ADE3)] text-[26px] not-italic font-bold leading-[normal] underline">
        <span className="text-lg font-semibold">₹</span>
        <span className="text-3xl font-bold">2&quot;05&quot600</span>
      </div>
    </div>
  );
};
