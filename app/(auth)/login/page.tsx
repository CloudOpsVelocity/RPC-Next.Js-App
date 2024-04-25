import Login from "@/app/components/molecules/auth/login";
import { getQueryParam } from "@/app/hooks/custom/useRedirect";
import Link from "next/link";

export default function Page({ searchParams }: any) {
  return (
    <div className="w-full  p-[10%] md:p-[2%]">
      <div className="w-full flex justify-center items-center gap-[5%] mb-[5%] ">
        <Link
          href={{
            pathname: "/login",
            search: getQueryParam(searchParams),
          }}
          className="whitespace-nowrap text-xl md:text-[26px] text-[#148B16] font-bold border-solid border-b-2 border-green-600"
        >
          Log In
        </Link>

        <Link
          href={{
            pathname: "/register",
            search: getQueryParam(searchParams),
          }}
          className="whitespace-nowrap text-xl md:text-[26px] font-[500] text-[#666]"
        >
          Sign Up
        </Link>
      </div>

      <div>
        <Login params={searchParams} />
      </div>
    </div>
  );
}
