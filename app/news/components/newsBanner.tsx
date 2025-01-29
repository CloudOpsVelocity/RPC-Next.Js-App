import React from 'react'

type Props = {}

export default function NewsBanner({}: Props) {
  return (
    <div className='p-[3%] w-full flex flex-col justify-center bg-gradient-to-r from-gray-500 to-[#cccccc] '>
        <p className=' border-0 py-[6px] px-[8px] bg-blue-500 text-[12px] text-white mr-auto mb-[16px] '>Residential</p>
        <h2 className='text-[28px] text-white leading-[30px] shadow-[2px 2px 5px rgba(0, 0, 0, 1)] mb-[16px] font-bold '>Karnataka Govt. slashes stamp duty for properties priced under Rs 45 lakh</h2>
        <p className='text-[11px] text-[#cccccc] font-semibold'>Research Analyst</p>
        <p className='text-[11px] text-[#cccccc] font-semibold'>getrightproperty.com</p>
    </div>
  )
}