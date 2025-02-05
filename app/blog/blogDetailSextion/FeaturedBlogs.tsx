"use client"
import { blogDetails } from '@/app/hooks/blog';
import { useAtom } from 'jotai';
import Image from 'next/image';
import React from 'react';

function FeaturedBlogCard({data}:{data:any}) {
    return (
        <div className=' min-w-[297px] border-t-1 border-solid shadow-[0px_4px_4px_0px_rgba(192,189,189,0.25)] rounded-[5px] '>
            <Image
                src={data?.coverImage} 
                alt="blog Image" /* width={100} height={269} */ 
                quality={80}
                priority={data?.coverImage}
                height={630}
                width={1200}
                className='rounded-[10px] w-full h-[179px]' 
            />

            <div className='p-[16px]  '>
                <h3 className='text-[color:var(--800,#2D3748)] text-[14px] not-italic font-bold leading-[normal] mb-[4px] '>Renting vs. Buying</h3>
                <p className='text-[#01417C] text-[12px] italic font-bold leading-[normal] mb-[24px]'>Deciding What’s Right for You</p>
                <p className=' text-[#303030] text-xs not-italic font-normal leading-[normal] mb-[26px]'>It is a long established fact that a reader will be distracted by the readabl that....</p>
                <div className=' flex justify-between items-center '>
                    <span className='text-[#627A9E] text-[12px] italic font-bold leading-[normal]'>May 20th 2024</span>
                    <span className='text-[color:var(--800,#2D3748)] font- text-[12px] not-italic font-bold leading-[normal]'>Read more</span>
                </div>
            </div>

        </div>
    )
} 

function FeaturedBlogs() {
    const dummyData = [1,2,3,4];
    const [{ allBlogData }] = useAtom(blogDetails);
    
    return (
        <div className=' mb-[3%] w-[94%] md:w-[90%] xl:w-[80%] '>
            <h2 className='text-black text-[20px] md:text-[24px] xl:text-[32px] italic font-bold leading-[normal] mb-[32px] '>Featured <span className='text-[#2AA327] italic font-bold leading-[normal]'>Blogs</span></h2>
            <div className=' flex justify-between items-start xl:gap-[20px] gap-[10px] p-[8px] overflow-x-auto '>
                {dummyData.map((each, index)=>{
                    return(
                        <FeaturedBlogCard key={`FeaturedBlogCard_${each}`} data={allBlogData[index]} />
                    )
                })}
            </div>
        </div>
    )
}

export default FeaturedBlogs