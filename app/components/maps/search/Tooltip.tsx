import React from 'react';
import { BsBuilding, BsGeoAlt, BsPerson } from 'react-icons/bs';

type PropertyType = {
  propType: string;
  minPrice: number | string;
  maxPrice: number | string;
};

type PhaseData = {
  phaseName: string;
  propertyTypes: PropertyType[];
};

type TooltipProjProps = {
  projName: string;
  city: string;
  state: string;
  locality: string;
  builderName: string;
  phases: PhaseData[];
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(amount);
}

export default function TooltipProj({ data }: { data: TooltipProjProps }) {
  const { projName, city, state, locality, builderName, phases } = data;

  return (
    <div className="bg-white  shadow-lg  text-xs">
      <div className="space-y-1">
        {/* Header */}
        <div className="border-b pb-2">
          <h3 className="font-bold text-gray-800 flex items-center gap-1 text-sm"> {/* Increased font size */}
            <BsBuilding size={16} className="text-blue-600" /> {/* Increased icon size */}
            {projName}
          </h3>
          <div className="flex items-center gap-1 text-gray-700 mt-1"> {/* Darker color */}
            <BsGeoAlt size={14} /> {/* Increased icon size */}
            <p className="text-[11px]">{locality}, {city}, {state}</p> {/* Increased font size */}
          </div>
          <div className="flex items-center gap-1 text-gray-700 mt-1"> {/* Darker color */}
            <BsPerson size={14} /> {/* Increased icon size */}
            <p className="text-[11px]">{builderName}</p> {/* Increased font size */}
          </div>
        </div>

        {/* Phases */}
        <div className="space-y-1.5">
          {phases.map((phase) => (
            <div key={phase.phaseName} className="bg-gray-50 rounded p-1.5">
              <p className="font-semibold text-gray-800 mb-1 text-sm">{phase.phaseName}</p> {/* Darker and slightly larger */}
              <div className="grid gap-1">
                {phase.propertyTypes.map((property, index) => (
                  <div key={property.propType + index} className="flex justify-between items-center text-sm"> {/* Increased font size */}
                    <span className="text-gray-700">{property.propType}</span> {/* Darker color */}
                    <span className="text-emerald-600 font-medium">
                      {formatCurrency(Number(property.minPrice) || 0)} - {formatCurrency(Number(property.maxPrice) || 0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
