import { Main } from "../validations/types/project";

const getProjectDetails = async (slug: string): Promise<Main> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/basicDetails?projIdEnc=${slug}`,
    {
      next: { revalidate: 90 },
    }
  );
  const data = await response.json();
  return data as Main; // Assuming the response can be cast to Main
};

export { getProjectDetails };
