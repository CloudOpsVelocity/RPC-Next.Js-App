import React from 'react'
import ContentBox from './ContentBox'
import Image from 'next/image'
import { apartmentCardImg } from '@/app/images/commonImages'
import { useAtom } from 'jotai';
import { blogDetails } from '@/app/hooks/blog';

function BlogDetailLeftSection() {
  const [{ selectedBlog, allBlogData }] = useAtom(blogDetails);
  const data = allBlogData.filter(each=> each.id === selectedBlog)[0];
  
  return (
    <div className='max-w-[617px] w-full '>
        <Image 
            src={apartmentCardImg} 
            alt="blog Image" width={100} height={269} 
            className='rounded-[10px] w-full max-h-[269px] md:max-h-[200px] first-letter: border-[0.5px] border-gray border-solid mb-[16px] ' 
        />
        <ContentBox 
            key='BlogDetailLeftSectionContant'
            heading={data && data.heading ? data.heading : ""}
            text={data && data.text ? data.text : ""}
            content={data && data.content ? data.content : ""}
            date={data && data.date ? data.date : ""}
            type='large'
        />
    </div>
  )
}

export default BlogDetailLeftSection