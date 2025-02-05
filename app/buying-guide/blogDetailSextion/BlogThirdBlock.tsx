import React from 'react'
import { useAtom } from 'jotai';
import { blogDetails } from '@/app/hooks/blog';
import Image from 'next/image';
import ContentBox from '@/app/blog/blogDetailSextion/ContentBox';

function BlogThirdBlock() {
    const [{ selectedBlog, allBlogData }, setBlogData] = useAtom(blogDetails);
    const data = allBlogData[0];
    
    return (
        <div className='w-[94%] md:w-[90%] xl:w-[80%] flex flex-col md:flex-row justify-between items-center border shadow-[0px_5px_4px_0px_rgba(221,221,221,0.25)] rounded-[5px] border-solid border-[#E2E2E2] bg-white mb-[3%]'>
            <div className='mx-[20px] w-full md:w-[50%] p-[10px] md:p-0 '>
                <ContentBox
                    heading={data && data.heading ? data.heading : ""}
                    text={data && data.text ? data.text : ""}
                    content={data && data.content ? data.content : ""}
                    date={data && data.date ? data.date : ""}
                    type='large'
                />
            </div>

            <Image
                src={data?.coverImage} 
                alt="blog Image" /* width={100} height={269}  */
                quality={80}
                height={630}
                width={1200}
                className='rounded-[10px] w-[94%] xl:w-[50%] mb-[10px] md:mb-0 border-[0.5px] border-gray border-solid rounded-l-0 max-w-[100%] md:max-w-[598px] xl:max-h-[284px] md:max-h-[200px] max-h-[200px] ' 
            />
        </div>
    )
}

export default BlogThirdBlock