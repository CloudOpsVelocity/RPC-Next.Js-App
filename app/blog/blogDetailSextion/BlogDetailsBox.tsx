"use client";

import React from 'react';
import BlogDetailLeftSection from './BlogDetailLeftSection';
import BlogDetailRightSection from './BlogDetailRightSection';

function BlogDetailsBox() {
  return (
    <div className='flex justify-between items-center mb-[3%]  w-[80%]'>
      <BlogDetailLeftSection />
      <BlogDetailRightSection />
    </div>
  )
}

export default BlogDetailsBox