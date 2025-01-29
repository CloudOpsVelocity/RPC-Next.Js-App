"use client"
import React, { useState } from 'react'
import { listingProps } from '@/app/data/projectDetails';
import { DropdownArrowIcon, LikeIcon } from '@/app/images/commonSvgs';
import { getAllLocalitiesDetails } from '@/app/utils/stats_cities';

type Props = {
    cityName: string;
};

const allCitiesData = [
  {
    id:"1",
    name: "Varthur",
    city:"Bangalore East",
    price:13300,
    range:192,
    rate:3,
  },
  {
    id:"2",
    name: "Sarjapur",
    city:"Bangalore East",
    price:13300,
    range:192,
    rate:3
  },  {
    id:"3",
    name: "Tumkur Road",
    city:"Bangalore East",
    price:13300,
    range:192,
    rate:3
  },
  {
    id:"4",
    name: "Gunjur",
    city:"Bangalore East",
    price:13300,
    range:192,
    rate:3
  },
  {
        id:"5",
    name: "Hoodi",
    city:"Bangalore East",
    price:13300,
    range:192,
    rate:3
  },
  {
        id:"6",
    name: "Bagalur",
    city:"Bangalore East",
    price:13300,
    range:192,
    rate:3
  },
  {
    id:"7",
    name: "Kannamangala",
    city:"Bangalore East",
    price:13300,
    range:192,
    rate:3
  },
  {
    id:"8",
    name: "Kundalahalli",
    city:"Bangalore East",
    price:13300,
    range:192,
    rate:3
  },
  {
    id:"9",
    name: "Panathur",
    city:"Bangalore East",
    price:13300,
    range:192,
    rate:3
  },
];

const localityCheckList = [
  {name:"Property"},
  {name:"Societies"},
  {name:"Transectin Price"},
  {name:"Ratings and Reviews"},
  {name:"All Insights"},
]

const filtersStaticData = {
  allZones : [
    {value: "", name:"All Zones"},
    {value: "1", name:"Bangalore South"},
    {value: "2", name:"Bangalore East"},
    {value: "3", name:"Bangalore North"},
    {value: "4", name:"Bangalore West"},
  ],
  duration:[
    {value: "1", name:"1 year"},
    {value: "3", name:"3 year"},
    {value: "4", name:"4 year"},
    {value: "max", name:"Max"},
  ],
  sigment:[
    {value: "", name:"All"},
    {value: "1", name:"Affordable"},
    {value: "2", name:"Mid"},
    {value: "3", name:"Premium"},
  ],

};

