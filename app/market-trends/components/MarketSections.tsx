"use client"
import React, { useState } from 'react'
import { getAllCitiesDetails } from '@/app/utils/stats_cities';
import RTK_CONFIG from '@/app/config/rtk';
import { useQuery } from 'react-query';

type Props = {
};

interface City {
  id: string;
  name: string;
}

const cityIds = [9, 577, 714, 576, 580, 582, 585, 641];

function MarketSections({}: Props) {
  const {
    data: AllCities,
    // isLoading: citiesLoading,
    // error: citiesError,
  } = useQuery<City[], Error>({
    queryKey: ["all-cities"],
    queryFn: getAllCitiesDetails,
    ...RTK_CONFIG,
    enabled: true,
  });

  const currentCities = AllCities?.filter((city:any)=> cityIds.includes(city?.id));

  console.log(AllCities);

  // {
  //   id: 28,
  //   name: 'A Narayanapura',
  //   cityid: 9,
  //   isactive: 'Y',
  //   stateId: 11,
  //   parentId: 11,
  //   type: 1,
  //   createdate: '2024-08-07',
  //   modidate: '2024-08-07'
  // },

  return (
    <div className='w-[70%] pb-[30px] flex flex-col items-center '>
      <h2 className='font-bold mb-[10px] mr-auto text-[24px] '>Select a City</h2>
      <p className='font-normal mr-auto text-[16px] mb-[30px] '>To check property rates & price trends</p>

      <div className=' flex items-start justify-start flex-wrap gap-[20px]  '>
     
        {currentCities?.map((eachCity:any)=>(
          <a key={eachCity.name} href={`/market-trends/${eachCity?.name.toLowerCase()}?si=${eachCity?.stateId}&ci=${eachCity?.cityid}`} target='_blank'>
          <div className=' cursor-pointer min-h-[218px] w-[180px] rounded-[10px] border-t-[1px] border-solid shadow-md flex flex-col justify-center items-center transition-all duration-[0.5s] ease-[ease-in-out] hover:-translate-y-2.5 hover:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] '>
            <div className=' w-[100px] h-[100px] rounded-[50%] shadow-md border-t-[1px] border-solid '>
              {/* city image */}
            </div>
            <span className=' font-medium text-[16px] mt-[16px] text-center '>Property Rates in {eachCity.name}</span>
          </div>
          </a>
        ))}
       
      </div>

    </div>
  )
}

export default MarketSections;


