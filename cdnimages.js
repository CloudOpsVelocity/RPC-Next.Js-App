export default function cloudfrontLoader({ src, width, quality }) {
  const normalizedSrc = src.startsWith("/") ? src : `/${src}`;
  const url = new URL(`https://d2l0lb5gc1bw3t.cloudfront.net${normalizedSrc}`);
  url.searchParams.set("format", "auto");
  url.searchParams.set("width", width.toString());
  url.searchParams.set("quality", (quality || 75).toString());
  return url.href;
}
