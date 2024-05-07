import React from "react";
import Header from "../../components/layouts/primary/header";
import Footer from "../../components/layouts/primary/footer";
import TopProfileBlock from "../../components/builder/topProfileBlock";
import ProjectDetails from "../../components/builder/projectDetails";
import ManagementBlock from "../../components/builder/management";
import BuildersBlock from "../../components/builder/buildersBlock";
import { getBuilderDetails } from "@/app/utils/api/builder";
import BuilderCarousel from "@/app/components/builder/Carousel";
import Reqcallback from "@/app/components/builder/Reqcallback";
import ProjectDrawer from "@/app/components/project/Drawer";
import dynamic from "next/dynamic";
import SectionSkeleton from "@/app/components/atoms/skeleton/section";
const LoginPopup = dynamic(
  () => import("@/app/components/project/modals/LoginPop"),
  {
    loading: () => <SectionSkeleton />,
    ssr: false,
  }
);
type Props = { params: { slug: string } };

export default async function Page({ params: { slug } }: Props) {
  const data = await getBuilderDetails(slug, "Y", "proj");
  console.log(data?.data?.builderProjects);
  return (
    <div className="flex flex-col justify-start items-center w-full mt-[90px]  ">
      {data && (
        <>
          <Header />
          <TopProfileBlock {...data.data} />

          <div className="flex flex-col justify-start items-start w-[95%] ">
            <ProjectDetails {...data.data} />
            <ManagementBlock {...data.data} />

            {data?.data?.builderProjects && (
              <BuilderCarousel
                type="proj"
                title={`Newly launched PROJECT by`}
                projName={data?.data?.companyName}
                content={`See other newly launched projects by ${data?.data?.companyName}`}
                data={data?.data?.builderProjects}
              />
            )}

            <BuildersBlock
              data={data?.data?.otherBuilder}
              name={data?.data?.companyName}
            />
          </div>
          <Reqcallback builderId={Number(slug) as number} />

          <Footer />
          <ProjectDrawer projName={data?.data?.companyName} />
          <LoginPopup />
        </>
      )}
    </div>
  );
}
