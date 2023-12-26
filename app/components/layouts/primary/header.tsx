import Link from "next/link";
import Logo from "../../atoms/Logo";
import { useDisclosure } from "@mantine/hooks";
import AuthPopup from "../../molecules/auth/authPopup";
const Header = () => {
  return (
    <header className="h-[90px] bg-transparent px-10 flex items-center justify-between fixed top-0 z-50 w-full bg-white">
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
        <AuthPopup />
      </section>
    </header>
  );
};

export default Header;
