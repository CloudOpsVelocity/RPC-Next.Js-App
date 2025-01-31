import { LikeIcon, TringleIcons } from '@/app/images/commonSvgs'
// import Image from 'next/image'
import React from 'react'

type Props = {}

export default function SellingTipsBanner({}: Props) {
  return (
    <div className='relative p-[3%] w-full flex flex-col justify-center items-center bg-gradient-to-r from-gray-500 to-[#cccccc]'>
        {/* <Image
          src={tips}
          width={800}
          height={800}
          alt="not found"
          className='absolute top-0 left-0 h-full w-full '
        /> */}
        <h2 className='text-[18px] md:text-[28px] text-white leading-[30px] shadow-[2px 2px 5px rgba(0, 0, 0, 1)] mb-0 md:mb-[16px] font-bold flex justify-center items-center'>Quick tips for selling your home faster</h2>
        {/* <p className='text-[11px] text-[#cccccc] font-semibold mb-[20px] '>in india</p> */}
    </div>
  )
}