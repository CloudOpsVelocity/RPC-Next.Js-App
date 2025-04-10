"use client"

import React, {useRef, useState} from 'react';
import { NextCarouselButton, PrevCarouselButton } from '@/app/images/commonSvgs';
import "@mantine/carousel/styles.css";

type props = {
  dataLength?: number;
  allCards?: any;
};

function CustomCarousal({dataLength, allCards}:props) {
    // const isMobile = useMediaQuery(`(max-width: 750px)`);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const container = containerRef?.current;

    const handleMouseDown = (e: any) => {
        setIsDragging(true);
        if(!container) return;
        setStartX(e.pageX - container.offsetLeft);
        setScrollLeft(container.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: any) => {
        if (!isDragging) return;
        e.preventDefault();
        if(!container) return;
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Adjust multiplier for scroll speed
        container.scrollLeft = scrollLeft - walk;
    };

    const onScrollingLeftAndRight = (direction: string) => {
        if(container){
            // const containerwidth = container.offsetWidth ? container.offsetWidth : 0;
            const containerwidth = 1000;

            console.log(containerwidth);
            console.log(container.scrollLeft)

            if (direction == "L") {
                container.scrollLeft -= containerwidth;
            } else {
                container.scrollLeft += containerwidth;
            }
        }
    };
    
    return (
        <div className="flex justify-center items-center w-[94%] md:w-[90%] h-full relative " >
            {dataLength != undefined && dataLength != null && dataLength >= 2 &&
            <PrevCarouselButton
                className={`w-[32px] h-[32px] cursor-pointer bottom-1 absolute left-[10px] md:left-[-40px] top-[45%] z-10`}
                onClick={() => onScrollingLeftAndRight("L")}
                circle='#227FBC' iconColor='white'
            />
            }

            <div 
                ref={containerRef} 
                className='flex justify-start items-center w-full h-full overflow-x-auto scroll-smooth cursor-grab '
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                style={{ userSelect: "none" }}
            >
                <div className='w-full flex justify-start items-start max-w-[1000px] h-full gap-[20px] '> 
                    {allCards}
                </div>
            </div>

            {dataLength != undefined && dataLength != null && dataLength >= 2 &&
            <NextCarouselButton
                className={`w-[32px] h-[32px] cursor-pointer bottom-1 absolute right-[10px] md:right-[-40px] top-[45%] z-10`}
                onClick={() => onScrollingLeftAndRight("R")}
                circle='#227FBC' iconColor='white'
            />
            }
        </div>
    )
}

export default CustomCarousal;