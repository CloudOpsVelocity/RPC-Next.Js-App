import { unstable_cache } from "next/cache";
import { Main } from "../../validations/types/project";
import { GlobalPageType } from "@/app/validations/global";
import { capitalizeWords } from "../letters";

const getProjectDetails = async (slug: string): Promise<Main> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/basicDetails?projIdEnc=${slug}`
  );
  const data = await response.json();

  return {
    ...data,
    projectName: capitalizeWords(data.projectName),
    postedByName: capitalizeWords(data.postedByName),
  } as Main; // Assuming the response can be cast to Main
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
  );
  const data = await response.json();

  if (propType === 31 || propType === 33) {
    const modifiedData = data.map((item: any) => {
      if (item.isBasement === "Y") {
        return {
          ...item,
          floor: `B+G+${item.floor}`,
        };
      }
      return {
        ...item,
        floor: `G+${item.floor}`,
      };
    });
    return modifiedData;
  }

  return data;
};

const getCachedUser = unstable_cache(
  async (id: string): Promise<Main> => getCachedUser(id),
  ["my-app-user"],
  {
    revalidate: 60,
  }
);

const getNearByLocations = async (
  slug: string,
  type?: GlobalPageType["types"]
): Promise<any> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/get-nearby?projIdEnc=${slug}`
  );
  const data = await response.json();
  return data;
};
export {
  getProjectDetails,
  getCachedUser,
  getProjectWiseOverView,
  getProjectUnits,
  getNearByLocations,
};
