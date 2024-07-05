export interface SearchParams {
  listedBy: string | null;
  cg: string;
}
export const DynamicText = (params: SearchParams) => {
  const dynamicText = `Properties for ${
    params.cg === "R" ? "Rent" : "Sell"
  } in Bengaluru`;
  return dynamicText;
};
