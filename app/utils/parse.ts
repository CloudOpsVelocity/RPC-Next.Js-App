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

export { stateParser, cityParser, brachParser };
