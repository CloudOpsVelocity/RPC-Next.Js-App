import { subscrbeIcon } from '@/app/images/commonSvgs';
import React from 'react'

function SubscribeBlock() {
  return (
    <div className=' w-[80%] flex justify-around items-center mb-[3%] '>
        <div>
            <h2 className='text-[color:var(--800,#2D3748)] text-[24px] not-italic font-bold leading-[normal] mb-[8px] '>Subscribe To Our Newsletter</h2>
            <p className='text-[#303030] text-[20px] italic font-medium leading-[normal] mb-[30px]'>Get updates to all about the Real Estate through our blogs</p>
            <div className='border rounded-[10px] border-solid border-[#BBC9DD] bg-[#fcfcfc] h-[72px] p-[16px] flex justify-between items-center gap-[10px] '>
                <input
                    id="Subscribe"
                    placeholder="Enter your mail for new blog "
                    type="text"
                    className="w-full border-0 bg-transparent text-[#666] text-xl italic font-medium leading-[normal] outline-none "
                />

                <button className='text-white text-xl not-italic font-semibold leading-[normal] rounded-[10px] bg-[#227fbc] h-[40px] px-[16px] '>
                    Submit
                </button>

            </div>
        </div>
        {subscrbeIcon} 
    </div>
  )
}

export default SubscribeBlock;