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
function registerOtherParser(data: any) {
  const { otp, prevMobile, companyLogo, ...parsedData } = data;
  if (companyLogo) {
    return { ...parsedData, isLogoChange: "Y" };
  } else {
    return parsedData;
  }
}

export {
  stateParser,
  cityParser,
  brachParser,
  hideMobileNumber,
  registerOtherParser,
};
