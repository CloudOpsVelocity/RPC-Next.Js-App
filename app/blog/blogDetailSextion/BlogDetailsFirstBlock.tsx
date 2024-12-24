"use client"
import { apartmentCardImg } from '@/app/images/commonImages';
import Image from 'next/image';
import React from 'react'
import { useAtom } from 'jotai';
import { blogDetails } from '@/app/hooks/blog';
import { backIcon, Facebook, ShearIcon, TringleIcons, WhatsApp } from '@/app/images/commonSvgs';

function BlogDetailsFirstBlock() {
  const [{ selectedBlog, allBlogData }] = useAtom(blogDetails);
  const data = allBlogData.filter(each=> each.id === selectedBlog)[0];
  const {date, text, heading} = data;

  return (
    <div className='w-[80%] flex justify-between items-center gap-[20px] mt-[5%] mb-[160px] pt-[50px] relative  '>
      <button className='text-[#202020] text-[20px] not-italic font-medium leading-[normal] gap-[8px] absolute top-0 flex justify-center items-center '>
        <span className=' bg-[#E8F3FF] w-[32px] h-[32px] rounded-[50%] flex justify-center items-center '>{backIcon}</span>
        Back
      </button>

      <div className='rounded-[10px] relative w-[50%] max-h-[463px] border-[0.5px] border-gray border-solid  bg-white '>
        <TringleIcons key="TringleIcon1" className="absolute bottom-[-180px] left-[-120px] z-0 " number={1} />
        <TringleIcons key="TringleIcon2" className="absolute bottom-[-60px] left-[20px] z-10 " number={2} />
        <TringleIcons key="TringleIcon2" className="absolute top-[20%] right-[-60px] z-10 " number={3} />
        <TringleIcons key="TringleIcon2" className="absolute top-[24%] right-[-120px] z-10 " number={4} />
        <TringleIcons key="TringleIcon2" className="absolute top-[-50px] right-[-10px] z-10 " number={5} />


        <Image
            src={apartmentCardImg} 
            alt="blog Image" width={100} height={269} 
            className='rounded-[10px] w-full h-full relative max-h-[463px] bg-white z-1' 
        />
      </div>

      <div className='w-[45%]'>
          <h3 className={`text-[color:var(--800,#2D3748)] not-italic font-bold leading-[normal] mb-[22px] text-[30px]  `}>{heading}</h3>
          <p className={`text-[#01417C] italic font-medium leading-[normal] text-[22px] mb-[22px] `}>{text}</p>
        
          <div className={`flex justify-between items-center `}>
              <p className={`text-[#627A9E] italic font-medium leading-[normal] text-[16px]`}>{date}</p>
              <div className='gap-[12px] flex justify-center items-center h-[24px] '>
                  {/* <FacebookShareButton /> */}
                  <ShearIcon className={"w-[24px] h-[24px]"} />
                  <Facebook className={"w-[24px] h-[24px]" } />
                  <WhatsApp className={"w-[24px] h-[24px]" } />
              </div>
          </div>
      </div>

    </div>
  )
} 

export default BlogDetailsFirstBlock;