import React from "react";
import { TagData } from "../sections/TagsSections";
import Link from "next/link";

export default function Tag({ title, url, className }: TagData) {
  return (
    <Link
      href={url}
      aria-label={title}
      title={title}
      className="inline-block w-auto"
      prefetch={false}
    >
      <span
        className={` bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200 text-xs font-medium rounded-full shadow-sm border border-blue-200
          !text-[8px] !px-2 !py-[2px] break-words whitespace-nowrap sm:text-sm sm:px-4 sm:py-2 sm:mr-2 sm:mb-2 max-w-[60ch] overflow-hidden text-ellipsis  ${className}`}
      >
        {title}
      </span>
    </Link>
  );
}
