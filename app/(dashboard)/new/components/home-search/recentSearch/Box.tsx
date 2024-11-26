import { extractApiValues } from "@/app/utils/dyanamic/projects";
import { truncateText } from "@/app/utils/letters";
import { Tooltip } from "@mantine/core";
import React from "react";

type Props = {
  item: any;
};

export default function Box({ item }: Props) {
  const handlePush = async (type: string, apiData: any) => {
    const AgentOwnerBuilderMap = new Map([
      ["BuilderAgentListing", "A"],
      ["BuilderOwnerListing", "I"],
      ["BuilderBuilderListing", "B"],
      ["ProjectAgentListing", "A"],
      ["ProjectOwnerListing", "I"],
      ["ProjectBuilderListing", "B"],
    ]);
    switch (type) {
      case "project":
        if (apiData.type === "Project") {
          window.open(apiData.stringUrl);
        } else {
          window.open(
            `/search/listing?projIdEnc=${
              apiData.stringId.split("_")[0]
            }&phaseId=${apiData.stringId.split("_")[1]}&projName=${
              apiData.name
            }`
          );
        }

        break;
      case "listing":
        {
          const data = extractApiValues(apiData.stringId);
          {
            let url;
            let localityName = apiData.name
              .split(" in ")[1]
              .toLowerCase()
              .trim();
            url =
              `propTypes=${data.PT}${
                data.BH ? "&unitTypes=${data.BH}" : ""
              }&cg=${data.CG}&localities=${localityName}` +
              "%2B" +
              encodeURIComponent(data.LT);

            window.open("/search/listing?" + url);
          }
        }
        break;
      case "projectListing":
        {
          let projectName = apiData.name.split(" in ")[1].trim();
          // console.log(projectName);
          const url = `projIdEnc=${
            apiData.stringId
          }&listedBy=${AgentOwnerBuilderMap.get(
            apiData.type
          )}&projName=${projectName}`;
          window.open("/search/listing?" + url);
        }
        break;
      case "builder":
        {
          if (apiData.type === "BuilderDetail") {
            window.open(apiData.stringUrl);
          } else {
            const url =
              encodeURIComponent(apiData.name) +
              "%2B" +
              encodeURIComponent(apiData.stringId.split("_")[1]);
            window.open(
              `/search?builderIds=${url}&city=${
                apiData.stringId.split("_")[0]
              }${
                apiData.type !== "BuilderProject"
                  ? "&listedBy=${AgentOwnerBuilderMap.get(apiData.type)}"
                  : ""
              }`
            );
          }
        }
        // const url = encodeURI(`${data.name}+${data.id}`);

        break;
      default:
        break;
    }
  };

  return (
    <Tooltip label={item.name} withArrow>
      <div
        onClick={(e) => handlePush(item.ct, item)}
        className="inline-flex justify-center items-center gap-2 rounded-lg px-3 py-1.5 border border-gray-300 bg-white text-[#4B77C1] text-[13px] mb-[4px] sm:text-sm font-medium cursor-pointer text-nowrap shadow-sm hover:bg-gray-100 hover:shadow-md transition-all duration-200"
      >
        {truncateText(item?.name, 36)} {config.icon}
      </div>
    </Tooltip>
  );
}

const config = {
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 14 15"
      fill="none"
    >
      <path
        d="M9.5 4H13.5V8"
        stroke="#4B77C1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 4L7.85 9.65C7.75654 9.74161 7.63088 9.79293 7.5 9.79293C7.36912 9.79293 7.24346 9.74161 7.15 9.65L4.85 7.35C4.75654 7.25839 4.63088 7.20707 4.5 7.20707C4.36912 7.20707 4.24346 7.25839 4.15 7.35L0.5 11"
        stroke="#4B77C1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};
