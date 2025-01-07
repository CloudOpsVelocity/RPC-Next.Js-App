import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center z-50">
      <div className="text-center flex items-center justify-center flex-col ">
        <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] xl:w-[64px] xl:h-[64px] border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4" />
        <h2 className="text-[20px] md:text-[24px] xl:text-[26px] font-semibold text-gray-700 mt-[10px] ">Loading...</h2>
        <p className="text-gray-500 mt-2">
          Please wait while we prepare your content.
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
