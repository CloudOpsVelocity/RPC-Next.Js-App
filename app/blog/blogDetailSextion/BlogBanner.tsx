import React from 'react'
import { BlogsBannerIcon } from '@/app/images/commonSvgs';

function BlogBanner() {
  return (
    <div className='flex justify-center items-center max-h-[260px] bg-[#FAFCFF] relative mb-[3%] w-full '>
        <BlogsBannerIcon className="max-h-[260px] md:max-w-[1200px] " />
        <div className='absolute max-w-[500px] md:max-w-[300px] '>
            <h2 className='apply text-black text-[32px] md:text-[22px] not-italic font-bold leading-[normal] mb-[20px] md:mb-[14px]'>Unlocking Doors to Your Dream Home🏠</h2>
            <p className='text-black text-[20px] md:text-[16px] not-italic font-medium leading-[normal]'>Your Ultimate Real Estate Resource</p>
        </div>
    </div>
  )
}

export default BlogBanner;