/* ---------------- ROBOTS CONFIG ---------------- */
/* Controls how search engine crawlers interact
   with site routes and indexed content */

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",

        /* Allow all public marketing pages */
        allow: ["/", "/about", "/services", "/blog", "/contact", "/booking"],

        /* Block private/admin infrastructure */
        disallow: [
          "/admin",
          "/admin/*",
          "/api",
          "/api/*",
          "/_next",
          "/dashboard",
        ],
      },
    ],

    /* XML sitemap reference */
    sitemap: "https://alignedminds.com/sitemap.xml",
  };
}
