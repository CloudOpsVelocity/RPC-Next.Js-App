import React from 'react';
import { Facebook, ShearIcon, WhatsApp } from '@/app/images/commonSvgs';

type Props = { 
    heading: string; 
    text:string;
    content?: string;
    date: string;
    type?: string;
};

function ContentBox({ heading, text, content, date, type }: Props) {
  return (
    <div className={`w-full mb-[16px] md:mb-0 ${type == "small" ? "p-[10px]" : ""} `}>
        <h3 className={`text-[color:var(--800,#2D3748)] not-italic font-bold leading-[normal] mb-[4px] ${type == "small" ? "text-[14px]" : "xl:text-[24px] md:text-[18px] text-[16px]"} `}>{heading}</h3>
        <p className={`text-[#01417C] italic font-bold leading-[normal] ${type == "small" ? "text-[12px]" : "text-[16px] md:text-[14px]"} `}>{text}</p>
        {content &&
        <p className={`text-[#303030] not-italic font-normal leading-[normal] mb-[16px] mt-[16px] ${type == "small" ? "text-[12px]" : "xl:text-[16px] md:text-[14px] text-[12px]"} `}>{content}</p>
        }

        <div className={`flex justify-between items-center `}>
            <p className={`text-[#627A9E] italic font-medium leading-[normal] ${type == "small" ? "text-[12px]" : "xl:text-[16px] md:text-[14px] text-[12px]"} `}>{date}</p>
            <div className='gap-[12px] flex justify-center items-center h-[24px] '>
                {/* <FacebookShareButton /> */}
                <ShearIcon className={type == "small" ? "w-[16px] h-[16px]" : "w-[24px] h-[24px]"} />
                <Facebook className={type == "small" ? "w-[16px] h-[16px]" : "w-[24px] h-[24px]" } />
                <WhatsApp className={type == "small" ? "w-[16px] h-[16px]" : "w-[24px] h-[24px]" } />
            </div>
        </div>
    </div>
  )
}

export default ContentBox;