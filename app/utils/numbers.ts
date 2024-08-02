function formatCurrency(input: number | string): string {
  // Convert input to a number if it is a string
  const value = typeof input === 'string' ? parseFloat(input) : input;

  // Check for invalid numbers
  if (isNaN(value)) return "Invalid Number"; 

  // Helper function to format numbers with commas
  const formatNumberWithCommas = (num: number): string => {
    const numberString = num.toFixed(2); // Convert to string with 2 decimal places
    const [integerPart, decimalPart] = numberString.split(".");

    let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (decimalPart === "00") {
      return formattedInteger;
    }

    return `${formattedInteger}.${decimalPart}`;
  };

  // Handle large numbers with suffixes
  if (value >= 10000000) {
    const croreValue = (value / 10000000).toFixed(2);
    const formattedValue = parseFloat(croreValue); // Convert to number to remove trailing zeros
    return `₹ ${formatNumberWithCommas(formattedValue)} Cr`;
  } else if (value >= 100000) {
    const lakhValue = (value / 100000).toFixed(2);
    const formattedValue = parseFloat(lakhValue); // Convert to number to remove trailing zeros
    return `₹ ${formatNumberWithCommas(formattedValue)} Lac`;
  } else {
    return `₹ ${formatNumberWithCommas(value)}`;
  }
}


  



export { formatCurrency };


function formatNumberWithSuffix(input: number | string): string {
  // Convert input to number, handling string input and invalid strings
  const value = typeof input === 'string' ? parseFloat(input) : input;

  // Check for invalid numbers
  if (isNaN(value)) return "Invalid Number"; 

  // Helper function to format numbers with commas
  const formatNumberWithCommas = (num: number): string => {
    const numberString = num.toFixed(2); // Convert to string with 2 decimal places
    const [integerPart, decimalPart] = numberString.split(".");

    let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (decimalPart === "00") {
      return formattedInteger;
    }

    return `${formattedInteger}.${decimalPart}`;
  };

  // Handle large numbers with suffixes
  if (value >= 10000000) {
    const croreValue = (value / 10000000).toFixed(2);
    const formattedValue = parseFloat(croreValue); // Convert to number to remove trailing zeros
    return `${formatNumberWithCommas(formattedValue)} Cr`;
  } else if (value >= 100000) {
    const lakhValue = (value / 100000).toFixed(2);
    const formattedValue = parseFloat(lakhValue); // Convert to number to remove trailing zeros
    return `${formatNumberWithCommas(formattedValue)} Lac`;
  } else {
    return `${formatNumberWithCommas(value)}`;
  }
}


export {formatNumberWithSuffix}