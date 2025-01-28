import React from 'react';

const staticData = [
    {
        name: "Insights",
        value: ""
    }, {
        name: "Transaction Prices",
        value: ""
    },{
        name: "Price Trends",
        value: ""
    },{
        name: "Locality Insights",
        value: ""
    },{
        name: "Rating & Reviews",
        value: ""
    },{
        name: "My Property Insights",
        value: ""
    },{
        name: "Articles",
        value: ""
    },{
        name: "News",
        value: ""
    },{
        name: "Guides",
        value: ""
    },    {
        name: "Budget Calculator",
        value: ""
    },{
        name: "EMI Calculator",
        value: ""
    },{
        name: "Home Loan Eligibility Calculator",
        value: ""
    },{
        name: "Area Convertor Tool",
        value: ""
    },
];



type Props = {}

function MarketNavigator({}: Props) {
  return (
    <div className=' flex justify-start items-center max-w-[100%] overflow-x-auto relative top-[-17px] '>
        <div className='flex justify-start items-center gap-[16px] '>
            {staticData.map(each=>{
                return(
                    <button key={each.name} title={`Click to Select ${each.name}`} className='group border-[2px] border-solid border-white bg-transparent text-nowrap rounded-[34px] '>
                        <div className=' w-[34px] h-[34px] rounded-[34px] bg-gray-600 flex justify-center items-center gap-[10px] group-hover:w-auto group-hover:px-[10px] transition-all duration-[0.5s] '> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
                                <path d="M5.21074 11.3645H9.51702V10.1342H5.21074V11.3645ZM5.21074 8.90379H11.3626V7.67342H5.21074V8.90379ZM5.21074 6.44306H11.3626V5.21269H5.21074V6.44306ZM3.98037 13.8253C3.64202 13.8253 3.35227 13.7047 3.11111 13.4635C2.86996 13.2224 2.74959 12.9328 2.75 12.5949V3.98232C2.75 3.64397 2.87058 3.35422 3.11173 3.11307C3.35288 2.87191 3.64243 2.75154 3.98037 2.75195H12.5929C12.9313 2.75195 13.221 2.87253 13.4622 3.11368C13.7033 3.35483 13.8237 3.64438 13.8233 3.98232V12.5949C13.8233 12.9332 13.7027 13.223 13.4616 13.4641C13.2204 13.7053 12.9309 13.8257 12.5929 13.8253H3.98037ZM3.98037 12.5949H12.5929V3.98232H3.98037V12.5949Z" fill="white"/>
                            </svg>

                            <span className='hidden group-hover:block font-bold text-[14px] text-white '>{each.name}</span>
                        </div>
                    </button>
                )
            })}
        </div>
    </div>
  )
}

export default MarketNavigator