"use client"
import { TringleIcons } from '@/app/images/commonSvgs'
import React from 'react'

type Props = {
  title?: string;
  text?: string;
};

const backImg = 'https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_1280.jpg'

export default function MarketBanner({title, text}: Props) {
  return (
    <div className='relative p-[3%] w-full h-[140px] md:h-[160px] lg:h-[200px] flex flex-col justify-center items-center bg-gradient-to-r from-gray-500 to-[#cccccc] overflow-hidden animate-gradient'>
        <div style={{ backgroundImage: `url(${backImg})` }} className={`absolute inset-0 bg-[url('')] bg-cover bg-center opacity-30`}/>

        <TringleIcons number={1} className={"w-[60px] h-[60px] md:w-[160px] md:h-[160px] absolute top-[20px] left-[20px] "} />
        <TringleIcons number={2} className={" w-[30px] h-[30px] md:w-[50px] md:h-[50px] absolute bottom-[0px] left-[15%] md:rotate-45 "} />
        <TringleIcons number={3} className={" w-[40px] h-[40px] md:w-[100px] md:h-[100px] absolute top-[20px] right-[20px] md:top-[50px] md:right-[80px] "} />
        <TringleIcons number={4} className={" w-[30px] h-[30px] md:w-[80px] md:h-[80px] absolute top-[-10px] left-[30%] md:top-[-20px] md:left-[50%] rotate-45"} />
        <TringleIcons number={5} className={" w-[20px] h-[20px] md:w-[60px] nd:h-[60px] absolute top-[40px] right-[100px] md:top-[50px] md:right-[200px] "} />
        <TringleIcons number={6} className={"w-[60px] h-[60px] md:w-[160px] md:h-[160px] absolute top-[20px] left-[40%] rotate-45"} />

        {(title || text) &&
        <div className="relative flex flex-col items-center justify-center h-full ">
          {title && <h2 className='text-[18px] md:text-[28px] text-white leading-[30px] shadow-[2px 2px 5px rgba(0, 0, 0, 1)] mb-0 md:mb-[16px] font-bold '>Property Rates & Price Trends</h2>}
          {text && <p className='text-[11px] text-[#cccccc] font-semibold mb-[20px] '>{text}</p>}
        </div>
        }
    </div>
  )
}


