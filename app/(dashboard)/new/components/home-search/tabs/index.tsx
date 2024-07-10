import React, { useState } from "react";

type Props = {};

export default function Tabs({}: Props) {
  const [activeTab, setActiveTab] = useState("buy");
  return (
    <div className="p-4">
      <div className="flex space-x-4">
        <button
          onClick={() => setActiveTab("buy")}
          className={`px-4 py-2 rounded ${
            activeTab === "buy" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setActiveTab("rent")}
          className={`px-4 py-2 rounded ${
            activeTab === "rent" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Rent
        </button>
      </div>
    </div>
  );
}
