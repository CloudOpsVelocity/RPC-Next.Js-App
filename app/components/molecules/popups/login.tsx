import data from "@/app/data/auth";
import { Toaster } from "react-hot-toast";
import { TbBuilding } from "react-icons/tb";
import Logo from "../../atoms/Logo";
import Login from "../auth/login";
import Link from "next/link";
export default function LoginPopup() {
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
          <div className="w-full  p-[10%] md:p-[2%]">
            <div className="w-full flex justify-center items-center gap-[5%] mb-[5%] ">
              <Link
                href="/login"
                className="whitespace-nowrap text-xl md:text-[26px] text-[#148B16] font-bold border-solid border-b-2 border-green-600"
              >
                Log In
              </Link>

              <Link
                href="/register"
                className="whitespace-nowrap text-xl md:text-[26px] font-[500] text-[#666]"
              >
                Sign Up
              </Link>
            </div>

            <div>
              <Login />
            </div>
          </div>
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
