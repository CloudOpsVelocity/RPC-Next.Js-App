import React from 'react'

type Props = {}

function SearchField({}: Props) {
  return (
    <div className='flex justify-between border-t-[1px] border-solid shadow-md rounded-[4px] min-w-[600px] p-[10px] gap-[6px] mb-[30px] mt-[20px] '>
        <input 
            placeholder='Enter a city, locality or society'
            className=' text-gray-700 font-medium border-0 focus:outline-none w-full  bg-transparent '
        />
        <button className=' bg-gray-500 p-[4px] font-medium text-white border-0 text-nowrap text-[14px] rounded-[4px] px-[6px] '>
            Search Price Trends
        </button>
    </div> 
  )
}

export default SearchField