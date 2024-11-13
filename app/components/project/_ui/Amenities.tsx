'use client'

import { useState } from 'react'
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5'
import { amenitiesGroupList } from '@/app/images/commonSvgs'
import { AmenityList } from '@/app/validations/types/project'

interface Amenity {
  cid: number
  constDesc: string
  icon: string
}

interface AmenitiesSubCategory {
  [key: string]: Amenity[]
}

interface AmenitiesCategory {
  [key: string]: AmenitiesSubCategory
}

interface AmenitiesDisplayProps {
  amenitiesData: AmenitiesCategory
  data: AmenityList[]
}

export default function AmenitiesDisplay({ amenitiesData, data }: AmenitiesDisplayProps) {
  const categories = Object.keys(amenitiesData)

  const getAvailableSubCategories = (category: string) => {
    return Object.keys(amenitiesData[category]).filter((subCategory) => {
      return amenitiesData[category][subCategory].some((amenity: Amenity) =>
        data.some((item) => item.id === amenity.cid)
      )
    })
  }

  const availableCategories = categories.filter((category) => getAvailableSubCategories(category).length > 0)
  const [selectedCategory, setSelectedCategory] = useState<string>(availableCategories[0])
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const toggleCategory = (category: string) => {
    setExpandedCategory((prev) => (prev === category ? null : category))
  }

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 p-4 rounded-lg shadow-md w-full">
      {/* Sidebar Categories - Desktop */}
      <div className="hidden md:block w-full md:min-w-[250px] md:max-w-[250px] md:max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 mb-4 md:mb-0 md:mr-4">
        {availableCategories.map((category: string) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`flex w-full items-center gap-[9px] text-left p-3 rounded-md transition duration-200 mb-2 ${
              selectedCategory === category
                ? 'bg-green-100 text-green-700 font-semibold shadow-sm'
                : 'bg-white hover:bg-green-50'
            }`}
          >
            <div className="w-1 h-[27px] bg-green-500 rounded-full" />
            <span className="text-base">{category}</span>
          </button>
        ))}
      </div>

      {/* Expandable Categories - Mobile */}
      <div className="md:hidden space-y-2 w-full">
        {availableCategories.map((category: string) => (
          <div key={category} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => toggleCategory(category)}
              className="flex w-full items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 transition duration-200"
            >
              <span className="text-sm font-medium text-gray-800">{category}</span>
              {expandedCategory === category ? (
                <IoChevronUpOutline className="h-5 w-5 text-gray-600" />
              ) : (
                <IoChevronDownOutline className="h-5 w-5 text-gray-600" />
              )}
            </button>
            {expandedCategory === category && (
              <div className="max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {getAvailableSubCategories(category).map((subCategory: string, index: number) => {
                  const amenitiesInSubCategory = amenitiesData[category][subCategory].filter((amenity: Amenity) =>
                    data.some((item) => item.id === amenity.cid)
                  )

                  return (
                    <div
                      key={subCategory}
                      className={`p-4 ${
                        index !== getAvailableSubCategories(category).length - 1 ? 'border-b border-gray-200' : ''
                      }`}
                    >
                      <h3 className="text-gray-700 text-lg font-semibold mb-2">{subCategory}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {amenitiesInSubCategory.map((amenity: Amenity) => (
                          <div
                            key={amenity.cid}
                            className="p-2 border border-gray-200 rounded-md bg-gray-50 flex items-center space-x-2 text-sm"
                          >
                            <span className="w-6 h-6 flex-shrink-0">
                              {amenitiesGroupList.get(amenity.cid) || amenitiesGroupList.get(0)}
                            </span>
                            <span className="text-gray-800 text-sm font-medium truncate">{amenity.constDesc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Display - Desktop */}
      <div className="hidden md:block bg-white flex-grow rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {getAvailableSubCategories(selectedCategory).map((subCategory: string, index: number) => {
            const amenitiesInSubCategory = amenitiesData[selectedCategory][subCategory].filter((amenity: Amenity) =>
              data.some((item) => item.id === amenity.cid)
            )

            return (
              <div
                key={subCategory}
                className={`p-6 ${index !== getAvailableSubCategories(selectedCategory).length - 1 ? 'border-b border-gray-200' : ''}`}
              >
                <h2 className="text-gray-800 text-xl font-semibold mb-4">{subCategory}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {amenitiesInSubCategory.map((amenity: Amenity) => (
                    <div
                      key={amenity.cid}
                      className="p-3 border border-gray-200 rounded-md bg-gray-50 flex items-center space-x-3 text-base hover:bg-gray-100 transition duration-200"
                    >
                      <span className="w-8 h-8 flex-shrink-0">
                        {amenitiesGroupList.get(amenity.cid) || amenitiesGroupList.get(0)}
                      </span>
                      <span className="text-gray-800 font-medium truncate">{amenity.constDesc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
