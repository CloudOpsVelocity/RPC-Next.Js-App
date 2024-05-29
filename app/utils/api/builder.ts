import { Main } from "@/app/validations/types/builder";

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
      cache: "no-store",
      next: { tags: [`${slug}`] },
      ...options,
    });
    const data: Main = await response.json();
    return data as Main;
  } catch (error) {
    return error as Main;
  }
};
