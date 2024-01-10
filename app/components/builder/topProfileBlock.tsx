import React from 'react'

type Props = {}

export default function TopProfileBlock({}: Props) {
  return (
    <div className='w-full flex justify-between items-center p-[2%] bg-gradient-to-r from-[#E0EBFF] /0 via-[#F0F6FF]/46  to-[#C9E8FF]/100 '>
        <div className='flex flex-col justify-between items-start ' >
        <p className="text-[16px] text-[#565D70] font-[500] mb-[1%]">
            <span>Home</span> 
            {" > "}
              <span>Builder</span>
            {" > "}
            <span>Builder Name</span>
          </p>

            <div className='flex justify-start items-end '>
                <div className='flex justify-center mr-[16px] items-center h-[158px] w-[158px] bg-[#FFF] shadow-md border-solid border-[2px] border-[#96C5E4] rounded-[10px]  '></div>
                <div>
                    <p className=' text-[#148B16] text-[40px] font-[700] '>Sumadhura</p>
                    <p className=' text-[#303A42] text-[20px] font-[500] ' >since January, 2017</p>
                </div>
            </div>

        </div>
        <div className='h-[231px] w-[25%] bg-[#dbd9d9] '>

        </div>
    </div>
  )
}