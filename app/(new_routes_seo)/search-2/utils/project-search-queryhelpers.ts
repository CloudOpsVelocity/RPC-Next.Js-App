import axios from "axios";

export const getSearchData = async (page = 0, apiFilterQueryParams: string) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/searchproj?page=${page}&city=9`;
  if (apiFilterQueryParams.includes("listedBy")) {
    url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/prop-search?page=${page}&city=9`;
  }
  let queryparams = parseApiFilterQueryParams(apiFilterQueryParams);
  const res = await axios.get(`${url}${queryparams ? `&${queryparams}` : ""}`);
  return res.data;
};

const parseApiFilterQueryParams = (apiFilterQueryParams: string) => {
  let changedParams = {
    propTypes: "propType",
    unitTypes: "bhk",
    bathRooms: "bathroom",
    parkings: "parking",
    facings: "facing",
    bugdetValue: "budget",
  };

  Object.keys(changedParams).forEach((key) => {
    if (apiFilterQueryParams.includes(key)) {
      apiFilterQueryParams = apiFilterQueryParams.replace(
        key,
        changedParams[key as keyof typeof changedParams]
      );
    }
  });

  // Handle budget value conversion
  if (apiFilterQueryParams.includes("budget=")) {
    const budgetMatch = apiFilterQueryParams.match(/budget=(\d+),(\d+)/);
    if (budgetMatch) {
      const [_, minPrice, maxPrice] = budgetMatch;
      apiFilterQueryParams = apiFilterQueryParams.replace(
        /budget=\d+,\d+/,
        `minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
    }
  }

  return apiFilterQueryParams.replace(/-/g, "&").replace("listedBy=All", "");
};
