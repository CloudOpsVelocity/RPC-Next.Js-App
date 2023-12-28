import React from "react";
interface Props {
  params: {
    slug: string;
  };
}
const T = {
  individual: "Individual",
  company: "Company",
};

const Page: React.FC<Props> = async ({ params: { slug } }) => {
  const component = T[slug];
  return <div>{JSON.stringify(component)}</div>;
};

export default Page;
