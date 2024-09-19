import { useAtomValue } from "jotai";
import React from "react";
import { overlayAtom } from "../../../store/overlay";
import { FaRupeeSign } from "react-icons/fa"; // Optional: Use this icon to represent currency

const OtherCharges: React.FC = () => {
  const { content } = useAtomValue(overlayAtom);

  if (!content || content.length === 0) {
    return <div>No charges available</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left text-gray-700 font-semibold">
              Charge Type
            </th>
            <th className="px-4 py-2 text-right text-gray-700 font-semibold">
              Amount (₹)
            </th>
          </tr>
        </thead>
        <tbody>
          {content.data.map((charge: any, index: number) => (
            <tr
              key={index}
              className={`border-t ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="px-4 py-2 text-gray-700">{charge.label}</td>
              <td className="px-4 py-2 text-right text-gray-900 font-medium flex items-center justify-end">
                <FaRupeeSign className="mr-1 text-green-600" />
                {charge.value}
              </td>
            </tr>
          ))}
          {/* Example: Total Row */}
          <tr className="bg-gray-100 font-semibold">
            <td className="px-4 py-2">Total</td>
            <td className="px-4 py-2 text-right flex items-center justify-end">
              <FaRupeeSign className="mr-1 text-green-600" />
              {/* Replace this with actual total value if available */}
              {content.total}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OtherCharges;
