"use client";
import Logo from "../../atoms/Logo";
import Link from "next/link";
import LoginPopupForm from "../auth/popups/login";
import usePathToOrigin from "@/app/hooks/custom/useRedirect";
import { CloseButton } from "@mantine/core";
export default function LoginPopup({
  type = "C/S",
  close,
}: {
  type?: string;
  close?: () => void;
}) {
  const { redirectQueryParam } = usePathToOrigin();
  return (
    <div
      className={`flex justify-center m-1 items-start w-full pt-1 xl:pt-[10%] ${
        type == "RATING" ? "md:pt-[8]%" : "md:pt-[0%]"
      }`}
    >
      <div className="w-full pt-4 h-[420px] xl:h-full bg-white text-gray-600 justify-center items-center ">
        <Logo styles="w-full flex justify-center items-center " />

        <div className="w-full p-4 xl:p-[10%] md:p-[2%]   xl:mt-3 xl:mb-3 ">
          <div className="inline-flex items-center justify-center w-full">
            <div className="inline-flex items-center justify-center mx-auto border xl:pl-[3px] xl:py-0.5 rounded-md border-solid border-[#CDD7DE] bg-[#fafafa] ">
              <Link
                className={
                  "flex flex-col justify-center items-center gap-1 rounded border shadow-[0px_4px_11.1px_0px_rgba(25,80,71,0.46)_inset,0px_4px_12.9px_0px_rgba(140,177,141,0.38)] px-[28px] md:px-[52px] py-1.5 border-solid border-[#148B16] bg-[#148b16] text-white sm:text-2xl not-italic font-bold leading-[normal] text-nowrap text-[16px] " 
                }
                href={{ 
                  pathname: "/login",
                  search: redirectQueryParam,
                }}
              >
                Login
              </Link>
              <Link
                href={{
                  pathname: "/register",
                  search: redirectQueryParam,
                }}
                className={
                  "flex flex-col justify-center items-center gap-1 rounded py-1 px-6   xl:px-[52px] xl:py-1.5  bg-transparent text-[#242424]  sm:text-[24px] not-italic font-[500] leading-[normal]"
                }
              >
                {"Sign Up"}
              </Link>
            </div>
          </div>
          {/* <div className="w-full flex justify-center items-center gap-[5%] mb-[5%] ">
            <button className="whitespace-nowrap text-xl md:text-[26px] text-[#148B16] font-bold border-solid border-b-2 border-green-600">
              Log In
            </button>

            <Link
              href={{
                pathname: "/register",
                search: redirectQueryParam,
              }}
              onClick={close && close}
              className="whitespace-nowrap text-xl md:text-[26px] font-[500] text-[#666]"
            >
              Sign Up
            </Link>
          </div> */}

          <div className=" mt-0  xl:mt-3">
            <LoginPopupForm closePopup={close && close} />
          </div>
        </div>
        <div className="relative"></div>
      </div>
    </div>
  );
}
