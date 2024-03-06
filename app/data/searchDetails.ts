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
  "Bhk",
  "Project Status",
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
  "RERA",
];
export const convertIntoId = (title: string) => {
  return title.replace(/\s+/g, "-").toLowerCase();
};
