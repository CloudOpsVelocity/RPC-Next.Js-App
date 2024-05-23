interface MediaObject {
  [key: string]: string | string[] | undefined;
}

function getImageUrls(
  mediaObject: MediaObject,
  propertyNames = [
    "coverImageUrl",
    "otherImgUrl",
    "projectPlanUrl",
    "floorPlanUrl",
  ]
): string[] {
  const imageUrls: string[] = [];

  if (mediaObject && propertyNames && Array.isArray(propertyNames)) {
    propertyNames.forEach((propertyName) => {
      if (mediaObject[propertyName]) {
        if (Array.isArray(mediaObject[propertyName])) {
          imageUrls.push(
            ...(mediaObject[propertyName] as string[]).map(
              (url) => `${url}?v=${Math.random()}`
            )
          );
        } else {
          imageUrls.push(`${mediaObject[propertyName]}?v=${Math.random()}`);
        }
      }
    });
  }

  return imageUrls;
}

const imageUrlParser = (originalUrl: string, type?: string) => {
  if (!originalUrl) return "";

  const urlParts = originalUrl.split("/");
  const imagesIndex = urlParts.indexOf("images");

  if (imagesIndex !== -1) {
    const imagePath = urlParts.slice(imagesIndex + 1).join("/");
    const isVideo = /\\.mp4$/.test(imagePath);
    let modifiedUrl;

    if (isVideo) {
      modifiedUrl = `${
        process.env.NEXT_PUBLIC_URL
      }/video?path=/images/${imagePath}?v=${Math.random()}`;
    } else {
      modifiedUrl = `${
        process.env.NEXT_PUBLIC_URL
      }/image?path=/images/${imagePath}?v=${Math.random()}${
        type ? `&type=${type}` : ""
      }`;
    }

    return modifiedUrl;
  }

  return originalUrl;
};
export { getImageUrls, imageUrlParser };
