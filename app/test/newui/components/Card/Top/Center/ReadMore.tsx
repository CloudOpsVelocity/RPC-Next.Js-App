"use client";
import { OverlayAction } from "@/app/test/newui/store/overlay";
import React from "react";

type Props = {
  projectAbout: string;
  isReadMoreNeeded: boolean;
  projIdEnc: string;
  type: string;
  phaseId: string;
  dispatch: (args: OverlayAction) => void;
  readMoreThreshold: number;
  propIdEnc: string;
  propTypeName: string;
  propTypeId: string;
};

export default function SearchReadMore({
  dispatch,
  isReadMoreNeeded,
  phaseId,
  projIdEnc,
  projectAbout,
  type,
  readMoreThreshold,
  propIdEnc,
  propTypeId,
  propTypeName,
}: Props) {
  return (
    <div
      className="text-[12px] sm:text-[14px] pr-2 line-clamp-2"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {projectAbout && (
        <div className="line-clamp-2 relative">
          <span
            dangerouslySetInnerHTML={{
              __html: projectAbout.slice(0, readMoreThreshold),
            }}
          />
          {isReadMoreNeeded && (
            <div className="absolute bottom-0 right-0 bg-white">
              <span className="text-black">...</span>{" "}
              <button
                className="text-btnPrimary font-bold text-[12px] sm:text-[14px] underline  cursor-pointer   "
                title="Click to Read More"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents the modal from opening if clicking elsewhere
                  // console.log("read more testing");
                  dispatch({
                    content: projectAbout,
                    // id: `${
                    //   type === "proj" ? projIdEnc : propIdEnc
                    // }+${propTypeId ?? propTypeName ?? ''}${
                    //   type === "proj" && phaseId ? "+" + phaseId : ""
                    // }`,
                    id: `${projIdEnc ?? ""}+${propIdEnc ?? ""}${
                      propTypeId ?? propTypeName ?? ""
                    }${type === "proj" && phaseId ? "+" + phaseId : ""}`,
                    title: type === "proj" ? "About Project" : "About Property",
                    type: "OPEN",
                    conType: "readmore",
                    pType: type,
                  });
                }}
              >
                Read More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
