import Agent from "@/app/components/molecules/auth/signup/agent";
import Individual from "@/app/components/molecules/auth/signup/individual";
import { notFound } from "next/navigation";
import React from "react";
interface Props {
  params: {
    slug: string;
  };
}

type PageType = {
  individual: React.ReactElement;
  agent: React.ReactElement;
};

const Page: React.FC<{ params: { slug: keyof PageType } }> = ({
  params: { slug },
}) => {
  const components: PageType = {
    individual: <Individual />,
    agent: <Agent />,
  };
  const ComponentToRender = components[slug] || notFound();

  return <div>{ComponentToRender}</div>;
};

export default Page;
