"use client";
import React from "react";
import { Carousel } from "@mantine/carousel";

import "@mantine/carousel/styles.css";

const HomeCarousel = () => {
  const posts = [
    {
      title: "What is SaaS? Software as a Service Explained",
      desc: "Going into this journey, I had a standard therapy regimen, based on looking at the research literature. After I saw the movie, I started to ask other people what they did for their anxiety, and some",
      img: "https://imagesrpc.s3.ap-south-1.amazonaws.com/images/varify/project/55/cover/cover.jpg",
      authorName: "Sidi dev",
      date: "Jan 4 2022",
      href: "javascript:void(0)",
    },
    {
      title: "A Quick Guide to WordPress Hosting",
      desc: "According to him, â€œI'm still surprised that this has happened. But we are surprised because we are so surprised.â€More revelations about Whittington will be featured in the film",
      img: "https://imagesrpc.s3.ap-south-1.amazonaws.com/images/varify/project/55/cover/cover.jpg",
      authorLogo: "https://api.uifaces.co/our-content/donated/FJkauyEa.jpg",
      authorName: "Micheal",
      date: "Jan 4 2022",
      href: "javascript:void(0)",
    },
    {
      title: "7 Promising VS Code Extensions Introduced in 2022",
      desc: "I hope I remembered all the stuff that they needed to know. They're like, 'okay,' and write it in their little reading notebooks. I realized today that I have all this stuff that",
      img: "https://imagesrpc.s3.ap-south-1.amazonaws.com/images/varify/project/55/cover/cover.jpg",
      authorLogo: "https://randomuser.me/api/portraits/men/46.jpg",
      authorName: "Luis",
      date: "Jan 4 2022",
      href: "javascript:void(0)",
    },
    {
      title: "How to Use Root C++ Interpreter Shell to Write C++ Programs",
      desc: "The powerful gravity waves resulting from the impact of the planets' moons â€” four in total â€” were finally resolved in 2015 when gravitational microlensing was used to observe the",
      img: "https://imagesrpc.s3.ap-south-1.amazonaws.com/images/varify/project/55/cover/cover.jpg",
      authorLogo: "https://api.uifaces.co/our-content/donated/KtCFjlD4.jpg",
      authorName: "Lourin",
      date: "Jan 4 2022",
      href: "javascript:void(0)",
    },
  ];

  return (
    <Carousel
      mt={30}
      // withIndicators
      height={"auto"}
      slideSize={{ base: "100%", sm: "50%", md: "25.333333%" }}
      slideGap={{ base: 0, sm: "md" }}
      loop
      align="start"
    >
      {posts.map((post, index) => (
        <Carousel.Slide key={index} className="">
          <li className="w-full mx-auto group sm:max-w-sm list-none">
            <a href={post.href}>
              <div>
                <img
                  src={post.img}
                  loading="lazy"
                  alt={post.title}
                  className="w-full rounded-lg h-52"
                />
              </div>

              <div className="">
                <div className="text-slate-600 text-2xl font-semibold font-['Montserrat'] leading-loose tracking-wide">
                  Sobha Dream Acers
                </div>

                <div className="text-slate-600 text-lg font-semibold font-['Montserrat'] tracking-wide">
                  Devasthanagalu, Varthur, Karnataka 560087
                </div>
              </div>
            </a>
          </li>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default HomeCarousel;
