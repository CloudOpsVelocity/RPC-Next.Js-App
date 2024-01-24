function formatCurrency(value: number) {
  if (value >= 10000000) {
    // If value is 1 crore or more, format in crores
    const croreValue = (value / 10000000).toFixed(2);
    return `₹ ${croreValue} Cr`;
  } else if (value >= 100000) {
    // If value is 1 lakh or more, format in lakhs
    const lakhValue = (value / 100000).toFixed(2);
    return `₹ ${lakhValue} Lac`;
  } else {
    // If value is less than 1 lakh, format as is
    return `₹ ${value}`;
  }
}

export { formatCurrency };
