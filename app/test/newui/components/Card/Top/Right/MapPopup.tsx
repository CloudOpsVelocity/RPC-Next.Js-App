import React from 'react'
import { MdClose } from 'react-icons/md';

type Props = {}

function MapPopup({}: Props) {
  return (
    <div 
        className="fixed w-full h-[calc(100vh - 70px)] flex justify-center items-center overflow-hidden z-100 left-0 top-[66px] bg-black/30" 
        // onClick={(e)=>onMainConClick(e)}
    >
        <div id='deleteUnitsPopupInnerCon' className=" bg-white flex flex-col overflow-y-auto shrink-0 relative z-[3] overflow-x-hidden max-h-[90%] w-4/5 pt-[15px] p-[2%] rounded-[10px] max-w-[457px] justify-center items-center gap-[15px]">
            <button
                // onClick={() => setIsDrawerOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
            >
                <MdClose className="w-6 h-6" />
            </button>

            <div className=''>
                map box
            </div>

        </div>
    </div>
  )
}

export default MapPopup;