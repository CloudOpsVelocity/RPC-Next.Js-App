import ForgotForm from "@/app/components/molecules/auth/forgot";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="flex justify-center items-center flex-col">
      <h2
        className={`whitespace-nowrap text-2xl font-bold text-[#148B16] text-center mt-3`}
      >
        Forgot Password ?
      </h2>
      <Image
        src={
          "https://d1l03fubsuphsh.cloudfront.net/staticmedia-images-icons/lock.gif"
        }
        alt="lock"
        width={200}
        height={200}
      />
      <h3 className="font-normal text-lg max-w-xl text-center">
        Don’t worry ! It happens. Please enter the phone number we will send the
        OTP in this phone number.
      </h3>
      <ForgotForm />
    </div>
  );
}
