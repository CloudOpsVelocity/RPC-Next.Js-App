"use client";

import React from 'react';
import BlogDetailLeftSection from './BlogDetailLeftSection';
import BlogDetailRightSection from './BlogDetailRightSection';

function BlogDetailsBox() {
  return (
    <div className='flex flex-col md:flex-row justify-between items-start mb-[3%] w-[94%] md:w-[90%] md:gap-[20px] '>
      <BlogDetailLeftSection />
      <BlogDetailRightSection />
    </div>
  )
}

export default BlogDetailsBox