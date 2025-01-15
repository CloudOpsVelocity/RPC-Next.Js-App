import { Dispatch, SetStateAction } from "react";
import { propertyDetailsSvgs } from "@/app/images/commonSvgs";
import { Main } from "@/app/validations/property";
import { selectedFloorAtom } from "@/app/store/floor";
import { useAtomValue } from "jotai";
import { listingProps, projectprops } from "@/app/data/projectDetails";
import SharePopup from "../../atoms/SharePopup";
import { imageUrlParser } from "@/app/utils/image";
import useDownload from "@/app/hooks/property/useDownload";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import ZoomInOut from "../../project/actions/ZoomInOut";
import { ImgNotAvail } from "@/app/data/project";
import { formatNumberWithSuffix } from "@/app/utils/numbers";
import Image from "next/image";

interface FloorPlanModalProps {
  data: Main;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

function FloorPlanModal({ data, opened, setOpened }: FloorPlanModalProps) {
  const type =
    listingProps[data.propTypeName.trim() as keyof typeof listingProps];
  const { handleDownload } = useDownload("floorPlan");
  const floorData = useAtomValue(selectedFloorAtom);

  if (!opened) return null;

  return (
    <div className="fixed inset-0 z-[11] flex items-center justify-center bg-black/90">
      <div className="relative w-full h-full md:h-[95vh] md:w-[95vw] max-w-[1800px] bg-white rounded-none md:rounded-2xl overflow-hidden transform animate-modal-enter">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">Floor Plan</h2>
            <div className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
              {floorData.bhkName || data.propTypeName}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {data?.projMedia?.floorPlanUrl && (
              <>
                <button
                  onClick={() => handleDownload(data.projMedia.floorPlanUrl)}
                  className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM4 20V15H6V18H18V15H20V20H4Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="font-medium">Download</span>
                </button>
                <SharePopup
                  title="Share"
                  titleText="Share Floor Plan"
                  url={imageUrlParser(
                    data.projMedia.floorPlanUrl.split(",")[3],
                    "F"
                  )}
                  className="text-blue-600 font-medium"
                />
              </>
            )}
            <button
              onClick={() => setOpened(false)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex h-[calc(100%-8rem)] overflow-hidden">
          {/* Left: Floor Plan Image */}
          <div className="flex-1 p-6 bg-gray-50">
            <div className="h-full relative bg-white rounded-xl overflow-hidden border border-gray-100">
              <TransformWrapper>
                <TransformComponent>
                  <Image
                    src={floorData.floorPlanUrl ?? ImgNotAvail}
                    alt="Floor Plan"
                    width={1200}
                    height={800}
                    className="object-contain w-full h-full"
                  />
                </TransformComponent>
                {floorData.floorPlanUrl && (
                  <ZoomInOut className="bottom-6 right-6" />
                )}
              </TransformWrapper>
            </div>
          </div>

          {/* Right: Details Panel */}
          <div className="w-96 border-l border-gray-100 bg-white overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Unit Details */}
              <div className="space-y-4">
                {type !== projectprops.plot && (
                  <DetailCard
                    icon={propertyDetailsSvgs.unitType}
                    title="Unit Information"
                    items={[
                      { label: "Unit Type", value: floorData.bhkName },
                      { label: "Unit Number", value: floorData.unitNumber },
                      floorData.towerName && {
                        label: "Tower",
                        value: floorData.towerName,
                      },
                      floorData.block && {
                        label: "Block",
                        value: floorData.block,
                      },
                    ].filter(Boolean)}
                  />
                )}

                {/* Area Details */}
                <DetailCard
                  icon={propertyDetailsSvgs.superBuildUparea}
                  title="Area Details"
                  items={[
                    type !== projectprops.plot && {
                      label: "Super Builtup Area",
                      value: `${formatNumberWithSuffix(
                        floorData.superBuildUparea,
                        false
                      )} sq.ft`,
                    },
                    type !== projectprops.plot && {
                      label: "Carpet Area",
                      value: `${formatNumberWithSuffix(
                        floorData.caretarea,
                        false
                      )} sq.ft`,
                    },
                    floorData.plotArea && {
                      label: "Plot Area",
                      value: `${formatNumberWithSuffix(
                        floorData.plotArea,
                        false
                      )} sq.ft`,
                    },
                    floorData.gardenArea && {
                      label: "Garden Area",
                      value: `${formatNumberWithSuffix(
                        floorData.gardenArea,
                        false
                      )} sq.ft`,
                    },
                    floorData.terraceArea && {
                      label: "Terrace Area",
                      value: `${formatNumberWithSuffix(
                        floorData.terraceArea,
                        false
                      )} sq.ft`,
                    },
                  ].filter(Boolean)}
                />

                {/* Parking Details */}
                {type !== projectprops.plot &&
                  (floorData.noocp ||
                    floorData.noccp ||
                    floorData.nocbp ||
                    floorData.noobp) && (
                    <DetailCard
                      icon={propertyDetailsSvgs.noOfCarParking}
                      title="Parking Details"
                      items={[
                        floorData.noocp && {
                          label: "Open Car Parking",
                          value: floorData.noocp,
                        },
                        floorData.noccp && {
                          label: "Closed Car Parking",
                          value: floorData.noccp,
                        },
                        floorData.nocbp && {
                          label: "Closed Bike Parking",
                          value: floorData.nocbp,
                        },
                        floorData.noobp && {
                          label: "Open Bike Parking",
                          value: floorData.noobp,
                        },
                      ].filter(Boolean)}
                    />
                  )}

                {/* Other Details */}
                <DetailCard
                  icon={propertyDetailsSvgs.facingName}
                  title="Other Details"
                  items={[
                    { label: "Facing", value: floorData.facingName },
                    floorData.totalNumberOfBalcony > 0 && {
                      label: "Balconies",
                      value: floorData.totalNumberOfBalcony.toString(),
                    },
                    {
                      label: "Bathrooms",
                      value: floorData.totalNumberofBathroom.toString(),
                    },
                  ].filter(Boolean)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DetailCardProps {
  icon: JSX.Element;
  title: string;
  items: Array<{ label: string; value: string | number }>;
}

const DetailCard = ({ icon, title, items }: DetailCardProps) => {
  if (items.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-500">{item.label}</span>
            <span className="font-medium text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloorPlanModal;
