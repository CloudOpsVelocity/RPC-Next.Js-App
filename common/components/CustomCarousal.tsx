"use client"

import React, {useEffect, useRef} from 'react';
import { NextCarouselButton, PrevCarouselButton } from '@/app/images/commonSvgs';

type props = {
  dataLength?: number;
  allCards?: any;
  containerClass?: string;
};

function CustomCarousal({dataLength, allCards, containerClass}:props) {
    // const isMobile = useMediaQuery(`(max-width: 750px)`);

    // const [isDragging, setIsDragging] = useState(false);
    // const [startX, setStartX] = useState(0);
    // const [scrollLeft, setScrollLeft] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);

    const container = containerRef?.current;

    // const handleMouseDown = (e: any) => {
    //     setIsDragging(true);
    //     if(!container) return;
    //     setStartX(e.pageX - container.offsetLeft);
    //     setScrollLeft(container.scrollLeft);
    // };

    // const handleMouseLeave = () => {
    //     setIsDragging(false);
    // };

    // const handleMouseUp = () => {
    //     setIsDragging(false);
    // };

    // const handleMouseMove = (e: any) => {
    //     if (!isDragging) return;
    //     e.preventDefault();
    //     if(!container) return;
    //     const x = e.pageX - container.offsetLeft;
    //     const walk = (x - startX) * 2; // Adjust multiplier for scroll speed
    //     container.scrollLeft = scrollLeft - walk;
    // };

    const onScrollingLeftAndRight = (direction: string) => {
        if(container){
            const containerwidth = container.offsetWidth ? container.offsetWidth : 0;
            if (direction == "L") {
                container.scrollLeft -= containerwidth;
            } else {
                container.scrollLeft += containerwidth;
            }
        }
    };

    useEffect(() => {
        const parent = parentRef.current;
        if (!parent) return;

        const innerDivs = parent.querySelectorAll<HTMLDivElement>('.carousel-slide');
        if (!innerDivs.length) return;

        const resize = () => {
            const parentWidth = parent.offsetWidth;
            innerDivs.forEach((div) => {
                div.style.minWidth = `${parentWidth}px`;
            });
        };

        resize();
        window.addEventListener('resize', resize);
        return () =>  window.removeEventListener('resize', resize);
    }, []);
    
    return (
        <div className={`relative flex justify-center items-center w-[94%] md:w-[90%] h-full relative ${containerClass ? containerClass : ""} `} >
            {dataLength != undefined && dataLength != null && dataLength >= 2 &&
            <PrevCarouselButton
                className={`w-[40px] h-[40px] cursor-pointer bottom-1 absolute left-[10px] md:left-[20px] top-[45%] z-10`}
                onClick={() => onScrollingLeftAndRight("L")}
                circle='#CBD4E1'
                iconColor='#7C909D'
            />
            }

            <div 
                ref={containerRef} 
                className='relative flex justify-start items-center w-full h-full overflow-x-auto scroll-smooth scrollbar-hide'
                // onMouseDown={handleMouseDown} 
                // onMouseLeave={handleMouseLeave}
                // onMouseUp={handleMouseUp}
                // onMouseMove={handleMouseMove}
                style={{ userSelect: "none" }}
            >
                <div ref={parentRef} className='w-full flex justify-start items-start max-w-[100%] h-full flex-nowrap'> 
                    {allCards}
                </div>
            </div>

            {dataLength != undefined && dataLength != null && dataLength >= 2 &&
            <NextCarouselButton
                className={`w-[40px] h-[40px] cursor-pointer bottom-1 absolute right-[10px] md:right-[20px] top-[45%] z-10`}
                onClick={() => onScrollingLeftAndRight("R")}
                circle='#CBD4E1' 
                iconColor='#7C909D'
            />
            }

            <div className='flex justify-center items-center gap-[14px] w-full absolute bottom-[30px] '>
                {[...Array(dataLength)].map((_, index) => (
                    <div key={index} className=" rounded-full w-[14px] h-[14px] bg-white ">
                        {/* {index + 1} */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CustomCarousal;



// const CaroasalCss = () => {
//     return(
//         <div id="default-carousel" className="relative w-full" data-carousel="slide">
//             <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
//                 <div className="hidden duration-700 ease-in-out" data-carousel-item>
//                     <Image src="/docs/images/carousel/carousel-1.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
//                 </div>
//                 <div className="hidden duration-700 ease-in-out" data-carousel-item>
//                     <Image src="/docs/images/carousel/carousel-2.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
//                 </div>
//                 <div className="hidden duration-700 ease-in-out" data-carousel-item>
//                     <Image src="/docs/images/carousel/carousel-3.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
//                 </div>
//                 <div className="hidden duration-700 ease-in-out" data-carousel-item>
//                     <Image src="/docs/images/carousel/carousel-4.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
//                 </div>
//                 <div className="hidden duration-700 ease-in-out" data-carousel-item>
//                     <Image src="/docs/images/carousel/carousel-5.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
//                 </div>
//             </div>
//             <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
//                 <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
//                 <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
//                 <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
//                 <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
//                 <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
//             </div>
//             <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
//                 <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//                     <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
//                     </svg>
//                     <span className="sr-only">Previous</span>
//                 </span>
//             </button>
//             <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
//                 <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//                     <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
//                     </svg>
//                     <span className="sr-only">Next</span>
//                 </span>
//             </button>
//         </div>
//     )
// }