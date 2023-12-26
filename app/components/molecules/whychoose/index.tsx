import React from "react";
import Features from "./features";
const WhyCHoose = () => {
  return (
    <div className="inline-flex flex-col items-start gap-[37px] relative top-[160px] left-[121px] w-[100%]">
          <p className="relative w-fit mt-[-1.00px] [font-family:'Muna-Regular',Helvetica] font-normal text-transparent text-[64px] tracking-[2.56px] leading-[83.2px] whitespace-nowrap">
            <span className="text-[#1f1f1f]">Why Choose</span>
            <span className="[font-family:'Muna-Bold',Helvetica] font-bold text-[#138b16]"> Get Right Property?</span>
          </p>
          <div className="relative w-[1674px] h-[496px]">
            <div className="h-[496px]">
              <div className="relative w-[1674px] h-[496px]">
                <div className="flex w-[1674px] h-[438px] items-center gap-[134px]">
                  <p className="relative w-[584px] [font-family:'Montserrat-Medium',Helvetica] font-normal text-transparent text-[32px] tracking-[1.28px] leading-[32px]">
                    <span className="font-medium text-[#767270] leading-[45.1px]">
                      Choose us for real estate because we offer expert guidance, a vast property selection and
                      commitment to your dreams.
                      <br />
                    </span>
                    <span className="font-medium text-[#767270] leading-[19.5px]">
                      {" "}
                      <br />
                    </span>
                    <span className="font-medium text-[#a3aed0] leading-[19.5px]">
                      <br />
                    </span>
                    <span className="[font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#767270] leading-[33px]">
                      Trust in our experience to find your perfect home!
                    </span>
                  </p>
                </div>
                <div className="absolute w-[957px] h-[496px] top-0 left-[712px]">
                  <div className="inline-flex items-center gap-[44px] absolute top-0 left-[6px]">
                   <Features/>
                   
                  </div>
                  <div className="absolute w-[279px] h-[25px] top-[471px] left-[341px] bg-[#ececec] rounded-[139.5px/12.5px] blur-[10px]" />
                  <div className="absolute w-[279px] h-[25px] top-[438px] left-0 bg-[#ececec] rounded-[139.5px/12.5px] blur-[10px]" />
                  <div className="absolute w-[279px] h-[25px] top-[438px] left-[678px] bg-[#ececec] rounded-[139.5px/12.5px] blur-[10px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default WhyCHoose;
