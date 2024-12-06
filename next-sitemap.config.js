/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'http://localhost:3000' || 'https://example.com',
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