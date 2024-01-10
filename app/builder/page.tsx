"use client";

import React from 'react'
import Header from '../components/layouts/primary/header'
import Footer from '../components/layouts/primary/footer'
import TopProfileBlock from '../components/builder/topProfileBlock'
import ProjectDetails from '../components/builder/projectDetails'
import ManagementBlock from '../components/builder/management'
import ProjectCarousel from '../components/project/ProjectCard'
import BuildersBlock from '../components/builder/buildersBlock';

type Props = {}

export default function Builder({}: Props) {
  return (
    <div className='flex flex-col justify-start items-center w-full mt-[90px]  '>
        <Header />
        <TopProfileBlock />
        <div className='flex flex-col justify-start items-start w-[95%] '>
            <ProjectDetails />
            <ManagementBlock />
            <ProjectCarousel
                type="proj"
                title="Newly launched PROJECT by"
                projName="sumadhura"
                content="See other newly launched projects by Sumadhura"
            />

            <ProjectCarousel
                type="prop"
                title="Ready to move listings by"
                projName="sumadhura"
                content="See other ready to move listings by Sumadhura"
            />

            <ProjectCarousel
                type="prop"
                title="Under construction listings by"
                projName="sumadhura"
                content="See other under-construction listings by Sumadhura"
            />

            <BuildersBlock />
         
        </div>
        <Footer />
    </div>
  )
}