import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <Image src={"/logo.png"} alt="logo" width={220} height={80} />
    </div>
  );
};

export default Logo;
