import { SEARCH_FILTER_DATA } from '@/app/data/search';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface BHKTypeDropdownProps {
  selectedFilters: { [key: string]: string[] };
  toggleFilter: (category: string, value: string) => void;
  handleClear: (category: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function BHKTypeDropdown({
  selectedFilters,
  toggleFilter,
  handleClear,
  isOpen,
  onToggle,
}: BHKTypeDropdownProps) {
  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-4 py-2 border-2 border-[#148B16] text-[#148B16] rounded-full hover:bg-[#148B16]/5"
        onClick={onToggle}
      >
        BHK Type
        <MdKeyboardArrowDown className="w-5 h-5" />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-[300px] md:w-[600px] bg-white rounded-lg shadow-lg border p-2 z-50">
          <div className="flex items-center justify-between gap-4 pb-4 border-b">
            <button
              onClick={() => handleClear("bhk")}
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
          <div className="w-full flex flex-wrap gap-2 mt-2">
            {SEARCH_FILTER_DATA.bhkDetails.map((bhk) => (
              <label
                key={bhk.value}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#148B16] focus:ring-[#148B16]"
                  checked={selectedFilters["bhk"]?.includes(bhk.title) || false}
                  onChange={() => toggleFilter("bhk", bhk.title)}
                />
                <span>{bhk.title}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
