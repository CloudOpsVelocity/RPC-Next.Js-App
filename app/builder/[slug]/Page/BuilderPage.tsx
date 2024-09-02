import React from "react";
import BuilderCarousel from "@/app/components/builder/Carousel";
import Reqcallback from "@/app/components/builder/Reqcallback";
import ProjectDrawer from "@/app/components/project/Drawer";
import dynamic from "next/dynamic";
import SectionSkeleton from "@/app/components/atoms/skeleton/section";
import Header from "@/app/components/layouts/primary/header";
import TopProfileBlock from "@/app/components/builder/topProfileBlock";
import ProjectDetails from "@/app/components/builder/projectDetails";
import ManagementBlock from "@/app/components/builder/management";
const LoginPopup = dynamic(
  () => import("@/app/components/project/modals/LoginPop"),
  {
    loading: () => <SectionSkeleton />,
    ssr: false,
  }
);
type Props = { data: any; id: string };

export default function BuilderPage({ data, id }: Props) {
  return (
    <div className="flex flex-col justify-start items-center w-full mt-[70px]  ">
      {data && (
        <>
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
            <BuilderCarousel
              type="proj"
              id={id}
              title={`Projects `}
              projName={`  ${data?.data?.userName}`}
              content={`See other Projects by ${data?.data?.userName}`}
              data={data?.data?.builderProjects}
              location={
                data?.data?.projectAvailableCities &&
                Object.keys(data?.data?.projectAvailableCities).length <= 1
                  ? data.data.cityName
                  : ""
              }
            />
          </div>
          <Reqcallback builderName={data.data?.userName} />
          <ProjectDrawer projName={data?.data?.userName} />
          <LoginPopup />
        </>
      )}
    </div>
  );
}
