const getPagesSlugs = async (
  pageType: "builder-list" | "project-list" | "case-seo" | "listing-search-seo"
) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/${pageType}`;
    const res = await fetch(url, {
      method: "POST",
      cache: "no-store",
    });
    const data = await res.json();

    if (pageType === "listing-search-seo") {
      if (data.status) {
        return data.urlMap;
      } else {
        return {};
      }
    }
    if (pageType === "project-list") {
      return data;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
function extractID(url: string): string {
  // Check if the string contains an underscore
  if (url.includes("_")) {
    const parts = url.split("_");
    return parts.pop() || url; // Return the ID or fallback to the original URL part
  }
  // If no underscore, return the entire string
  return url;
}
export { getPagesSlugs, extractID };
