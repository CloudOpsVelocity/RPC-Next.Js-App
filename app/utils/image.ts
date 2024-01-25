interface MediaObject {
  [key: string]: string | string[] | undefined;
}

function getImageUrls(
  mediaObject: MediaObject,
  propertyNames = ["coverImageUrl", "otherImgUrl", "projectPlanUrl"]
): string[] {
  const imageUrls: string[] = [];

  if (mediaObject && propertyNames && Array.isArray(propertyNames)) {
    propertyNames.forEach((propertyName) => {
      if (mediaObject[propertyName]) {
        if (Array.isArray(mediaObject[propertyName])) {
          imageUrls.push(...(mediaObject[propertyName] as string[]));
        } else {
          imageUrls.push(mediaObject[propertyName] as string);
        }
      }
    });
  }

  return imageUrls;
}

export { getImageUrls };
