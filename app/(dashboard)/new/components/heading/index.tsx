import data from "@/app/data/auth";
import clsx from "clsx";
import React from "react";

type Props = {
  data: any;
  title: string;
  content: string;
  className?: {
    title?: string;
    content?: string;
  };
};

export default function MainHeading({ title, content, className }: Props) {
  const url = 
  title === "Featured Projects" ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/search` :
  title === "Ready to Move Sell Listings" ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/listing?propStatus=R` :
  title === "Ready to Move Rent Listings" ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/listing?cgh=R&propStatus=R` :
  title === "Featured Plot Listings" ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/listing?propTypes=32` :
  title === "Under Construction sell Listings" ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/listing?propStatus=U` :
  title === "Under Construction Rent Listings" ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/listing?propStatus=U&cg=R` :
  title === "Independent Sell Listings" ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/listing?listedBy=I` :
  `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/listing?listedBy=I&cg=R`;

  return (
    <div className="flex flex-row items-center justify-between">
      <div>
      <h1
        className={clsx(
          "text-[#148B16] text-[14px] sm:text-xl xl:text-[24px] not-italic font-bold",
          className?.title
        )}
      >
        {title}
      </h1>
      <h4
        className={clsx(
          "text-black text-[10px] sm:text-[14px] xl:text-xl not-italic font-medium sm:mt-1",
          className?.content
        )}
      >
        {content}
      </h4>
      </div>
      {title != "Handpicked Projects" && title != "Top Localities" &&
              <a className="text-[#0073C6] font-[Montserrat] text-[20px] not-italic font-bold leading-[normal]" href={url}  target="_blank">View all</a>
}
    </div>
  );
}
