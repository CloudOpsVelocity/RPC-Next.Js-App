import { Main } from "@/app/validations/property";
import { Main as M } from "@/app/validations/types/project";

const getProjectDetails = async (slug: string): Promise<M | any> => {
  if (slug) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/fetch/listing/project/data?projIdEnc=${slug}`
      // {
      //   cache: "no-cache",
      // }
      // {
      //   next: { revalidate: 30 },
      // }
    );
    const data = await response.json();

    return data as M;
  }
};

const getListingDetails = async (slug: string): Promise<Main> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/fetch/listing/data?propIdEnc=${slug}`,
    {
      cache: "no-cache",
    }
  );
  const data = await response.json();
  return data;
};

const getNearByLocations = async (slug: string): Promise<any> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/get-nearby?projIdEnc=${slug}`
  );
  const data = await response.json();
  console.log(data);
  return data;
};
export { getProjectDetails, getListingDetails, getNearByLocations };
