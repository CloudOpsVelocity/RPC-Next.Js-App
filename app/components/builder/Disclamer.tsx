import React from "react";
import DisClamerReadMore from "./DisClamerReadMore";

type Props = {
  refUrls: string[];
};

export default function Disclamer({ refUrls }: Props) {
  return (
    <div className="bg-gray-100 p-6 mt-12 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#0073C6] mb-1">Disclaimer</h2>
      <p className="text-sm text-gray-700 mb-1">
        The material and information contained herein are for general
        informational purposes only and do not constitute an
        endorsement/warranty/representation/offer.
      </p>
      <h3 className="text-lg font-semibold text-[#0073C6] mb-1">
        Sources of Information:
      </h3>
      <DisClamerReadMore />
      <div className="flex  space-x-1 flex-wrap">
        {refUrls.map((url: string) => {
          return (
            <div
              key={url}
              className="text-sm  hover:text-blue-800 transition duration-200"
            >
              {url} ,
            </div>
          );
        })}
      </div>
      <p className="text-xs text-gray-500 mt-1">
        A Get Right Property website
        <br />
        Copyright © 2024 RPCLAN PROPERTY SERVICES PRIVATE LIMITED All rights
        reserved.
      </p>
    </div>
  );
}
