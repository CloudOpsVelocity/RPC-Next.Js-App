import axios from "axios";

export const getSearchData = async (page = 0, apiFilterQueryParams: string) => {
  const res = await axios.get(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/srp/searchproj?page=${page}&city=9&${parseApiFilterQueryParams(
      apiFilterQueryParams
    )}`
  );
  return res.data;
};

const parseApiFilterQueryParams = (apiFilterQueryParams: string) => {
  let changedParams = {
    propTypes: "propType",
    unitTypes: "bhk",
    bathRooms: "bathroom",
    parkings: "parking",
    facings: "facing",
  };
  Object.keys(changedParams).forEach((key) => {
    if (apiFilterQueryParams.includes(key)) {
      apiFilterQueryParams = apiFilterQueryParams.replace(
        key,
        changedParams[key as keyof typeof changedParams]
      );
    }
  });
  return apiFilterQueryParams.replace(/-/g, "&");
};
