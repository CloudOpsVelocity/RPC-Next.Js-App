import React from 'react'

type Props = {}

export default function ProjectDetails({}: Props) {
  return (
    <div className="rounded-[20px] mt-[1%] flex justify-between items-center bg-[#FFF] shadow-md w-[100%] mb-[2%] lg:w-[50%] p-[1%] ">
          <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px]">
            <p className=" text-[#202020] text-[20px] lg:text-[24px] font-[600]">
              05
            </p>
            <p className=" text-[#148B16] text-[16px] lg:text-[20px] font-[700]">
              New Launch Projects
            </p>
          </div>

          <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px]">
            <p className=" text-[#202020] text-[20px] lg:text-[24px] font-[600]">
              15
            </p>
            <p className=" text-[#0073C6] text-[16px] lg:text-[20px] font-[700]">
              New Launch Projects
            </p>
          </div>

          <div className="w-[30%] ">
            <p className=" text-[#202020] text-[20px] lg:text-[24px] font-[600]">
              35
            </p>
            <p className=" text-[#E3AC00] text-[16px] lg:text-[20px] font-[700]">
              New Launch Projects
            </p>
          </div>
    </div>
  )
}