"use client"

import { GrpLogoSvg } from "@/app/images/getrightLogo";
// import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type props = {
  styles?: string;
};

const Logo = ({ styles }: props) => {
  const pathname = usePathname();
  return (
    <Link 
      prefetch={false} 
      href={"/"} 
      className={styles}
      onClick={(e:any)=> pathname === "/" ? e.preventDefault() : "" }
    >
      {/* <Image
        src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/grp-logo/Logo-without-background.png`}
        alt="logo"
        className="w-[150px] md:w-[220px]"
        width={220}
        height={80}
      /> */}
      <GrpLogoSvg className="w-[150px] md:w-[220px]" />
    </Link>
  );
};

export default Logo;
