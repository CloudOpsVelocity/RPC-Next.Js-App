export const topics = [
  { label: "Overview", id: "overview" },
  { label: "Listings Available", id: "listings" },
  { label: "About", id: "about" },
  { label: "Property Details", id: "propertyDetails" },
  { label: "Master Plan", id: "masterPlan" },
  { label: "Floor Plans", id: "floorPlans" },
  { label: "Gallery", id: "galleria" },
  { label: "Amenities", id: "amenities" },
  { label: "Near By", id: "nearBy" },
  { label: "Specifications", id: "specifications" },
  { label: "Highlights", id: "highlights" },
  { label: "About Builder", id: "aboutBuilder" },
  { label: "Why Buy This Project?", id: "whyBuy" },
  { label: "Customer Reviews", id: "ratings" },
  { label: "Brochure", id: "brochure" },
  { label: "FAQ?", id: "faq" },
  { label: "Similar Projects", id: "similar" },
];
export const Propertytopics = [
  { label: "Overview", id: "overview" },
  { label: "About", id: "about" },
  { label: "Property Details", id: "propertyDetails" },
  { label: "Floor Plans", id: "floorPlans" },
  { label: "Galleria", id: "galleria" },
  { label: "Amenities", id: "amenities" },
  { label: "Near By", id: "nearBy" },
  { label: "Builder Details", id: "aboutBuilder" },
  { label: "Customer Reviews", id: "ratings" },
  { label: "FAQ?", id: "faq" },
  { label: "Similar", id: "similar" },
];

export const propertyDetailsTypes = new Map([
  [35, { id: 35, name: "Apartment", url: "" }],
  [33, { id: 33, name: "Row House", url: "" }],
  [31, { id: 31, name: "Villa", url: "" }],
  [34, { id: 34, name: "Villament", url: "" }],
  [32, { id: 32, name: "Plot", url: "" }],
]);

export const projectprops = {
  villa: 31,
  plot: 32,
  rowHouse: 33,
  villament: 34,
  apartment: 35,
};
export const listingProps = {
  Villa: 31,
  Plot: 32,
  "Row House": 33,
  Villament: 34,
  Apartment: 35,
};

export const floorplanTypes = [
  {
    title: "By Type",
    value: "type",
  },
  {
    title: "By Unit",
    value: "unit",
  },
  {
    title: "By BHK",
    value: "bhk",
  },
];

export const bhkDetails = [
  {
    title: "All",
    value: 0,
  },
  {
    title: "1 BHK",
    value: 41,
  },
  {
    title: "2 BHK",
    value: 42,
  },
  {
    title: "3 BHK",
    value: 43,
  },
  {
    title: "4 BHK",
    value: 44,
  },
  {
    title: "5 BHK",
    value: 45,
  },
];

export const filterKeysDetails = new Map([
  ["bhkName", { name: "Unit type" }],
  ["facingName", { name: "Facing" }],
  ["towerName", { name: "Tower" }],
  ["unitNumber", { name: "Unit Number" }],
  ["superBuildUparea", { name: "Super Built Up Area" }],
  ["caretarea", { name: "Carpet Area" }],
  ["parkingType", { name: "Open/ Covered Parking" }],
  ["totalNumberOfBalcony", { name: "Balconies" }],
  ["totalNumberofBathroom", { name: "Bathroom" }],
  ["floor", { name: "Floor" }],
  ["block", { name: "Block" }],
  ["gardenArea", { name: "Garden  Area" }],
  ["terraceArea", { name: "Terrace  Area" }],
  ["parkingArea", { name: "Parking  Area" }],
  ["plotArea", { name: "Plot Area" }],
  ["length", { name: "Length of Plot" }],
  ["width", { name: "Breadth of Plot" }],
  ["noOfCarParking", { name: "Car Parking" }],
  ["projIdEnc", { name: "Project ID" }],
  ["phaseId", { name: "Phase ID" }],
  ["propType", { name: "Property Type" }],
  ["bhk", { name: "BHK ID" }],
  ["towerId", { name: "Tower ID" }],
  ["facingId", { name: "Facing ID" }],
  ["floorPlanUrl", { name: "FloorPlan URL" }],
]);
