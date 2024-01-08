import React from "react";
import Logo from "../../atoms/Logo";

const Footer = () => {
  return (
    <div className=" w-full bg-[#f8f9fa] flex justify-between items-start flex-col p-[4%] flex-wrap ">
      <div className="w-full flex justify-between items-start flex-wrap flex-row ">
        <div className=" w-[100%]  lg:w-[30%] top-[64px] left-[104px] min-w-[202px] md:min-w-[402px] md:w-[60%] mb-[4%]">
          <h1>{JSON.stringify(process.env.NEXT_PUBLIC_NAME)}</h1>
          {/* <img
            className=" h-[57px] top-0 left-[-4px]"
            alt="Get right property"
            src="get-right-property.png"
          /> */}
          <Logo />
          <p className=" top-[68px] left-0 [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#666666] text-[24px] tracking-[0] leading-[36px]">
            We pride ourselves on delivering exceptional customer services &amp;
            building lasting relationships with our clients
          </p>
        </div>

        <div className=" w-[10%] left-[653px]  top-[64px] min-w-[200px] mb-[4%]">
          <h2 className=" mb-[6%] top-0 left-0 [font-family:'Montserrat-Bold',Helvetica] font-bold text-[#0072c5] text-[26px] tracking-[0] leading-[22px] whitespace-nowrap">
            Quick Link
          </h2>

          <div className=" h-[199px] flex flex-col items-start gap-[16px]  top-[48px] left-0">
            <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#767270] text-[18px] tracking-[0] leading-[27px]">
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-[#767270] text-[18px] tracking-[0] leading-[27px]">
                Home
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#767270] text-[18px] tracking-[0] leading-[27px]">
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-[#767270] text-[18px] tracking-[0] leading-[27px]">
                About Us
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#767270] text-[18px] tracking-[0] leading-[27px]">
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-[#767270] text-[18px] tracking-[0] leading-[27px]">
                Properties
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#767270] text-[18px] tracking-[0] leading-[27px]">
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-[#767270] text-[18px] tracking-[0] leading-[27px]">
                Projects
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#767270] text-[18px] tracking-[0] leading-[27px]">
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-[#767270] text-[18px] tracking-[0] leading-[27px]">
                Blogs
              </span>
            </p>
          </div>
        </div>

        <div className=" w-[10%] left-[1013px]  top-[64px] min-w-[200px] mb-[4%]">
          <h1 className=" mb-[6%] top-0 left-0 [font-family:'Montserrat-Bold',Helvetica] font-bold text-[#0072c5] text-[26px] tracking-[0] leading-[22px] whitespace-nowrap">
            Support
          </h1>

          <div className=" flex flex-col items-start gap-[16px]  top-[48px] left-0">
            <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#767270] text-[18px] tracking-[0] leading-[27px]">
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-[#767270] text-[18px] tracking-[0] leading-[27px]">
                Account
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#767270] text-[18px] tracking-[0] leading-[27px]">
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-[#767270] text-[18px] tracking-[0] leading-[27px]">
                Support <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#767270] text-[18px] tracking-[0] leading-[27px]">
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-[#767270] text-[18px] tracking-[0] leading-[27px]">
                Feedback
                <br />
              </span>
            </p>
            <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#767270] text-[18px] tracking-[0] leading-[27px]">
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-[#767270] text-[18px] tracking-[0] leading-[27px]">
                Contact us
              </span>
            </p>
          </div>
        </div>

        <div className="  w-[100%] lg:w-[25%] inline-flex flex-col items-start gap-[26px] md:w-[60%] top-[64px] left-[1344px] min-w-[202px] md:min-w-[402px] mb-[4%]">
          <div className="mb-[6%] relative w-fit mt-[-1.00px] [font-family:'Montserrat-Bold',Helvetica] font-bold text-[#0072c5] text-[26px] tracking-[0] leading-[22px] whitespace-nowrap">
            Join a Newsletter
          </div>
          <div className="inline-flex flex-col items-start gap-[12px] relative flex-[0_0_auto] flex-wrap">
            <p className=" top-0 left-[21px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#767270] text-[18px] tracking-[0] leading-[27px] whitespace-nowrap">
              Your Email
            </p>

            <div className="flex justify-start items-start w-full gap-[16px] ">
              <input
                type="text"
                placeholder="Enter Your Email"
                className=" pl-[3%] rounded-[10px] bg-[ #FFF] border-[0.8px] border-blue-600 h-[56px] focus:outline-none w-[60%] "
              />

              <button className="flex flex-col justify-center items-center h-[56px] text-[#FFF] font-[500] text-[14px]  gap-[10px] bg-[#0072c5] rounded-[8px] shadow-SELECTED w-[30%]">
                Subscribe
              </button>
            </div>
            <p className="relative [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#767270] text-[20px] tracking-[0] leading-[30px]">
              Subscribe to our newsletter and receive updates email
            </p>
          </div>
        </div>
      </div>

      <hr className="w-full border-b-1 mb-[3%] " />

      <div className="w-full flex justify-between items-start flex-wrap">
        <p className=" top-[443px] left-[104px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#4f4f4f] text-[18px] tracking-[0] leading-[27px] whitespace-nowrap">
          Copyright @getrightproperty
        </p>

        <div className="flex items-start gap-[31px] flex-wrap">
          <div className="inline-flex items-center justify-center gap-[12px] relative flex-[0_0_auto]">
            <img
              className="relative w-[14px] h-[20px]"
              alt="Footerlocation"
              src="footerlocation.svg"
            />
            <p className="relative w-fit mt-[-1.00px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#767270] text-[18px] tracking-[0] leading-[27px] whitespace-nowrap">
              Whitefield, Bengaluru-560066
            </p>
          </div>
          <div className="inline-flex items-center justify-center gap-[12px] relative flex-[0_0_auto]">
            <img
              className="relative w-[24px] h-[24px]"
              alt="Contact"
              src="contact.svg"
            />
            <p className="relative w-fit mt-[-1.00px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#767270] text-[18px] tracking-[0] leading-[27px] whitespace-nowrap">
              +91-8884440963
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
