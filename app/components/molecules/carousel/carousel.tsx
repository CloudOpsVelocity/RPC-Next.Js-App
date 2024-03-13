"use client";
import React from "react";
import { Carousel } from "@mantine/carousel";
import S from "@/app/styles/home/Carousel.module.css";
import "@mantine/carousel/styles.css";
import { ImagesScrollIcon } from "@/app/images/commonSvgs";

const HomeCarousel = () => {
  const posts = [
    {
      title: "What is SaaS? Software as a Service Explained",
      desc: "Going into this journey, I had a standard therapy regimen, based on looking at the research literature. After I saw the movie, I started to ask other people what they did for their anxiety, and some",
      img: "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      authorName: "Sidi dev",
      date: "Jan 4 2022",
      href: "#",
    },
    {
      title: "A Quick Guide to WordPress Hosting",
      desc: "According to him, â€œI'm still surprised that this has happened. But we are surprised because we are so surprised.â€More revelations about Whittington will be featured in the film",
      img: "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      authorLogo: "https://api.uifaces.co/our-content/donated/FJkauyEa.jpg",
      authorName: "Micheal",
      date: "Jan 4 2022",
      href: "#",
    },
    {
      title: "7 Promising VS Code Extensions Introduced in 2022",
      desc: "I hope I remembered all the stuff that they needed to know. They're like, 'okay,' and write it in their little reading notebooks. I realized today that I have all this stuff that",
      img: "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      authorLogo: "https://randomuser.me/api/portraits/men/46.jpg",
      authorName: "Luis",
      date: "Jan 4 2022",
      href: "#",
    },
    {
      title: "How to Use Root C++ Interpreter Shell to Write C++ Programs",
      desc: "The powerful gravity waves resulting from the impact of the planets' moons â€” four in total â€” were finally resolved in 2015 when gravitational microlensing was used to observe the",
      img: "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      authorLogo: "https://api.uifaces.co/our-content/donated/KtCFjlD4.jpg",
      authorName: "Lourin",
      date: "Jan 4 2022",
      href: "#",
    },
  ];

  return (
    <Carousel
      mt={60}
      height={"auto"}
      slideSize={{ base: "100%", sm: "50%", md: "25.333333%" }}
      slideGap={{ base: 0, sm: "md" }}
      loop
      align="start"
      classNames={{ controls: S.controls, root: S.root, control: S.control }}
      nextControlIcon={
        <ImagesScrollIcon className="bg-[#c6ddf0] rounded-xl " />
      }
      previousControlIcon={
        <ImagesScrollIcon className="bg-[#c6ddf0]  rounded-xl transform rotate-180" />
      }
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

              <div className="mt-1">
                <div className="text-[#565D70] text-2xl not-italic font-semibold leading-[130%] tracking-[0.96px]">
                  Sobha Dream Acers
                </div>
                <p className="text-[#565D70] text-lg not-italic font-semibold">
                  Possession Date- 12/ 02/ 2023
                </p>
                <p className="text-[#9A9CA0] text-lg not-italic font-semibold leading-[normal] tracking-[0.72px]">
                  {["Apartment", "Villa", "Row House"].join(", ")}
                </p>
                <div className="text-[#565D70] text-lg not-italic font-semibold leading-[normal] tracking-[0.72px] mt-1">
                  Devast, Varthur, Karnataka 560087
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
