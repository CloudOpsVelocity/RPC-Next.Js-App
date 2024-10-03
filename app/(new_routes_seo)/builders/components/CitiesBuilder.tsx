"use client";

import { useState } from "react";
import {  FaSearch, FaFilter, FaRedoAlt } from "react-icons/fa";
import { useQuery } from "react-query";
import { getAllCititesForBuilders, getCitiesBuilder } from "../../utils/new-seo-routes/builder.client";
import { Pagination, Select } from "@mantine/core";
import RTK_CONFIG from "@/app/config/rtk";


export default function BuildersDirectory({city,id,initialData}:{city?:string,id?:string,initialData:any}) {
  const [filterCity, setFilterCity] = useState(id ?? "");
  const [sortOrder, setSortOrder] = useState(0);
  const [page,setPage] = useState(0)
  const [searchInput, setSearchInput] = useState("");  // Separate state for input
  const [searchTerm, setSearchTerm] = useState("");  
  const [showFilter, setShowFilter] = useState(false);
  const enabled = searchTerm.trim() !== "" ? true : page !== 0 || sortOrder === 1 
  // const firstRender = useIsFirstRender();
const {data,isLoading} = useQuery({
  queryFn:() =>  getCitiesBuilder({city:(filterCity),page,sort:sortOrder,query:searchTerm}),
  queryKey:[`bf+`,`city=${filterCity}+` + `sortOrder=${sortOrder}+` + `page=${page}` + searchTerm],
  initialData:initialData,
  keepPreviousData:true,
})
const {data:cities,} = useQuery({
  queryFn:getAllCititesForBuilders,
  queryKey:['builder-cities'],
  ...RTK_CONFIG
})
const onNextPage = () =>{
    window.scrollTo(0, 0);
  setPage((page) =>page +1)
}
const onBackPage = () =>{
    window.scrollTo(0, 0);
  setPage((page) =>page +1)
}
const totalPages = !enabled ? Math.ceil(initialData.builderCount / 20) : 1

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);  // Update only the input field
  };

  const handleSubmit = (e:React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSearchTerm(searchInput);  // Set searchTerm from searchInput on button click
    setPage(0);  // Reset page on submit
  };

  const resultArray = [];
  for (let key in cities) {
    if (cities.hasOwnProperty(key)) {
      resultArray.push({value:key, label:cities[key]});  // Custom handling, can adjust for keys, values, etc.
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20">
      {/* Fixed Header */}
      <div className="fixed top-[68px] left-0 right-0 bg-white shadow-md z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900 capitalize mb-4 md:mb-0">
            Builders in {city}
          </h1>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
            {/* Mobile Filter Button */}
            <button
              className="md:hidden w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center"
              onClick={() => setShowFilter(!showFilter)}
            >
              <FaFilter className="mr-2" />
              {showFilter ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            {/* Filter Options */}
            <div className={`md:flex ${showFilter ? 'flex' : 'hidden'} flex-col md:flex-row w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0`}>

            <div className="flex items-center space-x-4">
            <form className="flex items-center justify-end space-x-1">
                  <input
                    type="text"
                    placeholder="Search Builder..."
                    className="w-full md:w-auto bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleSearchInputChange}  // Change only input
                    value={searchInput}
                    maxLength={80}
                    pattern="[a-zA-Z0-9\s]*"  // Restricts special characters
                    title="Special characters are not allowed"
                  />
                  <button
                  type="submit"
                    className="bg-blue-600 inline-flex justify-center items-center text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                    onClick={handleSubmit}  // Trigger search on click
                  >
                    <FaSearch className="mr-2" />
                    Search
                  </button>
                </form>
            </div>
              <Select data={resultArray} searchable size="md" value={filterCity} placeholder="All Cities"   onChange={(e) => {
                e && setFilterCity(e)
                 setSearchInput('')
                 setSearchTerm('')
              }} rightSection={<span></span>} />


              <select
                className="w-full md:w-auto appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
              >
                <option value="0">Sort A-Z</option>
                <option value="1">Sort Z-A</option>
              </select>
            
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto px-4 py-8 mt-32 md:mt-16">
        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8">
          {isLoading ? <div>Loading</div> :  data?.builderData?.length > 0 ? data?.builderData?.map((builder: { userId: number; userName: string; companyName: string; cityName: string; builderLogo: string; builderDescription: string; newProject: number; onGoingProject: number; completedProject: number }, index: number) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 border border-blue-100"
            >
              <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row items-center mb-2 ">
                  <div className="w-20 h-20 md:w-24 md:h-24  mb-4 md:mb-0 md:mr-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={builder.builderLogo}
                      alt={`${builder.companyName} logo`}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain"
                    />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-blue-900 text-center md:text-left">
                    {builder.companyName}
                  </h2>
                </div>
                <p className="text-sm md:text-base text-black mb-2 ">
                  <span className="font-semibold text-[#0073C6]">Operating in:</span>{" "}
                  {builder.cityName}
                </p>
                <p className="text-sm md:text-base text-black mb-3 md:mb-2">
                  <span className="font-semibold text-[#0073C6]">Company Name:</span>{" "}
                  {builder.companyName}
                </p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-1 md:mb-2 line-clamp-3">
                  {builder.builderDescription}
                </p>
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-[#0073C6]">New Projects:</span>
                    <span className="text-gray-600">{builder.newProject}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-[#0073C6]">Ongoing Projects:</span>
                    <span className="text-gray-600">{builder.onGoingProject}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-[#0073C6]">Completed Projects:</span>
                    <span className="text-gray-600">{builder.completedProject}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <button className="w-full sm:w-auto bg-[#0073C6] text-white font-semibold text-sm md:text-base px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md">
                    See Projects
                  </button>
                  <button className="w-full sm:w-auto bg-white text-[#0073C6] font-semibold text-sm md:text-base px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-50 transition duration-300 border-2 border-[#0073C6] shadow-md">
                    Explore Builder
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="flex mx-auto w-full flex-col items-center justify-center h-full space-y-4 py-12">
            {/* <NoResultsSVG className="w-64 h-64" alt="No Results" /> */}
            <h2 className="text-2xl font-semibold text-gray-800">No Builders Found</h2>
            <p className="text-gray-600 text-sm text-center max-w-lg">
              We couldn't find any builders matching your search in {city}. Try adjusting your filters or check back later.
            </p>
            <button
              className="mt-4 flex items-center space-x-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={() => {
                setFilterCity(""); // Reset filters
                setSearchTerm(""); // Clear search term
                setPage(0); // Reset page
              }}
            >
              <FaRedoAlt className="mr-2" />
              Reset Filters
            </button>
          </div>
          )}
         
        </div>

        <div className="flex justify-center mt-8">
        <Pagination total={totalPages} onNextPage={onNextPage} onPreviousPage={onBackPage} onChange={(value)=>{
            window.scrollTo(0, 0);
              setPage(value - 1)
        }}  />
        </div>
      </div>
    </div>
  );
}
