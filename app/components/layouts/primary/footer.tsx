import { GrpLogoSvg } from "@/app/images/commonSvgs";
import Image from "next/image";
import React from "react";

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className=" w-full bg-[#E3E3E3] flex justify-between items-start flex-col p-[4%] flex-wrap ">
      <div className="w-full flex justify-between items-start flex-wrap flex-row border-b-[1px] border-solid border-[#9B9B9B] ">
        <div className=" flex flex-col justify-center items-center sm:justify-start sm:items-start w-[100%] lg:w-[30%] top-[64px] left-[104px] min-w-[202px] md:max-w-[350px] md:w-[60%] mb-[4%]">
          {/* <Image
            src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/grp-logo/Logo-without-background.png`}
            width={180}
            height={180}
            alt="logo"
          /> */}
          <GrpLogoSvg className="w-[180px] md:w-[180px]" />
          <p className=" top-[68px] text-center sm:text-left left-0 [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424]  text-[12px] leading-[20px] sm:text-[16px] xl:text-[20px] tracking-[0] xl:leading-[36px] mt-[4px] sm:mt-5">
            We pride ourselves on delivering exceptional customer services &amp;
            building lasting relationships with our clients
          </p>
        </div>

        <div className=" w-[10%] left-[653px] top-[64px] min-w-[100px] sm:min-w-[110px] xl:min-w-[200px] mb-0 xl:mb-[4%]">
          <h2 className="mb-[10px] sm:mb-[6%] top-0 left-0 [font-family:'Montserrat-Bold',Helvetica] font-bold text-[#001153] text-[14px] sm:text-[18px] xl:text-[20px] tracking-[0] leading-[22px] whitespace-nowrap">
            Quick Link
          </h2>

          <div className="h-auto flex flex-col items-start gap-[0px] xl:gap-[16px] top-[48px] left-0">
            <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424]  sm:text-[18px] tracking-[0] leading-[27px] ">
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424] text-[12px] sm:text-[16px] xl:text-[18px] tracking-[0] leading-[27px]">
                Home
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424]  sm:text-[18px] tracking-[0] leading-[27px]">
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424] text-[12px] sm:text-[16px] xl:text-[18px] tracking-[0] leading-[27px]">
                About Us
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424]  sm:text-[18px] tracking-[0] leading-[27px]">
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424] text-[12px] sm:text-[16px] xl:text-[18px] tracking-[0] leading-[27px]">
                Properties
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424] sm:text-[18px] tracking-[0] leading-[27px]">
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424] text-[12px] sm:text-[16px] xl:text-[18px] tracking-[0] leading-[27px]">
                Projects
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424]  sm:text-[18px] tracking-[0] leading-[27px]">
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424] text-[12px] sm:text-[16px] xl:text-[18px] tracking-[0] leading-[27px]">
                Blogs
              </span>
            </p>
          </div>
        </div>

        <div className=" w-[10%] left-[1013px]  top-[64px] min-w-[100px] sm:min-w-[110px] xl:min-w-[200px] mb-0 xl:mb-[4%]">
          <h1 className=" mb-[10px] sm:mb-[6%] top-0 left-0 [font-family:'Montserrat-Bold',Helvetica] font-bold text-[#001153] text-[14px] sm:text-[18px] xl:text-[20px] tracking-[0] leading-[22px] whitespace-nowrap">
            Support
          </h1>

          <div className=" flex flex-col items-start gap-[0px] xl:gap-[16px]  top-[48px] left-0">
            <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424] sm:text-[18px] tracking-[0] leading-[27px]">
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424] text-[12px] sm:text-[16px] xl:text-[18px] tracking-[0] leading-[27px]">
                Account
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424] sm:text-[18px] tracking-[0] leading-[27px]">
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424] text-[12px] sm:text-[16px] xl:text-[18px] tracking-[0] leading-[27px]">
                Support <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424] sm:text-[18px] tracking-[0] leading-[27px]">
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424] text-[12px] sm:text-[16px] xl:sm:text-[16px] xl:text-[18px] tracking-[0] leading-[27px]">
                Feedback
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424] sm:text-[18px] tracking-[0] leading-[27px]">
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424] text-[12px] sm:text-[16px] xl:text-[18px] tracking-[0] leading-[27px]">
                Contact us
              </span>
            </p>
          </div>
        </div>

        <div className=" w-[10%] left-[1013px]  top-[64px] min-w-[100px] sm:min-w-[110px] xl:min-w-[200px] mb-0 xl:mb-[4%]">
          <h1 className=" mb-[10px] sm:mb-[6%] top-0 left-0 [font-family:'Montserrat-Bold',Helvetica] font-bold text-[#001153] text-[14px] sm:text-[18px] xl:text-[20px] tracking-[0] leading-[22px] whitespace-nowrap">
            Legal
          </h1>

          <div className=" flex flex-col items-start gap-[0px] xl:gap-[16px]  top-[48px] left-0">
            <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424] sm:text-[18px] tracking-[0] leading-[27px]">
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424] text-[12px] sm:text-[16px] xl:text-[18px] tracking-[0] leading-[27px] capitalize">
                term of services
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424] sm:text-[18px] tracking-[0] leading-[27px]">
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424] text-[12px] sm:text-[16px] xl:text-[18px] tracking-[0] leading-[27px] capitalize">
                privacy policy <br />
              </span>
            </p>
          </div>
        </div>

        <div className="  w-full lg:w-[25%] inline-flex flex-col items-start gap-[6px] xl:gap-[20px] md:w-[60%] top-[64px] sm:left-[1344px] min-w-[202px] sm:max-w-[380px] xl:min-w-[402px] mb-[10px] xl:mb-[4%]">
          <div className=" mb-0 xl:mb-[6%] relative w-fit mt-[-1.00px] [font-family:'Montserrat-Bold',Helvetica] font-bold text-[#001153] text-[14px] sm:text-[16px] xl:text-[20px] tracking-[0] leading-[22px] whitespace-nowrap">
            Join a Newsletter
          </div>
          <div className="flex w-full flex-col items-start gap-[4px] sm:gap-[12px] relative flex-[0_0_auto] flex-wrap">
            <p className=" top-0 left-[21px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#242424] text-[12px] sm:text-[16px] xl:text-[18px] tracking-[0] leading-[27px] whitespace-nowrap">
              Your Email
            </p>

            <div className="flex justify-start items-center gap-[16px] ">
              <input
                type="text"
                placeholder="Enter Your Email"
                className=" pl-[3%] rounded-[4px] bg-[ #FFF] text-[14px] sm:text-[16px] border-[0.8px] border-blue-600 h-[24px] sm:h-[34px] xl:h-[56px] focus:outline-none w-full sm:max-w-[274px] xl:max-w-[319px] xl:w-[60%] "
              />

              <button className="flex flex-col justify-center items-center h-[24px] sm:h-[34px] xl:h-[56px] text-[#FFF] font-[500] text-[12px] sm:text-[14px] bg-[#0073C6] rounded-[4px] shadow-selected p-[4px] sm:p-[12px] ">
                Subscribe
              </button>
            </div>
            <p className="relative [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424] text-[12px] sm:text-[16px] xl:text-[20px] tracking-[0] leading-[20px] xl:leading-[30px]">
              Subscribe to our newsletter and receive updates email
            </p>
          </div>
        </div>
      </div>

      <hr className="w-full border-b-1 mb-[10px] sm:mb-[20px] xl:mb-[3%] " />

      <div className="w-full flex justify-between items-start flex-wrap">
        <p className=" top-[443px] left-[104px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#242424] text-[14px] sm:text-[16px] xl:text-[18px] tracking-[0] leading-[27px] whitespace-nowrap">
          Copyright @getrightproperty <br />
          <span>
            All Rights Reserved <br />A PRODUCT BY "
            <a href="https://rpclan.com/" target="_blank">
              {" "}
              RPCLAN SERVICES PVT.LTD
            </a>
            "
          </span>
        </p>

        <div className="flex items-start gap-[31px] flex-wrap">
          <div className="inline-flex items-center justify-center gap-[6px] xl:gap-[12px] relative flex-[0_0_auto]">
            <img
              className="relative sm:w-[20px] sm:h-[20px] xl:w-[25px] xl:h-[25px] w-[16px] h-[16px]  "
              alt="Footerlocation"
              src="/location.svg"
            />
            <p className="relative w-fit mt-[-1.00px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#242424] text-[12px] sm:text-[16px] xl:text-[18px] tracking-[0] leading-[27px] whitespace-nowrap">
              Whitefield, Bengaluru-560066
            </p>
          </div>
          <div className="inline-flex items-center justify-center gap-[6px] xl:gap-[12px] relative flex-[0_0_auto]">
            <img
              className="relative sm:w-[20px] sm:h-[20px] xl:w-[25px] xl:h-[25px] w-[16px] h-[16px]"
              alt="Contact"
              src="/footer/phone.svg"
            />
            <a
              href={`tel:${8884440963}`}
              className="relative w-fit mt-[-1.00px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#242424] text-[12px] sm:text-[16px] xl:text-[18px] tracking-[0] leading-[27px] whitespace-nowrap"
            >
              +91-8884440963
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
