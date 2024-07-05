import { Main } from "@/app/validations/types/builder";
import { capitalizeWords } from "../letters";

export const getBuilderDetails = async (
  slug: string | number,
  y: string,
  type: "prop" | "proj",
  token?: string
): Promise<Main> => {
  const url =
    type === "proj"
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/v1/builder-details?builderId=${slug}&isBuilderPage=${y}`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/fetch/listing/builder/data?userId=${slug}`;
  try {
    const options = token
      ? {
          headers: {
            Authorization: `${token}`,
          },
        }
      : {};
    const response = await fetch(url, {
      next: { tags: [`${slug}`], revalidate: 60 * 5 },
      ...options,
    });
    const data: Main = await response.json();
    return {
      ...data,
      data: { ...data.data, userName: capitalizeWords(data.data.userName) },
    } as Main;
  } catch (error) {
    return error as Main;
  }
};
