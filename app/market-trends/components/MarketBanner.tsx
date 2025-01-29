import React from 'react'

type Props = {}

export default function MarketBanner({}: Props) {
  return (
    <div className='p-[3%] w-full flex flex-col justify-center items-center bg-gradient-to-r from-gray-500 to-[#cccccc]'>
        <h2 className='text-[28px] text-white leading-[30px] shadow-[2px 2px 5px rgba(0, 0, 0, 1)] mb-[16px] font-bold '>Property Rates & Price Trends</h2>
        <p className='text-[11px] text-[#cccccc] font-semibold'>in india</p>
    </div>
  )
}