import React from 'react';
import style from "@/app/styles/CustomCarousel.module.css";
import Image from 'next/image';
// import style from '../../app/styles/CustomCarousel.module.css'

type Props = {
  urlsData:any
};

const CustomCarousalCssOnly = ({urlsData}: Props) => {
  const dataLength = urlsData.length;
  return (
    <section className={style.carousel} aria-label="Gallery">
      <ol className={style.carousel__viewport}>

        {urlsData.map((imageUrl:any, index:number) => {
          const item = index+1;
          const prevCount = item !== 1 ? item - 1 : dataLength;
          const nextCount = item === dataLength ? 1 : item + 1;
          console.log(prevCount, item, nextCount)
          return(
              <li key={`customCarosual_${index.toString()}`} id={`carousel__slide${item}`} tabIndex={0} className={style.carousel__slide}>
                <div className={style.carousel__snapper}> 
                    <Image
                      alt={`project_image_${index.toString()}`}
                      title={`project_image_${index.toString()}`}
                      src={imageUrl}
                      width={1200}
                      height={630}
                      className={` w-full h-full object-cover max-h-[300px] sm:max-h-[545px] !xl:max-h-[750px] xl:max-h-[750px] `}
                      unoptimized
                      quality={80} 
                    />

                    <a href={`#carousel__slide${prevCount}`} className={style.carousel__prev}>
                      Go to last slide
                    </a>
                    <a href={`#carousel__slide${nextCount}`} className={style.carousel__next}>
                      Go to next slide
                    </a>
                </div>
            </li>
          )})}
      </ol>

      <aside className={style.carousel__navigation}>
        <ol className={style.carousel__navigation_list}>
          {[...Array(dataLength)].map((_:any, index:number) => (
            <li key={`customCarosualButton_${index.toString()}`} className={style.carousel__navigation_item}>
              <a href={`#carousel__slide${index+1}`} className={style.carousel__navigation_button}>
                Go to slide {index+1}
              </a>
            </li>
          ))}
        </ol>
      </aside>
    </section>
  );
};

export default CustomCarousalCssOnly;