const PriceCard = ({eachCity}: {eachCity:any}) => {
    const [popupData, setPopupData] = useState({isOpen: false, data:null, boxId:null});
    const onSelectBox = (identifier:string, data:any) => {
      if(identifier === "OPEN"){
        setPopupData({isOpen: true, data: data, boxId: data.id})
      }else{
        setPopupData({isOpen: false, data:null, boxId:null})
      }
    }
    return(
        <div 
          key={eachCity.name}  
          className='group px-[30px] w-full p-[10px] rounded-[10px] border-t-[1px] border-solid shadow-md hover:shadow-lg flex flex-col items-center justify-between transition-all duration-[0.5s]  '
        >
            {/* Top section */}
            <div onClick={()=> onSelectBox(!popupData.isOpen ? "OPEN" : "CLOSE", eachCity)} className='flex items-center justify-between cursor-pointer w-full min-h-[124px]'>
              <div className='flex items-center gap-[10px] '>
                <div className=' w-[64px] h-[64px] rounded-[50%] shadow-md border-t-[1px] border-solid '>
                  {/* city image */}
                </div>
                <div>
                    <p className='font-bold'>{eachCity.name}</p>
                    <p className=' text-gray-700 '>{eachCity.city}</p>
                </div>
              </div>

              <div>
                  <p className='text-gray-700'>Rate on GetRightProperty</p>
                  <p className='font-bold  '>₹{eachCity.price}/ sq.ft</p>
              </div>

              <div>
                  <p className='text-gray-700'>Rental Yield</p>
                  <p className='font-bold  '>{eachCity.rate}%</p>
              </div>

              <div className=' w-[40px] h-[40px] flex justify-center items-center cursor-pointer border-solid border-[1px] border-gray-300 rounded-full shadow-md '>
                {/* <DropdownArrowIcon dropdownArrowClass={`w-[24px] h-[24px] relative right-[1px] top-[2px] transition-all duration-500 flex justify-center items-center ${popupData.boxId === eachCity.id && popupData.isOpen ? "rotate-180" : ""} `} /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="29"
                    viewBox="0 0 28 29"
                    fill="none"
                    className={`w-[24px] rotate-[-90deg] h-[24px] relative right-[1px] top-[2px] transition-all duration-500 flex justify-center items-center ${popupData.boxId === eachCity.id && popupData.isOpen ? "rotate-[90deg]" : ""} `}
                  >
                    <path
                      d="M6.125 15.2305H23.625C23.8571 15.2305 24.0796 15.1383 24.2437 14.9742C24.4078 14.8101 24.5 14.5875 24.5 14.3555C24.5 14.1234 24.4078 13.9008 24.2437 13.7367C24.0796 13.5727 23.8571 13.4805 23.625 13.4805H6.125C5.89294 13.4805 5.67038 13.5727 5.50628 13.7367C5.34219 13.9008 5.25 14.1234 5.25 14.3555C5.25 14.5875 5.34219 14.8101 5.50628 14.9742C5.67038 15.1383 5.89294 15.2305 6.125 15.2305Z"
                      fill="#666666"
                    />
                    <path
                      d="M6.48686 14.3563L13.7441 7.10082C13.9084 6.93651 14.0007 6.71367 14.0007 6.48132C14.0007 6.24896 13.9084 6.02612 13.7441 5.86182C13.5798 5.69751 13.357 5.60521 13.1246 5.60521C12.8923 5.60521 12.6694 5.69751 12.5051 5.86182L4.63011 13.7368C4.54863 13.8181 4.48398 13.9147 4.43986 14.021C4.39575 14.1273 4.37305 14.2412 4.37305 14.3563C4.37305 14.4714 4.39575 14.5854 4.43986 14.6917C4.48398 14.798 4.54863 14.8945 4.63011 14.9758L12.5051 22.8508C12.6694 23.0151 12.8923 23.1074 13.1246 23.1074C13.357 23.1074 13.5798 23.0151 13.7441 22.8508C13.9084 22.6865 14.0007 22.4637 14.0007 22.2313C14.0007 21.999 13.9084 21.7761 13.7441 21.6118L6.48686 14.3563Z"
                      fill="#666666"
                    />
                </svg>
              </div>
            </div>

            {/* popup data */}
            <div className={`w-full opacity-0 transition-all duration-500 ${popupData.boxId === eachCity.id && popupData.isOpen ? "opacity-100" : ""}`}>
              {popupData.boxId === eachCity.id && popupData.isOpen &&
              <div className={`w-full`}>
                <p className='mb-[10px] font-semibold text-gray-700 '>Quick Links for {eachCity.name}</p>
                <div className=' flex flex-wrap gap-[10px] w-full '>
                  {localityCheckList.map(each=>{
                    return(
                      <p 
                        key={each.name}  
                        onClick={(e)=>e.stopPropagation()}
                        className='bg-white border-[1px] flex items-center gap-[4px] border-solid border-gray rounded-[30px] h-[30px] text-[14px] not-italic font-semibold leading-[normal] capitalize text-gray-600 p-[4px] px-[10px]'
                      >
                        {`${each.name} in ${eachCity.name}`}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 14 15" fill="none">
                          <path d="M9.5 4H13.5V8" stroke="#4B77C1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M13.5 4L7.85 9.65C7.75654 9.74161 7.63088 9.79293 7.5 9.79293C7.36912 9.79293 7.24346 9.74161 7.15 9.65L4.85 7.35C4.75654 7.25839 4.63088 7.20707 4.5 7.20707C4.36912 7.20707 4.24346 7.25839 4.15 7.35L0.5 11" stroke="#4B77C1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </p>
                    )
                  })}
                </div>
              
                <div className='flex justify-between mt-[16px]'>
                  <div className='flex items-center gap-[6px]  '>
                    <span className=' text-[12px]  '>Is this helpful?</span>
                    <button 
                      className={`bg-white font-bold border-0 rounded-[30px] not-italic leading-[normal] capitalize text-[12px] text-gray-700 flex items-center gap-[2px] bg-transparent `}
                      onClick={()=>("")}
                    >Yes <LikeIcon className='w-[18px] h-[18px] fill-gray-600 ' />
                    </button>

                    <button 
                      className={`bg-white font-bold border-0 rounded-[30px] not-italic leading-[normal] capitalize text-[12px] text-gray-700 flex items-center gap-[2px] bg-transparent`}
                      onClick={()=>("")}
                    >No <LikeIcon className='rotate-180 w-[18px] h-[18px] fill-gray-600 ' />
                    </button>
                  </div>

                  <p className=' leading-[normal] capitalize text-[12px] text-gray-700'>Last updated in Jan-2025</p>
                </div>
              </div>
              }
            </div>
        </div>
    )
};

const initialFilters = {
    trendType:"L",
    zone:"",
    propType:"",
    duration:"", 
    sigment:""
}

