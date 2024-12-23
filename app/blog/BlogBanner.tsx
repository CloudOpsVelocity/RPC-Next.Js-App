import React from 'react'
import { BlogsBannerIcon } from '../images/commonSvgs';

function BlogBanner() {
  return (
    <div className='mt-[70px] flex justify-center items-center max-h-[260px] bg-[#FAFCFF] relative mb-[3%] w-full '>
        <BlogsBannerIcon />
        <div className='absolute max-w-[500px] '>
            <h2 className='apply text-black text-[32px] not-italic font-bold leading-[normal] mb-[20px]'>Unlocking Doors to Your Dream Home🏠</h2>
            <p className='text-black text-[20px] not-italic font-medium leading-[normal]'>Your Ultimate Real Estate Resource</p>
        </div>
    </div>
  )
}

export default BlogBanner;