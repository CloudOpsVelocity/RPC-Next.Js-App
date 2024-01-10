import React from 'react'
import Header from '../components/layouts/primary/header'
import Footer from '../components/layouts/primary/footer'
import TopProfileBlock from '../components/builder/topProfileBlock'
import ProjectDetails from '../components/builder/projectDetails'
import About from '../components/project/about'

type Props = {}

export default function Builder({}: Props) {
  return (
    <div className='flex flex-col justify-start items-center w-full mt-[90px]  '>
        <Header />
        <TopProfileBlock />
        <div className='flex flex-col justify-start items-start w-[95%] '>
            <ProjectDetails />
            {/* <About /> */}
        </div>
        <Footer />
    </div>
  )
}