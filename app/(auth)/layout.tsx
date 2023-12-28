import Logo from "../components/atoms/Logo";
import data from "../data/auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full flex h-screen">
      <div className="relative hidden md:flex items-center justify-center bg-[#65BB671A] w-full ">
        <div className="relative z-10 w-full max-w-md">
          <div className=" mt-16 space-y-3">
            <ul className="flex flex-col justify-center items-center space-y-1 text-neutral-600 text-base font-semibold">
              {data.map((item, index) => (
                <li key={index} className="w-full max-w-[16rem]">
                  <p className="!text-left ">{item.text}</p>
                </li>
              ))}
            </ul>
            <img src="/auth/sideCoverImage.svg" alt="" className="!my-12" />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-start w-full pt-[10%]">
        <div className="w-full bg-white text-gray-600 justify-center items-center">
          <Logo />

          {children}
        </div>
      </div>
    </main>
  );
}
