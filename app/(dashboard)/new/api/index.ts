import { options } from "@/app/options";
import axios from "axios";
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
  console.log("🚀 ~ getShortIds ~ session:", session);

  if (session) {
    try {
      if (process.env.NODE_ENV === "development") {
        return {
          message: "data from developemnt",
          propIds: [1],
          projIds: [1, 2, 3],
        };
      } else {
        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-actions/shortlist/ids`;
        let data = await fetch(url, {
          headers: {
            // @ts-ignore
            Authorization: `${session.user.token as any}`,
          },
        });

        return await data.json();
      }
    } catch (error: any) {
      console.log(error);
      return {
        propIds: [],
        projIds: [],
      };
    }
  }
};
