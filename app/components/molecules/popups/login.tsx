import data from "@/app/data/auth";
import { Toaster } from "react-hot-toast";
import { TbBuilding } from "react-icons/tb";
import Logo from "../../atoms/Logo";
import Login from "../auth/login";
import Link from "next/link";
import LoginPopupForm from "../auth/popups/login";
export default function LoginPopup({ type = "C/S" }: { type?: string }) {
  return (
    <div
      className={`flex justify-center items-start w-full pt-[10%] md:pt-[${
        type == "RATING" ? "8%" : "0%"
      }]`}
    >
      <div className="w-full bg-white text-gray-600 justify-center items-center ">
        <Logo styles="w-full flex justify-center items-center " />

        <div className="w-full  p-[10%] md:p-[2%] mt-6">
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
            <LoginPopupForm />
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
  );
}
