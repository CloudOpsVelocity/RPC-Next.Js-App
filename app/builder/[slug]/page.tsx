import React from "react";
import Header from "../../components/layouts/primary/header";
import Footer from "../../components/layouts/primary/footer";
import TopProfileBlock from "../../components/builder/topProfileBlock";
import ProjectDetails from "../../components/builder/projectDetails";
import ManagementBlock from "../../components/builder/management";
import { getBuilderDetails } from "@/app/utils/api/builder";
import BuilderCarousel from "@/app/components/builder/Carousel";
import Reqcallback from "@/app/components/builder/Reqcallback";
import ProjectDrawer from "@/app/components/project/Drawer";
import dynamic from "next/dynamic";
import SectionSkeleton from "@/app/components/atoms/skeleton/section";
import { cookies } from "next/headers";
import { extractID, getPagesSlugs } from "@/app/seo/api";
import { notFound } from "next/navigation";

const LoginPopup = dynamic(
  () => import("@/app/components/project/modals/LoginPop"),
  {
    loading: () => <SectionSkeleton />,
    ssr: false,
  }
);
type Props = { params: { slug: string } };

export default async function Page({ params: { slug } }: Props) {
  const token = cookies().get("token")?.value;
  const id = extractID(slug);
  if (!id) {
    notFound();
  }
  const data = await getBuilderDetails(id, "Y", "proj", token);
  return (
    <div className="flex flex-col justify-start items-center w-full mt-[70px]  ">
      {data && (
        <>
          <Header />
          <TopProfileBlock {...data.data} />
          <div className="flex flex-col justify-start items-start w-[95%] ">
            <ProjectDetails {...data.data} />
            <ManagementBlock {...data.data} />

            {/* <BuildersBlock
              data={data?.data?.otherBuilder}
              name={data?.data?.companyName}
            /> */}
          </div>
          <div className="w-full m-auto sm:w-[95%]">
            {data?.data?.builderProjects && (
              <BuilderCarousel
                type="proj"
                title={`Newly launched Projects `}
                projName={`  ${data?.data?.userName}`}
                content={`See other newly launched projects by ${data?.data?.userName}`}
                data={data?.data?.builderProjects}
                location={
                  Object.keys(data?.data?.projectAvailableCities).length <= 1
                    ? data.data.cityName
                    : ""
                }
              />
            )}
          </div>
          <Reqcallback builderName={data.data.userName} />
          <Footer />
          <ProjectDrawer projName={data?.data?.userName} />
          <LoginPopup />
        </>
      )}
    </div>
  );
}

export const fetchCache = "force-dynamic";
export async function generateStaticParams() {
  const res = await getPagesSlugs("builder-list");
  const builderRess = Object.keys(res);
  const slugs = builderRess?.map((data: any) => ({
    slug: data,
  }));
  return slugs;
}
