import { unstable_cache } from "next/cache";
import { Main, MERGERPROJECT } from "../../validations/types/project";
import { capitalizeWords } from "../letters";
import axios from "axios";
import { paritalUnitParser } from "@/app/(new_routes_seo)/residential/projects/utils/partialUnitParser";

const getProjectDetails = async (slug: string): Promise<MERGERPROJECT> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/basicDetails?projIdEnc=${slug}`
  );
  const data = await response.json();

  let isRera = false;
  const phases = data?.phaseOverview?.map((el: any) => {
    if (el.rerastatus === "Recieved" || el.rerastatus === "Applied") {
      isRera = true;
    }
    return { phaseId: el.phaseId, phaseName: el.phaseName };
  });

  const metaData = { phases, isRera };

  return {
    ...data,
    basicData: {
      ...data.basicData,
      projectName: capitalizeWords(data.basicData?.projectName),
      postedByName: capitalizeWords(data.basicData?.postedByName),
      ...metaData,
    },
  } as MERGERPROJECT;
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
export const getCachedProjectUnits = async (
  slug: string,
  phaseId: any,
  propType: any
) => {
  const fn = unstable_cache(
    async (): Promise<any> => getProjectUnits(slug, phaseId, propType),
    ["datatest"],
    { revalidate: 10 }
    // {
    //   revalidate: 60,
    // }
  );
  const data = await fn();
  console.log(data);
  return data;
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
  console.log(data);
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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/get-nearby?projIdEnc=${slug}`
  );
  const data = await response.json();
  return data;
};
const getAmenties = async () => {
  const data = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/projAmenities`
  );
  return data.data;
};
const getOverViewData = async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/overviewData?projIdEnc=${slug}`
  );
  const data = await response.json();
  return paritalUnitParser(data);
};
export {
  getProjectDetails,
  getCachedUser,
  getProjectWiseOverView,
  getProjectUnits,
  getNearByLocations,
  getAmenties,
  getOverViewData,
};

// const paritalUnitParser = (input: any[]) => {
//   let result: any = {};
//   for (const key in input) {
//     if (Object.prototype.hasOwnProperty.call(input, key)) {
//       const element = input[key];
//       if (!result[element.phaseId.toString()]) {
//         result[element.phaseId.toString()] = {
//           apartment: {},
//           villa: {},
//           plot: {},
//           rowhouse: {},
//           villament: {},
//         };
//       }
//     }
//   }
//   console.log(result);
// };
