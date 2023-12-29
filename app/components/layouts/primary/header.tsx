import Link from "next/link";
import Logo from "../../atoms/Logo";
import { useDisclosure } from "@mantine/hooks";
import AuthPopup from "../../molecules/auth/authPopup";
import AuthButton from "../../atoms/AuthButton";
const Header = () => {
  return (
    <header className="h-[90px] w-[100%] bg-transparent flex items-center justify-between fixed top-0 z-50 bg-white pl-[3%] pr-[3%] ">
      <section>
        <Logo />
      </section>
      <section className="flex items-center gap-4">
        <Link className="text-xl font-medium mr-3 text-slate-700" href={"#"}>
          Blogs
        </Link>
        <button className="text-[20px] font-semibold px-5 bg-[#227FBC] py-1.5 rounded-xl text-white">
          Post Listing
        </button>
        <AuthButton />
      </section>
    </header>
  );
};

export default Header;
