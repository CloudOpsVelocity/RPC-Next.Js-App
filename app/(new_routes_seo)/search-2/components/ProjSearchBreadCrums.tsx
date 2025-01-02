import React from "react";
import { FaHome, FaChevronRight } from "react-icons/fa";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

const ProjectSearchBreadCrumbs: React.FC<BreadcrumbProps> = ({
  items = [],
}) => {
  if (!items || items.length === 0) {
    return null; // Return null if no breadcrumb items exist
  }

  return (
    <nav
      aria-label="Project Search Breadcrumbs"
      className="w-full px-4 sm:px-6  lg:px-8 py-4 bg-gray-100 rounded-md shadow-sm"
    >
      <ol className="flex items-center space-x-3 text-sm text-gray-600">
        <li>
          <a
            href="/"
            className="flex items-center text-gray-600 hover:text-blue-600 transition-all duration-200"
          >
            <FaHome className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </a>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <FaChevronRight
              className="h-4 w-4 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <a
              href={item.href}
              className={`ml-2 text-sm font-semibold ${
                index === items.length - 1
                  ? "text-gray-800 hover:text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              } transition-all duration-200`}
              aria-current={index === items.length - 1 ? "page" : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default ProjectSearchBreadCrumbs;
