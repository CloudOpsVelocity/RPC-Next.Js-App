import NewsDetailsPage from "../components/NewsDetailsPage";

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params) {
  return { title: `Post: ${params.slug}` };
}

export default function Page({ params }: Params) {
  return <div className="h-[100%] w-[100%] mt-[70px] flex flex-col overflow-hidden bg-[#F5F7F8] items-center ">
    <NewsDetailsPage />
  </div> 
}

