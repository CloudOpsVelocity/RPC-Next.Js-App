"use client";
import { blogDetails } from "@/app/hooks/blog";
import { getClampedText } from "@/app/news/components/NewsSections";
import { useAtom } from "jotai";
import Image from "next/image";
import React from "react";
import style from "../Blog.module.css";
import Link from "next/link";

function BlogMiniCard({ data }: { data: any }) {
  return (
    <div className=" flex justify-end items-end w-full ">
     
        <div
          className={`max-w-[500px] mt-[32px] flex justify-between items-center gap-[16px] p-[10px] md:p-[16px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[10px] border-[0.5px] border-solid 
             border-t-[1px]  hover:shadow-lg
          `}
          title="Click to View Next buying-guide"
        >
          <Link
            rel="noopener noreferrer"
            href={`/buying-guide/${data.heading.replaceAll(" ", "-")}`}
            prefetch={false}
          >
            <Image
              src={data.coverImage}
              alt="buying-guide Image"
              width={120}
              height={90}
              className=" min-w-[120px] h-[90px] border-gray shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[5px] border-2 border-solid border-[#227FBC] "
            />
          </Link>

          <div className="w-full">
            <Link
              rel="noopener noreferrer"
              href={`/buying-guide/${data.heading.replaceAll(" ", "-")}`}
              prefetch={false}
            >
              <p className={`text-[#227FBC] not-italic font-bold leading-[normal] mb-[6px] md:mb-[10px] text-[16px]`}>
                Next Read
              </p>
            </Link>
            <p className="text-[color:var(--800,#2D3748)] text-base not-italic font-bold leading-[normal]">
              {data.heading}
            </p>
            <p
              className={`text-[#303030] text-[14px] italic font-medium leading-[normal] `}
            >
              {getClampedText(data.content, 3)}
            </p>

            <div className={`flex justify-between items-center `}>
              <p
                className={`text-[#627A9E] italic font-medium leading-[normal] text-[12px]`}
              >
                {data.date}
              </p>
            </div>
          </div>
        </div>
    </div>
  );
}

function BlogDetailsDescription() {
  const [{ allBlogData, selectedBlog }] = useAtom<any>(blogDetails);

  const nextBlogId =
    selectedBlog.id + 1 < allBlogData.length ? selectedBlog.id + 1 : 0;
  const nextBlogdata: any = allBlogData.filter(
    (each: any) => each.id === nextBlogId
  )[0];

  const HtmlRenderer = ({ html }:{html:any}) => {
  return <div className={style.customHtml} dangerouslySetInnerHTML={{ __html: html || "" }} />;
};

  return (
    <div className="w-[94%] xl:w-[80%] mb-[3%] ">
      {/* <p
        dangerouslySetInnerHTML={{ __html: selectedBlog?.desc }}
        className={style.customHtml}
      /> */}
      <HtmlRenderer html={selectedBlog && selectedBlog.desc ? selectedBlog.desc : ""} />
      <BlogMiniCard data={nextBlogdata} />
    </div>
  );
}

export default BlogDetailsDescription;
