"use client"

import React, { useState } from 'react';
import { Select, Tabs } from '@mantine/core';
import ProjectDetailsCard from './projectCard';

const LeftSideBlock = () => {
    let projectsData = [1,2,];
    const [activeTab, setActiveTab] = useState<string | null>('proj');
   
    return (
       
        <div className="w-full">
            <Tabs value={activeTab} onChange={setActiveTab} defaultValue="proj">
                <Tabs.List className="h-[41px] w-full flex-row bg-gradient-to-b from-[#F5FBFF] /0 to-[#E5F4FF ]/100 w-full flex justify-center items-start ">
                    <Tabs.Tab value="proj">Projects</Tabs.Tab>
                    <Tabs.Tab value="owner-props">Owner Listing</Tabs.Tab>
                    <Tabs.Tab value="agent-props">Agents Listing</Tabs.Tab>
                    <Select
                        label=""
                        placeholder="Sort By"
                        data={['Buy', 'Rent', 'Plot']}
                        style={{height: "32px", width: "120px", border: "none", marginLeft: "auto" }}
                    />
                </Tabs.List>

                <Tabs.Panel value="proj">
                    <div className=' p-[2%] max-h-[700px] overflow-y-auto '>
                        {projectsData.map((eachOne, index)=>{
                            return(
                                <ProjectDetailsCard key={index} type={activeTab} />
                            )
                        })}
                    </div>
                </Tabs.Panel>
                <Tabs.Panel value="owner-props">
                    <div className=' p-[2%] max-h-[700px] overflow-y-auto '>
                        {projectsData.map((eachOne, index)=>{
                            return(
                                <ProjectDetailsCard key={index} type={activeTab} />
                            )
                        })}
                    </div>
                </Tabs.Panel>
                <Tabs.Panel value="agent-props">
                    <div className=' p-[2%] max-h-[700px] overflow-y-auto '>
                        {projectsData.map((eachOne, index)=>{
                            return(
                                <ProjectDetailsCard key={index} type={activeTab} />
                            )
                        })}
                    </div>
                </Tabs.Panel>

            </Tabs>
        </div>
        
    );
    
}


export default LeftSideBlock;