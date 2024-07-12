import React from 'react'

const NewTabCon = () => {

const demo=["project", "owner listing", "Agent Listing"];


  return (

    <div className='flex flex-row justify-center align-middle gap-3'>
    {demo.map((item) => (
        <button 
      /*   onClick={} */
        className='text-base text-blue-500'>
            {item}
        </button>
    ))}
      <button className="flex h-7 justify-center items-center gap-2.5 p-3.5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] border-[0.5px] border-solid border-[#CBD4E1] bg-white  xl:mr-4 xl:mt-1 xl:mb-2 ml-4 md:ml-auto xl:ml-auto ">
          <span className="text-[#0073C6] text-xs md:text-base not-italic   font-semibold leading-[normal] ">
            { "Sort By"}
          </span>
          </button>
  </div>
  
  )
}

export default NewTabCon;