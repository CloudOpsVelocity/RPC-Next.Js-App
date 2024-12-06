/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_URL || 'https://example.com',
    exclude: ['/icon.svg', '/apple-icon.png', '/manifest.webmanifest', '/tags/*'],
    generateIndexSitemap: false,
    // generateRobotsTxt: true,
    
    // robotsTxtOptions: {
    //     policies: [
    //         {
    //             userAgent: '*',
    //             allow: '/',
    //         }
    //     ]
    // }
}