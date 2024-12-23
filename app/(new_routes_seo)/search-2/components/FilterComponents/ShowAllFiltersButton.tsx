import { SEARCH_FILTER_DATA } from '@/app/data/search';
import React, { useState } from 'react';
import { MdTune, MdKeyboardArrowDown, MdApartment, MdHouse, MdVilla, MdMapsHomeWork, MdLandscape, MdExpandMore, MdExpandLess } from 'react-icons/md';


interface ShowAllFiltersButtonProps {
  selectedFilters: { [key: string]: string[] };
  toggleFilter: (category: string, value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function ShowAllFiltersButton({ selectedFilters, toggleFilter, isOpen, onToggle }: ShowAllFiltersButtonProps) {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const propertyIcons = {
    Apartment: <MdApartment className="w-5 h-5 text-green-700" />,
    "Row House": <MdHouse className="w-5 h-5 text-green-700" />,
    Villa: <MdVilla className="w-5 h-5 text-green-700" />,
    Villament: <MdMapsHomeWork className="w-5 h-5 text-green-700" />,
    Plot: <MdLandscape className="w-5 h-5 text-green-700" />,
  };

  const toggleExpand = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const renderFilterSection = (title: string, data: any[], category: string, initialDisplay: number = 5) => {
    const isExpanded = expandedSections[category] || false;
    const displayData = isExpanded ? data : data.slice(0, initialDisplay);

    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <div className="space-y-2">
          {displayData.map((item: any, index: number) => (
            <label key={item.cid || index} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={selectedFilters[category]?.includes(item.Label || item.title || item.constDesc)}
                onChange={() => toggleFilter(category, item.Label || item.title || item.constDesc)}
              />
              {category === 'propertyType' && propertyIcons[item as keyof typeof propertyIcons]}
              <span>{item.Label || item.title || item.constDesc}</span>
            </label>
          ))}
        </div>
        {data.length > initialDisplay && (
          <button
            onClick={() => toggleExpand(category)}
            className="mt-2 text-blue-600 hover:text-blue-800 flex items-center"
          >
            {isExpanded ? (
              <>
                <MdExpandLess className="mr-1" />
                Show less
              </>
            ) : (
              <>
                <MdExpandMore className="mr-1" />
                Show more
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="relative">
      
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-full hover:bg-gray-50"
      >
        <MdTune className="w-5 h-5" />
        More Filters
        <MdKeyboardArrowDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-[600px] bg-white rounded-lg shadow-lg border z-50">
        <div className="flex items-center justify-between gap-4 pb-4 border-b">
            <button
             onClick={onToggle}
              className="flex-1 text-gray-600 border-gray-300 hover:bg-gray-100"
            >
              Clear Filter
            </button>
            <button
               onClick={onToggle}
              className="flex-1 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300"
            >
              Apply Filter
            </button>
          </div>
          <div className="p-6 flex items-start  flex-wrap justify-between   max-h-[60vh] overflow-y-auto">
            {renderFilterSection('Project Status', SEARCH_FILTER_DATA.projectstatus, 'status')}
            {renderFilterSection('Property Type', Object.keys(propertyIcons), 'propertyType')}
            {renderFilterSection('BHK Type', SEARCH_FILTER_DATA.bhkDetails, 'bhk', 6)}
            {renderFilterSection('Amenities', SEARCH_FILTER_DATA.amenities, 'amenities', 8)}
            {renderFilterSection('RERA Status', SEARCH_FILTER_DATA.rerastatus, 'rera')}
          </div>
          
        </div>
      )}
    </div>
  );
}

