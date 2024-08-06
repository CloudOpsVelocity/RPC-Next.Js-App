export const getData = async () => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/home/page/project`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const getHomeListingData = async () => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/home/page/listing`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
