import { TringleIcons } from '@/app/images/commonSvgs'
import React from 'react'

type Props = {}

export default function MarketBanner({}: Props) {
  return (
    <div className='relative p-[3%] w-full flex flex-col justify-center items-center bg-gradient-to-r from-gray-500 to-[#cccccc]'>
        <TringleIcons number={1} className={"w-[60px] h-[60px] md:w-[160px] md:h-[160px] absolute top-[20px] left-[20px] "} />
        <TringleIcons number={2} className={" w-[30px] h-[30px] md:w-[50px] md:h-[50px] absolute bottom-[0px] left-[15%] md:rotate-45 "} />
        <TringleIcons number={3} className={" w-[40px] h-[40px] md:w-[100px] md:h-[100px] absolute top-[20px] right-[20px] md:top-[50px] md:right-[80px] "} />
        <TringleIcons number={4} className={" w-[30px] h-[30px] md:w-[80px] md:h-[80px] absolute top-[-10px] left-[30%] md:top-[-20px] md:left-[50%] rotate-45"} />
        <TringleIcons number={5} className={" w-[20px] h-[20px] md:w-[60px] nd:h-[60px] absolute top-[40px] right-[100px] md:top-[50px] md:right-[200px] "} />

        <svg width="800px" height="800px" className={" w-[60px] h-[60px] md:w-[160px] md:h-[160px] absolute top-[20px] left-[40%] rotate-45 "} viewBox="0 0 15 15" version="1.1" id="triangle-stroked" xmlns="http://www.w3.org/2000/svg">
          <path fill="#D7DBFB" fill-opacity="0.55" id="rect3338" d="M7.5243,1.5004&#xA;&#x9;C7.2429,1.4913,6.9787,1.6423,6.8336,1.8952l-5.5,9.8692C1.0218,12.3078,1.395,12.9999,2,13h11&#xA;&#x9;c0.605-0.0001,0.9782-0.6922,0.6664-1.2355l-5.5-9.8692C8.0302,1.6579,7.7884,1.5092,7.5243,1.5004z M7.5,3.8993l4.1267,7.4704&#xA;&#x9;H3.3733L7.5,3.8993z"/>
        </svg>

        <h2 className='text-[18px] md:text-[28px] text-white leading-[30px] shadow-[2px 2px 5px rgba(0, 0, 0, 1)] mb-0 md:mb-[16px] font-bold '>Property Rates & Price Trends</h2>
        <p className='text-[11px] text-[#cccccc] font-semibold mb-[20px] '>in india</p>
    </div>
  )
}