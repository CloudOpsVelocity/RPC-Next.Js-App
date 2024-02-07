import { unstable_cache } from "next/cache";
import { Main } from "../../validations/types/project";

const getProjectDetails = async (slug: string): Promise<Main> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/basicDetails?projIdEnc=${slug}`
    // {
    //   cache: "no-cache",
    // }
    // {
    //   next: { revalidate: 30 },
    // }
  );
  const data = await response.json();
  {
    console.log(data);
  }
  return data as Main; // Assuming the response can be cast to Main
};
const getProjectWiseOverView = async (slug: string): Promise<any> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/overviewData?projIdEnc=${slug}`
    // {
    //   next: { revalidate: 90 },
    // }
  );
  const data = await response.json();
  return data; // Assuming the response can be cast to Main
};
const getProjectUnits = async (
  slug: string,
  phaseId: any,
  propType: any
): Promise<any> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/projectUnit?projIdEnc=${slug}&phaseId=${phaseId}&propType=${propType}`
    // {
    //   next: { revalidate: 60 },
    // }
  );

  const data = await response.json();
  return data;
};

const getCachedUser = unstable_cache(
  async (id: string): Promise<Main> => getCachedUser(id),
  ["my-app-user"],
  {
    revalidate: 60,
  }
);

const getNearByLocations = async (slug: string): Promise<any> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/get-nearby?projIdEnc=2f68ddd8033756154f4d6abb50c4417e`
  );
  const data = await response.json();
  console.log(data);
  return data;
};
export {
  getProjectDetails,
  getCachedUser,
  getProjectWiseOverView,
  getProjectUnits,
  getNearByLocations,
};
