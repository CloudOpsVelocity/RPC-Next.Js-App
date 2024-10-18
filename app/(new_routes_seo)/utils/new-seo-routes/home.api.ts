import { DefaultCityResponse } from "@/app/(dashboard)/new/search";

import { CityData } from "@/app/(dashboard)/new/search";

const getUserCity = async (cityData?:CityData): Promise<DefaultCityResponse> => {
    if (cityData) {
      return {
        data: {
          city: cityData.cityName,
          cityId: cityData.cityId,
        },
        status: true,
      };
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-user-city`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch default city");
      return await res.json();
    } catch (error) {
      console.error("Error fetching default city:", error);
      throw error;
    }
  };
  export const getHomePageProjectData = async (city?:number|string,coordinates?:{
    lat:number,
    lng:number
  }) => {

    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/home/page/project`;
    if(city){
      url = `${url}?city=${city}`
    }
    const res = await fetch(url, {
      next: {
        revalidate: 90,
      },
    });
    const data = await res.json();
    return data;
  };
  export {getUserCity}