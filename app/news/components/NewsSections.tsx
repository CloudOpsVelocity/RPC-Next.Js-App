import Image from 'next/image';
import React, { useMemo } from 'react'

type Props = {}

type CradProps = {
    data:any;
}

const staticCardsData = [
    {
        section: "Technology",
        title:"Building plan approval process gets digitised in Bangalore the Karnataka government will issue A Khata Certificates for B Khata properties across the State soon.",
        desc: "The Karnataka government will issue A Khata Certificates for B Khata properties across the State soon. The proposal, approved by the government, is awaiting legal amendments by the legislature. Once the laws are amended, over six lakh B Khata property holders will benefit from this move in Bangalore alone. Read on to know more.",
        user:"Ram Dev",
        date:"Sep 03, 2024",
        viewsCount:"3353"
    },
    {
        section: "Policy Change",
        title:"Building plan approval process gets digitised in Bangalore",
        desc: "Property Building plan approval process gets digitised in Bangalore",
        user:"Ram Dev",
        date:"Sep 03, 2024",
        viewsCount:"3353"
    },{
        section: "RERA",
        title:"Building plan approval process gets digitised in Bangalore",
        desc: "Property Building plan approval process gets digitised in Bangalore",
        user:"Ram Dev",
        date:"Sep 03, 2024",
        viewsCount:"3353"
    },{
        section: "Infrastructure",
        title:"Building plan approval process gets digitised in Bangalore",
        desc: "Property Building plan approval process gets digitised in Bangalore",
        user:"Ram Dev",
        date:"Sep 03, 2024",
        viewsCount:"3353"
    },{
        section: "Residential",
        title:"Building plan approval process gets digitised in Bangalore",
        desc: "Property Building plan approval process gets digitised in Bangalore",
        user:"Ram Dev",
        date:"Sep 03, 2024",
        viewsCount:"3353"
    },{
        section: "Texation",
        title:"Building plan approval process gets digitised in Bangalore",
        desc: "Property Building plan approval process gets digitised in Bangalore",
        user:"Ram Dev",
        date:"Sep 03, 2024",
        viewsCount:"3353"
    },{
        section: "Technology",
        title:"Building plan approval process gets digitised in Bangalore",
        desc: "Property Building plan approval process gets digitised in Bangalore",
        user:"Ram Dev",
        date:"Sep 03, 2024",
        viewsCount:"3353"
    },{
        section: "Technology",
        title:"Building plan approval process gets digitised in Bangalore",
        desc: "Property Building plan approval process gets digitised in Bangalore",
        user:"Ram Dev",
        date:"Sep 03, 2024",
        viewsCount:"3353"
    },{
        section: "Technology",
        title:"Building plan approval process gets digitised in Bangalore",
        desc: "Property Building plan approval process gets digitised in Bangalore",
        user:"Ram Dev",
        date:"Sep 03, 2024",
        viewsCount:"3353"
    },{
        section: "Technology",
        title:"Building plan approval process gets digitised in Bangalore",
        desc: "Property Building plan approval process gets digitised in Bangalore",
        user:"Ram Dev",
        date:"Sep 03, 2024",
        viewsCount:"3353"
    },{
        section: "Technology",
        title:"Building plan approval process gets digitised in Bangalore",
        desc: "Property Building plan approval process gets digitised in Bangalore",
        user:"Ram Dev",
        date:"Sep 03, 2024",
        viewsCount:"3353"
    },{
        section: "Technology",
        title:"Building plan approval process gets digitised in Bangalore",
        desc: "Property Building plan approval process gets digitised in Bangalore",
        user:"Ram Dev",
        date:"Sep 03, 2024",
        viewsCount:"3353"
    },{
        section: "Technology",
        title:"Building plan approval process gets digitised in Bangalore",
        desc: "Property Building plan approval process gets digitised in Bangalore",
        user:"Ram Dev",
        date:"Sep 03, 2024",
        viewsCount:"3353"
    },
];

