import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <Image src={"/logo.png"} alt="logo" width={220} height={80} />
    </div>
  );
};

export default Logo;
