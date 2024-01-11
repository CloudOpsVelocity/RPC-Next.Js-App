import React from 'react'
import About from '../project/about'
import { callIconSvg, completedProjIconSvg, emailIconSvg, lacationIconSvg, newLaunchProjIconSvg, onGoingProjIconSvg } from '@/app/images/commonSvgs'

type Props = {}

export default function ProjectDetails({}: Props) {
  return (
    <React.Fragment>
        <div className="rounded-[20px] mt-[3%] flex justify-between items-center bg-[#FFF] shadow-md w-[100%] mb-[3%] lg:w-[50%] p-[1%] ">
          <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px]">
            <div className='flex justify-between items-center w-[90%] '>
                <span className=" text-[#202020] text-[20px] lg:text-[24px] font-[600]">
                05
                </span>
                {newLaunchProjIconSvg}
            </div>


            <p className=" text-[#148B16] text-[16px] lg:text-[20px] font-[700]">
              New Launch Projects
            </p>
          </div>

          <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px]">
            <div className='flex justify-between items-center w-[90%] '>
                <span className=" text-[#202020] text-[20px] lg:text-[24px] font-[600]">
                15
                </span>
                {onGoingProjIconSvg}
            </div>
            <p className=" text-[#0073C6] text-[16px] lg:text-[20px] font-[700]">
              New Launch Projects
            </p>
          </div>

          <div className="w-[30%] ">
            <div className='flex justify-between items-center w-[90%] '>
                <span className=" text-[#202020] text-[20px] lg:text-[24px] font-[600]">
                35
                </span>
                {completedProjIconSvg}
            </div>
            <p className=" text-[#E3AC00] text-[16px] lg:text-[20px] font-[700]">
              New Launch Projects
            </p>
          </div>
        </div>

        <About
            id="whyBuy"
            heading="About"
            projName="Sumadhura"
            content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut  dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut dipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ali quip ex ea commodo consequat. Duis auteeeee irure dolor in repllllllllll rehen laborum"}
        />

        <div className=" flex justify-start items-start mb-[4%] mt-[-2%] flex-wrap gap-[5%]  "  >
            <div className='flex justify-start items-start flex-col mb-[2%] '>
                <p className='text-[#303030] text-[16px] lg:text-[24px] rounded-[30px] mb-[9px] font-[500] p-[8px] flex justify-center items-center bg-gradient-to-r from-[#EFF5FF] /0 to-[#F2FAFF]/100 '>{emailIconSvg} Email</p>
                <p className='text-[#00487C] text-[16px] lg:text-[20px] font-[600] underline '>builder123@sumadhura.com</p>
            </div>

            <div className='flex justify-start items-start flex-col mb-[2%] '>
                <p className='text-[#303030] text-[16px] lg:text-[24px] rounded-[30px] mb-[9px] font-[500] p-[8px] flex justify-center items-center bg-gradient-to-r from-[#EFF5FF] /0 to-[#F2FAFF]/100 '>{callIconSvg} Contact</p>
                <p className='text-[#00487C] text-[16px] lg:text-[20px] font-[600] underline '>+91- 8675497304</p>
            </div>

            <div className='flex justify-start items-start flex-col mb-[2%] w-[100%] md:w-[40%] '>
                <p className='text-[#303030] text-[16px] lg:text-[24px] rounded-[30px] mb-[9px] font-[500] p-[8px] flex justify-center items-center bg-gradient-to-r from-[#EFF5FF] /0 to-[#F2FAFF]/100 '>{lacationIconSvg} Address</p>
                <p className='text-[#00487C] text-[16px] lg:text-[20px] font-[600] underline '>Folium by Sumadhura, Borewell Rd, Whitefield, Palm Meadows, Ramagondanahalli, Bengaluru, Karnataka 560066</p>
            </div>
        </div>
    
    
    </React.Fragment>
  )
}