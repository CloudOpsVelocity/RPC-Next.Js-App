import { atom } from "jotai";

const dummyAllBlogData = [
    {
      id:0,
      heading:"Investing",
      text:"A Beginner’s Guide to Real Estate Investment Strategies...",
      content:`It is a long established fact that a reader will be distracted by the readable content of a page 
            when looking at its layout. The point of using  that it has amore-or-less normal distribution
            It is a long established fact that a reader will be distracted by the readable content of a page when 
            looking at its layout. The point of using  that it has amore-or-less normal distribution
            `,
      date:"May 20th 2024",
      coverImage: `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/Blog-Images/Investing-101.webp`
    },
    {
      id:1,
      heading:"Resale Value",
      text:"How to Maximise your Property’s Resale Value",
      content:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using  that it has amore-or-less normal distribution",
      date:"May 20th 2024",
      coverImage: `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/Blog-Images/Resale-Value.webp`
    },
    { 
      id:2,
      heading:"Renting vs. Buying",
      text:"Deciding What’s Right for You",
      content:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using  that it has amore-or-less normal distribution",
      date:"May 20th 2024",
      coverImage: `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/Blog-Images/Renting-vs-Buying.webp`
    },
    {
      id:3,
      heading:"Legal Essentials",
      text:"Understanding Contracts and Paperwork in Real Estate",
      content:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using  that it has amore-or-less normal distribution",
      date:"May 20th 2024",
      coverImage: `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/Blog-Images/Legal-Essentials.webp `
    },
    {
      id:4,
      heading:"Real Estate & The Pandemic",
      text:"Trends Shaping the New Normal",
      content:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using  that it has amore-or-less normal distribution",
      date:"May 20th 2024",
      coverImage: `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/Blog-Images/Real-Estate-Pandemic.webp`
    },
];

const initailBlogData = {
    selectedBlog: 0,
    allBlogData: dummyAllBlogData,
    blogPageData: null,
    isBlogPageOpen: false,
}

export const blogDetails = atom(initailBlogData);