const TrendFilters = () => {

  const [filters, setFilters] = useState(initialFilters);
  const onValueChange = (e:any) => {
    let name = e.target.name;
    let value = e.target.value;
    setFilters(prev=>({ ...prev, [name]: value }));
  }
  return(
    <div className='flex flex-col min-w-[285px] shadow-md rounded-[10px] !sticky !top-[70px] border-t-[2px] border-solid p-[10px] '>
      <h3 className='mb-[10px] text-[14px] not-italic font-semibold leading-[normal] capitalize'>Show Price Trends for</h3>
      <div className='flex justify-center items-center gap-[10px] mb-[16px] '>
          <button 
            className={`bg-white border-[1px] border-solid border-[#47a5e9] rounded-[30px] h-[30px] text-[14px] not-italic font-semibold leading-[normal] capitalize text-[#37a7f7]  p-[4px] px-[8px] ${filters.trendType === "L" ? "!bg-[#99c7e7] !text-white !border-0" : ""} `}
            onClick={onValueChange}
            name="trendType"
            value="L"
          >Localities
          </button>

          <button 
            className={`bg-white border-[1px] border-solid border-[#47a5e9] rounded-[30px] h-[30px] text-[14px] not-italic font-semibold leading-[normal] capitalize text-[#37a7f7]  p-[4px] px-[8px] ${filters.trendType === "S" ? "!bg-[#99c7e7] !text-white !border-0" : ""} `}
            onClick={onValueChange}
            name="trendType"
            value="S"
          >Societies
          </button>
      </div>

      <h3 className='mb-[10px] text-[14px] not-italic font-semibold leading-[normal] capitalize'>Select Zone</h3>
      <div className='mb-[12px] '>
        {filtersStaticData.allZones.map(eachZone=>{
          return(
            <div key={eachZone.name} className='flex items-center gap-[8px] mb-[4px] '>
              <input 
                type='radio'
                name="zone"
                id={`zone-${eachZone.value}`}
                className=' w-[16px] h-[16px] cursor-pointer '
                value={eachZone.value}
                checked={filters.zone === eachZone.value}
                onClick={onValueChange}
              />
              <label htmlFor={`zone-${eachZone.value}`} className='text-[14px]  ' >{eachZone.name}</label>
            </div>
          )
        })}
      </div>

      <h3 className='mb-[10px] text-[14px] not-italic font-semibold leading-[normal] capitalize'>Property Type</h3>
      <div className='flex flex-wrap gap-[10px] mb-[16px] '>
        {Object.keys(listingProps).map(eachProp=>{
          return(
            <button 
              key={eachProp}             
              className={`bg-white border-[1px] border-solid border-[#47a5e9] rounded-[30px] h-[30px] text-[14px] not-italic font-semibold leading-[normal] capitalize text-[#37a7f7] p-[4px] px-[8px] ${filters.propType === eachProp ? "!bg-[#99c7e7] !text-white !border-0" : ""} `}
              onClick={onValueChange}
              name="propType"
              value={eachProp}
            >
                {eachProp}
            </button>
          )
        })}
      </div>

      <h3 className='mb-[10px] text-[14px] not-italic font-semibold leading-[normal] capitalize'>Duration</h3>
      <div className='flex flex-wrap gap-[10px] mb-[16px] '>
        {filtersStaticData.duration.map(eachZone=>{
          return(
            <button 
              key={eachZone.name} 
              className={`bg-white border-[1px] border-solid border-[#47a5e9] rounded-[30px] h-[30px] text-[14px] not-italic font-semibold leading-[normal] capitalize text-[#37a7f7] p-[4px] px-[8px] ${filters.duration === eachZone.value ? "!bg-[#99c7e7] !text-white !border-0" : ""} `}
              onClick={onValueChange}
              name="duration"
              value={eachZone.value}        
            >
                {eachZone.name}
            </button>
          )
        })}
      </div>

      <h3 className='mb-[10px] text-[14px] not-italic font-semibold leading-[normal] capitalize'>Price Segment</h3>
      <div className='flex flex-wrap gap-[10px] mb-[16px] '>
        {filtersStaticData.sigment.map(eachZone=>{
          return(
            <button 
            key={eachZone.name} 
            className={`bg-white border-[1px] border-solid border-[#47a5e9] rounded-[30px] h-[30px] text-[14px] not-italic font-semibold leading-[normal] capitalize text-[#37a7f7] p-[4px] px-[8px] ${filters.sigment === eachZone.value ? "!bg-[#99c7e7] !text-white !border-0" : ""} `}
            onClick={onValueChange}
            name="sigment"
            value={eachZone.value}
            >                
              {eachZone.name}
            </button>
          )
        })}
      </div>
      
  </div>
  )
}

interface Locality {
  id: string | number;
  name: string;
  cityid: string | number;
  isactive: string;
  stateId: string | number;
  parentId: string | number;
  type: number;
  createdate: string;
  modidate: string;
}

function CityTrendSection({cityName}: Props) {
  const allLocalities: Locality[] | any = getAllLocalitiesDetails(); // Fetch all localities
  console.log(allLocalities)
  
  return (
    <div className='w-[70%] pb-[30px] gap-[20px] flex items-start justify-start overflow-y-auto relative px-[6px]'>
      <div className='flex flex-col items-center'>
          <h2 className='font-bold mb-[4px] mr-auto text-[18px] '>Property Rates in {cityName}</h2>
          <p className='font-medium mr-auto text-[14px] mb-[20px] text-gray-500  '>50 of 180 Localities in {cityName}</p>

          <div className=' flex items-start justify-start flex-wrap gap-[20px] w-full '>
              {allCitiesData.map(eachCity=>(
                <PriceCard key={eachCity.name} eachCity={eachCity} />
              ))}
          </div>
      </div>
      <TrendFilters />
    </div>
  )
}

export default CityTrendSection

