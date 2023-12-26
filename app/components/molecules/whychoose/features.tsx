import { data } from '@/app/data/whychoose';
import { HomeSvg } from '@/app/images/commonSvgs';
import Image from 'next/image';
import React from 'react'

export default function Features() {
  return data.map((item, index) => (
    <Card
      key={index}
     {...item}
    />
  ))
}
type Props = {
    src:string;
    name:string;
    desc:string
}

export  function Card({
    src,desc,name
}: Props) {
  return (
    <div className="relative w-[287px] h-[374px]">
    <div className="relative w-[307px] h-[394px] top-[-6px] left-[-10px]  bg-[100%_100%]">
      <div className="inline-flex flex-col items-center gap-[32px] relative top-[60px] left-[46px]">
        <div className="inline-flex flex-col items-center justify-center gap-[14px] relative flex-[0_0_auto]">
          <Image className="relative w-[158.68px] h-[143.48px]" alt="Group" src={src} width={158.68} height={143.48} />
          <div className="relative w-[140.85px] h-[13.01px] bg-[#cbd4e138] rounded-[70.42px/6.51px] blur-[4.1px]" />
        </div>
        <p className="w-[209px] relative [font-family:'Montserrat-Medium',Helvetica] font-normal text-transparent text-[24px] text-center tracking-[0.96px] leading-[31.2px]">
          <span className="font-medium text-[#666666]">
            {name}<br />
          </span>
          <span className="[font-family:'Montserrat-Bold',Helvetica] font-bold text-[#0072c5]">
 {desc}
          </span>
        </p>
      </div>
    </div>
    </div>
  )
}