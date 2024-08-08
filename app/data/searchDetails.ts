export const searchDetails = [
  "Project Status",
  "Locality",
  "Property Type",
  "Unit Type",
  "Area",
  "Budget",
  "Bath",
  "Amenities",
  "Parking",
  "RERA",
  "Builder",
];
export const ListingSearchDetails = [
  "Unit Type",
  "Property Status",
  "Property Type",
  "Posted By",
  "Locality",
  "Facing",
  "Bath",
  "Budget",
  "Area",
  "Photos & Videos",
  "Furnishing",
  "Amenities",
  "Parking",
];
export const convertIntoId = (title: string) => {
  return title.replace(/\s+/g, "-").toLowerCase();
};
