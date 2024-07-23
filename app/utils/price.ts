export function calculatePerSqPrice(
  price: string | number,
  sba: string
): string {
  const priceValue: number =
    typeof price === "string" ? parseFloat(price) : price;
  const sbaValue: number = parseFloat(sba);

  if (isNaN(priceValue) || isNaN(sbaValue) || sbaValue === 0) {
    return "N/A";
  }

  const result: number = priceValue / sbaValue;
  const formattedResult: string = result.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedResult;
}
