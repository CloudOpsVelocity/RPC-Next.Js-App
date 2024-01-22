import React from "react";
import Header from "../../components/layouts/primary/header";
import Footer from "../../components/layouts/primary/footer";
import TopProfileBlock from "../../components/builder/topProfileBlock";
import ProjectDetails from "../../components/builder/projectDetails";
import ManagementBlock from "../../components/builder/management";
import ProjectCarousel from "../../components/project/ProjectCard";
import BuildersBlock from "../../components/builder/buildersBlock";
import { getBuilderDetails } from "@/app/utils/api/builder";

type Props = { params: { slug: string } };

export default async function Page({ params: { slug } }: Props) {
  const data = await getBuilderDetails(slug, "Y");

  return (
    <div className="flex flex-col justify-start items-center w-full mt-[90px]  ">
      {data && (
        <>
          <Header />
          <TopProfileBlock {...data.data} />

          <div className="flex flex-col justify-start items-start w-[95%] ">
            <ProjectDetails {...data.data} />
            <ManagementBlock {...data.data} />

            {data?.data?.builderProjects.map((project) => (
              <ProjectCarousel
                key={project.projIdEnc}
                type="proj"
                title={`Newly launched PROJECT by ${data?.data?.companyName}`}
                projName={project.projectName}
                content={`See other newly launched projects by ${data?.data?.companyName}`}
              />
            ))}

            <BuildersBlock data={data?.data?.otherBuilder} />
          </div>

          <Footer />
        </>
      )}
    </div>
  );
}
