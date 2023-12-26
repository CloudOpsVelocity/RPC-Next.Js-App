import React from 'react';

const footerData = {
  logoUrl: "https://merakiui.com/images/full-logo.svg",
  newsletterText: "Join 31,000+ others and never miss out on new tips, tutorials, and more.",
  socialLinks: [
    { platform: "Reddit", icon: "reddit" },
    { platform: "Facebook", icon: "facebook" },
    { platform: "Github", icon: "github" },
  ],
  aboutLinks: [
    { title: "Company", url: "#" },
    { title: "Community", url: "#" },
    { title: "Careers", url: "#" },
  ],
  blogLinks: [
    { title: "Tech", url: "#" },
    { title: "Music", url: "#" },
    { title: "Videos", url: "#" },
  ],
  productsLinks: [
    { title: "Mega Cloud", url: "#" },
    { title: "Aperion UI", url: "#" },
    { title: "Meraki UI", url: "#" },
  ],
  contactInfo: {
    phoneNumber: "+1 526 654 8965",
    emailAddress: "example@email.com",
  },
  copyrightText: "© Brand 2020 - All rights reserved",
};

const footer = () => (
  <footer className="bg-white dark:bg-gray-900">
    <div className="container p-6 mx-auto">
      <div className="lg:flex">
        <div className="w-full -mx-6 lg:w-2/5">
          <div className="px-6">
            <a href="#">
              <img
                className="w-auto h-7"
                src={footerData.logoUrl}
                alt=""
              />
            </a>
            <p className="max-w-sm mt-2 text-gray-500 dark:text-gray-400">
              {footerData.newsletterText}
            </p>
            <div className="flex mt-6 -mx-2">
              {footerData.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  aria-label={link.platform}
                >
                  {link.platform === "Reddit" && (
                    <svg
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Reddit icon path */}
                    </svg>
                  )}
                  {link.platform === "Facebook" && (
                    <svg
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Facebook icon path */}
                    </svg>
                  )}
                  {link.platform === "Github" && (
                    <svg
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Github icon path */}
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 lg:mt-0 lg:flex-1">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* About section */}
            <div>
              <h3 className="text-gray-700 uppercase dark:text-white">About</h3>
              {footerData.aboutLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  {link.title}
                </a>
              ))}
            </div>
            {/* Blog section */}
            <div>
              <h3 className="text-gray-700 uppercase dark:text-white">Blog</h3>
              {footerData.blogLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  {link.title}
                </a>
              ))}
            </div>
            {/* Products section */}
            <div>
              <h3 className="text-gray-700 uppercase dark:text-white">Products</h3>
              {footerData.productsLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  {link.title}
                </a>
              ))}
            </div>
            {/* Contact section */}
            <div>
              <h3 className="text-gray-700 uppercase dark:text-white">Contact</h3>
              <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                {footerData.contactInfo.phoneNumber}
              </span>
              <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                {footerData.contactInfo.emailAddress}
              </span>
            </div>
          </div>
        </div>
      </div>
      <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" />
      <div>
        <p className="text-center text-gray-500 dark:text-gray-400">
          {footerData.copyrightText}
        </p>
      </div>
    </div>
  </footer>
);

export default footer;
