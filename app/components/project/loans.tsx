import React from "react";

export default function Loans() {
  return (
    <>
      <div className="bg-white py-8 w-[90%] mx-auto">
        <div className="  px-4">
          <h2 className="text-[24px] lg:text-[32px] font-bold">
            BANK APPROVALS OF <span className="text-green-500">SARANG</span>
          </h2>
          <p className="mt-2 text-[18px] lg:text-[20px] text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipi
          </p>
          <div className="mt-6 flex justify-start items-start flex-wrap w-full gap-[3%]">
            <img
              src="bank.png"
              alt="HDFC Home Loans"
              width={100}
              height={50}
              style={{ aspectRatio: "100 / 50", objectFit: "cover" }}
              className="mb-[3%]"
            />
            <img
              src="bank.png"
              alt="ICICI Bank Home Loans"
              width={100}
              height={50}
              style={{ aspectRatio: "100 / 50", objectFit: "cover" }}
              className="mb-[3%]"
            />
            <img
              src="bank.png"
              alt="IDFC FIRST Bank"
              width={100}
              height={50}
              style={{ aspectRatio: "100 / 50", objectFit: "cover" }}
              className="mb-[3%]"
            />
            <img
              src="bank.png"
              alt="SBI Home Loans"
              width={100}
              height={50}
              style={{ aspectRatio: "100 / 50", objectFit: "cover" }}
              className="mb-[3%]"
            />
            <img
              src="bank.png"
              alt="Bank of Baroda"
              width={100}
              height={50}
              style={{ aspectRatio: "100 / 50", objectFit: "cover" }}
              className="mb-[3%]"
            />
            <img
              src="bank.png"
              alt="AXIS BANK Home Loans"
              width={100}
              height={50}
              style={{ aspectRatio: "100 / 50", objectFit: "cover" }}
              className="mb-[3%]"
            />
            <img
              src="bank.png"
              alt="PNB Housing Finance Limited"
              width={100}
              height={50}
              style={{ aspectRatio: "100 / 50", objectFit: "cover" }}
              className="mb-[3%]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
