import axios from "axios";

export const getSearchData = async (page = 0, apiFilterQueryParams: string) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/searchproj?page=${page}`;
  if (apiFilterQueryParams.includes("listedBy")) {
    url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/prop-search?page=${page}`;
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
  if (apiFilterQueryParams.includes("locality=")) {
    // Extract the `locality=...` part
    let localityMatch = apiFilterQueryParams.match(/locality=[^&-]*/);

    if (localityMatch) {
      let localityPart = localityMatch[0]; // Extracted `locality=...` string
      let ids = localityPart
        .split(",") // Split by commas
        .map((part) => part.split("+")[1]) // Extract the part after `+`
        .filter((id) => id) // Ensure non-empty IDs
        .join(","); // Join the IDs with commas
      apiFilterQueryParams = apiFilterQueryParams.replace(
        /locality=[^&-]*/,
        `locality=${ids}`
      );
    }
  }
  // handle City
  if (apiFilterQueryParams.includes("city=")) {
    // Extract the numeric city value
    const cityMatch = apiFilterQueryParams.match(/city=[^-\s]*\+?(\d+)/);
    if (cityMatch) {
      const city = cityMatch[0]; // Extracted numeric city value
      const defaultCity = "9";
      apiFilterQueryParams = apiFilterQueryParams.replace(
        /city=[^-\s]*\+?\d+/,
        `city=${city.split("+")[1] || defaultCity}`
      );
    } else {
      console.log("City parameter not found");
    }
  } else {
    apiFilterQueryParams += "&city=9";
  }

  return apiFilterQueryParams.replace(/-/g, "&").replace("listedBy=All", "");
};
