const { default: axios } = require("axios");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_URL || "https://example.com",
  exclude: [
    "/icon.svg",
    "/apple-icon.png",
    "/manifest.webmanifest",
    "/tags/*",
    "/builders/*",
    "/test/*",
  ],
  generateIndexSitemap: false,
  generateRobotsTxt: false,

  additionalPaths: async (config) => {
    return [
      {
        loc: `${config.siteUrl}/dyanmic-sitemap/0.xml`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `${config.siteUrl}/dyanmic-sitemap/1.xml`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `${config.siteUrl}/dyanmic-sitemap/2.xml`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `${config.siteUrl}/dyanmic-sitemap/3.xml`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `${config.siteUrl}/dyanmic-sitemap/4.xml`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `${config.siteUrl}/residential-projects/for-sale`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `${config.siteUrl}/residential-projects/for-rent`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `${config.siteUrl}/search?sf=projStatus=106`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `${config.siteUrl}/search?sf=projStatus=107`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `${config.siteUrl}/search?sf=projStatus=108`,
        lastmod: new Date().toISOString(),
      },
    ];
  },
  // robotsTxtOptions: {
  //   policies: [
  //     {
  //       userAgent: "*",
  //       allow: "/",
  //     },
  //   ],
  //   additionalSitemaps: [
  //     `${process.env.NEXT_PUBLIC_URL}/dashboard-sitemap.xml`,
  //     `${process.env.NEXT_PUBLIC_URL}/listing-sitemap.xml`,
  //     `${process.env.NEXT_PUBLIC_URL}/builder-sitemap.xml`,
  //     `${process.env.NEXT_PUBLIC_URL}/project-details-sitemap.xml`,
  //     `${process.env.NEXT_PUBLIC_URL}/dyanmic-sitemap/0.xml`,
  //     `${process.env.NEXT_PUBLIC_URL}/dyanmic-sitemap/1.xml`,
  //     `${process.env.NEXT_PUBLIC_URL}/dyanmic-sitemap/2.xml`,
  //     `${process.env.NEXT_PUBLIC_URL}/dyanmic-sitemap/3.xml`,
  //     `${process.env.NEXT_PUBLIC_URL}/dyanmic-sitemap/4.xml`,
  //   ],
  // },
};
