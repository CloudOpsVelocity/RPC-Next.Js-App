import { MdKeyboardArrowDown, MdApartment, MdHouse, MdVilla, MdMapsHomeWork, MdLandscape } from 'react-icons/md';

interface PropertyTypeDropdownProps {
  selectedFilters: { [key: string]: string[] };
  toggleFilter: (category: string, value: string) => void;
  handleClear: (category: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function PropertyTypeDropdown({ selectedFilters, toggleFilter, handleClear, isOpen, onToggle }: PropertyTypeDropdownProps) {
  const propertyIcons = {
    Apartment: <MdApartment className="w-5 h-5 text-green-700" />,
    "Row House": <MdHouse className="w-5 h-5 text-green-700" />,
    Villa: <MdVilla className="w-5 h-5 text-green-700" />,
    Villament: <MdMapsHomeWork className="w-5 h-5 text-green-700" />,
    Plot: <MdLandscape className="w-5 h-5 text-green-700" />,
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-4 py-2 border-2 border-[#0073C6] text-[#0073C6] rounded-full hover:bg-[#0073C6]/5"
        onClick={onToggle}
      >
        Property Type
        <MdKeyboardArrowDown className="w-5 h-5" />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border p-2 z-50">
          <div className="flex items-center justify-between gap-4 pb-4 border-b">
            <button
              onClick={() => handleClear("propertyType")}
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
          <div className="space-y-2">
            {Object.entries(propertyIcons).map(([type, icon]) => (
              <label
                key={type}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="radio"
                  className="rounded-full border-gray-300 text-green-700 checked:bg-green-700 checked:border-green-700"
                  checked={selectedFilters["propertyType"]?.includes(type) || false}
                  onChange={() => toggleFilter("propertyType", type)}
                />
                {icon}
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

