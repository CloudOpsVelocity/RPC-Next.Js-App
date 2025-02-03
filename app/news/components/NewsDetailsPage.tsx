"use client"

import { usePathname } from 'next/navigation';
import React from 'react';
import { newsData } from '../store/newsState';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { SocialIcons } from '@/app/images/commonSvgs';


type Props = {};
const styles = {
    soclalIconStyle: "h-[32px] w-[32px]"
}
const commonLinks = {
    redirections: [
      {name: "Bangalore Real Estate", link:""},
      {name: "Builders", link:""},
      {name: "Buyers", link:""},
      {name: "Owners", link:""},
      {name: "Real Estate News", link:""},
      {name: "Residential", link:""},
    ],
    socialIcons : [
      {
        name: "facebook",
        icon: <SocialIcons  type="facebook" className={styles.soclalIconStyle} />,
        link: "https://www.facebook.com/profile.php?id=100066833915037",
      },
      {
        name: "instagram",
        icon: <SocialIcons  type="instagram" className={styles.soclalIconStyle + "fill-pink-700"} />,
        link: "https://www.instagram.com/_getrightproperty_/?utm_source=qr#",
      },
      {
        name: "twitter",
        icon: <SocialIcons  type="twitter" className={styles.soclalIconStyle} />,
        link: "https://x.com/getrightproperty",
      },
      {
        name: "youtube",
        icon: <SocialIcons  type="youtube" className={styles.soclalIconStyle} />,
        link: "https://www.youtube.com/@getrightproperty",
      },
      {
        name: "linkedin",
        icon: <SocialIcons  type="linkdin" className={styles.soclalIconStyle} />,
        link: "https://www.linkedin.com/company/get-right-property/",
      },
    ],
  }


function NewsDetailsPage({}: Props) {
    const [{allData}] = useAtom(newsData);
    const path = usePathname();
    const currentBlog = path.split("/")[2].replaceAll("%20", " ");
    console.log(currentBlog);
    console.log(allData)

    const data:any = allData.filter((each:any) => each?.name === currentBlog)[0];
    if(!data) return;
    const {name, title, desc, url, section, user, date, viewsCount } = data;
    console.log(data);

    return (
        <div className=" flex flex-col w-[96%] md:w-[70%] xl:w-[50%] py-[30px] ">
            <h1 className=" text-[36px] font-bold text-wrap ">{title}</h1>
            <div className="flex justify-between w-full items-center mb-[26px] ">
                <div className="flex flex-wrap gap-[10px] ">
                    {commonLinks.redirections.map((eachOne:any)=>{
                        return(
                            <a href={eachOne.link} target='_blank' ><p className=" bg-gray-400 text-[12px] cursor-pointer text-white p-[2px] px-[6px] ">#{eachOne.name}</p></a>
                        )
                    })}
                </div>

                <div className="flex space-x-6">
                    {commonLinks.socialIcons.map(({ name, icon, link }) => (
                    <a
                        key={name}
                        href={link}
                        target="_blank"
                        className="text-white hover:text-gray-300"
                    >
                        <span className="sr-only">{name}</span>
                        {icon}
                    </a>
                    ))}
                </div>
            </div>

            <div className=" h-[400px] w-full bg-gray-300 mb-[16px] ">
                <Image
                    src={url}
                    width={800}
                    height={800}
                    alt="not found"
                    className=' w-full h-full '
                />
            </div>

            <p dangerouslySetInnerHTML={{ __html: desc }} className=" text-[16px] leading-[26px] mb-[16px] " />

                    
        </div>
    )
}

export default NewsDetailsPage