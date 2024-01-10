import React from "react";

export default function Success() {
  return (
    <div className="flex  w-full flex-col items-center justify-center  p-4">
      <div className="w-full max-w-xs rounded-lg bg-white p-8 text-center ">
        <h1 className="mt-4 text-2xl font-bold text-green-500">
          Congratulations!
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Your account for agent has been created successfully
        </p>
        <p className="mt-8 text-xs text-gray-500">
          You will be redirected to homepage in 5 sec
        </p>
      </div>
    </div>
  );
}
