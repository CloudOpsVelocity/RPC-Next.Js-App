import React from "react";
import { TagData } from "../sections/TagsSections";

export default function Tag({ title, url, className }: TagData) {
  return (
    <a
      href={url}
      aria-label={title}
      title={title}
      rel="internal"
      className="inline-block"
    >
      <span className={`bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200 text-sm font-medium px-3 py-1 rounded-full shadow-sm border border-blue-200 ${className}`}>
        {title}
      </span>
    </a>
  );
}
