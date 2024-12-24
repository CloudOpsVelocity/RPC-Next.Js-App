import React from 'react'
import ContentBox from './ContentBox'
import { useAtom } from 'jotai';
import { blogDetails } from '@/app/hooks/blog';
import Image from 'next/image';
import { apartmentCardImg } from '@/app/images/commonImages';

function BlogThirdBlock() {
    const [{ selectedBlog, allBlogData }, setBlogData] = useAtom(blogDetails);
    const data = allBlogData[0];
    
    return (
        <div className='w-[80%] md:w-[90%] flex justify-between items-center border shadow-[0px_5px_4px_0px_rgba(221,221,221,0.25)] rounded-[5px] border-solid border-[#E2E2E2] bg-white mb-[3%]'>
            <div className='mx-[20px] w-[50%] '>
                <ContentBox
                    heading={data && data.heading ? data.heading : ""}
                    text={data && data.text ? data.text : ""}
                    content={data && data.content ? data.content : ""}
                    date={data && data.date ? data.date : ""}
                    type='large'
                />
            </div>

            <Image
                src={apartmentCardImg} 
                alt="blog Image" width={100} height={269} 
                className='rounded-[10px] w-[50%] border-[0.5px] border-gray border-solid rounded-l-0 max-w-[598px] max-h-[284px] ' 
            />
        </div>
    )
}

export default BlogThirdBlock