import axios from "axios";

export const getSearchData = async (page = 0) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/searchproj?page=${page}&cg=S&city=9`
  );
  return res.data;
};
