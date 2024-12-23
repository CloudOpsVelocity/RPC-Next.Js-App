"use client"

import React from 'react';
import { Carousel } from "@mantine/carousel";
import BlogCard from './BlogCarousalCard';
import { NextCarouselButton, PrevCarouselButton } from '@/app/images/commonSvgs';
import { useMediaQuery } from '@mantine/hooks';
import { useAtom } from 'jotai';
import { blogDetails } from '@/app/hooks/blog';
import S from "@/app/styles/home/Carousel.module.css";
import "@mantine/carousel/styles.css";

function BlogCarousal() {
    const [{ allBlogData }] = useAtom(blogDetails);
    const isMobile = useMediaQuery(`(max-width: 750px)`);
    
    return (
        <div className="flex justify-start items-start w-[80%] mb-[3%] " >
            <Carousel
                nextControlIcon={<NextCarouselButton />}
                previousControlIcon={<PrevCarouselButton />}
                slideSize={{ base: "20%"}}
                slideGap={{ base: "20px" }}
                align="start"
                withIndicators
                slidesToScroll={1}
                classNames={{
                    controls: S.blogControls,
                }}
                style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                }}
                withControls={isMobile ? true : allBlogData?.length > 3}
            >
                {allBlogData?.map((card: any) => (
                    <Carousel.Slide key={`blogCard_${card.id}`} >
                        <BlogCard data={card} />
                    </Carousel.Slide>
                ))}
            </Carousel>
        </div>
    )

}

export default BlogCarousal;