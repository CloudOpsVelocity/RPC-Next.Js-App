import Image from 'next/image';
import React from 'react';
import { 
  BiSolidBuildings, 
  BiSolidMapPin, 
  BiSolidUser 
} from 'react-icons/bi';

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
  postedByName: string;
  phases: PhaseData[];
  coverUrl: string;
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
  const { projName, city, state, locality, phases, postedByName, coverUrl } = data; 
  return (
    <div className="bg-white text-xs rounded-lg overflow-hidden">
      <div className="space-y-1 p-2">
        <Image
          src={coverUrl} 
          alt="listing cover Image"
          quality={80}
          height={630}
          width={1200}
          className='rounded-[4px] w-full mb-[4px] xl:mb-[10px] md:mb-0 border-[0.5px] border-gray border-solid rounded-l-0 h-[100px] xl:h-[160px] ' 
        />
        {/* Header */}
        <div className="border-b border-gray-200 pb-1">
          <h3 className="font-semibold text-gray-900 flex items-center gap-1 text-sm">
            <BiSolidBuildings size={16} className="text-blue-600" />
            {projName}
          </h3>
          <div className="flex items-center gap-1 text-gray-700 mt-0.5"> 
            <BiSolidMapPin size={14} className="text-emerald-600" />
            <p className="text-[12px] font-medium">
              {locality}, {city}
            </p> 
          </div>
          <div className="flex items-center gap-1 text-gray-700 mt-0.5">
            <BiSolidUser size={14} className="text-purple-600" />
            <p className="text-[12px] font-medium">
              Builder: <span className="text-gray-500 ml-0.5">{postedByName}</span>
            </p>
          </div>
          <button onClick={()=>console.log("opened")}>open</button>
        </div>

        {/* Phases */}
        <div className="space-y-1 mt-1">
          {phases.map((phase) => (
            <div key={phase.phaseName} className="bg-gray-100 rounded px-1 py-0.5">
              {phase.phaseName && <p className="font-semibold text-gray-800 text-xs mb-1">{`Phase: ${phase.phaseName}`}</p>}
              <div className="grid gap-1">
                {phase.propertyTypes.map((property, index) => (
                  <div key={property.propType + index} className="flex justify-between items-center text-xs bg-white p-1 rounded border border-gray-200">
                    <span className="text-gray-800 font-medium">{property.propType}</span>
                    <span className="text-emerald-700 font-semibold">
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
