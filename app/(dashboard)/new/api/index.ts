export const getData = async () => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/home/page/project`;
  const res = await fetch(url, {
    next: {
      revalidate: 90,
    },
  });
  const data = await res.json();
  return data;
};

export const getHomeListingData = async () => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/home/page/listing`;
  const res = await fetch(url, {
    next: {
      revalidate: 90,
    },
  });
  const data = await res.json();
  return data;
};

export const getShortIds = async () => {
  try {
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-actions/shortlist/ids`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    return [];
  }
};
