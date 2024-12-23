import { blogDetails } from '@/app/hooks/blog';
import { playIcon } from '@/app/images/commonSvgs';
import { useAtom } from 'jotai';
import React from 'react';


function BlogDetailRightSection() {
  const [{ selectedBlog, allBlogData }, setBlogData] = useAtom(blogDetails);

  const onValueChange = (value:any) => {
    setBlogData(prev => ({ ...prev, selectedBlog: value }));
  };

  return (
    <div className=' w-full max-w-[562px] '>
      {allBlogData.map(eachBlog=>{
        return(
          <div 
            className={`flex cursor-pointer w-full flex-col items-start gap-1 px-8 py-6 border-b-[#66666666] border-b border-solid select-none
              ${selectedBlog === eachBlog.id ? "bg-[#2aa3270f]" : ''}`
            }
            key={`blogBoxBtns_${eachBlog.id}`}
            onClick={()=>onValueChange(eachBlog.id)}
          >
            <h3 className={`text-[color:var(--800,#2D3748)] text-[16px] not-italic font-bold leading-[normal] flex gap-[8px] 
                ${selectedBlog === eachBlog.id ? "text-[20px]" : ""}`}
            >
              {selectedBlog === eachBlog.id ? playIcon : ""}{eachBlog.heading}
            </h3>
            <p className='text-[#303030] text-sm italic font-medium leading-[normal]'>{eachBlog.text}</p>
          </div>
        )
      })}
    </div>
  )
}

export default BlogDetailRightSection