import React, { useState, useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { useResetAtom } from "jotai/utils";
import { selectedPartialUnitAtom } from "@/app/store/partialsUnits";
import { projectReqDataAtom } from "@/app/store/project/project.req";
import Image from "next/image";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { formatNumberWithSuffix } from "@/app/utils/numbers";
import { FloorPlanNotAvail, ImgNotAvail } from "@/app/data/project";
import { propertyDetailsSvgs } from "@/app/images/commonSvgs";
import SharePopup from "@/app/components/atoms/SharePopup";
import { useQuery } from "react-query";
import ZoomInOut from "../../actions/ZoomInOut";
import useDownload from "@/app/hooks/property/useDownload";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { FaDownload, FaTimes, FaShare } from "react-icons/fa";
import { BiMessage } from "react-icons/bi";

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full h-full bg-white overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default function PartialUnitModal({ data }: any) {
  const isData = useAtomValue(selectedPartialUnitAtom);
  const projStaleData = useAtomValue(projectReqDataAtom);
  const [active, setActive] = useState(0);
  const reset = useResetAtom(selectedPartialUnitAtom);
  const handleReset = () => {
    setActive(0);
    reset();
  };

  const selectedOne = isData.others[active];
  const { handleDownload } = useDownload("floorPlan");
  const [, { open }] = useReqCallPopup();

  const {
    data: builderData,
    isLoading,
    status,
  } = useQuery<any>({
    queryKey: [`builder/${data.builderId}&isBuilderPage=Nproj`],
    enabled: false,
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Floor Plan",
          url: selectedOne?.floorPlan?.split(",")[3] || "",
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  if (!(isData.main === 0 ? true : isData.main)) {
    return null;
  }

  return (
    <Modal
      isOpen={isData.main === 0 ? true : isData.main}
      onClose={handleReset}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-2 sm:p-4 border-b bg-white">
          <h3 className="text-lg sm:text-xl font-semibold text-[#0073C6]">
            {selectedOne?.unitType || "Floor Plan"}
          </h3>
          <div className="flex items-center gap-2 sm:gap-4">
            {selectedOne?.floorPlan && (
              <>
                <button
                  onClick={() =>
                    handleDownload(selectedOne?.floorPlan?.split(",")[2])
                  }
                  className="flex items-center gap-2 px-2 sm:px-4 py-1 sm:py-2 bg-[#0073C6] text-white rounded-lg hover:bg-[#005a9e] transition-colors"
                >
                  <FaDownload className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline text-sm sm:text-base">
                    Download Floor Plan
                  </span>
                </button>
                <button
                  onClick={handleShare}
                  className="sm:hidden flex items-center gap-2 px-2 py-1 bg-[#0073C6] text-white rounded-lg hover:bg-[#005a9e] transition-colors"
                >
                  <FaShare className="w-3 h-3" />
                </button>
                <SharePopup
                  titleText="Share Floor Plan"
                  title="Share"
                  url={selectedOne?.floorPlan?.split(",")[3] || ""}
                  className="text-[#0073C6] font-semibold hover:text-[#005a9e] hidden sm:block"
                />
              </>
            )}
            <button
              onClick={handleReset}
              className="p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FaTimes className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left - Floor Plan Image */}
          <div className="flex-1 p-3 sm:p-6 flex items-center justify-center bg-[#F8FBFF]">
            <TransformWrapper>
              <TransformComponent>
                <div className="flex items-center justify-center w-full h-full">
                  <img
                    src={selectedOne?.floorPlan?.split(",")[3] ?? ImgNotAvail}
                    alt="Floor Plan"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </TransformComponent>
              <ZoomInOut className="bottom-20 sm:bottom-8 right-4 sm:right-8" />
            </TransformWrapper>
          </div>

          {/* Right - Unit Details */}
          <div className="w-full lg:w-96 bg-white p-3 sm:p-6 overflow-y-auto border-t lg:border-t-0 lg:border-l">
            <div className="space-y-4 sm:space-y-6">
              {/* Area Details */}
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-[#303A42] border-b pb-2">
                  Area Details
                </h4>
                <div className="grid gap-3 sm:gap-4 mt-3 sm:mt-4">
                  <div className="flex items-center gap-3 sm:gap-4 bg-[#F8FBFF] p-2 sm:p-3 rounded-lg">
                    <div className="bg-[#ECF7FF] p-1.5 sm:p-2 rounded-lg">
                      {propertyDetailsSvgs.superBuildUparea}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-[#4D6677] font-medium">
                        {selectedOne?.propType == "32"
                          ? "Plot Area"
                          : "Super Builtup Area"}
                      </p>
                      <p className="text-sm sm:text-base text-[#303A42] font-semibold">
                        {formatNumberWithSuffix(
                          selectedOne?.plotArea || selectedOne?.sba,
                          false
                        )}{" "}
                        sq.ft
                      </p>
                    </div>
                  </div>

                  {selectedOne?.propType !== "32" && (
                    <div className="flex items-center gap-3 sm:gap-4 bg-[#F8FBFF] p-2 sm:p-3 rounded-lg">
                      <div className="bg-[#ECF7FF] p-1.5 sm:p-2 rounded-lg">
                        {propertyDetailsSvgs.superBuildUparea}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-[#4D6677] font-medium">
                          Carpet Area
                        </p>
                        <p className="text-sm sm:text-base text-[#303A42] font-semibold">
                          {formatNumberWithSuffix(selectedOne?.ca || 0, false)}{" "}
                          sq.ft
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 sm:gap-4 bg-[#F8FBFF] p-2 sm:p-3 rounded-lg">
                    <div className="bg-[#ECF7FF] p-1.5 sm:p-2 rounded-lg">
                      {propertyDetailsSvgs.superBuildUparea}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-[#4D6677] font-medium">
                        Price Range
                      </p>
                      <p className="text-sm sm:text-base text-[#303A42] font-semibold">
                        {isData.priceRange}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="w-full mt-4 sm:mt-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0073C6] text-white rounded-lg hover:bg-[#005a9e] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              onClick={() =>
                open({
                  modal_type: "REQ_QUOTE",
                  postedByName: builderData?.data?.userName ?? "",
                  projUnitIdEnc: selectedOne?.projUnitIdEnc,
                  postedId: data.builderId,
                  reqId: data.projIdEnc,
                  source: "projBanner",
                  title: data.projectName,
                })
              }
            >
              <BiMessage className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Request Quotation</span>
            </button>
          </div>
        </div>

        {/* Carousel Navigation */}
        {isData.others.length > 1 && (
          <div className="flex justify-center gap-2 sm:gap-3 py-3 sm:py-4 bg-white border-t">
            {isData.others.map((item: any, index: number) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                  active === index
                    ? "bg-[#0073C6]"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
