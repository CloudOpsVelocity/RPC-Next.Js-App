import React, { useEffect } from 'react'
import { MdClose } from 'react-icons/md';

type Props = {
    children:React.ReactNode;
    isOpen?:boolean;
    handleChange?:any;
}

function ModalBox({children, isOpen, handleChange}: Props) {
    const onMainConClick = (e:any) => {
        var baxEl = document.getElementById("modalPopupInnerCon");
        if (baxEl && !baxEl.contains(e.target)){
            document.body.style.overflow = "scroll";
            handleChange(false);
        }
    };

    useEffect(()=>{
        isOpen ? document.body.style.overflow = "hidden" : document.body.style.overflow = "scroll";
    }, [isOpen]);

    return (
        <div 
            className="fixed w-full min-h-[calc(100vh-70px)] flex justify-center items-center overflow-hidden z-100 left-0 top-[66px] bg-black/30" 
            onClick={(e)=>onMainConClick(e)}
        >
            <div id='modalPopupInnerCon' className="relative bg-white flex flex-col overflow-y-auto shrink-0 z-[3] overflow-x-hidden max-h-[80%] h-full w-[94%] p-[2%] pt-[32px] rounded-[4px] justify-center items-center">
                <button
                    onClick={() => handleChange(false)}
                    className="p-[4px] hover:bg-gray-100 rounded-full absolute top-0 right-0"
                >
                    <MdClose className="w-6 h-6" />
                </button>

                <div className='w-full rounded-[4px]'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModalBox;