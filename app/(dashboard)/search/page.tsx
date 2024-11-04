
import { getUserCity } from "@/app/(new_routes_seo)/utils/new-seo-routes/home.api";
import DefaultSearchPage from "./Page/DefaultSearchPage";
import { headers } from "next/headers";
type Props = { searchParams: {} };
const  SearchingPage = async ({ searchParams }: Props) => {
  const ip = headers().get("x-forwarded-for") || headers().get("cf-connecting-ip") || "";
  const data = await getUserCity(undefined,ip);
   console.log(data)
  return <DefaultSearchPage cityData={data?.data} />; 
};

export default SearchingPage;
