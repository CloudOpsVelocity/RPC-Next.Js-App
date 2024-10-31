import { amenitiesGroupList } from '@/app/images/commonSvgs';
import { AmenityList } from '@/app/validations/types/project';
import { useState } from 'react';

interface Amenity {
  cid: number;
  constDesc: string;
  icon: string;
}

interface AmenitiesSubCategory {
  [key: string]: Amenity[];
}

interface AmenitiesCategory {
  [key: string]: AmenitiesSubCategory;
}

interface AmenitiesDisplayProps {
  amenitiesData: AmenitiesCategory;
  data: AmenityList[];
}

const AmenitiesDisplay = ({ amenitiesData, data }: AmenitiesDisplayProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(Object.keys(amenitiesData)[0]);
  const categories = Object.keys(amenitiesData);

  // Function to filter subcategories based on available amenities
  const getAvailableSubCategories = (category: string) => {
    return Object.keys(amenitiesData[category]).filter((subCategory) => {
      return amenitiesData[category][subCategory].some((amenity: Amenity) =>
        data.some((item) => item.id === amenity.cid)
      );
    });
  };

  const availableCategories = categories.filter((category) => getAvailableSubCategories(category).length > 0);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar Categories */}
      <div className="w-full md:min-w-[300px] md:max-w-[300px] max-h-[200px] md:max-h-[500px] overflow-y-auto scrollUnique mb-4 md:mb-0">
        {availableCategories.map((category: string) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`flex w-full items-center gap-[9px] text-left p-2 md:p-3 rounded-md transition duration-200 ${
              selectedCategory === category ? 'bg-green-100 text-green-700 font-semibold' : 'bg-gray-100'
            } hover:bg-green-50`}
          >
            <div className="w-1 h-[27px] bg-[#B6CEAF]" />
            <span className="text-sm md:text-base">{category}</span>
          </button>
        ))}
      </div>

      {/* Main Display */}
      <div className="flex bg-[#fff] md:ml-[17px] flex-col px-4 md:px-[43px] pt-3.5 pb-0 rounded-lg border-[0.5px] border-solid border-[#92B2C8] max-h-[400px] md:max-h-[500px] overflow-y-auto w-full">
        {getAvailableSubCategories(selectedCategory).map((subCategory: string, index: number) => {
          const amenitiesInSubCategory = amenitiesData[selectedCategory][subCategory].filter((amenity: Amenity) =>
            data.some((item) => item.id === amenity.cid)
          );

          return (
            <ul key={subCategory} className={`py-3 ${index !== getAvailableSubCategories(selectedCategory).length - 1 ? 'border-b border-[#92B2C8]' : ''}`}>
              <li className="text-[#4D6677] text-lg md:text-xl font-semibold list-disc ml-3 mb-2">{subCategory}</li>
              <div className="flex flex-wrap gap-2">
                {amenitiesInSubCategory.map((amenity: Amenity) => (
                  <div
                    key={amenity.cid}
                    className="p-2 border rounded-md bg-white shadow-sm flex items-center space-x-2 text-sm md:text-base w-full md:w-auto"
                  >
                    <span className="w-6 h-6 md:w-auto md:h-auto">{amenitiesGroupList.get(amenity.cid) || amenitiesGroupList.get(0)}</span>
                    <span className="text-[#242424] text-base md:text-xl font-medium">{amenity.constDesc}</span>
                  </div>
                ))}
              </div>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default AmenitiesDisplay;
