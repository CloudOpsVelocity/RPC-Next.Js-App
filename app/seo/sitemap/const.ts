import axios from "axios";

async function getUrlSlugs(type: "project" | "listing") {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/all/active/ids?identifier=${type}`;
  let data = await axios.get(url);
  return data.data;
}

export { getUrlSlugs };
