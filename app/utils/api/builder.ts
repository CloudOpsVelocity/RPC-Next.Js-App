import { Main } from "@/app/validations/types/builder";

export const getBuilderDetails = async (
  slug: string | number,
  y: string
): Promise<Main> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/v1/builder-details?builderId=${slug}&isBuilderPage=${y}`,
      {
        next: { revalidate: 90 },
      }
    );
    const data: Main = await response.json();
    console.log(data);
    return data as Main;
  } catch (error) {
    return error as Main;
  }
};
