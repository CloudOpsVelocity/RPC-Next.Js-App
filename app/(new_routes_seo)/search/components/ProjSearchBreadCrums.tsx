import React from "react";
import { FaHome, FaChevronRight } from "react-icons/fa";
interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  pageUrl: string;
}

const ProjectSearchBreadCrumbs: React.FC<BreadcrumbProps> = ({ pageUrl }) => {
  function trimStringUrl(str:string, word:string) {
    const index = str.indexOf(word);
    return index !== -1 ? str.substring(0, index + word.length) : str;
  }

  function trimFromWord(str:string, word:string) {
    const index = str.indexOf(word);
    return index !== -1 ? str.substring(index + word.length) : "";
  }
  
  let trimmedUrl = ""
  if(pageUrl.includes("/residential/projects/")){
    trimmedUrl = trimFromWord(pageUrl, "/residential/projects/");
  }else if(pageUrl.includes("/residential-projects/")){
    trimmedUrl = trimFromWord(pageUrl, "/residential-projects/");
  }else if(pageUrl.includes("/residential/listings/")){
    trimmedUrl = trimFromWord(pageUrl, "/residential/listings/");
  }

  const newParams = trimmedUrl.split("/");

  if (!newParams || newParams.length === 0) {
    return null;
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: pageUrl
      ? pageUrl
          ?.split("/")
          .filter(Boolean)
          .map((item: string, index: number) => {
            const path = pageUrl
              .split("/")
              .filter(Boolean)
              .slice(0, index + 1)
              .join("/");

            return {
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@id": index === 0 ? process.env.NEXT_PUBLIC_URL : `${path}`,
                name: index === 0 ? "Home" : item,
              },
            };
          })
      : newParams.map((item, index) => {
          return {
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@id": index === 0 ? process.env.NEXT_PUBLIC_URL : `${trimStringUrl(pageUrl, item)}`,
              name: item || "Home",
            },
          };
        }),
  };

  return (
    <nav
      aria-label="Project Search Breadcrumbs"
      className="w-full px-[8px] sm:px-[10px] lg:px-[14px] py-[6px] md:py-[10px] xl:py-4 bg-gray-100 rounded-md shadow-sm max-w-[100%] overflow-x-auto "
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <ol className="flex items-center space-x-1 md:space-x-3  text-sm text-gray-600 pr-[10px] ">
        <li>
          <a
            href="/"
            className="flex items-center text-gray-600 hover:text-blue-600 transition-all duration-200"
          >
            <FaHome className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </a>
        </li>
        {newParams.map((item: any, index: number) => {
          let url = trimStringUrl(pageUrl, item);
            return (
              <li key={item + index.toString()} className="flex items-center">
                <FaChevronRight
                  className="h-4 w-4 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                {index !== newParams.length - 1 ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`ml-2 text-sm font-semibold text-gray-500 hover:text-blue-500 transition-all duration-200 text-nowrap first-letter:capitalize `}
                    aria-current={
                      index === newParams.length - 1 ? "page" : undefined
                    }
                  >
                    {item.replaceAll("-", " ")}
                  </a>
                ) : (
                  <span
                    className={`ml-2 text-sm font-semibold text-gray-800 hover:text-blue-600 transition-all duration-200 text-nowrap first-letter:capitalize `}
                  >
                    {item.replaceAll("-", " ")}
                  </span>
                )}
              </li>
            );
        })}
      </ol>
    </nav>
  );
};

export default ProjectSearchBreadCrumbs;
