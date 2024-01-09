type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params) {
  console.log(process.env.NEXT_PUBLIC_NAME);
  return { title: `Post: ${params.slug}` };
}

export default function Page({ params }: Params) {
  return <h1>Slug: {params.slug}</h1>;
}
