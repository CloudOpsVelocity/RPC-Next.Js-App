import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

type Props = {
  userId: number;
  userName: string;
  companyName: string;
  cityName: string; // This might be a string of cities separated by commas
  builderLogo: string;
  builderDescription: string;
  newProject: number;
  onGoingProject: number;
  completedProject: number;
  isTab: boolean;
  isMobile: boolean;
};

export default function BuilderDetailsCard({
  userId,
  companyName,
  cityName,
  builderLogo,
  builderDescription,
  newProject,
  onGoingProject,
  completedProject,
  userName,
  isTab,
  isMobile,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState<{
    type: "description" | "cities" | null;
    action: boolean;
  }>({
    type: null,
    action: false,
  });

  const modalRef = useRef<HTMLDivElement | null>(null);

  // Toggles the modal visibility
  const toggleModal = (type: "description" | "cities" | null) =>
    setIsModalOpen((prevState) => ({
      type,
      action: !prevState.action,
    }));

  // Close modal when clicking outside of it
  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen({ type: null, action: false });
    }
  };

  useEffect(() => {
    if (isModalOpen.action) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen.action]);

  return (
    <div
      key={userId}
      className="bg-white rounded-xl shadow-lg overflow-hidden relative hover:shadow border border-blue-200 hover:border-blue-500"
    >
      <div className="px-2 pb-4 sm:pb-4 sm:px-5  pt-0 sm:pt-4">
        {/* Logo and Name */}
        <div className="flex flex-row md:flex-row items-center mb-0">
          <div className="w-20 h-20 md:w-24 md:h-24 mb-0 md:mb-0 md:mr-4 flex items-center justify-center">
            <Image
              width={200}
              height={200}
              quality={100}
              src={builderLogo}
              alt={`${companyName} logo`}
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />
          </div>
          <h2 className="text-base ml-2 sm:ml-0 sm:text-2xl font-extrabold text-blue-900 text-left">
            {userName}
          </h2>
        </div>

        {/* Information Section */}
        <div className="space-y-1 md:space-y-3">
          <p className="text-sm md:text-base text-black">
            <span className="font-semibold text-[#0073C6]">Operating in:</span>{" "}
            {cityName.substring(0, isMobile ? 53 : isTab ? 120 : 80)}
            {cityName.length > 80 && (
              <>
                ...
                <button
                  onClick={() => toggleModal("cities")}
                  className="text-[#0073C6] font-semibold ml-2"
                >
                  Read more
                </button>
              </>
            )}
          </p>
          <p className="text-sm md:text-base text-black">
            <span className="font-semibold text-[#0073C6]">Company Name:</span>{" "}
            {companyName}
          </p>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            {builderDescription.substring(
              0,
              isMobile ? 110 : isTab ? 180 : 150
            )}
            {builderDescription.length > 150 && (
              <>
                ...
                <button
                  onClick={() => toggleModal("description")}
                  className="text-[#0073C6] font-semibold ml-2"
                >
                  Read more
                </button>
              </>
            )}
          </p>
        </div>

        {/* "Projects by Builder" Section */}
        <div className="flex py-2 px-2 sm:px-4 bg-blue-50 rounded-lg shadow-sm border border-gray-200 mt-2 flex-wrap">
          {/* Projects Summary Title */}
          <div className="mt-0 text-sm sm:text-base font-semibold text-blue-900 text-nowrap mr-2">
            Projects Summary:{" "}
          </div>
          {/* Project Information */}
          <div className="flex sm:justify-between items-center gap-x-2 flex-wrap">
            <div className="text-center text-sm sm:text-base">
              <span className="font-semibold text-[#0073C6]"> New:</span>
              <span className="text-gray-700 font-medium ml-1">
                {newProject},
              </span>
            </div>
            <div className="text-center text-sm sm:text-base">
              <span className="font-semibold text-[#0073C6]"> Ongoing:</span>
              <span className="text-gray-700 font-medium ml-1">
                {onGoingProject},
              </span>
            </div>
            <div className="text-center text-sm sm:text-base">
              <span className="font-semibold text-[#0073C6]"> Completed:</span>
              <span className="text-gray-700 font-medium ml-1">
                {completedProject}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-2 sm:mt-4">
          <button className="w-full sm:w-auto bg-gradient-to-r from-[#0073C6] to-[#0073C6] text-white font-semibold text-sm md:text-base px-4 py-1.5 rounded-lg hover:bg-[#0073C6] transition duration-300 shadow-md">
            See Projects
          </button>
          <button className="w-full sm:w-auto bg-white text-[#0073C6] font-semibold text-sm md:text-base px-4 py-1.5 rounded-lg hover:bg-blue-50 transition duration-300 border-2 border-[#0073C6] shadow-md">
            Explore Builder
          </button>
        </div>
      </div>

      {/* Modal/Overlay Component */}
      {isModalOpen.action && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg relative w-[90%] max-h-[90%] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => toggleModal(null)}
              className="absolute top-5 right-2 bg-red-500 text-white rounded-full w-[30px] h-[30px] hover:bg-red-600 transition"
            >
              ✕
            </button>

            {/* Modal Content Based on Type */}
            {isModalOpen.type === "description" ? (
              <>
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  {companyName} - Full Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {builderDescription}
                </p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  Operating in Cities
                </h3>
                <p className="text-gray-700 leading-relaxed">{cityName}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
