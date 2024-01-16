import { Toaster } from "react-hot-toast";
import Logo from "../components/atoms/Logo";
import data from "../data/auth";
import { TbBuilding } from "react-icons/tb";

import {
  homeSearchProjectHomeIcon,
  homeSearchPropertyHomeIcon,
} from "../images/commonSvgs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full flex h-screen">
      <div className="relative hidden md:flex items-center justify-center bg-gradient-to-b from-[#E4F4FF] /0 via-[#FFF] /0 to-[#EFFFF3]/100 w-full ">
        <div className="  w-[50%] flex flex-col justify-start items-start ">
          <ul className=" text-neutral-600 w-full text-base font-semibold">
            {data.map((item, index) => (
              <li
                key={index}
                className="w-full mb-[3%] flex items-center justify-start"
              >
                <TbBuilding />{" "}
                <p className="font-Playfair text-[color: #545353] text-[24px] font-[600] ml-[10px] ">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
          <img src="/auth/login.svg" alt="" className="!my-12" />
        </div>
      </div>
      <div className="flex justify-center items-start w-full pt-[10%] md:pt-[5.5%]">
        <div className="w-full bg-white text-gray-600 justify-center items-center ">
          <Logo styles="w-full flex justify-center items-center " />

          {children}
          <div className="relative">
            <Toaster
              reverseOrder={false}
              containerStyle={{
                position: "absolute",
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
