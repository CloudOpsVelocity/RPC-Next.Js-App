function formatCurrency(valueInCrore: number): string {
  const crore: number = 10000000; // 1 crore = 10 million
  const lakh: number = 100000; // 1 lakh = 100 thousand
  const thousand: number = 1000;

  if (isNaN(valueInCrore) || valueInCrore < 0) {
    return "Invalid input";
  }

  if (valueInCrore >= crore) {
    const formattedValue: number = valueInCrore / crore;
    return `${formattedValue.toFixed(2)} Cr`;
  } else {
    return `${valueInCrore} `;
  }
}

export { formatCurrency };
