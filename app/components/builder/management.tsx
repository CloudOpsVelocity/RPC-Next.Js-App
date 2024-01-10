import React from 'react'
import About from '../project/about'
import { callIconSvg } from '@/app/images/commonSvgs'

type Props = {}

export default function ManagementBlock({}: Props) {
  return (
    <div className=' p-[1%] mb-[4%] pt-[2%] pb-[2%] bg-gradient-to-r from-[#EFF5FF] /0 to-[#F2FAFF]/100 shadow-md shadow-[#5b8fb630] '>
        <h1 className="uppercase text-[24px] lg:text-[32px] font-[600] text-[#001F35]">
            Sumadhura{" "}
            <span className="text-[#148B16] font-[700] uppercase">Management</span>{" "}
        </h1>

        <div className='flex justify-start items-start w-full flex-wrap gap-[3%] mb-[2%] mt-[2%]  ' >
            <div className='bg-[#FFF] rounded-[10px] shadow-lg border-[#92B2C8] border-[1px] border-solid p-[16px]  '>
                <p className='text-[20px] md:text-[24px] font-[600] text-[#202020] '>Madhusudhan Gunda </p>
                <p className='text-[16px] md:text-[20px] font-[700] text-[#00487C] italic'>CEO, Sumadhura</p>
            </div>

            <div className='bg-[#FFF] rounded-[10px] shadow-lg border-[#92B2C8] border-[1px] border-solid p-[16px]  '>
                <p className='text-[20px] md:text-[24px] font-[600] text-[#202020] '>Bharat Kumar Kandukuri </p>
                <p className='text-[16px] md:text-[20px] font-[700] text-[#00487C] italic'>Founder, Sumadhura</p>
            </div>
        </div>

        <About
            id="whyBuy"
            heading="Vision"
            projName="Sumadhura’s"
            content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut  dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut dipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ali quip ex ea commodo consequat. Duis auteeeee irure dolor in repllllllllll rehen laborum"}
        />

        <div className=' flex justify-start items-center w-full gap-[8px] mt-[-3%] mb-[2%] ' >
            {callIconSvg}
            <p className='text-[16px] md:text-[24px] font-[500] text-[#00487C]'>Office Contact</p>
            <p className='text-[16px] md:text-[24px] font-[600] text-[#00487C] underline'>+91- 8675497304</p>
        </div>

        <h1 className="uppercase text-[24px] lg:text-[32px] font-[600] text-[#001F35]">
        Sumadhura Projects{" "}
            <span className="text-[#148B16] font-[700] uppercase">in Different Branches</span>{" "}
        </h1>

        <div className='flex justify-start items-start w-full flex-wrap gap-[3%] mb-[2%] mt-[1%]  ' >
            <p className='text-[16px] md:text-[24px] font-[500] text-[#00487C] bg-[#FFF] rounded-[10px] shadow-lg p-[12px] px-[16px] hover:bg-[#00487C] hover:text-[#FFF]  '>Project in Bangalore</p>
            <p className='text-[16px] md:text-[24px] font-[500] text-[#00487C] bg-[#FFF] rounded-[10px] shadow-lg p-[12px] px-[16px] hover:bg-[#00487C] hover:text-[#FFF] '>Project in Hyderabad</p>
        </div>


    </div>
  )
}