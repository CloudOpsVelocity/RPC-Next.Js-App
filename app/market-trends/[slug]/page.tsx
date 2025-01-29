import CityTrendSection from "../components/CityTrendSection";
import MarketBanner from "../components/MarketBanner";
import MarketNavigator from "../components/MarketNavigator";
import SearchField from "../components/SearchField";

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params) {
  return { title: `Post: ${params.slug}` };
}

export default function Page({ params }: Params) {
  console.log(params?.slug)
  return <div className="h-[100%] w-[100%] mt-[70px] flex flex-col overflow-hidden bg-[#F5F7F8] items-center ">
    <MarketBanner />
    <MarketNavigator />
    <SearchField />

    <CityTrendSection cityName={params?.slug} />
  </div> 
}

