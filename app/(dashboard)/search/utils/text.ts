export interface SearchParams {
  listedBy: string | null;
  cg: string;
}

export const DynamicText = (params: SearchParams) => {
  const { listedBy, cg } = params;
  const propertyText =
    listedBy === "I" || listedBy === "A" || listedBy === "B"
      ? "Properties for"
      : "Projects";
  const rentOrSellText = cg === "R" ? "Rent" : "Sell";
  const dynamicText = `${propertyText} ${
    listedBy === "I" || listedBy === "A" || listedBy === "B"
      ? rentOrSellText
      : ""
  } in Bangalore`;

  return dynamicText;
};
