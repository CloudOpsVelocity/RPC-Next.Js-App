import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="flex justify-center items-center w-full">
      <Image src={"/logo.png"} alt="logo" width={220} height={80} />
    </Link>
  );
};

export default Logo;
