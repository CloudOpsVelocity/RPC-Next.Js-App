export function calculatePerSqPrice(
  price: string | number,
  sba: string
): string {
  const priceValue: number =
    typeof price === "string" ? (price = parseFloat(price)) : price;
  const sbaValue: number = parseFloat(sba);

  if (isNaN(priceValue) || isNaN(sbaValue) || sbaValue === 0) {
    return "N/A";
  }

  const result: string = (priceValue / sbaValue).toFixed(0);

  return result;
}
