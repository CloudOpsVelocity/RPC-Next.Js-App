import { options } from "@/app/options";
import { getServerSession } from "next-auth";

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
  const session = await getServerSession(options);
  if (session) {
    try {
      if (process.env.NODE_ENV === "development") {
        return {
          propIds: [],
          projIds: [],
        };
      } else {
        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-actions/shortlist/ids`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
      }
    } catch (error) {
      return {
        propIds: [],
        projIds: [],
      };
    }
  }
};
