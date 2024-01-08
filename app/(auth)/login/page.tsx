import Login from "@/app/components/molecules/auth/login";
import Button from "@/app/elements/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full p-[2%]">
      <div className="w-full flex justify-center items-center gap-[5%] mb-[5%] ">
        <Link
          href="/login"
          className="whitespace-nowrap text-[26px] text-[#148B16] font-bold border-solid border-b-2 border-green-600"
        >
          Log In
        </Link>

        <Link
          href="/register"
          className="whitespace-nowrap text-[26px] font-[500] text-[#666]"
        >
          Sign Up
        </Link>
      </div>

      <div>
        <Login />
      </div>
    </div>
  );
}
