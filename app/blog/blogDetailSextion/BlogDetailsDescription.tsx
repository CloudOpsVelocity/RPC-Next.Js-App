"use client"
import { blogDetails } from '@/app/hooks/blog';
import { getClampedText } from '@/app/news/components/NewsSections';
import { useAtom } from 'jotai';
import Image from 'next/image';
import React from 'react';

function BlogMiniCard({data}:{data:any}) {
  return (
    <div className=' flex justify-end items-end w-full '> 
      <a href={`/blog/${data.heading}`} target='_blank'>
        <div 
          className={`max-w-[500px] mt-[32px] flex justify-between items-center gap-[16px] p-[10px] md:p-[16px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[10px] border-[0.5px] border-solid 
             border-t-[1px]  hover:shadow-lg
          `}
          title='Click to View Next Blog'
        >
            <Image
                src={data.coverImage} 
                alt="blog Image" width={120} height={90} 
                className=' min-w-[120px] h-[90px] border-gray shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[5px] border-2 border-solid border-[#227FBC] ' 
            />

            <div className='w-full'> 
                <h3 className={`text-[#227FBC] not-italic font-bold leading-[normal] mb-[6px] md:mb-[10px] text-[16px]`}>Next Read</h3>
                <p className='text-[color:var(--800,#2D3748)] text-base not-italic font-bold leading-[normal]'>{data.heading}</p>
                <p className={`text-[#303030] text-[14px] italic font-medium leading-[normal] `}>{getClampedText(data.content, 3)}</p>
                
                <div className={`flex justify-between items-center `}>
                    <p className={`text-[#627A9E] italic font-medium leading-[normal] text-[12px]`}>{data.date}</p>
                </div>
            </div>
        </div>
      </a>
    </div>
  ) 
} 

function BlogDetailsDescription() {
  const [{ allBlogData, selectedBlog }] = useAtom<any>(blogDetails);

  const nextBlogId = selectedBlog.id+1 < allBlogData.length ? selectedBlog.id+1 : 0
  const nextBlogdata:any = allBlogData.filter((each:any)=> each.id === nextBlogId)[0];

  return (
    <div className='w-[94%] xl:w-[80%] mb-[3%] '>
        {/* <h3 className='text-[#303030] text-[16px] md:text-[22px] xl:text-[28px] not-italic font-bold md:leading-8 mb-[14px] md:mb-[20px] '>Lorem ipsum dolor sit amet, consectetur adipiscing</h3>
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
            src={dummyImage} 
            alt="blog Image" width={100} height={269} 
            className='rounded-[10px] w-full h-[235px] md:h-[435px] xl:h-[600px] mb-[30px]' 
        />

        <h3 className='text-[#303030] text-[16px] md:text-[22px] xl:text-[28px] not-italic font-bold md:leading-8 mb-[14px] md:mb-[20px] '>Lorem ipsum dolor sit amet, consectetur adipiscing</h3>
        <p className='text-[14px] md:text-[18px] xl:text-[20px] not-italic xl:leading-[26px] tracking-[0.96px] mb-[16px]'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
            consequat. Duis auteeeee irure dolor in reprehe nderit in voluptate velit esse cillum dolore eu fugiat nulla 
            pariatur. Excepteur sint occaecat cupidatatte non proident, sunt in culpa qui officia ese runt mollit anim id 
            est laborum. Lorem ipsum dolor sit amet, consectetur adipiscin g elit, sed do eiusmod tempor incididunt ut labore 
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
        </p> */}

        <p dangerouslySetInnerHTML={{ __html: selectedBlog?.desc }} className="custom-html text-[14px] md:text-[16px] leading-[26px] mb-[16px] " />
        <BlogMiniCard data={nextBlogdata} />
    </div>
  )
}

export default BlogDetailsDescription