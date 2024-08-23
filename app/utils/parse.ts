// Define types for the items in the foundedBy array
interface FoundedByItem {
  name: string;
  active: boolean;
  key: string;
}

// Define the function parameters
interface GetValuesParams {
  foundedBy: FoundedByItem[];
  managingDirectorName: FoundedByItem[]; // Array of names
  ceoName: FoundedByItem[]; // Array of names
}

// Define the return type for the getValues function
interface GetValuesResult {
  foundedBy: string;
  managingDirectorName: string;
  ceoName: string;
}





function stateParser(originalData: any) {
  return originalData?.map((item: any) => ({
    value: JSON.stringify(item.cid),
    label: item.constDesc,
  }));
}
function brachParser(originalData: any) {
  return originalData?.map((item: any) => ({
    value: item.id,
    label: item.name,
  }));
}
function cityParser(originalData: any) {
  return originalData?.map((item: any) => ({
    value: JSON.stringify(item.id),
    label: item.name,
  }));
}
function hideMobileNumber(mobile: number): string {
  if (!mobile) return "";
  const input = mobile.toString();
  // Replace all but the last three digits with 'X'
  const hiddenDigits = "X".repeat(input.length - 3);
  const result = hiddenDigits + input.slice(-3);
  return result;
}
function getFoundedByName(arr:FoundedByItem[]): string {
  if (arr.length > 1) {
    // Extract and join names if array length is greater than 1
    const names = arr.map(item => item.name).filter(name => name.trim() !== '');
    return names.join(', ');
  } else if (arr.length === 1) {
    // Return the name of the single item if array length is 1
    return arr[0].name.trim();
  }
  // Return an empty string if array length is 0
  return '';
}

// Function to convert an array of names to a comma-separated string
function arrayToCommaSeparatedString(names: string[]): string {
  return names.filter(name => name.trim() !== '').join(', ');
}

// Function to get the values for foundedBy, managingDirectorNames, and ceoNames
function getValues({
  foundedBy,
  managingDirectorName,
  ceoName,
}: GetValuesParams): GetValuesResult {
  return {
    foundedBy: getFoundedByName(foundedBy),
    managingDirectorName: getFoundedByName(managingDirectorName),
    ceoName: getFoundedByName(ceoName)
  };
}

function registerOtherParser(data: any) {
  const { otp, prevMobile, companyLogo, foundedBy, managingDirectorName, ceoName, ...parsedData } = data;
  
const items=getValues({foundedBy, managingDirectorName, ceoName})
  

  if (companyLogo) {
    return {  ...parsedData,  isLogoChange: "Y", companyLogo };
  } else {
    return {...parsedData, ...items};
  }
}

export {
  stateParser,
  cityParser,
  brachParser,
  hideMobileNumber,
  registerOtherParser,
};
