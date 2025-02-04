import NewsSections from "../components/NewsSections";

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params) {
  return { title: `Post: ${params.slug}` };
}

export default function Page({ params }: Params) {
  return <div className="h-[100%] w-[100%] flex flex-col overflow-hidden ">
    {/* <NewsBanner /> */}
    <NewsSections cityName={params?.slug} />
  </div>;
}

