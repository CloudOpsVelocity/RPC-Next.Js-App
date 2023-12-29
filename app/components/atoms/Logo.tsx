import Image from "next/image";
import Link from "next/link";

type props = {
  styles?: string;
};

const Logo = ({ styles }: props) => {
  return (
    <Link href={"/"} className={styles}>
      <Image src={"/logo.png"} alt="logo" width={220} height={80} />
    </Link>
  );
};

export default Logo;
