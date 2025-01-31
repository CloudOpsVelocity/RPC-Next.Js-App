import { apartmentCardImg } from '@/app/images/commonImages'
import Image from 'next/image'
import React from 'react'

function BlogMiniCard() {
  return (
    <div className='max-w-[500px] mt-[32px] flex justify-between items-center gap-[16px] p-[10px] md:p-[16px] self-end ml-auto shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[10px] border-[0.5px] border-solid border-[#E8F3FF] '>
        <Image
            src={apartmentCardImg} 
            alt="blog Image" width={120} height={90} 
            className=' min-w-[120px] h-[90px] border-gray shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[5px] border-2 border-solid border-[#227FBC] ' 
        />

        <div className='w-full'>
            <h3 className={`text-[#227FBC] not-italic font-bold leading-[normal] mb-[6px] md:mb-[10px] text-[16px]`}>Next Read</h3>
            <p className='text-[color:var(--800,#2D3748)] text-base not-italic font-bold leading-[normal]'>Resale Value</p>
            <p className={`text-[#303030] text-[14px] italic font-medium leading-[normal] `}>How to Maximise your Property’s Resale Value</p>
            
            <div className={`flex justify-between items-center `}>
                <p className={`text-[#627A9E] italic font-medium leading-[normal] text-[12px]`}>May 24th, 2024</p>
            </div>
        </div>

    </div>
  )
} 

function BlogDetailsDescription() {
  return (
    <div className='w-[94%] xl:w-[80%] mb-[3%] '>
        <h3 className='text-[#303030] text-[16px] md:text-[22px] xl:text-[28px] not-italic font-bold md:leading-8 mb-[14px] md:mb-[20px] '>Lorem ipsum dolor sit amet, consectetur adipiscing</h3>
        <p className='text-[14px] md:text-[18px] xl:text-[20px] not-italic xl:leading-[26px] tracking-[0.96px] mb-[16px]'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
            consequat. Duis auteeeee irure dolor in reprehe nderit in voluptate velit esse cillum dolore eu fugiat nulla 
            pariatur. Excepteur sint occaecat cupidatatte non proident, sunt in culpa qui officia ese runt mollit anim id 
            est laborum. Lorem ipsum dolor sit amet, consectetur adipiscin g elit, sed do eiusmod tempor incididunt ut labore 
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitati on ullamco laboris nisi ut aliquip ex ea 
            commodo consequat. Dui s aute irure dolor in reprehenderit in voluptate velit essecill um dolore eu fugiat 
            nulla pariatur. Excepteur sint occaecat cupidatat non pro ident, sunt in culpa qui officia ese runt mollit a 
            nim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisci ng elit, sed do eiusmo d tempor incididunt ut 
            labore etii dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ull am  co laboris nisi ut aliquip 
            ex ea commodo co nsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
            pariatur. Excepteur sint oc caecat cupidatat non proident, sunt in culpa qui officia ese runt mollit anim id est laborum.
        </p>

        <h3 className='text-[#303030] text-[18px] md:text-[22px] xl:text-[28px] not-italic font-bold xl:leading-8 mb-[16px] md:mb-[20px] '>Lorem ipsum dolor sit amet, consectetur adipiscing</h3>

        <Image
            src={apartmentCardImg} 
            alt="blog Image" width={100} height={269} 
            className='rounded-[10px] w-full h-[235px] md:h-[435px] xl:h-[600px]' 
        />

        <h3 className='text-[#303030] text-[16px] md:text-[22px] xl:text-[28px] not-italic font-bold md:leading-8 mb-[14px] md:mb-[20px] '>Lorem ipsum dolor sit amet, consectetur adipiscing</h3>
        <p className='text-[14px] md:text-[18px] xl:text-[20px] not-italic xl:leading-[26px] tracking-[0.96px] mb-[16px]'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
            consequat. Duis auteeeee irure dolor in reprehe nderit in voluptate velit esse cillum dolore eu fugiat nulla 
            pariatur. Excepteur sint occaecat cupidatatte non proident, sunt in culpa qui officia ese runt mollit anim id 
            est laborum. Lorem ipsum dolor sit amet, consectetur adipiscin g elit, sed do eiusmod tempor incididunt ut labore 
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
        </p>

        <BlogMiniCard />


    </div>
  )
}

export default BlogDetailsDescription