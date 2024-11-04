export interface SearchParams {
  listedBy: string | null;
  cg: string;
  city:string
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
  } in ${params.city.split("+")[0]}`;

  return dynamicText;
};
