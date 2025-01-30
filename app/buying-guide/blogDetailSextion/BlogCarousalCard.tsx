import { apartmentCardImg } from '@/app/images/commonImages'
import React from 'react'
import ContentBox from './ContentBox'
import Image from 'next/image'

type Props = { 
  data: any; 
};

function BlogCard({data}: Props) {
  return ( 
    <div className='w-full shadow-[0px_4px_4px_0px_rgba(192,189,189,0.25)] rounded-[5px] bg-white min-w-[280px] '>
        <Image
            src={apartmentCardImg} 
            alt="blog Image" width={100} height={269} 
            className='rounded-[10px] w-full max-h-[179px] border-[0.5px] border-gray border-solid mb-[16px] ' 
        />
        <ContentBox
            heading={data && data.heading ? data.heading : ""}
            text={data && data.text ? data.text : ""}
            content={data && data.content ? data.content : ""}
            date={data && data.date ? data.date : ""}
            type='small'
        />
    </div>
  )
}

export default BlogCard