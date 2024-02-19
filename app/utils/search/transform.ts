interface SearchFilter {
  current: number | null;
  locality: string[];
  propTypes: number | null;
  unitTypes: number[];
  bathRooms: number[];
  parkings: number[];
  amenities: number[];
  listedBy: number[];
  reraVerified: boolean | null;
  areaValue: [number, number];
  bugdetValue: [number, number];
  builderIds: string[];
  city: string | null;
}

const convertToOriginalState = (data: any): SearchFilter => {
  const convertedData: SearchFilter = {
    current: null,
    locality: [],
    propTypes: null,
    unitTypes: [],
    bathRooms: [],
    parkings: [],
    amenities: [],
    listedBy: [],
    reraVerified: null,
    areaValue: [0, 5000],
    bugdetValue: [0, 5],
    builderIds: [],
    city: null,
  };

  if (data.unitTypes !== undefined) {
    convertedData.unitTypes = data.unitTypes.split(",").map(Number);
  }
  if (data.localities !== undefined) {
    convertedData.locality = data.localities.split(",");
  }
  if (data.builderIds !== undefined) {
    convertedData.builderIds = data.builderIds.split(",");
  }
  if (data.amenities !== undefined) {
    convertedData.amenities = data.amenities.split(",").map(Number);
  }
  if (data.listedBy !== undefined) {
    convertedData.listedBy = data.listedBy.split(",").map(Number);
  }
  if (data.city !== undefined) {
    convertedData.city = data.city;
  }

  if (data.propTypes !== undefined) {
    convertedData.propTypes = parseInt(data.propTypes);
  }
  if (data.bathRooms !== undefined) {
    convertedData.bathRooms = data.bathRooms.split(",").map(Number);
  }
  if (data.parkings !== undefined) {
    convertedData.parkings = data.parkings.split(",").map(Number);
  }
  if (data.reraVerified !== undefined) {
    convertedData.reraVerified = data.reraVerified === "true";
  }
  if (data.minArea !== undefined && data.maxArea !== undefined) {
    convertedData.areaValue = [parseInt(data.minArea), parseInt(data.maxArea)];
  }
  if (data.minPrice !== undefined && data.maxPrice !== undefined) {
    convertedData.bugdetValue = [
      parseInt(data.minPrice),
      parseInt(data.maxPrice),
    ];
  }

  if (data.projStatus !== undefined) {
    convertedData.current = parseInt(data.projStatus);
  }
  return convertedData;
};

export { convertToOriginalState };
