import {
  FaArrowRight,
  FaBath,
  FaBed,
  FaBuilding,
  FaCompass,
} from "react-icons/fa";
import { BiBuildingHouse } from "react-icons/bi";
import { MdBalcony } from "react-icons/md";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { projectprops } from "@/app/data/projectDetails";
import { PropertyUnit } from "../types/floor-plan";

type Props = {
  units: any;
  isLoading: boolean;
  onSelectCard: any;
  handleReqcallBack: (unit: PropertyUnit) => void;
};

export default function FloorplanLeftsection({
  units,
  isLoading,
  onSelectCard,
  handleReqcallBack,
}: Props) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: units?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300, // Adjust based on your card's average height
    overscan: 5,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const dataList = rowVirtualizer.getVirtualItems();

  return (
    <div
      ref={parentRef}
      className="space-y-3 w-full md:w-[50%] sm:space-y-4 max-h-[350px] sm:max-h-[500px] md:max-h-[600px] overflow-y-auto px-0 md:px-2 sm:px-4"
    >
      {dataList && dataList.length > 0 ? (
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {dataList.map((virtualRow) => {
            const unit = units[virtualRow.index];
            return (
              <div
                key={virtualRow.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <button
                  onClick={() => onSelectCard(unit)}
                  className="w-full rounded-lg sm:rounded-xl border border-gray-200 sm:border-2 p-2 sm:p-4 transition-all hover:border-[#0073C6] hover:shadow-xl group from-[#F8FAFC] to-white"
                >
                  {/* Header Section */}
                  <div className="flex flex-col items-start justify-between border-b border-gray-100 pb-2 sm:pb-4">
                    <div className=" flex justify-between items-start w-full  ">
                      <div className="flex flex-wrap items-center gap-1 md:gap-2 mb-2">
                        <h3 className="text-[18px] md:text-[20px] xl:text-[24px] font-bold text-[#232323]">
                          {unit.propType === projectprops.plot
                            ? `${unit.length}ftx${unit.width} ft`
                            : unit.bhkName}
                        </h3>
                        {unit.aptTypeName && unit.aptTypeName !== "" && (
                          <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold bg-blue-50 text-[#0073C6] rounded-full">
                            {unit.aptTypeName}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap justify-between w-full sm:w-auto gap-4 md:mt-2 sm:mt-0">
                        {unit.superBuildUparea !== null && (
                          <div className="space-y-1">
                            <p className="text-gray-500 text-xs sm:text-sm font-medium">
                              {unit.propType === projectprops.plot
                                ? "Plot Area"
                                : "Super Built-up Area"}
                            </p>
                            <p className="text-gray-900 text-lg sm:text-xl font-bold">
                              {unit.propType === projectprops.plot
                                ? `${unit.plotArea} sq.ft`
                                : `${unit.superBuildUparea} sq.ft`}
                            </p>
                          </div>
                        )}
                        {unit.facingName !== null && (
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <FaCompass className="text-[#0073C6] text-base sm:text-lg" />
                              <p className="text-gray-500 text-xs sm:text-sm font-medium">
                                Facing
                              </p>
                            </div>
                            <p className="text-gray-900 text-lg sm:text-xl font-bold">
                              {unit.facingName}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 w-full text-gray-600 text-sm sm:text-base">
                      {unit.towerName !== null &&
                        unit.towerName !== "" &&
                        (unit.propType === projectprops.apartment ||
                          unit.propType === projectprops.villament) && (
                          <div className="flex items-center bg-gray-100 rounded-full px-2 sm:px-3 py-1">
                            <FaBuilding className="text-[#0073C6] mr-1 sm:mr-2" />
                            <p className="font-semibold">{unit.towerName}</p>
                          </div>
                        )}
                      {unit.floor !== undefined &&
                        unit.floor !== 0 &&
                        unit.propType !== projectprops.plot && (
                          <div className="flex items-center bg-gray-100 rounded-full px-2 sm:px-3 py-1">
                            <BiBuildingHouse className="text-[#0073C6] mr-1 sm:mr-2" />
                            <p className="font-semibold">Floor {unit.floor}</p>
                          </div>
                        )}
                      {unit.unitNumber !== null && (
                        <div className="flex items-center bg-gray-100 rounded-full px-2 sm:px-3 py-1">
                          <FaBed className="text-[#0073C6] mr-1 sm:mr-2" />
                          <p className="font-semibold">
                            Unit {unit.unitNumber}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="flex justify-around gap-1 bg-gray-50 rounded-lg p-2">
                    {/* {unit &&
                      unit.bhkName !== undefined &&
                      unit.bhkName !== null &&
                      unit.bhkName !== "" &&
                      unit.propType !== projectprops.plot && (
                        <div className="flex items-center gap-2">
                          <FaBed className="text-[#0073C6] text-xl sm:text-2xl" />
                          <div>
                            <p className="text-xs sm:text-sm text-gray-500 font-medium">
                              Bedrooms
                            </p>
                            <p className="text-base sm:text-lg font-bold">
                              {unit.bhkName.split(" ")[0]}
                            </p>
                          </div>
                        </div>
                      )} */}
                    {unit.totalNumberofBathroom !== null &&
                      unit.propType !== projectprops.plot && (
                        <div className="flex items-center gap-2">
                          <FaBath className="text-[#0073C6] text-xl sm:text-2xl" />
                          <div>
                            <p className="text-xs sm:text-sm text-gray-500 font-medium">
                              Bathrooms
                            </p>
                            <p className="text-base sm:text-lg font-bold">
                              {unit.totalNumberofBathroom}
                            </p>
                          </div>
                        </div>
                      )}
                    {unit.totalNumberOfBalcony !== null &&
                      unit.propType !== projectprops.plot && (
                        <div className="flex items-center gap-2">
                          <MdBalcony className="text-[#0073C6] text-xl sm:text-2xl" />
                          <div>
                            <p className="text-xs sm:text-sm text-gray-500 font-medium">
                              Balconies
                            </p>
                            <p className="text-base sm:text-lg font-bold">
                              {unit.totalNumberOfBalcony}
                            </p>
                          </div>
                        </div>
                      )}
                    {unit.caretarea !== null &&
                      unit.propType !== projectprops.plot && (
                        <div className="flex items-center gap-2">
                          <MdBalcony className="text-[#0073C6] text-xl sm:text-2xl" />
                          <div>
                            <p className="text-xs sm:text-sm text-gray-500 font-medium">
                              Carpet Area
                            </p>
                            <p className="text-base sm:text-lg font-bold">
                              {unit.caretarea} sq.ft
                            </p>
                          </div>
                        </div>
                      )}

                    {unit.terraceArea !== null &&
                      unit.terraceArea !== "null" &&
                      unit.propType !== projectprops.plot && (
                        <div className="flex items-center gap-2">
                          <BiBuildingHouse className="text-[#0073C6] text-xl sm:text-2xl" />
                          <div>
                            <p className="text-xs sm:text-sm text-gray-500 font-medium">
                              Terrace Area
                            </p>
                            <p className="text-base sm:text-lg font-bold">
                              {unit.terraceArea} sq.ft
                            </p>
                          </div>
                        </div>
                      )}
                    {unit.length && unit.propType === projectprops.plot && (
                      <div className="flex items-center gap-2">
                        <MdBalcony className="text-[#0073C6] text-xl sm:text-2xl" />
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500 font-medium">
                            Length
                          </p>
                          <p className="text-base sm:text-lg font-bold">
                            {unit.length}
                          </p>
                        </div>
                      </div>
                    )}
                    {unit.width && unit.propType === projectprops.plot && (
                      <div className="flex items-center gap-2">
                        <MdBalcony className="text-[#0073C6] text-xl sm:text-2xl" />
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500 font-medium">
                            Width
                          </p>
                          <p className="text-base sm:text-lg font-bold">
                            {unit.width}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-3 sm:mt-4 flex justify-between items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReqcallBack(unit);
                        // Add your request quotation logic here
                      }}
                      className="px-2 py-1 sm:px-3 sm:py-2 bg-[#0073C6] text-white text-xs sm:text-sm font-semibold rounded-md hover:bg-[#005a9e] transition-colors"
                    >
                      Request Quotation
                    </button>
                    <span className="inline-flex items-center text-[#0073C6] text-sm sm:text-base font-semibold group-hover:underline">
                      More
                      <FaArrowRight className="ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className=" flex justify-center items-center w-full h-[90%] bg-white rounded-xl shadow-md mt-[10px] border-solid border-t-[1px] ">
          No data Available
        </div>
      )}
    </div>
  );
}
