import CityTrendSection from "../../components/CityTrendSection";

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
  return <CityTrendSection cityName={params?.slug} />
}

