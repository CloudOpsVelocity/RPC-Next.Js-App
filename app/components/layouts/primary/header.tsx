"use client";
import Link from "next/link";
import Logo from "../../atoms/Logo";
import AuthButton from "../../atoms/AuthButton";
import { useSession } from "next-auth/react";
const Header = () => {
  const { data: session } = useSession();
  return (
    <header className="h-[90px] w-[100%] bg-transparent flex items-center justify-between fixed top-0  bg-white pl-[3%] pr-[3%] z-[1000]">
      <section>
        <Logo />
      </section>
      <section className="flex items-center gap-4">
        <Link
          className="text-xl font-medium mr-3 hidden md:block text-slate-700"
          href={"#"}
        >
          Blogs
        </Link>

        <AuthButton />
      </section>
    </header>
  );
};

export default Header;
