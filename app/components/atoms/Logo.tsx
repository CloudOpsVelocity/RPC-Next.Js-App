import { GrpLogoSvg } from "@/app/images/commonSvgs";
import Image from "next/image";
import Link from "next/link";

type props = {
  styles?: string;
};

const Logo = ({ styles }: props) => {
  return (
    <button className={styles}>
      {/* <Image
        src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/grp-logo/Logo-without-background.png`}
        alt="logo"
        className="w-[150px] md:w-[220px]"
        width={220}
        height={80}
      /> */}
      <GrpLogoSvg className="w-[150px] md:w-[220px]" />
    </button>
  );
};

export default Logo;
