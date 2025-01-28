import React from 'react'
import MarketNavigator from './MarketNavigator';

type Props = {};

const allCities = [
  {name: "Bangalore"},
  {name: "Mumbai"},
  {name: "Delhi"},
  {name: "Pune"},
  {name: "Chennai"},
  {name: "HyderaBad"},
  {name: "Kolkata"},
  {name: "Gurgaon"},
  {name: "Nagpur"},
];

function MarketSections({}: Props) {
  return (
    <div className='w-[70%] py-[30px] flex flex-col items-center '>

      <div className='flex justify-between border-t-[1px] border-solid shadow-md rounded-[4px] min-w-[600px] p-[10px] gap-[6px] mb-[30px] '>
        <input 
          placeholder='Enter a city, locality or society'
          className=' text-gray-700 font-medium border-0 focus:outline-none w-full bg-transparent '
        />
        <button className=' bg-gray-500 p-[4px] font-medium text-white border-0 text-nowrap text-[14px] rounded-[4px] px-[6px] '>
          Search Price Trends
        </button>
      </div>

      <h2 className='font-bold mb-[10px] mr-auto text-[24px] '>Select a City</h2>
      <p className='font-normal mr-auto text-[16px] mb-[30px] '>To check property rates & price trends</p>

      <div className=' flex items-start justify-start flex-wrap gap-[20px]  '>
        {allCities.map(eachCity=>(
          <a key={eachCity.name} href={`/market-trends/${eachCity.name.toLowerCase()}`} target='_blank'>
          <div  className=' cursor-pointer min-h-[218px] w-[180px] rounded-[10px] border-t-[1px] border-solid shadow-md flex flex-col justify-center items-center transition-all duration-[0.5s] ease-[ease-in-out] hover:-translate-y-2.5 hover:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] '>
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

export default MarketSections