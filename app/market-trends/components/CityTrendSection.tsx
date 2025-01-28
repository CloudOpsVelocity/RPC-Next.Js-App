
import React from 'react'
import MarketNavigator from './MarketNavigator';

type Props = {
    cityName: string;
};

const allCitiesData = [
  {
    name: "Varthur",
    city:"Bangalore East",
    price:13300,
    range:192,
    rate:3
  },
  {
    name: "Sarjapur",
    city:"Bangalore East",
    price:13300,
    range:192,
    rate:3
  },  {
    name: "Tumkur Road",
    city:"Bangalore East",
    price:13300,
    range:192,
    rate:3
  },
  {
    name: "Gunjur",
    city:"Bangalore East",
    price:13300,
    range:192,
    rate:3
  },
  {
    name: "Hoodi",
    city:"Bangalore East",
    price:13300,
    range:192,
    rate:3
  },
  {
    name: "Bagalur",
    city:"Bangalore East",
    price:13300,
    range:192,
    rate:3
  },
  {
    name: "Kannamangala",
    city:"Bangalore East",
    price:13300,
    range:192,
    rate:3
  },
  {
    name: "Kundalahalli",
    city:"Bangalore East",
    price:13300,
    range:192,
    rate:3
  },
  {
    name: "Panathur",
    city:"Bangalore East",
    price:13300,
    range:192,
    rate:3
  },
];

const PriceCard = ({eachCity}: {eachCity:any}) => {
    return(
        <div key={eachCity.name} className='px-[30px] cursor-pointer min-h-[124px] w-full p-[10px] rounded-[10px] border-t-[1px] border-solid shadow-md hover:shadow-lg flex items-center justify-between transition-all duration-[0.5s]   '>
            <div className=' w-[64px] h-[64px] rounded-[50%] shadow-md border-t-[1px] border-solid '>
              {/* city image */}
            </div>
            <div>
                <p className='font-bold'>{eachCity.name}</p>
                <p className=' text-gray-700 '>{eachCity.city}</p>
            </div>

            <div>
                <p className='text-gray-700'>Rate on GetRightProperty</p>
                <p className='font-bold  '>₹{eachCity.price}/ sq.ft</p>
            </div>

            <div>
                <p className='text-gray-700'>Rental Yield</p>
                <p className='font-bold  '>{eachCity.rate}%</p>
            </div>
        </div>
    )
};

function CityTrendSection({cityName}: Props) {
  return (
    <div className='w-[70%] py-[30px] gap-[20px] flex items-start justify-start '>
        <div className='flex flex-col items-center'>
            <div className='flex justify-between border-t-[1px] border-solid shadow-md rounded-[4px] min-w-[600px] p-[10px] gap-[6px] mb-[30px] '>
                <input 
                placeholder='Enter a city, locality or society'
                className=' text-gray-700 font-medium border-0 focus:outline-none w-full  bg-transparent '
                />
                <button className=' bg-gray-500 p-[4px] font-medium text-white border-0 text-nowrap text-[14px] rounded-[4px] px-[6px] '>
                Search Price Trends
                </button>
            </div>

            <h2 className='font-bold mb-[4px] mr-auto text-[24px] '>Property Rates in {cityName}</h2>
            <p className='font-medium mr-auto text-[16px] mb-[20px] text-gray-500  '>50 of 180 Localities in {cityName}</p>

            <div className=' flex items-start justify-start flex-wrap gap-[20px] w-full '>
                {allCitiesData.map(eachCity=>(
                <PriceCard key={eachCity.name} eachCity={eachCity} />
                ))}
            </div>
        </div>

        <div className='flex flex-col min-w-[285px] h-[600px] shadow-md rounded-[10px] !sticky !top-[70px] border-t-[2px] border-solid p-[10px] '>
            <h3 className='text-[#4D6677] text-[18px] not-italic font-semibold leading-[normal] capitalize'>Show Price Trends for</h3>
            <div className='flex justify-center items-center gap-[10px] '>
                <button className='bg-[#0073C6] text-base not-italic font-semibold leading-[normal] capitalize text-white p-[4px] '>
                    Localities
                </button>

                <button>
                    Societies
                </button>
            </div>
        </div>
    </div>
  )
}

export default CityTrendSection

