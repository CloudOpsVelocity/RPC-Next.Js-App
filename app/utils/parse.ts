function stateParser(originalData: any) {
  return originalData?.map((item: any) => ({
    value: JSON.stringify(item.cid),
    label: item.constDesc,
  }));
}
function cityParser(originalData: any) {
  return originalData?.map((item: any) => ({
    value: JSON.stringify(item.id),
    label: item.name,
  }));
}

export { stateParser, cityParser };
