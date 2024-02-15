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
export const convertIntoId = (title: string) => {
  return title.replace(/\s+/g, "-").toLowerCase();
};
