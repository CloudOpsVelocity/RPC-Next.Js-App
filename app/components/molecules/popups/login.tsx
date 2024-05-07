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
      className={`flex justify-center items-start w-full pt-[10%] ${
        type == "RATING" ? "md:pt-[8]%" : "md:pt-[0%]"
      }`}
    >
      <div className="w-full bg-white text-gray-600 justify-center items-center ">
        <Logo styles="w-full flex justify-center items-center " />

        <div className="w-full  p-[10%] md:p-[2%] mt-6">
          <div className="w-full flex justify-center items-center gap-[5%] mb-[5%] ">
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
          </div>

          <div>
            <LoginPopupForm closePopup={close && close} />
          </div>
        </div>
        <div className="relative"></div>
      </div>
    </div>
  );
}
