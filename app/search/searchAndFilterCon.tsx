"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { MultiSelect, Popover, Select } from '@mantine/core';
import Button from "@/app/elements/button";
import FilterPopup from './filterPopup';
import classes from '../styles/search.module.css';
// import { getAllCitiesDetails } from '../utils/stats_cities';


const SearchAndFilterCon = () => {
    const [opened, setOpened] = useState(false);
   
    return (
       
        <div className="m-[2%] w-full flex mt-[90px] pl-[2%] gap-[20px] justify-start items-center ">
            <p className="text-[16px] text-[#737579] font-[500]">
                <span>Home</span> {" > "}
                <Link href={"/project/banglore"}>
                    <span className="text-[16px] text-[#4D6677] font-[600]">Properties for Sell in Bengaluru</span>
                </Link>{" "}
            </p>

            <div className=' border-[#A0D7FF] rounded-[46px] gap-[8px] pl-[8px] border-[1px] border-solid flex items-center justify-center '>
                <Select
                    label=""
                    placeholder="Select"
                    data={['Buy', 'Rent', 'Plot']}
                    classNames={{input : classes.wrapperSelect}}
                    defaultValue={"Buy"}
                />
            
                <MultiSelect
                    label=""
                    placeholder="Enter City"
                    data={[
                        { value: '1', label: 'Bengaluru' },
                        { value: '2', label: 'Delhi' },
                        { value: '3', label: 'Bengaluru' },
                        { value: '4', label: 'Delhi' },
                        { value: '5', label: 'Bengaluru' },
                        { value: '6', label: 'Delhi' },
                        { value: '7', label: 'Bengaluru' },
                        { value: '8', label: 'Delhi' },
                    ]}
                    searchable
                    nothingFoundMessage="Nothing found..."
                    classNames={{input : classes.wrapperMultiSelection, pill: classes.MultiSelectionPill}}
                />
            </div>

            <Button 
                title="BHK" 
                buttonClass=' text-[#0073C6] text-[20px] font-[500] gap-[6px] p-[7px] pl-[12px] pr-[12px] flex justify-center items-center rounded-[57px] border-[1px] border-[#A0D7FF] bg-[#FFF] shadow-md ' 
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <circle cx="5" cy="5" r="5" fill="#148B16"/>
                    </svg>} 
            />
            <Button 
                title="Property Type" 
                buttonClass='whitespace-nowrap text-[#0073C6] text-[20px] font-[500] gap-[6px] p-[7px] pl-[12px] pr-[12px] flex justify-center items-center rounded-[57px] border-[1px] border-[#A0D7FF] bg-[#FFF] shadow-md ' 
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <circle cx="5" cy="5" r="5" fill="#148B16"/>
                    </svg>} 
            />
            <Button 
                title="Budget" 
                buttonClass=' text-[#0073C6] text-[20px] font-[500] gap-[6px] p-[7px] pl-[12px] pr-[12px] flex justify-center items-center rounded-[57px] border-[1px] border-[#A0D7FF] bg-[#FFF] shadow-md ' 
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <circle cx="5" cy="5" r="5" fill="#148B16"/>
                    </svg>} 
            />
            

            <Popover width={300} opened={opened} onChange={setOpened} trapFocus position="bottom" withArrow shadow="md">
                <Popover.Target>
                    <Button 
                        onChange={() => setOpened((o) => !o)}
                        title="Filters" 
                        buttonClass=' text-[#0073C6] text-[20px] font-[500] gap-[6px] p-[7px] pl-[12px] pr-[12px] flex justify-center items-center rounded-[57px] border-[1px] border-[#A0D7FF] bg-[#FFF] shadow-md ' 
                        icon={
                            <div className='text-[#FFF] bg-[#148B16] rounded-[50%] text-[16px] font-[700] w-[24px] h-[24px] flex justify-center items-center'>4</div>} 
                    ></Button>
                </Popover.Target>
                <Popover.Dropdown>
                    <FilterPopup />
                </Popover.Dropdown>
            </Popover>




        </div>
      
    );
    
}


export default SearchAndFilterCon;