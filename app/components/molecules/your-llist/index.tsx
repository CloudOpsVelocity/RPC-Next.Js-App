import Image from "next/image";
import React from "react";

const YourList = () => {
  return (
    <div className="max-w-7xl mx-auto h-[580px] bg-white [background:linear-gradient(180deg,rgb(249,252,255)_0%,rgb(255,255,255)_100%)] mt-20">
      <div className="inline-flex items-center justify-center gap-[200px] ">
        <Image className=" w-[371.81px] h-[443.03px]" alt="Vector" src="/home/yourListingRight.svg" width={371.81} height={443.03} />
        <div className="inline-flex flex-col items-start gap-[45px] relative flex-[0_0_auto]">
          <p className="relative w-fit mt-[-1.00px] [font-family:'Montserrat-SemiBold',Helvetica] font-normal text-transparent text-[46px] tracking-[1.84px] leading-[59.8px] whitespace-nowrap">
            <span className="font-semibold text-[#1f1f1f]">Post Your </span>
            <span className="[font-family:'Montserrat-Bold',Helvetica] font-bold text-[#138b16]">Listing Today!</span>
          </p>
          <div className="relative w-[712px] h-[325.16px]">
            <div className="inline-flex flex-col items-start gap-[32px] ">
              <p className="relative w-fit mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-grey-3 text-[36px] tracking-[1.44px] leading-[46.8px]">
                Your listings deserves the spotlight. <br />
                Add it to our platform today!
              </p>
              <div className="inline-flex flex-col items-start gap-[10px] relative flex-[0_0_auto]">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-blue-grey text-[32px] tracking-[1.28px] leading-[41.6px] whitespace-nowrap">
                  Post Your Residential Property
                </div>
                <div className="relative w-fit [font-family:'Montserrat-Medium',Helvetica] font-medium text-grey-1 text-[32px] tracking-[1.28px] leading-[41.6px] whitespace-nowrap">
                  Sell | Rent
                </div>
              </div>
            </div>
            {/* <Frame className="!absolute !left-0 !top-[265px]" property1="default" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default YourList