function Card({data}: CradProps) {
  const getClampedText = (text:string, maxLines:number ) => {
    const words = text?.split(" ");
    const newText = text?.split(" ")?.slice(0, maxLines * 4)

    if(words.length > newText.length ){
      return newText.join(" ") + "...";
    }else{
      return text;
    }
  }

  return (
    <div className="flex min-w-[240px] sm:w-[238px] xl:w-[340px] flex-col items-start border shadow-[0px_4px_20px_0px_rgba(0,127,145,0.10)] relative rounded-t-[4px] sm:rounded-t-[10px] xl:rounded-t-[4px] border-solid border-[#B9CFEB] hover:shadow-lg ">
        <p className=' border-0 py-[6px] px-[8px] bg-[#6b9472] text-[12px] font-bold text-white mr-auto mb-[16px] absolute top-[10px] right-[10px] '>{data.section}</p>

        <Image height={140} width={494} className="h-[118px] sm:h-[142px] xl:h-[160px] rounded-t-[4px] sm:rounded-t-[10px] xl:rounded-t-[4px]" src={"/test.jpg"} alt="" />
        <div className="group flex flex-col h-[130px] gap-[6px] items-start p-[12px] transition-[height] duration-[1s] hover:h-full bottom-0 hover:absolute bg-white ">
            <p className="text-gray-600 text-[12px] not-italic font-normal flex items-center gap-[4px] leading-[150%]">
                {config.eye} {data.viewsCount}
            </p>
            <p className="text-gray-600 text-[12px] not-italic font-normal ">
                {data.user}
            </p>
            <p className="text-[color:var(--Black,#000)] text-[12px] sm:text-[14px] xl:text-[16px] not-italic font-normal leading-[150%] ">
                {getClampedText(data.title, 2)}
            </p>

            <p className="text-gray-800 text-[12px] font-semibold sm:text-[14px] xl:text-[16px] not-italic hidden duration-[1s] opacity-0 group-hover:opacity-100 group-hover:block transition-opacity ">
                {getClampedText(data.desc, 6)}
            </p>
        </div>
    </div>
  );
}


const config = {
    readMoreIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className=" w-[13px] h-[13px] sm:w-[24px] sm:h-[24px] "
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.9603 11.1419C15.18 11.3615 15.18 11.7176 14.9603 11.9373L9.22541 17.6722C9.00573 17.8918 8.64963 17.8918 8.42996 17.6722L8.16476 17.407C7.94508 17.1873 7.94508 16.8312 8.16476 16.6115L13.2367 11.5396L8.16476 6.46763C7.94508 6.24795 7.94508 5.89185 8.16476 5.67218L8.42996 5.40698C8.64963 5.1873 9.00573 5.1873 9.22541 5.40698L14.9603 11.1419Z"
          fill="black"
        />
      </svg>
    ),
    eye:(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            fill="gray"
            />
            <path
            d="M18.5072 6.61781C16.4578 5.2125 14.2645 4.5 11.9887 4.5C9.94078 4.5 7.94438 5.10937 6.05484 6.30375C4.14937 7.51078 2.28141 9.70312 0.75 12C1.98844 14.0625 3.6825 16.1831 5.44687 17.3991C7.47094 18.7931 9.67172 19.5 11.9887 19.5C14.2856 19.5 16.4817 18.7936 18.5184 17.4005C20.3114 16.1719 22.0177 14.0541 23.25 12C22.0134 9.96422 20.3016 7.84875 18.5072 6.61781ZM12 16.5C11.11 16.5 10.24 16.2361 9.49993 15.7416C8.75991 15.2471 8.18314 14.5443 7.84254 13.7221C7.50195 12.8998 7.41283 11.995 7.58647 11.1221C7.7601 10.2492 8.18868 9.44736 8.81802 8.81802C9.44736 8.18868 10.2492 7.7601 11.1221 7.58647C11.995 7.41283 12.8998 7.50195 13.7221 7.84254C14.5443 8.18314 15.2471 8.75991 15.7416 9.49993C16.2361 10.24 16.5 11.11 16.5 12C16.4986 13.1931 16.0241 14.3369 15.1805 15.1805C14.3369 16.0241 13.1931 16.4986 12 16.5Z"
            fill="gray"
            />
        </svg>
    )
};


function NewsSections({}: Props) {
  return (
    <div className=' p-[5%] flex flex-col justify-center items-start  '>
        
        <h2 className=' text-[30px] mb-[40px] font-bold '>Bangalore Property News</h2>
        
        <div className=' flex gap-[16px] flex-wrap '>
            {staticCardsData.map(eachCard=>{
                return(
                    <Card key={eachCard.title} data={eachCard} />
                )
            })}
        </div>
    </div>
  )
}

export default NewsSections;